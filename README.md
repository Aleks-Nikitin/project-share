# Project Share

A full-stack project showcase platform. Users browse and upvote approved projects, submit new ones for review, and admins approve or reject submissions from a dedicated dashboard.

## Stack

| Layer          | Technology                                   |
| -------------- | -------------------------------------------- |
| Framework      | Next.js 16 (App Router, Cache Components)    |
| UI             | React 19, Tailwind CSS 4, shadcn/ui          |
| Auth           | Clerk (users, organizations, admin metadata) |
| Database       | Neon Postgres (serverless HTTP driver)       |
| ORM            | Drizzle ORM                                  |
| Validation     | Zod                                          |
| Data mutations | Next.js Server Actions (no REST API)         |

## Getting started

### Prerequisites

- Node.js 20+
- A [Neon](https://neon.tech) Postgres database
- A [Clerk](https://clerk.com) application

### Environment variables

Create a `.env` file in the project root:

```env
# Neon Postgres connection string
DATABASE_URL=postgresql://...

# Clerk (from your Clerk dashboard → API Keys)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

Clerk may also require standard redirect URLs configured in the Clerk dashboard (sign-in, sign-up, etc.) depending on your deployment URL.

### Install and run

```bash
npm install

# Apply database migrations
npx drizzle-kit migrate

# Optional: seed sample data
npx tsx src/seeds.ts

# Development
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
npm start
```

The build does not pre-render individual project pages. Those routes fetch from the database at request time, so `DATABASE_URL` must be reachable when the app runs, but not necessarily during `npm run build`.

### Admin access

Set `publicMetadata.isAdmin` to `true` on a user in the Clerk dashboard. Only users with that flag can access `/admin`.

---

## Architecture overview

```
app/
  page.tsx                  Home — static shell + streamed catalog
  submit/page.tsx           Project submission form
  admin/page.tsx            Admin dashboard (dynamic)
  projects/[slug]/page.tsx  Project detail (dynamic)

src/
  queries/select.ts         Cached read queries
  actions/
    product-actions.ts      Submit, vote, vote-status
    admin-actions.ts        Approve, reject, delete, list all
  schema.ts                 Drizzle schema
  db.ts                     Neon HTTP client

components/                 UI, cards, forms, vote button
proxy.ts                    Clerk middleware (org auto-creation)
```

There are no `app/api` routes. All reads go through cached query functions or server actions. All writes go through server actions.

---

## Caching strategy

This project uses Next.js **Cache Components** (`cacheComponents: true` in `next.config.ts`). The pattern is:

1. **Cache shared reads** with `"use cache"` + `cacheLife` + `cacheTag`
2. **Stream or defer user-specific / auth-gated work** with `<Suspense>`, `connection()`, or `instant = false`
3. **Invalidate caches on writes** with `updateTag("products")`

### What is cached

| Function             | Location                | Cache key includes                 | TTL     | Invalidated by          |
| -------------------- | ----------------------- | ---------------------------------- | ------- | ----------------------- |
| `getProducts()`      | `src/queries/select.ts` | `userId`, `searchQuery`, `tagSlug` | minutes | `updateTag("products")` |
| `getProjectBySlug()` | `src/queries/select.ts` | `slug`                             | minutes | `updateTag("products")` |

Both functions tag their results with `"products"`. Any mutation that changes product data calls `updateTag("products")`, which invalidates both queries.

**Mutations that invalidate the cache:**

- `toggleVoteAction` — vote on/off
- `approveProject` — admin approve
- `rejectProject` — admin reject
- `deleteProject` — admin delete

`addProductAction` (submit) does **not** call `updateTag`, which is intentional: new submissions are `pending` and do not appear on the public catalog until an admin approves them. The admin dashboard uses an uncached `getAllProjects()` query.

### What is dynamic (not cached)

| Concern             | How it runs                                                          |
| ------------------- | -------------------------------------------------------------------- |
| User auth           | Clerk `auth()` / `auth.protect()`                                    |
| Per-user vote state | `getUserVoteStatus()` server action, called from client `VoteButton` |
| Admin dashboard     | `instant = false` + `connection()` — always request-time             |
| Project detail page | `instant = false` + `connection()` — always request-time             |
| Admin mutations     | `requireAdmin()` on every admin action                               |

### What is streamed

| Route              | Static shell                           | Streamed content                                                    |
| ------------------ | -------------------------------------- | ------------------------------------------------------------------- |
| `/` (home)         | Layout, header, page wrapper           | `ProjectSection` inside `<Suspense>` — catalog, search, tag filters |
| `/admin`           | Layout, `loading.tsx` fallback         | Full dashboard after auth + DB fetch                                |
| `/projects/[slug]` | Layout, `loading.tsx` fallback         | Project detail after DB fetch                                       |
| `/submit`          | Entire page shell (static form layout) | Form submission handled client-side via server action               |

The home page wraps `ProjectSection` in `<Suspense fallback={<ProjectSkeleton />}>` because the section calls `auth()` and reads `searchParams`, which are request-time APIs. The catalog data itself is still served from the cached `getProducts()` function once those values are known.

---

## Routes

| Route              | Purpose                                             | Rendering                                            |
| ------------------ | --------------------------------------------------- | ---------------------------------------------------- |
| `/`                | Browse projects, search, filter by tag, upvote      | Partial prerender — catalog streamed via Suspense    |
| `/projects/[slug]` | Project detail page                                 | Dynamic — `connection()` + cached `getProjectBySlug` |
| `/submit`          | Submit a new project (requires Clerk sign-in + org) | Static shell, form uses `addProductAction`           |
| `/admin`           | Review submissions, approve/reject/delete           | Dynamic — auth + admin metadata check                |
| `/projects`        | Placeholder stub                                    | Static                                               |

---

## Server actions

### `src/actions/product-actions.ts`

| Action              | Purpose                                                                                              |
| ------------------- | ---------------------------------------------------------------------------------------------------- |
| `addProductAction`  | Validate and insert a new project (`status: pending`). Fetches GitHub stars from repo URL on submit. |
| `toggleVoteAction`  | Toggle user vote, update `voteCount`, invalidate product cache                                       |
| `getUserVoteStatus` | Return whether the signed-in user has voted on a project                                             |

### `src/actions/admin-actions.ts`

| Action           | Purpose                                                      |
| ---------------- | ------------------------------------------------------------ |
| `getAllProjects` | List all projects (any status), admin-only, not cached       |
| `approveProject` | Set status to `approved`, set `approvedAt`, invalidate cache |
| `rejectProject`  | Set status to `rejected`, invalidate cache                   |
| `deleteProject`  | Delete project row, invalidate cache                         |

All admin actions call `requireAdmin()`, which checks Clerk sign-in and `publicMetadata.isAdmin`.

---

## Database schema

**`products`** — project listings with name, slug, description, tags (JSONB), vote count, status (`pending` / `approved` / `rejected`), submitter info, GitHub URL/stars, badge status, organization ID.

**`product_votes`** — per-user votes (`userId` + `productId`, unique constraint).

Migrations live in `migrations/`. Schema source: `src/schema.ts`.

---

## Auth and middleware

`proxy.ts` runs Clerk middleware on all app routes. If a signed-in user has no organization, the middleware attempts to create one automatically (required for project submission, which stores `organizationId`).

The vote button shows a sign-in prompt when the user is not authenticated. Signed-in users can toggle votes; state is persisted in `product_votes`.

---

## Scripts

```bash
npm run dev      # Start dev server (Turbopack)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint

npx drizzle-kit migrate          # Apply migrations
npx drizzle-kit generate         # Generate migration from schema changes
npx tsx src/seeds.ts             # Seed database (destructive — clears products)
```
