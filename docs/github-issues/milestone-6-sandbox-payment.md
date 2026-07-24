# Milestone 6 — Sandbox Payment

---

## Issue 34: Build membership comparison page

### Problem
Visitors and free learners need a clear comparison between Free and Premium plans (Monthly Rp49.000, Yearly Rp399.000) highlighting portfolio Midtrans Sandbox checkout.

### Scope
- Build `/membership`:
  - Feature comparison table (Free access vs Full course access, recipes, practice proof).
  - Plan cards: Monthly (Rp49.000 / bln) & Yearly (Rp399.000 / thn).
  - Explicit banner: `Simulasi Midtrans Sandbox (Portfolio Demo - tidak ada penagihan riil)`.
  - CTA button: `Pilih Paket Monthly` / `Pilih Paket Yearly`.

### Non-Scope
- Production real payment processing.

### Implementation Notes
- Use Indonesian currency formatting (`Rp49.000`).
- Ensure clear visual distinction for recommended plan (Yearly).

### Acceptance Criteria
- [ ] `/membership` renders pricing cards and feature matrix.
- [ ] Midtrans Sandbox demonstration notice is clearly visible.

### Tests
- Render test verifying plan pricing and Sandbox indicator banner.

### Dependencies
- Milestone 2 (Marketing UI) & Milestone 3 (Commerce Schema).

---

## Issue 35: Implement secure transaction creation endpoint

### Problem
The application requires a secure server endpoint to initialize a Midtrans transaction without trusting price or plan details sent from the client browser.

### Scope
- Implement `POST /api/payments/midtrans/create`:
  - Request payload strictly accepts `{ "planSlug": "monthly" | "yearly" }`.
  - Require authenticated user (`requireUser()`) and mutable account (`requireMutableAccount()`).
  - Fetch price and duration from `membership_plans` database table.
  - Generate unique `orderId` (e.g. `FCA-SANDBOX-{timestamp}-{random}`).
  - Insert record in `transactions` table with status `CREATED`.
  - Return `{ ok: true, data: { orderId, snapToken } }`.

### Non-Scope
- Receiving client-specified price parameters (PRD explicitly forbids trusting client price).

### Implementation Notes
- Never log the `snapToken`.

### Acceptance Criteria
- [ ] Endpoint validates request schema and rejects unauthenticated callers.
- [ ] Database transaction record created with exact DB plan price.
- [ ] Order ID and Snap token returned to caller.

### Tests
- Integration test checking transaction creation and server-side price resolution.

### Dependencies
- Issue 34 (Membership Comparison) & Milestone 3 (Commerce Schema).

---

## Issue 36: Implement Midtrans Sandbox provider adapter

### Problem
The server requires an isolated adapter module to communicate with Midtrans Snap Sandbox API endpoints securely.

### Scope
- Create `src/modules/payments/midtrans-adapter.ts`:
  - `createSnapTransaction(params)`: Calls Midtrans Sandbox API (`https://api.sandbox.midtrans.com/snap/v1/transactions`) using HTTP Basic Auth with `MIDTRANS_SERVER_KEY`.
  - `verifyWebhookSignature(payload)`: Calculates SHA512 hash (`order_id + status_code + gross_amount + MIDTRANS_SERVER_KEY`) using timing-safe comparison.
  - Refuse execution if `MIDTRANS_IS_PRODUCTION=true`.

### Non-Scope
- Midtrans Production API integration.

### Implementation Notes
- Base64 encode `MIDTRANS_SERVER_KEY + ":"` for Basic Authorization header.
- Use `crypto.timingSafeEqual` for signature verification.

### Acceptance Criteria
- [ ] Adapter creates Snap transaction tokens against Midtrans Sandbox.
- [ ] Webhook signature verification accurately validates hash signatures using timing-safe comparison.

### Tests
- Unit tests for SHA512 signature calculations and timing-safe checks.

### Dependencies
- Issue 5 (Environment Validation) & Issue 35 (Transaction Creation).

---

## Issue 37: Implement Midtrans Snap UI popup integration

### Problem
Users who click buy on the membership page need the Midtrans Snap modal popup to appear smoothly and guide them through Sandbox checkout.

### Scope
- Load Midtrans Snap script (`NEXT_PUBLIC_MIDTRANS_SNAP_SCRIPT_URL`) via `next/script`.
- Implement Snap checkout trigger component on `/membership`:
  - Call `/api/payments/midtrans/create` -> receive `snapToken` and `orderId`.
  - Execute `window.snap.pay(snapToken, { onSuccess, onPending, onError, onClose })`.
  - Handle browser callbacks as UX signals only (redirect to `/dashboard/membership?orderId={orderId}`).

### Non-Scope
- Granting entitlement directly inside client `onSuccess` callback (PRD rule: Webhook is ONLY entitlement source).

### Implementation Notes
- Display loading overlay while fetching Snap token.

### Acceptance Criteria
- [ ] Clicking checkout opens Midtrans Snap modal popup.
- [ ] Closing or completing payment redirects user to payment status / membership dashboard page.

