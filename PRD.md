# Foreign Coffee Academy — Product Requirements Document

> AI-friendly source of truth for product design, GitHub Issues, and implementation.

| Field | Value |
|---|---|
| Product | Foreign Coffee Academy |
| Document version | 1.1 |
| Status | Portfolio MVP scope locked |
| Product type | Coffee learning platform |
| Commercial status | Demonstration project; not a live commercial service |
| Primary language | Indonesian (`id-ID`) |
| Currency | IDR |
| Payment environment | Midtrans Sandbox only |
| Target framework | Next.js App Router + TypeScript |
| Deployment target | Vercel Hobby |
| Visual direction | Playful Coffee Learning UI |

---

## 0. Version 1.1 Change Log

Version 1.1 changes only the product's visual expression and brand personality.
Business scope, user flows, data model, authorization, payment rules, and
technical architecture remain unchanged.

### Approved changes

- Replaced `Warm Editorial Coffee Lab` with `Playful Coffee Learning UI`.
- Replaced serif-led typography with rounded sans-serif typography.
- Replaced editorial card treatment with soft bento components.
- Increased component radii and introduced friendlier shapes.
- Added playful learning-category colors and restrained handcrafted details.
- Updated photography and illustration direction.
- Updated logo rules to a lowercase, rounded, typography-first identity.
- Updated dashboard guidance so it does not resemble a corporate admin panel.
- Marked the previous editorial and complex monogram directions as rejected.

### Rejected directions

The following must not be used as visual references:

- `Warm Editorial Coffee Lab`;
- luxury/editorial serif branding;
- stacked or overlapping `FCA` monograms;
- formal academic emblems;
- fashion-style wordmarks;
- full dark coffee-shop themes;
- generic coffee bean, steam, or café badge logos.

---

## 1. Instructions for AI Coding Agents

This file is the primary implementation source of truth.

When implementing an issue:

1. Read the complete issue and relevant sections of this document.
2. Do not invent features, routes, claims, data fields, or integrations outside
   the MVP.
3. Prefer the simplest implementation satisfying the acceptance criteria.
4. Preserve server-side authorization. Hidden UI is not authorization.
5. Never trust price, role, ownership, membership, or payment status received
   from the browser.
6. Never expose premium YouTube video IDs before entitlement succeeds.
7. Treat Midtrans browser callbacks as UX signals only. Only a verified webhook
   may grant premium entitlement.
8. Use Indonesian user-facing copy.
9. Do not create fake testimonials, ratings, student counts, certifications, or
   business claims.
10. Add tests for business-critical changes.
11. Do not add dependencies without a concrete need.
12. Do not refactor unrelated code while completing a scoped issue.
13. If an issue conflicts with this PRD, stop and surface the conflict.
14. Do not reintroduce the rejected editorial visual direction.
15. Use design tokens instead of hard-coded colors and radii.

### Definition of a good implementation

- Typed.
- Accessible.
- Responsive.
- Friendly without becoming childish.
- Secure at the server boundary.
- Testable.
- Uses realistic deterministic seed data.
- Covers loading, empty, error, success, locked, active, and expired states.

---

## 2. Product Summary

Foreign Coffee Academy is an Indonesian coffee learning platform for home
brewers and beginner baristas.

It combines:

- structured video courses;
- selected free lessons;
- Coffee Guide content;
- practical recipes;
- goal-based learning hubs;
- learning progress;
- freemium membership;
- portfolio-only Midtrans Sandbox checkout;
- founder and Foreign Coffee practice context.

The product must feel like a friendly home for learning coffee, not a store that
sells disconnected videos and not a formal academy.

### Positioning

> Platform belajar kopi berbahasa Indonesia yang menghubungkan teori, praktik,
> dan pengalaman coffee shop nyata melalui course, Coffee Guide, recipe, dan
> learning path yang saling terhubung.

### Brand promise

> Belajar kopi menjadi lebih mudah, terstruktur, menyenangkan, dan langsung
> bisa dipraktikkan.

### Core differentiators

1. Content is organized by learning goals, not only content format.
2. Lessons and recipes use practical coffee-shop workflows.
3. The experience welcomes beginners without talking down to them.
4. Users experience value through free lessons before seeing a paywall.
5. The product uses Bahasa Indonesia and Indonesian coffee context.

---

## 3. Product Objectives

### Primary objective

Demonstrate a credible end-to-end learning product:

```text
Discover
→ Choose a learning goal
→ Try a free lesson
→ View membership
→ Complete Sandbox checkout
→ Receive entitlement
→ Continue learning
```

### Portfolio objectives

- Demonstrate product thinking beyond a landing page.
- Demonstrate content architecture and learning UX.
- Demonstrate authentication and role-based access.
- Demonstrate server-side premium entitlement.
- Demonstrate an idempotent payment webhook.
- Demonstrate a limited CMS workflow.
- Demonstrate responsive and accessible UI.

### North-star interaction

