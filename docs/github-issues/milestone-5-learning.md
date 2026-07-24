# Milestone 5 — Learning

---

## Issue 27: Build course catalog and detail pages

### Problem
Students need a comprehensive course catalog to explore structured curricula and detail pages that clearly detail course outcomes, modules, lessons, and preview options.

### Scope
- Build `/courses` (Course Catalog):
  - List all published courses with level badges, duration, lesson count, and free preview count.
  - Filter by category / goal.
- Build `/courses/[slug]` (Course Detail):
  - Hero header with outcome-driven title, description, level, duration, instructor.
  - Outcomes checklist & target audience fit.
  - Curriculum accordions showing modules, lessons, and `Gratis` vs `Premium` badges.
  - Related free guides/recipes.
  - Membership CTA box.

### Non-Scope
- In-place video playback directly on course detail page (clicking lesson navigates to player).

### Implementation Notes
- Use Indonesian copy (`Materi yang akan dipelajari`, `Untuk siapa course ini`).
- Handle published state filter (draft courses visible only to Admin).

### Acceptance Criteria
- [ ] `/courses` lists published courses with correct metadata.
- [ ] `/courses/[slug]` displays curriculum, free preview labels, and related content.

### Tests
- Render test verifying course detail components and slug lookup.

### Dependencies
- Milestone 2 (Marketing UI) & Milestone 3 (Data Schema).

---

## Issue 28: Build goal-based learning hubs pages

### Problem
Learners want content organized around practical brewing goals (Espresso, Manual Brew, Latte Art, Coffee Beans, Barista Fundamentals) rather than fragmented format lists.

### Scope
- Build `/belajar` (Learning Hub Index):
  - Grid of all 5 MVP hubs with descriptions and goal icons.
- Build `/belajar/[slug]` (Learning Hub Detail):
  - Hub header & intro video/summary.
  - Curated course list for this goal.
  - Curated free lessons, guides, and practical recipes.
  - Recommended next action CTA.

### Non-Scope
- Algorithmic content recommendations (curation is manual per PRD FR-02).

### Implementation Notes
- Display curated order defined in `hub_content` database mapping.

### Acceptance Criteria
- [ ] `/belajar` renders all 5 MVP hubs.
- [ ] `/belajar/[slug]` presents curated courses, free lessons, guides, and recipes.

### Tests
- Integration test for learning hub database fetch service.

### Dependencies
- Issue 27 (Course Catalog).

---

## Issue 29: Build Coffee Guide and Recipe pages

### Problem
Home brewers and baristas need quick-reference coffee guides (e.g. coffee roast levels, grind size charts) and practical recipes (V60 ratio, espresso extraction parameters).

### Scope
- Build `/guides` & `/guides/[slug]` (Coffee Guide Index and Detail):
  - Illustrated guides with structured sections and related course links.
- Build `/recipes` & `/recipes/[slug]` (Recipe Library Index and Detail):
  - Recipe specs: dose (grams), yield (grams), time (seconds), grind size, water temp (°C).
  - Step-by-step brew instructions with step timers/visuals.

### Non-Scope
- Community recipe user submissions.

### Implementation Notes
- Display clear coffee-shop practical parameters.

### Acceptance Criteria
- [ ] `/guides` and `/recipes` list published content nodes.
- [ ] Recipe detail displays exact dose, yield, ratio, and timing parameters.

### Tests
- Unit test for recipe parameter calculation logic (dose-to-yield ratio formatting).

### Dependencies
- Milestone 3 (Content Schema).

---

## Issue 30: Build course lesson player page

### Problem
Students need a distraction-free course player page to watch lessons, navigate curriculum modules, read lesson notes, and access related references.

### Scope
- Build `/learn/[courseSlug]/[lessonSlug]`:
  - Main video container (embedded YouTube Unlisted player for authorized lessons).
  - Lesson title, description, attached guides/recipes, and download references.
  - Sidebar curriculum module navigator with completion checkmarks.
  - Next/Previous lesson navigation buttons.
  - Completion toggle button: `Tandai Selesai` / `Selesai`.