### Tests
- Mocked E2E test verifying Snap trigger execution and redirection.

### Dependencies
- Issues 35-36.

---

## Issue 38: Implement verified Midtrans Sandbox webhook handler

### Problem
The application requires a secure, verified HTTP webhook endpoint to receive asynchronous payment status notifications from Midtrans and update transaction records.

### Scope
- Implement `POST /api/payments/midtrans/webhook`:
  - Parse JSON notification payload.
  - Verify payload signature using `verifyWebhookSignature`.
  - Verify environment is `SANDBOX` and gross amount matches database record.
  - Map Midtrans transaction status to internal status (`capture`/`settlement` -> `PAID`, `pending` -> `PENDING`, `deny`/`cancel`/`expire` -> `FAILED`/`CANCELLED`/`EXPIRED`).
  - Update transaction status in database.

### Non-Scope
- Processing live production webhooks.

### Implementation Notes
- Return HTTP 200 OK to Midtrans upon successful processing.
- Reject invalid signatures with status 400 (`WEBHOOK_INVALID_SIGNATURE`).

### Acceptance Criteria
- [ ] Webhook handler verifies signature and updates transaction status in DB.
- [ ] Rejects requests with mismatched amounts or invalid signatures.

### Tests
- Integration tests sending valid and tampered webhook payloads to `/api/payments/midtrans/webhook`.

### Dependencies
- Issue 36 (Midtrans Adapter).

---

## Issue 39: Implement idempotent membership entitlement processing

### Problem
Payment webhooks may be delivered multiple times by Midtrans. Entitlement granting must be strictly idempotent so duplicate notifications do not duplicate membership durations.

### Scope
- Implement entitlement engine inside transaction processing:
  - Check if status is `PAID` AND `entitlementAppliedAt IS NULL`.
  - Open single atomic database transaction:
    1. Calculate `startsAt` (now) and `endsAt` (`max(now, currentEndsAt) + planDurationDays`).
    2. Upsert user `memberships` record with status `ACTIVE`.
    3. Update `transactions.entitlementAppliedAt = now()`.
  - If `entitlementAppliedAt` is already set, skip entitlement granting safely.

### Non-Scope
- Cron job for membership expiration (PRD rule: entitlement check evaluates `endsAt > now` on the fly).

### Implementation Notes
- Extension formula: `base = max(now, currentMembership.endsAt); newEndsAt = base + plan duration`.

### Acceptance Criteria
- [ ] Single webhook call grants membership and records `entitlementAppliedAt`.
- [ ] Duplicate webhook calls return 200 OK without extending `endsAt` a second time.

### Tests
- Unit/integration test firing duplicate `PAID` webhooks sequentially and asserting exact `endsAt` timestamp.

### Dependencies
- Issue 38 (Verified Webhook Handler).

---

## Issue 40: Build payment transaction status UI & polling

### Problem
After completing checkout in Midtrans Snap, the student needs visual feedback while waiting for the webhook to settle transaction status and unlock premium content.

### Scope
- Build `/api/payments/[orderId]/status` GET endpoint (owner/admin scoped).
- Build payment status widget on `/dashboard/membership`:
  - Show transaction order ID, date, amount, status badge (`PENDING`, `PAID`, `FAILED`).
  - Poll `/api/payments/[orderId]/status` every 3 seconds while status is `PENDING` (max 10 attempts).
  - Update UI instantly to `PAID` and show `Membership Aktif - Selamat Belajar!` once verified.

### Non-Scope
- Complex WebSocket infrastructure (HTTP polling is sufficient for MVP).

### Implementation Notes
- Only allow the user who owns the transaction (or Admin) to check status.

### Acceptance Criteria
- [ ] Payment status widget displays transaction details.
- [ ] Polling detects transition from `PENDING` to `PAID` and updates UI dynamically.

### Tests
- Integration test for order status polling endpoint authorization and response payload.

### Dependencies
- Issues 37-39.

---

## Issue 41: Test Sandbox transaction states and state transitions

### Problem
All Midtrans Sandbox payment states (`CREATED`, `PENDING`, `PAID`, `FAILED`, `CANCELLED`, `EXPIRED`, `REFUNDED`) must be validated to guarantee robustness.

### Scope
- Create comprehensive test suite in `src/modules/payments/__tests__/transaction-states.test.ts`:
  - Test initial state transitions from `CREATED` -> `PENDING` -> `PAID`.
  - Test failed transactions (`deny`, `cancel`, `expire`).
  - Test invalid transitions (e.g. `PAID` back to `PENDING`).
  - Test entitlement unlocking for premium lesson route upon `PAID`.

### Non-Scope
- Real credit card charges.

### Implementation Notes
- Use deterministic mock payloads from Midtrans Sandbox documentation.

### Acceptance Criteria
- [ ] Test suite covers all 7 transaction states and invalid transition rejections.
- [ ] All tests pass in CI pipeline.

### Tests
- Execute `npm run test` validating full transaction state machine.

### Dependencies
- Issues 34-40.
