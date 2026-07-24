# Milestone 3 — Data

---

## Issue 16: Configure Neon PostgreSQL and Drizzle ORM

### Problem
The application requires a robust database connection using Neon PostgreSQL (Serverless) and Drizzle ORM for type-safe database queries and migrations.

### Scope
- Install `drizzle-orm`, `@neondatabase/serverless`, and `drizzle-kit`.
- Configure `drizzle.config.ts` pointing to `src/db/schema/index.ts`.
- Setup database client initialization in `src/db/client.ts` supporting pooled and unpooled connections.
- Add migration scripts in `package.json` (`npm run db:generate`, `npm run db:migrate`, `npm run db:studio`).

### Non-Scope
- Writing table definitions (handled in Issues 17-20).

### Implementation Notes
- Use `DATABASE_URL` (pooled) and `DATABASE_URL_UNPOOLED` from environment validation module.

### Acceptance Criteria
- [ ] Drizzle ORM connects to Neon PostgreSQL instance cleanly.
- [ ] Migration generation and execution commands work without errors.

### Tests
- Integration test checking raw database connectivity (`SELECT 1`).

### Dependencies
- Milestone 1 (Foundation & Environment Validation).

---

## Issue 17: Implement identity schema

### Problem
The system needs to store user accounts, authentication sessions, verification tokens, and user roles (`STUDENT`, `ADMIN`) compatible with Auth.js.

### Scope
- Define identity tables in `src/db/schema/identity.ts`:
  - `users`: `id` (UUID), `name`, `email`, `emailVerified`, `image`, `role` (`STUDENT | ADMIN`), timestamps.
  - `accounts`: Auth.js provider account links.
  - `sessions`: Session token management.
  - `verification_tokens`: Auth tokens.
- Add relations and indexes on `email` and `userId`.

### Non-Scope
- Auth.js handler routes implementation (Milestone 4).

### Implementation Notes
- Use `pgEnum` for roles (`STUDENT`, `ADMIN`).
- Foreign keys set to cascade delete where appropriate.

### Acceptance Criteria
- [ ] Identity schema compiles and generates valid Drizzle migration SQL.
- [ ] Schema types exported for application consumption.

### Tests
- Type test verifying `User` and `Role` infer proper TypeScript types.

### Dependencies
- Issue 16 (Configure Neon and Drizzle).

---

## Issue 18: Implement content and learning schema

### Problem
Structured content management requires database entities for courses, modules, lessons, guides, recipes, learning hubs, and student lesson progress.

### Scope
- Define content tables in `src/db/schema/content.ts`:
  - `content_nodes`: Generic content item metadata (title, slug, publication status `DRAFT | PUBLISHED | ARCHIVED`).
  - `courses`: Course metadata, level, outcomes, requirement details.
  - `modules`: Course module organization and sequence index.
  - `lessons`: Lesson title, slug, duration, access type (`FREE | PREMIUM`), YouTube unlisted video ID.
  - `lesson_progress`: `userId`, `lessonId`, `completed`, `completedAt`, `lastAccessedAt` (unique key: `(userId, lessonId)`).
  - `topics` & `content_topics`: Topic tags and mapping.
  - `content_relations`: Manual curated links (course <-> lesson <-> guide <-> recipe).
  - `learning_hubs` & `hub_content`: Goal-based hubs curation.

### Non-Scope
- Algorithmic recommendation tables.

### Implementation Notes
- Enums: `PublicationStatus` (`DRAFT`, `PUBLISHED`, `ARCHIVED`), `LessonAccessType` (`FREE`, `PREMIUM`).
- Use UUID primary keys and `timestamptz`.

### Acceptance Criteria
- [ ] Schema models express all course, lesson, guide, recipe, and progress structures.
- [ ] Drizzle migration generated cleanly.

### Tests
- Migration test validating schema constraints and foreign key relations.

### Dependencies
- Issue 16 (Configure Neon and Drizzle).

---

## Issue 19: Implement commerce schema

### Problem
The platform requires data tables to store membership plans, active user memberships, and Midtrans Sandbox payment transactions.

### Scope
- Define commerce tables in `src/db/schema/commerce.ts`:
  - `membership_plans`: `id`, `slug` (`monthly`, `yearly`), `name`, `priceIdr`, `durationDays`, `isActive`, timestamps.
  - `memberships`: `id`, `userId`, `planId`, `status` (`ACTIVE | REVOKED`), `startsAt`, `endsAt`, timestamps.
  - `transactions`: `id`, `orderId` (unique), `userId`, `planId`, `amountIdr`, `environment` (`SANDBOX`), `status` (`CREATED | PENDING | PAID | FAILED | CANCELLED | EXPIRED | REFUNDED`), `snapToken`, `entitlementAppliedAt`, timestamps.

### Non-Scope
- Midtrans webhook handler logic (Milestone 6).

### Implementation Notes
- Only 1 current membership row per user for MVP.
- Amounts stored as integer IDR.

### Acceptance Criteria
- [ ] Commerce tables created with strict status enums and orderId constraints.
- [ ] Drizzle migration generated cleanly.

### Tests
- Schema unit test ensuring integer math and timestamp defaults behave correctly.

### Dependencies
- Issue 16 (Configure Neon and Drizzle).

---

## Issue 20: Implement audit schema

### Problem
Admin actions (content publishing, price edits, membership revocations) require an audit log table for tracking administrative changes.

### Scope
- Define audit table in `src/db/schema/audit.ts`:
  - `admin_audit_logs`: `id` (UUID), `adminUserId`, `action` (e.g., `PUBLISH_COURSE`, `REVOKE_MEMBERSHIP`), `targetType`, `targetId`, `payloadJson`, `ipAddress`, `createdAt`.

### Non-Scope
- Public student analytics event logging.

### Implementation Notes
- Immutable audit log table (inserts only).

### Acceptance Criteria
- [ ] `admin_audit_logs` schema defined with timestamp indexing.
- [ ] Migration generated cleanly.

### Tests
- Verify schema structure via Drizzle type checks.

### Dependencies
- Issue 16 (Configure Neon and Drizzle).

---

## Issue 21: Add deterministic seed script

### Problem
The portfolio demonstration requires deterministic seed data representing free learners, active premium members, expired members, admin accounts, and realistic coffee course content.

### Scope
- Create `src/db/seed/index.ts` and script `npm run db:seed`.
- Seed accounts:
  - Free Student (`student-free@example.com`)
  - Active Premium Student (`student-active@example.com`)
  - Expired Student (`student-expired@example.com`)
  - Admin (`admin@example.com`)
- Seed initial membership plans (Monthly Rp49.000, Yearly Rp399.000).
- Seed 3 courses (Barista Fundamentals, Espresso Foundations, Manual Brew Essentials) with modules, free/premium lessons, guides, recipes, and learning hubs.

### Non-Scope
- Seeding production user credentials.

### Implementation Notes
- Password hashing for demo accounts using bcrypt.
- Idempotent seed execution (upsert or clean insert).

### Acceptance Criteria
- [ ] `npm run db:seed` populates database with deterministic accounts and course data.
- [ ] Seed data demonstrates free, active premium, and expired entitlement states.

### Tests
- Integration test running seed script against test database and checking record counts.

### Dependencies
- Issues 17-20.