### Non-Scope
- Custom video player control or DRM implementation (PRD specifies YouTube Unlisted).

### Implementation Notes
- If unauthorized, video container displays paywall placeholder with membership CTA instead of YouTube iframe.

### Acceptance Criteria
- [ ] Lesson player renders video, lesson content, sidebar curriculum, and completion control.
- [ ] Next / Previous buttons navigate through lesson sequence.

### Tests
- Component test for lesson player navigation and state toggles.

### Dependencies
- Issues 27-29.

---

## Issue 31: Implement server-side free/premium authorization guard for video playback

### Problem
Premium YouTube Unlisted video IDs must never be exposed in client JS or DOM unless the user has verified active premium entitlement or the lesson is marked `FREE`.

### Scope
- Implement `getLessonPlaybackData(userId, lessonId)` server service:
  - Check if lesson is `FREE` -> return YouTube ID.
  - If lesson is `PREMIUM`, check if `userId` is present and has active membership (`status == ACTIVE && endsAt > now`) -> return YouTube ID.
  - Otherwise, return `null` for video ID along with locked state paywall metadata (`MEMBERSHIP_REQUIRED`).

### Non-Scope
- Browser-side URL masking.

### Implementation Notes
- CRITICAL PRD RULE: Hidden UI is NOT authorization. Premium video ID must not exist in payload returned to unauthorized users.

### Acceptance Criteria
- [ ] Free lessons return video ID to anonymous and authenticated users.
- [ ] Premium lessons return video ID ONLY to active premium members or admins.
- [ ] Unauthorized request payload contains ZERO YouTube video ID string.

### Tests
- Unit tests verifying video ID redacting for anonymous, free, expired, active, and admin accounts.

### Dependencies
- Issue 30 (Lesson Player) & Milestone 4 (Auth & Server Guards).

---

## Issue 32: Implement student lesson progress tracking

### Problem
Authenticated students need to track completed lessons, undo completion, record their last accessed lesson, and see progress percentage on course cards.

### Scope
- Implement Server Actions for lesson progress:
  - `toggleLessonProgress(lessonId, completed)`
- Upsert row in `lesson_progress` table (`userId`, `lessonId`, `completed`, `completedAt`, `lastAccessedAt`).
- Calculate course progress percentage (`completedLessons / totalLessons * 100`).
- Store last accessed lesson for dashboard resume action.

### Non-Scope
- Automatic completion tracking based on YouTube video play duration (PRD specifies explicit user button toggle).

### Implementation Notes
- Unique constraint `(userId, lessonId)` in `lesson_progress`.

### Acceptance Criteria
- [ ] Clicking `Tandai Selesai` marks lesson complete and updates course percentage.
- [ ] Undoing completion updates progress correctly.
- [ ] Progress persists across sessions for logged-in user.

### Tests
- Integration tests verifying progress upserts and percentage calculation.

### Dependencies
- Issue 30 (Lesson Player) & Milestone 3 (Lesson Progress Schema).

---

## Issue 33: Build student dashboard page

### Problem
Returning students need a central overview dashboard to resume learning immediately, check active membership status, and view completed courses.

### Scope
- Build `/dashboard` (Student Overview):
  - Primary Hero Banner with prominent `Lanjutkan Belajar` button pointing to last accessed lesson.
  - Active courses in progress with progress bar.
  - Membership status card (Free Learner / Premium Active until [date] / Expired).
- Build `/dashboard/courses` (My Courses list).
- Build `/dashboard/membership` (Membership summary & billing transaction link).

### Non-Scope
- Corporate admin panel styling (must adhere to `Playful Coffee Learning UI`).

### Implementation Notes
- The dominant CTA on `/dashboard` MUST be `Lanjutkan belajar`.

### Acceptance Criteria
- [ ] `/dashboard` displays last accessed lesson with `Lanjutkan Belajar` CTA.
- [ ] Shows active membership status and expiration date clearly.
- [ ] Layout matches playful student overview direction.

### Tests
- E2E test logging in as active student and verifying `Lanjutkan Belajar` routing.

### Dependencies
- Issues 30-32.