`Start or continue a meaningful lesson`

### Supporting events

- `learning_goal_selected`
- `free_lesson_started`
- `free_lesson_completed`
- `membership_viewed`
- `sandbox_checkout_started`
- `sandbox_payment_verified`
- `continue_learning_clicked`
- `lesson_completed`

Time on page is not a primary success metric.

---

## 4. Target Users

### 4.1 Home Brewer

**Situation**

- Makes coffee at home.
- Owns basic brewing equipment.
- Learns from scattered videos and social posts.

**Pain**

- Results are inconsistent.
- Does not know which variable to change.
- Does not know where to begin.

**Goal**

> Membuat kopi di rumah yang enak dan konsisten seperti di coffee shop.

### 4.2 Beginner Barista

**Situation**

- Recently started working or is preparing for a barista role.
- Understands isolated techniques but lacks a complete workflow.

**Pain**

- Has limited structured practice.
- Does not understand extraction troubleshooting.
- Wants to improve employable skills.

**Goal**

> Menguasai fondasi barista dan meningkatkan skill secara terstruktur.

### 4.3 Secondary audiences

- Coffee enthusiasts.
- Students learning a new skill.
- Small coffee shop owners seeking basic staff-training references.
- Coffee content creators.

Secondary audiences must not expand MVP scope.

---

## 5. Brand Personality and Voice

### 5.1 Personality

| Trait | Meaning |
|---|---|
| Friendly | Welcoming and easy to understand |
| Encouraging | Helps users take the next practical step |
| Practical | Focused on repeatable real-world actions |
| Curious | Explains why a technique works |
| Playful | Light and expressive without becoming childish |
| Credible | Honest about evidence, limits, and practice |

### 5.2 Voice model

> Seperti teman barista yang lebih berpengalaman dan senang menjelaskan, bukan
> dosen, coffee snob, atau sales course.

### 5.3 Writing rules

- Use short, direct sentences.
- Explain technical terminology in familiar language.
- Lead with user outcomes.
- Use verbs in CTA labels.
- Encourage experimentation without promising instant mastery.
- Never shame users for brewing mistakes.
- Avoid exaggerated motivational language.

### 5.4 Example vocabulary

Prefer:

- `Mulai belajar`
- `Coba lesson gratis`
- `Lanjutkan belajar`
- `Kenapa kopi terasa pahit?`
- `Yuk, perbaiki seduhan berikutnya`

Avoid:

- `Master the art of coffee`
- `Unlock your true potential`
- `Kursus eksklusif kelas dunia`
- `Hanya untuk barista serius`
- `Kamu salah menyeduh`

---

## 6. User Roles and Account States

### Roles

| Role | Description |
|---|---|
| `STUDENT` | Public learner account |
| `ADMIN` | Content and product administrator |

### Student entitlement states

| State | Meaning |
|---|---|
| Anonymous | Not authenticated |
| Free | Authenticated without active premium membership |
| Premium active | `ACTIVE` and `endsAt > now` |
| Premium expired | Membership exists but `endsAt <= now` |
| Revoked | Membership manually revoked |

### Deterministic portfolio accounts

Seed at least:

- free student;
- premium active student;
- expired student;
- admin.

Public demo accounts must be read-only for sensitive operations. Admin
credentials must not be shown publicly.

---

## 7. MVP Scope

### P0 — Required

- Responsive marketing homepage.
- Course catalog and detail.
- Learning hubs.
- Free and premium lesson access.
- Authentication.
- Student dashboard.
- Course player.
- Lesson progress.
- Membership comparison.
- Midtrans Snap Sandbox checkout.
- Verified Midtrans webhook.
- Transaction-status UI.
- Coffee Guide.
- Recipe library.
- Founder/About page.
- Minimal admin CMS.
- Deterministic seeds.
- SEO metadata.
- Basic analytics and error monitoring.

### P1 — After the core loop works

- Search.
- Related-content management improvements.
- Coupon simulation.
- Transactional email.
- Additional content filters.
- Improved admin ordering.

### Explicitly excluded

- Production payments.
- Automatic recurring billing.
- Production refund processing.
- Community/forum.
- Quiz.
- Certificate.
- Gamification.
- Leaderboard.
- Mobile application.
- AI assistant.
- Marketplace.
- Live workshop booking.
- Reviews and ratings.
- Affiliate commerce.
- Custom video hosting or DRM.
- Multi-instructor marketplace.
- Full dark mode.

Do not implement an excluded feature without changing this PRD first.

---

## 8. Core User Flows

### 8.1 Visitor activation

```text
Homepage
→ Choose learning goal
→ Open learning hub/course
→ Open free lesson
→ Watch and practice
→ Continue to related content or membership
```

Requirements:

- A free lesson is reachable within three meaningful interactions.
- Free playback does not require login.
- A non-paying user always receives a relevant free next step.

### 8.2 Premium conversion demo

