# Milestone 7 — Admin CMS

---

## Issue 42: Build admin shell and dashboard overview page

### Problem
Administrators require a secure, dedicated admin shell layout to manage courses, guides, recipes, hubs, memberships, and transaction audits.

### Scope
- Build `/admin` (Admin Overview Dashboard):
  - Sidebar navigation (`Overview`, `Courses`, `Content (Guides/Recipes)`, `Learning Hubs`, `Memberships`, `Transactions`, `Audit Logs`).
  - High-level metric cards: Total published courses, active memberships, Sandbox revenue total, recent audit logs.
  - Require server-side `ADMIN` role check (`requireAdmin()`).

### Non-Scope
- Student-facing navigation elements in admin layout.

### Implementation Notes
- Keep visual aesthetic clean and structured without corporate clutter.

### Acceptance Criteria
- [ ] Admin shell renders with sidebar navigation on `/admin`.
- [ ] Non-admin users are blocked from viewing admin shell.

### Tests
- Route guard integration test for `/admin` access.

### Dependencies
- Milestone 4 (Auth & Guards) & Milestone 3 (Data Schema).

---

## Issue 43: Build course and lesson management UI

### Problem
Administrators need tools to create, edit, reorder, and manage courses, modules, lessons, free/premium access toggles, and YouTube Unlisted video IDs.

### Scope
- Build `/admin/courses` (Course List & Create/Edit modal/page):
  - Form fields: title, slug, description, level, duration, outcomes, audience, prerequisites.
- Build course module & lesson editor:
  - Drag/reorder modules and lessons sequence.
  - Toggle lesson access type (`FREE` / `PREMIUM`).
  - Input lesson YouTube Unlisted video ID.

### Non-Scope
- Video file uploading directly to server (video uses YouTube Unlisted ID).

### Implementation Notes
- Re-use Server Actions for course and lesson mutations.
- Write audit log entry on creation or edit.

### Acceptance Criteria
- [ ] Admin can create/update courses, modules, and lessons.
- [ ] Free/Premium toggle and YouTube ID input save accurately in DB.

### Tests
- Integration test for course and lesson mutation Server Actions.

### Dependencies
- Issue 42 (Admin Shell).

---

## Issue 44: Build Coffee Guide and Recipe management UI

### Problem
Administrators need to create, update, and manage Coffee Guides and practical coffee-shop brewing recipes.

### Scope
- Build `/admin/content` (Guides and Recipes management):
  - Form to manage Coffee Guides (title, slug, content body, topic tags, related courses).
  - Form to manage Recipes: title, slug, coffee dose (g), water yield (g), brew time (s), grind size, water temp (°C), step-by-step instructions.

### Non-Scope
- Complex rich-text WYSIWYG editor (Markdown textarea is sufficient for MVP).

### Implementation Notes
- Validate positive numeric values for recipe dose, yield, and brew time.

### Acceptance Criteria
- [ ] Admin can create and update guides and recipes with brewing parameters.
- [ ] Form validations catch missing or negative numbers.

### Tests
- Unit test for recipe creation Server Action schema validation.

### Dependencies
- Issue 42 (Admin Shell).

---

## Issue 45: Build learning hub curation UI

### Problem
Administrators need to curate which courses, free lessons, guides, and recipes are featured under each goal-based learning hub.

### Scope
- Build `/admin/hubs`:
  - Manage 5 MVP learning hubs (Espresso, Manual Brew, Latte Art, Coffee Beans, Barista Fundamentals).
  - Reorder and select featured items for each hub (`hub_content` mapping).

### Non-Scope
- Automatic AI hub tagging.

### Implementation Notes
- Manual ordering index stored in database.

### Acceptance Criteria
- [ ] Admin can select and reorder items inside learning hubs.
- [ ] Public `/belajar/[slug]` reflects admin curation changes immediately upon publish.

### Tests
- Integration test checking hub curation updates reflect in hub query service.

### Dependencies
- Issues 43-44.

---

## Issue 46: Implement content publish/archive workflow and cache revalidation

### Problem
Content must undergo explicit publication state changes (`DRAFT` -> `PUBLISHED` -> `ARCHIVED`) and trigger Next.js cache revalidation to update public pages.

### Scope
- Implement publish/archive actions across courses, guides, and recipes:
  - State transitions: `DRAFT`, `PUBLISHED`, `ARCHIVED`.
  - Prefer archive over hard deletion (PRD rule: Prefer archive over hard delete).
  - Call `revalidatePath()` and `revalidateTag()` for affected public routes (`/`, `/courses`, `/guides`, `/recipes`, `/belajar`).

### Non-Scope
- Scheduled publication queue.

### Implementation Notes
- Draft and archived content hidden from public student queries.

### Acceptance Criteria
- [ ] Admin can publish and archive content nodes.
- [ ] Public pages update immediately post-revalidation.

### Tests
- Integration test for publish/archive workflow and path revalidation.

### Dependencies
- Issues 43-45.

---

## Issue 47: Build commerce inspection and manual membership override UI

### Problem
Administrators need visibility into Sandbox payment transactions and the capability to grant or revoke portfolio memberships manually for testing.

### Scope
- Build `/admin/transactions`:
  - Searchable transaction list (order ID, user email, amount, status, date).
- Build `/admin/memberships`:
  - List user memberships.
  - Manual action: `Revoke Membership` / `Restore Membership` (for portfolio testing).

### Non-Scope
- Refunding real money (Sandbox transactions only).

### Implementation Notes
- Revoking membership sets status to `REVOKED`. Write audit event.

### Acceptance Criteria
- [ ] Admin can inspect all Sandbox transactions with status filters.
- [ ] Admin can manually revoke or restore portfolio user membership.

### Tests
- Server Action test for membership revocation.

### Dependencies
- Issue 42 (Admin Shell) & Milestone 6 (Sandbox Payment).

---

## Issue 48: Add admin audit log viewer UI

### Problem
Administrators need to view an immutable audit trail of administrative changes for security and operational transparency.

### Scope
- Build `/admin/audit` (Audit Log Viewer):
  - Table displaying: Timestamp, Admin Email, Action, Target Type, Target ID, Payload summary, IP address.
  - Filter by action type (e.g., `PUBLISH_COURSE`, `REVOKE_MEMBERSHIP`).

### Non-Scope
- Exporting audit logs to external SIEM tools.

### Implementation Notes
- Read-only table ordered by `createdAt DESC`.

### Acceptance Criteria
- [ ] Audit viewer displays recorded admin actions cleanly.
- [ ] Filters allow sorting by action type.

### Tests
- Render test for audit log viewer table.

### Dependencies
- Issues 42-47 & Milestone 3 (Audit Schema).
