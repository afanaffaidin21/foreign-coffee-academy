# Milestone 2 — Marketing UI

---

## Issue 7: Build announcement and responsive header

### Problem
Visitors need immediate context about the platform and a clean, responsive navigation header adhering to the `Playful Coffee Learning UI` brand direction.

### Scope
- Build announcement banner (e.g. Sandbox mode indicator / learning prompt).
- Build responsive header (`src/components/shared/Header.tsx`):
  - Brand logo using lowercase rounded typography (`foreign coffee academy`).
  - Navigation links (`/belajar`, `/courses`, `/guides`, `/recipes`, `/about`, `/membership`).
  - Action buttons (`Login`, `Mulai Belajar`).
  - Mobile drawer/hamburger menu.

### Non-Scope
- Complex user session state sync (handled in Auth milestone).
- Rejected editorial logos or formal emblems.

### Implementation Notes
- Follow rounded design tokens (`rounded-xl`, soft borders).
- Language: Bahasa Indonesia for user copy (`Mulai Belajar`, `Masuk`).

### Acceptance Criteria
- [ ] Header sticky or top-positioned with responsive desktop and mobile drawer views.
- [ ] Nav links route to specified application paths.
- [ ] Announcement bar renders at top of viewport.

### Tests
- Component test verifying mobile drawer opens/closes and header navigation links render.

### Dependencies
- Milestone 1 (Foundation & Design Tokens).

---

## Issue 8: Build playful homepage hero

### Problem
The homepage hero must immediately convey the platform's value proposition ("Belajar kopi menjadi lebih mudah, terstruktur, menyenangkan, dan langsung bisa dipraktikkan") with a playful, welcoming visual style.

### Scope
- Implement hero section on `/`:
  - Main headline (rounded font, warm playful tone).
  - Subtitle highlighting Indonesian home brewers and beginner baristas context.
  - Primary CTA button: `Mulai dari materi gratis` linking to free content.
  - Secondary CTA: `Lihat Alur Belajar`.
  - Organic coffee visual / soft rounded hero illustration card.

### Non-Scope
- Exaggerated motivational or sales copy.
- Pricing details inside the hero section (pricing belongs lower in FR-01 order).

### Implementation Notes
- Hero CTA must lead directly to free lesson/goal activation.
- Use soft-bento styling and rounded visual elements.

### Acceptance Criteria
- [ ] Hero headline and CTAs render as specified.
- [ ] Primary CTA `Mulai dari materi gratis` scrolls or navigates to free learning content.
- [ ] Layout is fully responsive on mobile, tablet, and desktop screens.

### Tests
- Snapshot or DOM test verifying hero CTA presence and correct copy.

### Dependencies
- Issue 7 (Announcement and Header).

---

## Issue 9: Build soft-bento learning goals section

### Problem
Users need a goal-oriented way to navigate content (Espresso, Manual Brew, Latte Art, Coffee Beans, Barista Fundamentals) rather than just browsing random videos.

### Scope
- Implement learning goals bento grid section on homepage (`FR-01` step 3):
  - Goal cards: Espresso, Manual Brew, Latte Art, Coffee Beans, Barista Fundamentals.
  - Interactive selection state (`learning_goal_selected` event hook).
  - Soft-bento card styling with subtle rounded corners and category color accents.

### Non-Scope
- Dynamic backend filter API (UI state and hardcoded/seeded goal categories for MVP).

### Implementation Notes
- Visual formula: 20% Soft Bento with category accent colors.
- Interactive hover effects and clear action cues.

### Acceptance Criteria
- [ ] 5 MVP learning goal cards render with titles and descriptions.
- [ ] Clicking a goal filters or navigates to corresponding hub `/belajar/[slug]`.
- [ ] Responsive bento grid layout adapts from single column (mobile) to multi-column grid.

### Tests
- Unit test for goal selector card click interactions.

### Dependencies
- Issue 8 (Homepage Hero).

---

## Issue 10: Build beginner starter path section

### Problem
Beginner home brewers need a structured step-by-step path to remove confusion on where to start brewing.

### Scope
- Implement beginner starter path section on homepage (`FR-01` step 4):
  - Step 1: Understand Coffee Beans & Extraction basics.
  - Step 2: Choose equipment & practice manual brew.
  - Step 3: Dial in espresso and milk texturing.
  - Step 4: Refine consistency and coffee-shop workflows.
  - Action link to starter guide/course.

### Non-Scope
- Interactive quiz engine.

### Implementation Notes
- Keep visual steps clean with step numbers, playful indicators, and short Indonesian copy.

### Acceptance Criteria
- [ ] Starter path steps render in sequential sequence.
- [ ] Each step contains clear outcome-oriented text.
- [ ] Responsive horizontal or stacked step card presentation.

### Tests
- Render test verifying all 4 path steps are displayed.

### Dependencies
- Issue 9 (Learning Goals).

---

## Issue 11: Build free-lesson cards section

