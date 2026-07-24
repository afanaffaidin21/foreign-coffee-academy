# Milestone 1 — Foundation

---

## Issue 1: Initialize Next.js and TypeScript project

### Problem
The project requires a modern, production-ready foundation with Next.js App Router and TypeScript to support server components, type safety, and fast routing.

### Scope
- Initialize Next.js (v14+ or latest stable App Router) with TypeScript in strict mode.
- Setup base project configuration files (`tsconfig.json`, `next.config.mjs`, `.gitignore`).
- Configure root directory structure following `src/` directory pattern.

### Non-Scope
- Styling integration (Tailwind / shadcn/ui).
- Database or auth configuration.

### Implementation Notes
- Use App Router with `src/app` architecture.
- Ensure strict TypeScript checks enabled (`strict: true`, `noImplicitAny: true`).

### Acceptance Criteria
- [ ] `npm run dev` starts the development server without errors.
- [ ] TypeScript compiles cleanly with zero type errors.
- [ ] Root layout (`src/app/layout.tsx`) renders properly.

### Tests
- Add a basic test to verify root page renders cleanly.

### Dependencies
- None.

---

## Issue 2: Configure Tailwind CSS and shadcn/ui

### Problem
The application requires a consistent visual styling engine and component primitives supporting the `Playful Coffee Learning UI` design system.

### Scope
- Install and configure Tailwind CSS and PostCSS.
- Initialize `shadcn/ui` with custom Tailwind configuration (`tailwind.config.ts`).
- Setup Lucide React icons.

### Non-Scope
- Page-specific UI implementations.
- Custom fonts installation.

### Implementation Notes
- Add `clsx`, `tailwind-merge`, and `class-variance-authority` utilities.
- Setup `src/components/ui` folder for shadcn components.

### Acceptance Criteria
- [ ] Tailwind utility classes compile correctly.
- [ ] shadcn/ui components can be imported and rendered without error.
- [ ] Lucide icons render properly.

### Tests
- Verify button or UI primitive component renders with Tailwind classes in tests.

### Dependencies
- Issue 1 (Initialize Next.js and TypeScript project).

---

## Issue 3: Implement approved design tokens and Plus Jakarta Sans typography

### Problem
The app visual identity must follow `Playful Coffee Learning UI` (60% Playful Minimalism, 20% Soft Bento, 15% Organic Coffee Visuals, 5% Handcrafted Details) with approved typography and color tokens.

### Scope
- Load `Plus Jakarta Sans` font via `next/font/google`.
- Configure custom design tokens in CSS variables (`globals.css`) and Tailwind config:
  - Cream/Warm background tones (`--bg-surface`, `--bg-warm`)
  - Espresso/Dark Slate text tones
  - Playful accents (Warm Coffee, Cream Foam, Matcha Green, Terracotta Warmth, Warm Amber)
  - Rounded border radius scales (`rounded-2xl`, `rounded-3xl`, `rounded-full`).

### Non-Scope
- Editorial / Serif typography (explicitly rejected).
- Full dark mode.

### Implementation Notes
- Typography: Plus Jakarta Sans for both headings and body text.
- Re-use design tokens via CSS variables mapped into `tailwind.config.ts`.

### Acceptance Criteria
- [ ] Font `Plus Jakarta Sans` applies globally.
- [ ] Color tokens and rounded corners are available via Tailwind classes.
- [ ] No hardcoded color hexes used directly in inline styles.

### Tests
- Verify design token CSS variables are loaded in global styles.

### Dependencies
- Issue 2 (Configure Tailwind CSS and shadcn/ui).

---

## Issue 4: Create application folder boundaries

### Problem
The project requires a clear, modular monolith architecture to ensure separation of concerns between domain modules, database schemas, and presentation layers.

### Scope
- Create standard application directory structure:
  - `src/app/` (Next.js route groups: `(marketing)`, `(auth)`, `dashboard/`, `learn/`, `admin/`, `api/`)
  - `src/modules/` (`auth/`, `content/`, `learning/`, `membership/`, `payments/`, `admin/`)
  - `src/db/` (`schema/`, `client.ts`, `seed/`)
  - `src/components/` (`ui/`, `shared/`)
  - `src/lib/`
  - `src/styles/`

### Non-Scope
- Detailed logic inside modules.

### Implementation Notes
- Add `index.ts` / barrel files or placeholder exports for each module.
- Configure module resolution path aliases in `tsconfig.json` (`@/modules/*`, `@/components/*`, `@/db/*`, `@/lib/*`).

### Acceptance Criteria
- [ ] Directory structure established in `src/`.
- [ ] Path aliases resolved cleanly by TypeScript compiler.

### Tests
- Verify module path alias imports in a basic unit test.

### Dependencies
- Issue 1 (Initialize Next.js and TypeScript project).

---

## Issue 5: Add environment validation

### Problem
The app requires strict runtime and build-time validation for environment variables to prevent startup with missing secrets or invalid configuration (e.g. accidently setting Midtrans production mode).

### Scope
- Install `@t3-oss/env-nextjs` and `zod`.
- Create `src/env.mjs` (or `src/env.ts`) defining schema for server and public variables:
  - `NEXT_PUBLIC_APP_URL`, `DATABASE_URL`, `AUTH_SECRET`
  - `MIDTRANS_IS_PRODUCTION` (must default to `false` and throw error if `true`)
  - `MIDTRANS_SERVER_KEY`, `NEXT_PUBLIC_MIDTRANS_CLIENT_KEY`, `MIDTRANS_API_BASE_URL`
- Provide updated `.env.example` file without secrets.

### Non-Scope
- Production environment provisioning.

### Implementation Notes
- Validate environment variables during `next build` and server startup.
- Portfolio must refuse to start if `MIDTRANS_IS_PRODUCTION=true`.

### Acceptance Criteria
- [ ] App fails gracefully with informative errors if required env variables are missing.
- [ ] App fails to start if `MIDTRANS_IS_PRODUCTION=true`.
- [ ] `.env.example` lists all required environment variables.

### Tests
- Add unit test verifying environment schema validation rejects `MIDTRANS_IS_PRODUCTION=true`.

### Dependencies
- Issue 1 (Initialize Next.js and TypeScript project).

---

## Issue 6: Configure lint, type-check, tests, and CI pipeline

### Problem
The codebase needs automated quality tooling to ensure code quality, formatting standards, and non-breaking builds on every commit.

### Scope
- Configure ESLint and Prettier for Next.js and TypeScript.
- Install and configure Vitest (or Jest) for unit/integration tests.
- Configure Playwright for end-to-end testing setup.
- Create GitHub Actions workflow (`.github/workflows/ci.yml`) running `type-check`, `lint`, and `test`.

### Non-Scope
- Writing all feature E2E tests (handled in respective feature issues).

### Implementation Notes
- Add scripts in `package.json`: `npm run lint`, `npm run type-check`, `npm run test`, `npm run e2E`.

### Acceptance Criteria
- [ ] `npm run lint` and `npm run type-check` pass cleanly.
- [ ] `npm run test` executes successfully.
- [ ] GitHub Actions CI workflow triggers and passes on push / pull request.

### Tests
- Run CI script locally and verify all checks pass.

### Dependencies
- Issues 1-5.
