# Milestone 8 — Quality and Deployment

---

## Issue 49: Integrate PostHog analytics and track core funnel events

### Problem
The product needs analytics telemetry to track student activation, free lesson interactions, and conversion funnel events without compromising privacy.

### Scope
- Install `posthog-js` and configure provider in root layout.
- Track key supporting events (`FR-03` / Section 3):
  - `learning_goal_selected`
  - `free_lesson_started`
  - `free_lesson_completed`
  - `membership_viewed`
  - `sandbox_checkout_started`
  - `sandbox_payment_verified`
  - `continue_learning_clicked`
  - `lesson_completed`
- Use `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST`.

### Non-Scope
- Tracking sensitive personal data or passwords.

### Implementation Notes
- Wrap event triggers in helper utility module `src/lib/analytics.ts`.

### Acceptance Criteria
- [ ] PostHog initializes without blocking page render.
- [ ] Core funnel events fire on respective user interactions.

### Tests
- Mocked unit test verifying analytics event helper function invocations.

### Dependencies
- Milestone 1 (Foundation) & Milestone 5 (Learning).

---

## Issue 50: Add Sentry error monitoring and exception handling

### Problem
Runtime errors and server exceptions must be logged to Sentry to monitor stability in production/staging environments.

### Scope
- Install `@sentry/nextjs`.
- Configure `sentry.client.config.ts`, `sentry.server.config.ts`, and `sentry.edge.config.ts`.
- Setup global error boundary (`src/app/error.tsx` and `src/app/global-error.tsx`).
- Redact sensitive keys (passwords, tokens, server keys) from Sentry error payloads.

### Non-Scope
- Logging normal validation errors (`VALIDATION_ERROR`).

### Implementation Notes
- Use `NEXT_PUBLIC_SENTRY_DSN` from environment validation module.

### Acceptance Criteria
- [ ] Global error boundary handles unexpected React render failures gracefully.
- [ ] Uncaught server exceptions are captured in Sentry with sensitive data sanitized.

### Tests
- Verify error boundary component renders friendly fallback UI.

### Dependencies
- Milestone 1 (Foundation).

---

## Issue 51: Add API rate limiting and sensitive data redaction

### Problem
API endpoints (checkout creation, login) require rate limiting protection, and application logs must redact authorization tokens, passwords, and Snap tokens.

### Scope
- Implement rate limiting middleware/utility using Upstash Redis or memory store for sensitive endpoints (`/api/payments/*`, `/api/auth/*`).
- Create logger utility `src/lib/logger.ts` that automatically redacts sensitive keys (`password`, `snapToken`, `serverKey`, `authSecret`).
- Return `RATE_LIMITED` error code when threshold is exceeded.

### Non-Scope
- Distributed DDoS protection (handled by Vercel platform).

### Implementation Notes
- Never log raw Snap tokens or Midtrans Server Key in server console.

### Acceptance Criteria
- [ ] API endpoints enforce rate limit thresholds.
- [ ] Server log output redacts sensitive fields automatically.

### Tests
- Unit test for log redaction utility verifying sensitive keys are scrubbed.

### Dependencies
- Milestone 4 (Auth) & Milestone 6 (Payment).

---

## Issue 52: Conduct accessibility audit and remediation (WCAG 2.1 AA)

### Problem
All public and student-facing pages must pass accessibility standards (WCAG 2.1 AA compliance) for screen readers and keyboard navigation.

### Scope
- Audit all application pages (`/`, `/courses/*`, `/guides/*`, `/recipes/*`, `/learn/*`, `/dashboard/*`):
  - Accessible name and ARIA labels on all interactive elements.
  - Proper heading structure (`h1` -> `h2` -> `h3`).
  - Keyboard navigation focus traps and focus rings.
  - Color contrast ratios passing WCAG AA.

### Non-Scope
- Admin internal tools WCAG AAA certification.

### Implementation Notes
- Run automated axe accessibility checks during E2E tests.