```text
Locked lesson
→ Membership page
→ Login
→ Choose plan
→ Confirm Sandbox notice
→ Open Midtrans Snap
→ Webhook verified
→ Membership activated
→ Premium lesson unlocked
```

Requirements:

- Payment is visibly identified as a Sandbox demonstration.
- Browser callbacks never grant entitlement.
- The UI may poll internal transaction status after Snap closes.

### 8.3 Returning student

```text
Login → Dashboard → Continue learning → Complete lesson → Next lesson
```

The dashboard's dominant action is `Lanjutkan belajar`.

### 8.4 Admin publishing

```text
Admin login
→ Create draft
→ Add content
→ Validate required fields
→ Publish
→ Revalidate public pages
→ Write audit event
```

---

## 9. Routes

### Public

| Route | Purpose |
|---|---|
| `/` | Homepage |
| `/belajar` | Learning-hub index |
| `/belajar/[slug]` | Goal-based learning hub |
| `/courses` | Published course catalog |
| `/courses/[slug]` | Course detail |
| `/guides` | Coffee Guide index |
| `/guides/[slug]` | Guide detail |
| `/recipes` | Recipe library |
| `/recipes/[slug]` | Recipe detail |
| `/about` | Founder and Foreign Coffee |
| `/membership` | Free vs premium comparison |

### Authentication and learning

| Route | Purpose |
|---|---|
| `/login` | Login and demo-account options |
| `/register` | Student registration |
| `/dashboard` | Student overview |
| `/dashboard/courses` | Student course list |
| `/dashboard/membership` | Membership and transactions |
| `/learn/[courseSlug]/[lessonSlug]` | Course player |

### Admin

| Route | Purpose |
|---|---|
| `/admin` | Admin overview |
| `/admin/courses` | Course management |
| `/admin/content` | Guide/recipe management |
| `/admin/hubs` | Learning-hub curation |
| `/admin/memberships` | Membership management |
| `/admin/transactions` | Sandbox transaction inspection |

### HTTP boundaries

| Method | Route | Purpose |
|---|---|---|
| `GET/POST` | `/api/auth/[...nextauth]` | Auth.js |
| `POST` | `/api/payments/midtrans/create` | Create transaction |
| `POST` | `/api/payments/midtrans/webhook` | Provider notification |
| `GET` | `/api/payments/[orderId]/status` | Owner/admin status |
| `GET` | `/api/health` | Minimal health check |
| `GET/POST` | `/api/uploadthing` | Admin image upload |

Do not build a complete internal REST API. Server Components read through
services; first-party mutations use Server Actions.

---

## 10. Functional Requirements

### FR-01 Homepage

Homepage sections, in order:

1. Header.
2. Hero.
3. Learning-goal selector.
4. Beginner starter path.
5. Three free lessons.
6. Practice proof.
7. Three featured courses.
8. Founder story.
9. Membership teaser.
10. Final free-learning CTA.
11. Footer.

Primary hero CTA: `Mulai dari materi gratis`.

Pricing must not appear before free lessons and practice proof.

### FR-02 Learning hubs

MVP hubs:

- Espresso.
- Manual Brew.
- Latte Art.
- Coffee Beans.
- Barista Fundamentals.

A hub may curate introduction, courses, free lessons, guides, recipes, and
related resources. Ordering is manual, not algorithmic.

### FR-03 Courses

Initial courses:

1. Barista Fundamentals.
2. Espresso Foundations.
3. Manual Brew Essentials.

Course detail includes:

- outcome-driven title;
- description;
- level;
- duration;
- instructor;
- outcomes;
- curriculum;
- free-preview labels;
- audience fit;
- requirements;
- related free content;
- membership CTA.

### FR-04 Lesson access

Access types:

- `FREE`
- `PREMIUM`

Rules:

- Published free lessons are viewable anonymously.
- Premium lessons require authenticated active entitlement.
- Draft lessons require explicit admin preview.
- Unauthorized responses must not contain premium YouTube IDs.
- YouTube Unlisted is a portfolio compromise and is not DRM.

### FR-05 Lesson progress

Authenticated users can:

- mark accessible lessons complete;
- undo completion;
- record the last accessed lesson;
- continue from the dashboard.

Progress uses explicit completion, not YouTube watch duration.

### FR-06 Membership

| Plan | Portfolio price | Duration |
|---|---:|---:|
| Monthly | Rp49.000 | 1 month |
| Yearly | Rp399.000 | 1 year |

Entitlement:

```text
active = membership.status == ACTIVE && membership.endsAt > now
```

No expiration cron is required.

Extension:

```text
base = max(now, currentMembership.endsAt)
newEndsAt = base + plan duration
```

### FR-07 Midtrans Sandbox

The browser sends only:

```json
{
  "planSlug": "monthly"
}
```

The server must:

1. require an authenticated mutable account;
2. load plan and amount from the database;
3. create an internal transaction;
4. call Midtrans Snap Sandbox;
5. return an owner-scoped order ID and Snap token;
6. never log the Snap token.