### Problem
To build user trust and activate visitors quickly, 3 featured free lessons must be displayed prominently on the homepage before any paywall.

### Scope
- Implement free lessons section on homepage (`FR-01` step 5):
  - Display 3 free lesson cards with badge `Gratis`.
  - Show lesson duration, course title, and outcome description.
  - CTA button: `Tonton Lesson Gratis`.

### Non-Scope
- Direct embedded video player on homepage (clicking opens lesson player route `/learn/[courseSlug]/[lessonSlug]`).

### Implementation Notes
- Free lesson access must not require prior login to view.
- Cards must use soft rounded borders and clear visual indicators for free access.

### Acceptance Criteria
- [ ] Exactly 3 free lesson cards display with title, duration, and `Gratis` badge.
- [ ] Clicking a card routes to the lesson player route.

### Tests
- Test verifying free-lesson cards render correct labels and valid href links.

### Dependencies
- Issue 10 (Starter Path).

---

## Issue 12: Build practice proof section

### Problem
Learners need confidence that the course content is grounded in real coffee shop workflows, practical brewing recipes, and real-world techniques.

### Scope
- Implement practice proof section on homepage (`FR-01` step 6):
  - Real workflow highlights (grind size adjustment, dose-to-yield ratio, milk texturing).
  - Practice context notes from Foreign Coffee.
  - Visual callouts without fake testimonials, fake student counts, or fake claims.

### Non-Scope
- Fake reviews, star ratings, or inflated student counters (explicitly forbidden by PRD).

### Implementation Notes
- Maintain total authenticity and credibility. Focus on practical barista workflows.

### Acceptance Criteria
- [ ] Practice proof section renders after free lessons.
- [ ] Contains zero fake claims, star ratings, or fake student numbers.

### Tests
- Verify text content matches approved non-sales brand voice.

### Dependencies
- Issue 11 (Free-Lesson Cards).

---

## Issue 13: Build course cards section

### Problem
Visitors who want a comprehensive structured curriculum need to view featured courses on the homepage.

### Scope
- Implement featured courses section on homepage (`FR-01` step 7):
  - 3 featured course cards (Barista Fundamentals, Espresso Foundations, Manual Brew Essentials).
  - Show course level, module/lesson count, total duration, and free preview indicator.
  - Link to `/courses` and `/courses/[slug]`.

### Non-Scope
- Course purchase checkout modal directly on homepage card.

### Implementation Notes
- Use playful category visual cards with clear tags (Beginner, Intermediate).

### Acceptance Criteria
- [ ] 3 initial featured courses render with metadata and level tags.
- [ ] Cards link to course detail page `/courses/[slug]`.

### Tests
- Render test verifying course cards output proper slug links.

### Dependencies
- Issue 12 (Practice Proof).

---

## Issue 14: Build founder, membership teaser, CTA, and footer sections

### Problem
The homepage requires context about the founder/brand story, a membership teaser (placed after free content and practice proof), final free-learning CTA, and footer navigation.

### Scope
- Implement founder story section (`FR-01` step 8).
- Implement membership teaser section (`FR-01` step 9 - Rp49.000/bln Sandbox notice).
- Implement final free-learning CTA (`FR-01` step 10).
- Implement footer (`FR-01` step 11) with navigation, copyright, and Sandbox disclaimer.

### Non-Scope
- Direct checkout execution from footer.

### Implementation Notes
- PRD Rule: Pricing must NOT appear before free lessons and practice proof.
- Footer must explicitly note Midtrans Sandbox demonstration status.

### Acceptance Criteria
- [ ] Section order strictly follows FR-01 (Header -> Hero -> Goals -> Starter Path -> Free Lessons -> Practice Proof -> Courses -> Founder -> Membership Teaser -> Final CTA -> Footer).
- [ ] Footer contains Sandbox portfolio disclaimer.

### Tests
- Verify section rendering hierarchy matches FR-01 specifications.

### Dependencies
- Issues 7-13.

---

## Issue 15: Run responsive and accessibility QA for marketing pages

### Problem
Marketing UI must be fully accessible and work seamlessly across mobile, tablet, and desktop devices without horizontal scrolling or contrast issues.

### Scope
- Audit all homepage and public navigation components for:
  - Mobile breakpoint layout (320px - 768px).
  - Touch target sizing (minimum 44x44px for primary buttons).
  - Semantic HTML (`header`, `main`, `footer`, `h1`, `h2`, `nav`).
  - Keyboard focus indicators and color contrast ratios (WCAG AA).
  - Alt tags for images and aria-labels for icon buttons.

### Non-Scope
- Authenticated dashboard QA (covered in Milestone 5/8).

### Implementation Notes
- Use axe-core or Lighthouse accessibility audit tools.

### Acceptance Criteria
- [ ] Zero critical accessibility violations on homepage.
- [ ] Responsive layout passes without visual overflow at 375px viewport width.

### Tests
- Add automated Playwright / axe accessibility test for `/`.

### Dependencies
- Issues 7-14.