### Acceptance Criteria
- [ ] Zero critical or serious accessibility violations reported by axe-core.
- [ ] Keyboard navigation operates across full student learning flow.

### Tests
- Playwright + `@axe-core/playwright` audit test suite.

### Dependencies
- Milestone 2 & Milestone 5.

---

## Issue 53: Conduct performance audit and image optimization

### Problem
The web application must load fast (Lighthouse performance score > 90) on mobile and desktop devices.

### Scope
- Optimize images using Next.js `<Image />` component with `webp` / `avif` formats.
- Preload critical fonts (`Plus Jakarta Sans`).
- Code-split heavy client components.
- Analyze bundle size using `@next/bundle-analyzer`.

### Non-Scope
- Third-party script caching hacks.

### Implementation Notes
- Core Web Vitals targets: LCP < 2.5s, CLS < 0.1, INP < 200ms.

### Acceptance Criteria
- [ ] Lighthouse Performance score >= 90 on Desktop.
- [ ] LCP and CLS meet Google Core Web Vitals recommendations.

### Tests
- Run Lighthouse CLI audit test against build output.

### Dependencies
- Milestone 2 & Milestone 5.

---

## Issue 54: Run complete E2E scenario validation

### Problem
The end-to-end user journeys (visitor activation, free lesson learning, Midtrans Sandbox checkout, returning student dashboard, admin CMS publishing) must be validated end-to-end.

### Scope
- Create Playwright E2E test suites for core checkpoints:
  - Checkpoint 1: Responsive homepage -> free lesson -> progress saved.
  - Checkpoint 2: Locked lesson -> membership -> Sandbox checkout -> verified webhook -> premium lesson unlocked.
  - Checkpoint 3: Admin login -> draft creation -> publish -> revalidation check.

### Non-Scope
- Flaky external network tests (mock Midtrans API when needed).

### Implementation Notes
- Execute in headless mode in CI pipeline.

### Acceptance Criteria
- [ ] All 3 core E2E scenarios pass reproducibly without flakiness.

### Tests
- Run `npm run e2e` validating all scenarios.

### Dependencies
- Milestone 1 through 7.

---

## Issue 55: Configure Vercel Hobby deployment setup

### Problem
The application requires deployment configuration on Vercel Hobby tier with build settings, environment variable bindings, and edge caching rules.

### Scope
- Create `vercel.json` configuration file if necessary.
- Configure build command (`npm run build`) and output directory.
- Set environment variables in Vercel project dashboard.
- Verify production build succeeds on Vercel Hobby deployment.

### Non-Scope
- Paid Vercel Enterprise features.

### Implementation Notes
- Ensure `MIDTRANS_IS_PRODUCTION` is set to `false` in Vercel environment variables.

### Acceptance Criteria
- [ ] Deployment builds and succeeds on Vercel.
- [ ] Sandbox checkout and server routes operate properly in Vercel environment.

### Tests
- Verify Vercel preview deployment passes build logs without error.

### Dependencies
- Issues 49-54.

---

## Issue 56: Write documentation, README, and portfolio case-study notes

### Problem
The repository requires clear documentation for developers and technical recruiters reviewing the Foreign Coffee Academy portfolio project.

### Scope
- Update `README.md`:
  - Project architecture overview and tech stack.
  - Quickstart setup instructions (`npm install`, `.env`, `npm run db:seed`, `npm run dev`).
  - Deterministic demo account credentials table.
  - Architectural highlights (server-side authorization, idempotent payment webhook, Playful Coffee Learning UI).
- Write `CASE_STUDY.md` summarizing product decisions, visual design evolution (V1.1), and technical trade-offs.

### Non-Scope
- End-user user manual.

### Implementation Notes
- Include links to PRD and milestone breakdown.

### Acceptance Criteria
- [ ] `README.md` provides clear quickstart instructions and demo account details.
- [ ] `CASE_STUDY.md` clearly documents portfolio achievements and architecture.

### Tests
- Manual markdown lint check.

### Dependencies
- Issues 1-55.