Webhook signature:

```text
SHA512(order_id + status_code + gross_amount + MIDTRANS_SERVER_KEY)
```

The webhook verifies:

- schema;
- signature using timing-safe comparison;
- known order;
- Sandbox environment;
- amount;
- allowed state transition.

Status mapping:

| Provider | Condition | Internal |
|---|---|---|
| `capture` | `fraud_status=accept` | `PAID` |
| `settlement` | — | `PAID` |
| `pending` | — | `PENDING` |
| `deny` | — | `FAILED` |
| `cancel` | — | `CANCELLED` |
| `expire` | — | `EXPIRED` |
| `refund` / `partial_refund` | — | `REFUNDED` |

Entitlement is applied only when status becomes `PAID` and
`entitlementAppliedAt IS NULL`. The entitlement and marker update occur in one
database transaction. Duplicate webhooks do not extend membership twice.

### FR-08 Authentication

Use Auth.js.

```ts
type AppSessionUser = {
  id: string
  email: string
  name: string | null
  role: "STUDENT" | "ADMIN"
}
```

Do not store membership permanently in the session. Query entitlement from the
database.

### FR-09 Admin CMS

Admin can:

- create and update courses;
- manage modules and lessons;
- reorder modules and lessons;
- set free/premium access;
- set YouTube IDs;
- manage guides and recipes;
- curate learning hubs;
- publish/archive content;
- manage homepage selections;
- inspect transactions;
- revoke/restore portfolio memberships;
- inspect audit history.

Admin mutations require server-side `ADMIN`, validation, transactional writes
when necessary, audit events, and content revalidation.

Prefer archive over hard delete.

### FR-10 Content relationships

Support manually curated relations:

- course → lesson;
- lesson → guide;
- lesson → recipe;
- guide → course;
- recipe → course;
- content → topic;
- learning hub → content.

Do not build AI recommendations.

---

## 11. Data Model

Use Neon PostgreSQL and Drizzle ORM.

Conventions:

- UUID primary keys.
- `timestamptz`.
- Integer IDR amounts.
- Unique slugs where appropriate.
- Explicit enums.
- Foreign keys and indexes.

### Identity

- `users`
- `accounts`
- `sessions`
- `verification_tokens`

User roles: `STUDENT | ADMIN`.

### Commerce

#### `membership_plans`

- `id`
- `slug`
- `name`
- `priceIdr`
- `durationDays`
- `isActive`
- timestamps

#### `memberships`

- `id`
- `userId`
- `planId`
- `status`: `ACTIVE | REVOKED`
- `startsAt`
- `endsAt`
- timestamps

One current membership row per user for MVP.

#### `transactions`

- `id`
- `orderId`
- `userId`
- `planId`
- `amountIdr`
- `environment`: `SANDBOX`
- `status`
- provider references
- protected Snap-token reference
- `entitlementAppliedAt`
- timestamps

Statuses:

```text
CREATED
PENDING
PAID
FAILED
CANCELLED
EXPIRED
REFUNDED
```

### Content and learning

- `content_nodes`
- `courses`
- `modules`
- `lessons`
- `lesson_progress`
- `topics`
- `content_topics`
- `content_relations`
- `learning_hubs`
- `hub_content`
- `admin_audit_logs`

Publication states:

```text
DRAFT
PUBLISHED
ARCHIVED
```

Lesson access:

```text
FREE
PREMIUM
```

Unique progress key: `(userId, lessonId)`.

---

## 12. Authorization Matrix

| Capability | Visitor | Free | Premium active | Admin |
|---|---:|---:|---:|---:|
| Published marketing content | Yes | Yes | Yes | Yes |
| Free lesson | Yes | Yes | Yes | Yes |
| Premium YouTube ID | No | No | Yes | Yes |
| Save accessible progress | No | Yes | Yes | Yes |
| Own dashboard | No | Yes | Yes | Yes |
| Own transaction | No | Yes | Yes | Yes |
| Another user's transaction | No | No | No | Yes |
| Manage content | No | No | No | Yes |
| Publish/archive | No | No | No | Yes |
| Revoke membership | No | No | No | Yes |

Server policies:

```ts
requireUser()
requireAdmin()
requireMutableAccount()
requirePremiumEntitlement(userId)
```

---

## 13. Application Architecture

Use a modular monolith.

```text
src/
├── app/
│   ├── (marketing)/
│   ├── (auth)/
│   ├── dashboard/
│   ├── learn/
│   ├── admin/
│   └── api/
├── modules/
│   ├── auth/
│   ├── content/
│   ├── learning/
│   ├── membership/
│   ├── payments/
│   └── admin/
├── db/
│   ├── schema/
│   ├── client.ts
│   └── seed/
├── components/
│   ├── ui/
│   └── shared/
├── lib/
└── styles/
```

Dependency direction:

```text
Page / Route / Action
→ application service
→ domain policy
→ repository / provider adapter
→ database / external provider
```

