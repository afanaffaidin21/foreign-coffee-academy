# Milestone 4 — Authentication

---

## Issue 22: Configure Auth.js integration

### Problem
The application requires secure authentication for students and administrators using Auth.js with session management and server-side authorization support.

### Scope
- Install `next-auth@beta` / `@auth/drizzle-adapter`.
- Configure Auth.js handlers in `src/app/api/auth/[...nextauth]/route.ts`.
- Setup Credentials provider (email/password login) and session strategy (JWT or database session).
- Include `id`, `email`, `name`, and `role` (`STUDENT | ADMIN`) in session user object.

### Non-Scope
- Storing membership entitlement permanently inside session JWT (entitlement MUST be queried live from DB per PRD rule).

### Implementation Notes
- Use `AUTH_SECRET` from env validation.
- Session type definition override for `AppSessionUser`.

### Acceptance Criteria
- [ ] Authentication API endpoints `/api/auth/[...nextauth]` handle login and session retrieval.
- [ ] Session includes user `id` and `role`.

### Tests
- Integration test for Auth.js credentials login flow.

### Dependencies
- Milestone 1 (Foundation) & Milestone 3 (Identity Schema).

---

## Issue 23: Add login UI and demo accounts quick-selector

### Problem
For portfolio evaluation, visitors need a seamless way to log in as different deterministic accounts (free, active premium, expired premium, admin) without manual typing.

### Scope
- Build `/login` and `/register` pages.
- Build demo account quick-login selector component on `/login`:
  - Quick button: `Login as Free Student`
  - Quick button: `Login as Premium Student`
  - Quick button: `Login as Expired Student`
  - Quick button: `Login as Admin`
- Display clear demo notice explaining portfolio credential presets.

### Non-Scope
- Social OAuth logins (Google/GitHub) unless required.

### Implementation Notes
- Auto-fill credentials or trigger instant sign-in for demo options.
- Maintain Indonesian language user interface.

### Acceptance Criteria
- [ ] `/login` renders clean credentials form and demo selector cards.
- [ ] Clicking a demo account logs in instantly and redirects to `/dashboard` or intended URL.

### Tests
- Playwright E2E test verifying demo account one-click login functionality.

### Dependencies
- Issue 22 (Configure Auth.js) & Issue 21 (Deterministic Seeds).

---

## Issue 24: Implement session and server guards

### Problem
Server components and server actions need explicit, strict authorization policies to prevent unauthenticated or unauthorized access.

### Scope
- Implement guard helper utility functions in `src/modules/auth/guards.ts`:
  - `requireUser()`: Asserts authenticated user or redirects/throws `AUTH_REQUIRED`.
  - `requireAdmin()`: Asserts authenticated user has role `ADMIN` or throws `FORBIDDEN`.
  - `requireMutableAccount()`: Asserts account is not a read-only public demo account for sensitive operations (`DEMO_ACCOUNT_READ_ONLY`).
  - `requirePremiumEntitlement(userId)`: Checks active membership in DB (`ACTIVE` status and `endsAt > now`).

### Non-Scope
- Client-side-only route protection (hidden UI is NOT authorization).

### Implementation Notes
- All entitlement and role checks must execute server-side.

### Acceptance Criteria
- [ ] Guard functions accurately enforce role, user, and entitlement boundaries.
- [ ] Unauthenticated calls fail with structured `ActionResult` errors or server redirects.

### Tests
- Unit tests for each guard function under mock session and database states.

### Dependencies
- Issue 22 (Configure Auth.js).

---

## Issue 25: Protect admin and dashboard routes via Next.js Middleware

### Problem
Unauthenticated users must be prevented from reaching private dashboard or admin routes before rendering server components.

### Scope
- Create Next.js Middleware (`src/middleware.ts`):
  - Protect `/dashboard/*` routes (redirect unauthenticated users to `/login?callbackUrl=/dashboard`).
  - Protect `/admin/*` routes (redirect non-admin users to `/login` or return 403).
  - Allow public access to `/`, `/courses/*`, `/guides/*`, `/recipes/*`, `/belajar/*`, `/membership`.

### Non-Scope
- Static asset filtering.

### Implementation Notes
- Middleware performs route protection; server components still execute `requireUser()` / `requireAdmin()` for defense in depth.

### Acceptance Criteria
- [ ] Accessing `/dashboard` without session redirects to `/login`.
- [ ] Accessing `/admin` as a `STUDENT` redirects or blocks with 403 error.

### Tests
- Integration tests checking middleware HTTP redirection for protected routes.

### Dependencies
- Issue 24 (Session and Server Guards).

---

## Issue 26: Test role and demo restrictions

### Problem
Sensitive operations must be protected against tampering by demo accounts or unauthorized student accounts.

### Scope
- Enforce read-only restrictions for public demo accounts on sensitive mutations (e.g. changing admin passwords, deleting core data).
- Validate role restriction matrix (Visitor, Free, Premium Active, Admin).

### Non-Scope
- Third-party OAuth provider management.

### Implementation Notes
- Return `DEMO_ACCOUNT_READ_ONLY` error code when demo accounts attempt restricted mutations.

### Acceptance Criteria
- [ ] Demo accounts can execute demo student flows but cannot execute forbidden system mutations.
- [ ] Authorization matrix test suite passes cleanly.

### Tests
- Comprehensive unit and integration test suite executing authorization matrix checks.

### Dependencies
- Issues 22-25.