Client Components do not import database code or server secrets.

---

## 14. Error Contract

```ts
type ActionResult<T> =
  | { ok: true; data: T }
  | {
      ok: false
      error: {
        code: AppErrorCode
        message: string
        fieldErrors?: Record<string, string[]>
        requestId?: string
      }
    }
```

Core error codes:

```text
VALIDATION_ERROR
AUTH_REQUIRED
FORBIDDEN
DEMO_ACCOUNT_READ_ONLY
MEMBERSHIP_REQUIRED
CONTENT_NOT_FOUND
CONTENT_NOT_PUBLISHED
PLAN_NOT_FOUND
PLAN_INACTIVE
PAYMENT_NOT_FOUND
PAYMENT_STATE_INVALID
PAYMENT_PROVIDER_ERROR
WEBHOOK_INVALID_SIGNATURE
WEBHOOK_AMOUNT_MISMATCH
RATE_LIMITED
INTERNAL_ERROR
```

---

## 15. Technology Stack

| Concern | Selection |
|---|---|
| Framework | Next.js App Router |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI primitives | shadcn/ui |
| Icons | Lucide React |
| Database | Neon PostgreSQL Free |
| ORM | Drizzle ORM |
| Authentication | Auth.js |
| Payment | Midtrans Snap Sandbox |
| Video | YouTube Unlisted |
| Upload | UploadThing Free |
| Email | Resend Free |
| Analytics | PostHog Free |
| Monitoring | Sentry Developer |
| Deployment | Vercel Hobby |
| Source control | GitHub |

The portfolio must operate within free tiers. Midtrans production mode is
disabled.

---

## 16. Environment Variables

Provide `.env.example` without secrets.

```dotenv
NEXT_PUBLIC_APP_URL=
APP_ENV=development

DATABASE_URL=
DATABASE_URL_UNPOOLED=

AUTH_SECRET=

MIDTRANS_IS_PRODUCTION=false
MIDTRANS_SERVER_KEY=
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=
MIDTRANS_API_BASE_URL=https://api.sandbox.midtrans.com
NEXT_PUBLIC_MIDTRANS_SNAP_SCRIPT_URL=https://app.sandbox.midtrans.com/snap/snap.js

RESEND_API_KEY=
EMAIL_FROM=
UPLOADTHING_TOKEN=

NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=

NEXT_PUBLIC_SENTRY_DSN=
SENTRY_ORG=
SENTRY_PROJECT=
SENTRY_AUTH_TOKEN=

DEMO_ACCOUNT_PASSWORD=
```

The portfolio release must refuse to start if
`MIDTRANS_IS_PRODUCTION=true`.

---

## 17. Approved Visual Direction

### 17.1 Direction name

> **Playful Coffee Learning UI**

### 17.2 Visual formula

```text
60% Playful Minimalism
20% Soft Bento
15% Organic Coffee Visuals
5% Handcrafted Details
```

### 17.3 Desired feeling

The interface should feel:

- fun;
- simple;
- warm;
- encouraging;
- easy to begin;
- modern;
- credible;
- human.

It should feel like a friendly digital learning companion connected to an
independent coffee shop.

It must not feel like:

- a formal university;
- a luxury coffee publication;
- a corporate LMS;
- a childish learning game;
- a dark premium café website;
- a generic SaaS template.

### 17.4 Design principles

1. **Friendly first:** reduce intimidation for beginners.
2. **Simple hierarchy:** one primary action per viewport.
3. **Goal before format:** show what users can learn before content taxonomy.
4. **Value before paywall:** show free learning before membership.
5. **Playful with restraint:** accents support comprehension rather than create
   noise.
6. **Modular but not boxed everywhere:** use bento cards for grouped choices,
   not every paragraph.
7. **Mobile-first:** cards, navigation, and player states must work on small
   screens.

---

## 18. Design Tokens

### 18.1 Colors

```css
:root {
  --color-espresso: #2b1d17;
  --color-cream: #fff9f1;
  --color-orange: #f26a3d;
  --color-orange-dark: #d9542e;
  --color-sage: #8fa882;
  --color-yellow: #f4c95d;
  --color-soft-blue: #a8d8e8;
  --color-border: #eadfd3;
  --color-surface: #ffffff;
  --color-muted: #72645d;

  --color-success: #4f7d57;
  --color-warning: #a36a17;
  --color-danger: #a43d3d;
  --color-info: #39728d;
}
```

### 18.2 Usage ratio

```text
60% cream and white
20% espresso
10% orange
5% sage
3% yellow
2% soft blue
```

Accent colors identify learning categories and hierarchy. They must not produce
a rainbow interface.

### 18.3 Category accents

| Category | Accent |
|---|---|
| Espresso | Orange |
| Manual Brew | Soft blue |
| Latte Art | Yellow |
| Coffee Beans | Sage |
| Barista Fundamentals | Orange + cream |

Text contrast must meet WCAG AA. Status is never communicated by color alone.

### 18.4 Typography

Primary family:

```text
Plus Jakarta Sans
```

Fallback:

```text
Manrope, system-ui, sans-serif
```

Use one primary family across headlines, body text, navigation, forms, and
dashboard UI. Weight and scale create hierarchy.

Do not use Newsreader or another high-contrast luxury serif as the primary
website typeface.

Recommended scale:

| Token | Mobile | Desktop | Weight |
|---|---:|---:|---:|
| Display | 44px | 68px | 700–800 |
| H1 | 40px | 60px | 700–800 |
| H2 | 32px | 46px | 700 |
| H3 | 24px | 30px | 700 |
| Body large | 18px | 19px | 400–500 |
| Body | 16px | 16px | 400–500 |
| Small | 14px | 14px | 500 |
| Label | 13px | 13px | 600–700 |

### 18.5 Radius

```text
Button: 14px
Input: 12px
Small card: 16px
Course card: 20px
Large bento panel: 24px
Hero/feature panel: 28–32px
Badge: 999px
```

Not every component should be pill-shaped.

### 18.6 Borders and shadows

- Default cards use a warm 1px border.
- Shadows are soft, short, and low-opacity.
- Avoid floating glass panels and large blurred shadows.
- Hover may use 2–3px translation.

### 18.7 Spacing

Use a 4px base scale. Prefer generous internal padding:

- compact card: 16–20px;
- standard card: 24px;
- large bento panel: 28–40px;
- mobile section: 56–72px;
- desktop section: 88–112px.

---

## 19. Component Style

### Buttons

- Rounded rectangle, not a full pill by default.
- Primary: orange background with high-contrast text.
- Secondary: cream/white with espresso border.
- Minimum touch target: 44px.
- Labels use specific verbs.
- Loading state preserves button width.

### Inputs

- White or cream surface.
- 12px radius.
- Visible label.
- Strong focus ring.
- Helper and error text remain close to the field.

### Soft bento cards

Use bento cards for:

- learning goals;
- free lessons;
- learning paths;
- progress summary;
- course recommendations;
- recipe information.

Card rules:

- one dominant idea;
- one primary action;
- restrained accent background;
- simple icon or illustration;
- no excessive nested cards.

### Course cards

Include:

- thumbnail or simple illustration;
- category color;
- level;
- outcome-based title;
- lesson count and duration;
- free/premium state;
- progress when relevant.

Do not add ratings or bestseller badges without real data.

### Locked states

Locked content must not look punitive.

Use:

- friendly explanation;
- what the user will learn;
- membership CTA;
- related free lesson.

Avoid giant padlocks, red warnings, or guilt-based copy.

### Empty states

Every empty state includes:

- friendly title;
- one-line explanation;
- small illustration or icon;
- specific next action.

The dashboard must not resemble an enterprise admin panel.

---

## 20. Illustration and Photography

### 20.1 Illustration

Use simple flat or outlined illustrations:

- coffee tools;
- brewing ratios;
- water flow;
- grinder settings;
- milk texture;
- arrows and measurement marks;
- small drops, sparkles, and curved lines.

Illustrations may feel slightly handcrafted, but must remain clean and
consistent.

Avoid:

- detailed mascots;
- childish cartoon faces;
- generic stock icon packs;
- decoration on every surface;
- floating coffee beans.

### 20.2 Photography

Use authentic process photography:

- hands brewing;
- espresso workflow;
- grinder adjustments;
- milk steaming;
- recipe preparation;
- founder teaching;
- the actual Foreign Coffee environment when assets exist.

Treatment:

- natural warm light;
- honest colors;
- medium contrast;
- close process-oriented crops;
- rounded image containers;
- optional subtle grain.

Do not use dark brown filters, staged mug portraits, or AI-generated images as
proof of a real founder or café.

### 20.3 Photo and illustration balance

Photography provides credibility. Illustration provides fun and clarity.

Recommended:

```text
Marketing pages: 60% photography / 40% illustration
Dashboard and player: 20% photography / 80% interface and illustration
```

---

## 21. Logo Direction

### Approved characteristics

- Lowercase.
- Rounded sans-serif.
- Typography-first.
- Simple silhouette.
- Espresso primary color.
- Orange accent.
- Maximum one playful coffee or learning detail.
- Readable at 24–32px.
- Favicon must have separated, non-overlapping shapes.

Recommended wordmark structure:

```text
foreign
coffee academy
```

The `o` may reference a top-view cup or dripper if it stays readable.

### Rejected logo directions

- Overlapping `FCA`.
- Formal seal.
- Serif fashion wordmark.
- Chapter-number editorial system.
- Coffee bean or steam icon.
- Vintage café badge.
- Complex favicon.

### Production requirement

Generated raster concepts are references only. The approved logo must be
redrawn as SVG with precise geometry and kerning before final deployment.

---

## 22. Homepage Visual Requirements

The section order defined in FR-01 remains unchanged.

### Hero

- Light cream background.
- Large rounded sans-serif headline.
- Orange primary CTA.
- Authentic coffee-process visual.
- One or two playful line accents.
- No full dark hero.
- No luxury serif typography.

### Learning goals

- Soft bento cards.
- Category colors.
- Simple tool illustrations.
- Clear outcomes.
- Mobile horizontal scrolling is acceptable.

### Starter path

- A friendly visual route.
- Rounded steps or connected cards.
- Simple arrows and progress-like visual language.
- Avoid formal curriculum diagrams.

### Free lessons

- Three clear cards.
- Free badge.
- Friendly play affordance.
- Course context and duration.
- No sign-in wall before playback.

### Practice proof

- Use real process photos when available.
- A darker espresso panel is optional, not mandatory.
- Keep copy short and concrete.
- Do not invent numbers or testimonials.

### Featured courses

- Category accents.
- Consistent card height.
- Outcome-led title.
- Free-preview indicator.
- Rounded 20px cards.

### Founder

- Authentic portrait only when a factual asset exists.
- Do not fabricate credentials.
- Keep the section friendly and personal.

### Membership

- Free and premium comparison.
- Soft bento panels.
- Sandbox notice visible.
- Do not create urgency or fake discounts.

### Final CTA

- Warm orange or playful accent panel.
- One main action.
- Small illustrative motif.

---

## 23. Dashboard and Player Visual Requirements

### Dashboard

- Continue-learning card is the dominant element.
- Use a soft cream app background.
- Progress uses simple bars and explicit text.
- Membership status is clear but secondary.
- Use illustration in empty states.
- Avoid dense tables and corporate analytics charts.

### Course player

- Video remains the focus.
- Curriculum becomes a desktop sidebar and mobile drawer.
- Reading content uses a light background.
- Completion CTA is friendly and explicit.
- Premium locks show a free alternative.
- No autoplay.

---

## 24. Motion

Allowed:

- 120–180ms hover and focus transitions;
- 2–3px card lift;
- small icon bounce on direct interaction;
- accordion and drawer transitions;
- restrained section reveal;
- playful progress feedback after lesson completion.

Rejected:

- scroll hijacking;
- continuous floating objects;
- parallax everywhere;
- custom cursor;
- long page transitions;
- large spring animations on every card;
- autoplay video with sound.

Honor `prefers-reduced-motion`.

---

## 25. Accessibility

- WCAG AA contrast.
- Semantic heading hierarchy.
- Skip link.
- Visible focus.
- Keyboard-accessible navigation, drawer, accordion, dialog, and forms.
- Accessible names for icon buttons.
- Error text associated with fields.
- Status not communicated by color alone.
- Reduced-motion support.
- Meaningful image alt text.
- Decorative graphics hidden from assistive technology.
- Minimum 44×44px touch targets.
- Content usable at 200% zoom.

Playfulness must never reduce legibility or usability.

---

## 26. Non-Functional Requirements

### Performance

Targets:

- LCP below 2.5 seconds under reasonable mobile testing.
- CLS below 0.1.
- INP below 200ms.

Rules:

- Server Components by default.
- Isolated Client Components.
- Priority hero image.
- Lazy below-fold imagery.
- No YouTube embed on marketing cards.
- Optimized formats.
- Required font subsets only.

### Security

- Validate inputs with Zod.
- Hash credentials securely.
- Apply server-side authorization.
- Rate-limit login and payment creation.
- Redact secrets and tokens.
- Protect premium YouTube IDs.
- Use timing-safe signature comparison.
- Audit admin mutations.

### Reliability

- Use database transactions for entitlement and multi-table writes.
- Handle webhooks idempotently.
- Provide deterministic seeds.
- Never downgrade `PAID` to `PENDING`.

---

## 27. Test Requirements

### Unit

- Midtrans signature verification.
- Midtrans status mapping.
- Transaction state machine.
- Membership extension.
- Entitlement states.
- Error mapping.

### Integration

- Payment amount comes from the database.
- Invalid signature changes nothing.
- Amount mismatch changes nothing.
- Duplicate settlement grants entitlement once.
- Users cannot view other users' transactions.
- Unauthorized premium lessons do not expose YouTube IDs.
- Students cannot perform admin mutations.
- Admin content mutations write audit logs.

### End-to-end

1. Visitor watches a free lesson.
2. Free student sees a friendly premium lock.
3. Premium demo account opens a premium lesson.
4. Expired account sees renewal state.
5. Checkout remains pending before webhook.
6. Verified webhook activates membership.
7. Browser success without webhook does not activate membership.
8. Returning student continues the last lesson.

### Visual QA

- 390px mobile.
- 768px tablet.
- 1440px desktop.
- Category colors remain consistent.
- No unexpected serif typography.
- No editorial luxury treatment.
- Soft bento panels do not create nested-card clutter.
- Empty and locked states remain friendly.

---

## 28. Global Definition of Done

A feature is done when:

- acceptance criteria pass;
- authorization is server-side;
- inputs are validated;
- responsive states are verified;
- loading, error, empty, success, and locked states exist;
- accessibility basics pass;
- no fake claims exist;
- relevant tests pass;
- no secrets are committed;
- unrelated scope is not added;
- UI follows `Playful Coffee Learning UI`;
- rejected visual directions are not reintroduced.

The MVP is done when:

- the free-learning loop works;
- Sandbox membership works;
- entitlement is secure and idempotent;
- dashboard continuation works;
- admin can publish initial content;
- public pages are responsive and accessible;
- deterministic accounts demonstrate free, active, and expired states.

---

## 29. GitHub Milestones

### Milestone 1 — Foundation

1. Initialize Next.js and TypeScript.
2. Configure Tailwind and shadcn/ui.
3. Implement approved design tokens and Plus Jakarta Sans.
4. Create application folder boundaries.
5. Add environment validation.
6. Configure lint, type-check, tests, and CI.

### Milestone 2 — Marketing UI

7. Build announcement and responsive header.
8. Build playful homepage hero.
9. Build soft-bento learning goals.
10. Build starter path.
11. Build free-lesson cards.
12. Build practice proof.
13. Build course cards.
14. Build founder, membership, CTA, and footer.
15. Run responsive and accessibility QA.

### Milestone 3 — Data

16. Configure Neon and Drizzle.
17. Implement identity schema.
18. Implement content and learning schema.
19. Implement commerce schema.
20. Implement audit schema.
21. Add deterministic seeds.

### Milestone 4 — Authentication

22. Configure Auth.js.
23. Add demo accounts.
24. Implement session and server guards.
25. Protect admin and dashboard routes.
26. Test role and demo restrictions.

### Milestone 5 — Learning

27. Build course catalog/detail.
28. Build learning hubs.
29. Build Guide and Recipe pages.
30. Build lesson player.
31. Implement free/premium authorization.
32. Implement progress.
33. Build student dashboard.

### Milestone 6 — Sandbox Payment

34. Build membership comparison.
35. Implement transaction creation.
36. Implement Midtrans Sandbox adapter.
37. Implement Snap UI.
38. Implement verified webhook.
39. Implement idempotent entitlement.
40. Build payment status UI.
41. Test transaction states.

### Milestone 7 — Admin CMS

42. Build admin shell.
43. Build course management.
44. Build guide/recipe management.
45. Build hub curation.
46. Implement publish/archive.
47. Build commerce inspection.
48. Add audit UI.

### Milestone 8 — Quality and Deployment

49. Add analytics.
50. Add error monitoring.
51. Add rate limiting and redaction.
52. Run accessibility audit.
53. Run performance audit.
54. Run E2E scenarios.
55. Configure Vercel.
56. Write README and case-study notes.

Each issue must contain problem, scope, non-scope, implementation notes,
acceptance criteria, tests, and dependencies.

---

## 30. Delivery Sequence

```text
Foundation
→ Static homepage
→ Data schema and seeds
→ Authentication and authorization
→ Course, player, and dashboard
→ Sandbox payment and entitlement
→ Admin CMS
→ Observability and deployment
```

First visual checkpoint:

```text
Responsive homepage following Playful Coffee Learning UI
```

First functional checkpoint:

```text
Free demo login → dashboard → free lesson → progress saved
```

Second functional checkpoint:

```text
Sandbox checkout → verified webhook → premium lesson unlocked
```

---

## 31. Risks and Limitations

### YouTube Unlisted

- Free and sufficient for a portfolio.
- Not secure video hosting or DRM.
- Authorized users can still share links.

### Sandbox payment

- Demonstrates integration and state handling.
- Does not prove production settlement, refunds, recurring billing, or
  accounting.

### Portfolio content

- Founder and coffee-shop claims may contain placeholders.
- Replace placeholders with verified facts before presenting it as a real
  client product.

### Playful UI risk

Playful does not mean adding decoration everywhere. Excessive colors,
illustrations, rounded containers, and motion can make the product childish and
reduce learning focus.

Control this through:

- a restricted token palette;
- one accent per component;
- clear hierarchy;
- consistent illustration style;
- accessible contrast;
- restrained motion.

### Vibe-coding risk

Generated code can become inconsistent quickly.

Control it through:

- small GitHub issues;
- this PRD as source of truth;
- shared tokens and primitives;
- tests for entitlement and payment;
- reviewed migrations;
- rejection of duplicated abstractions;
- no speculative features.

---

## 32. Final Scope Lock

This product is:

> A friendly, playful, portfolio-grade Indonesian coffee learning platform with
> free educational content, premium membership simulation, structured courses,
> secure server-side entitlement, and a minimal CMS.

This product is not:

> A luxury coffee publication, formal barista school, production subscription
> business, community platform, or commercial video-delivery system.

If implementation drifts toward the second definition or reintroduces the
rejected editorial direction, stop and reduce scope.

