# Portfolio page — requirements

> **Status:** Approved  
> **Decided:** 2026-05-11  
> **Scope:** New `/projects` route + related changes to navbar, main page `#projects` section, data model, and routing setup.

---

## 1. Goal

Add a dedicated **Portfolio page** at `/projects` that presents all projects (research, engineering, and personal software) in a richer format than the teaser section already on the main page. The page must be navigable from the main navbar and shareable as a standalone URL.

---

## 2. Data model changes

### 2.1 New fields on `Project` (in `src/types.ts`)

| Field | Type | Required | Notes |
|---|---|---|---|
| `imageUrl` | `string` | No | Logo or representative image for the project card. Falls back to a teal initials avatar if absent. |
| `videos` | `{ label: string; url: string }[]` | No | One or more labeled video links (YouTube, Vimeo, broadcast clips, etc.). Displayed in the modal. Distinct from `demoUrl` (a live interactive deployment). |
| `startYear` | `number` | Yes | Year the project started. Used for sorting and displayed on the card/modal. |
| `endYear` | `number \| 'ongoing'` | Yes | Year the project ended, or `'ongoing'` if active. Replaces the need for a separate `status` field. |
| `role` | `string` | No | The owner's specific contribution (e.g. `"Lead Researcher"`, `"Full-stack Developer"`, `"Algorithm Engineer"`). Displayed prominently in the modal. |
| `longDescription` | `string` | No | Extended prose for the modal detail view. Falls back to `description` if absent. |
| `highlights` | `string[]` | No | Bullet-pointed key outcomes or achievements (e.g. `"Reduced sensor count by 40%"`). Displayed as a list in the modal. Mirrors the `achievements` pattern in `ExperienceEntry`. |
| `hidden` | `boolean` | No | When `true`, the project is excluded from the `/projects` page and the `#projects` teaser. Allows unpublished or immature entries to live in the data file without appearing publicly. Defaults to `false`. |

### 2.2 Existing fields — no change

`id`, `title`, `description`, `tags`, `repoUrl`, `demoUrl`, `featured`, `size`, `category`, `partners` are unchanged.

### 2.3 Migration note

All existing `Project` entries must be updated to include `startYear` and `endYear` before the feature is considered complete.

---

## 3. Routing

### 3.1 Dependency

Install `react-router-dom` (v6+).

### 3.2 Route table

| Path | Component | Notes |
|---|---|---|
| `/` | `App` (existing) | Unchanged single-page layout. |
| `/projects` | `PortfolioPage` | New. Full portfolio grid with sidebar filters and modal. |

### 3.3 `App.tsx` changes

- Wrap the app in `<BrowserRouter>` (or `<RouterProvider>` with `createBrowserRouter`).
- The existing `<main>` content (Hero → Contact) moves under a `<Route path="/">` element.
- `<Route path="/projects">` renders the new `<PortfolioPage>` component.

### 3.4 Anchor links on `/projects`

When the user is on `/projects`, Navbar scroll-anchor items (`#about`, `#experience`, etc.) must resolve to `/#about`, `/#experience`, etc. so they navigate back to the main page at the correct section. Implement by prefixing anchor `href` values with `/` when the current pathname is not `/`.

---

## 4. Navbar changes

### 4.1 Existing "Projects" entry

Unchanged. It remains a scroll-anchor link to `#projects` on the main page, consistent with all other navbar anchor items.

### 4.2 New "Portfolio" entry

- Label: **Portfolio**
- Destination: `/projects` (react-router `<Link>`)
- Visual treatment: label followed by a small `↗` icon (e.g. Lucide `ArrowUpRight`, `w-3 h-3`) to signal it navigates to a separate page, not a section scroll.
- Placement: after the existing "Projects" entry in the nav item order.
- Active state: apply the active style (teal underline / teal text) when `pathname === '/projects'`.

---

## 5. Main page `#projects` section changes

### 5.1 Teaser behaviour

The `#projects` section on the main page is narrowed to show **only `featured: true` projects** (currently: ModIA). Non-featured projects are no longer shown in the teaser.

### 5.2 "View all" CTA

A "View all projects →" link is added below the project grid. It is a react-router `<Link to="/projects">` styled as a teal text link. It is always visible (not conditional on the filter state).

### 5.3 Section heading

No change to the existing heading ("Selected work."). The `<SectionHeader>` label remains "Projects".

---

## 6. `/projects` page — layout and behaviour

### 6.1 Page header

Reuse the existing `<SectionHeader>` component:

```
label   → "Portfolio"
title   → "All projects."
subtitle → "A collection of research, engineering, and software projects."
```

Wrapped in `<RevealWrapper>` for entrance animation.

### 6.2 Two-column layout (desktop)

```
┌─────────────────────────────────────────────────────┐
│  <SectionHeader>                                    │
├──────────────┬──────────────────────────────────────┤
│  Filter      │  Project grid                        │
│  sidebar     │                                      │
│  (w-56)      │  (flex-1, 2–3 col responsive grid)   │
│              │                                      │
└──────────────┴──────────────────────────────────────┘
```

On mobile (`< md`), the sidebar collapses to a horizontal row of toggle pills above the grid.

### 6.3 Filter sidebar

Two independent filter groups, both visible simultaneously:

**Category**
- All
- AI & Medical
- Engineering
- Software

**Status**
- All
- Ongoing (`endYear === 'ongoing'`)
- Completed (`endYear` is a number)

Filters are additive (AND logic): a project must match the selected category AND the selected status to appear.

Default state: Category = All, Status = All.

### 6.4 Sort

Projects in the grid are sorted **newest first** by `startYear` descending. No user-facing sort control is needed at launch.

### 6.5 Card grid

- Layout: CSS grid, `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`, uniform row height.
- Each card uses the existing `<TiltCard>` + `<Card>` primitives wrapped in `<RevealWrapper delay={index * 0.08}>`.
- Cards are clickable (full card is the click target) and open the project modal.

### 6.6 Card anatomy

```
┌──────────────────────────────────┐
│  [imageUrl or teal initials]     │  ← 48×48 px logo / avatar
│  Title              [↗] [GitHub] │
│  Role · startYear–endYear        │
│  description (2-line clamp)      │
│  [Partner logos if any]          │
│  [Tag] [Tag] [Tag]               │
└──────────────────────────────────┘
```

- `imageUrl` fallback: a 48×48 rounded square with `bg-teal-100 dark:bg-teal-900` and the project's initials in `text-teal-700 dark:text-teal-300`.
- `endYear: 'ongoing'` renders as a teal `"Ongoing"` badge (reuse `<Badge>`).
- `repoUrl` and `demoUrl` render as icon links in the top-right corner (same as the existing `#projects` section). Clicking them does NOT open the modal — they use `e.stopPropagation()`.
- Description is clamped to 2 lines (`line-clamp-2`).

### 6.7 Empty state

If no projects match the active filters, display:

> "No projects match these filters."

as `text-sm text-slate-400` centred in the grid area.

---

## 7. Project modal

### 7.1 Trigger

Clicking anywhere on a project card (except `repoUrl`/`demoUrl` icon links) opens the modal.

### 7.2 Behaviour

- Implemented with Framer Motion `AnimatePresence` + `motion.div` for enter/exit animation (scale + fade).
- Clicking the backdrop or pressing `Escape` closes the modal.
- `document.body` gets `overflow: hidden` while the modal is open to prevent background scroll.
- Modal is rendered in a React portal (`document.body`) so it sits above all other content.
- Focus is trapped inside the modal while open (keyboard accessibility).

### 7.3 Modal anatomy

```
┌──────────────────────────────────────────────┐
│  [imageUrl or initials avatar — 64×64]       │
│  Title                              [✕ close]│
│  Role · startYear–endYear · Category badge   │
│  ─────────────────────────────────────────── │
│  longDescription (or description fallback)   │
│                                              │
│  Key highlights                              │
│  • …                                         │
│  • …                                         │
│                                              │
│  Partners  [logo] [logo]                     │
│                                              │
│  Videos                                      │
│  ▶ On TV: Feature on France 5                │
│  ▶ Product presentation                      │
│                                              │
│  Tags  [tag] [tag] [tag]                     │
│                                              │
│  [GitHub ↗]  [Live demo ↗]                  │
└──────────────────────────────────────────────┘
```

- Sections with no data (`highlights`, `partners`, `videos`, `repoUrl`, `demoUrl`) are omitted entirely — no empty placeholders.
- Video links open in a new tab (`target="_blank" rel="noopener noreferrer"`).
- Max width: `max-w-2xl`. Vertically scrollable on small screens.

---

## 8. Page shell

The `/projects` page uses the full shared site shell:

- `<ScrollProgress>` bar at the top.
- `<Navbar>` with the updated nav items (see §4).
- `<Footer>` at the bottom.

No new layout component is required.

---

## 9. New files

| File | Purpose |
|---|---|
| `src/pages/PortfolioPage.tsx` | Top-level page component for `/projects`. Owns filter state, sort logic, and modal open/close state. |
| `src/components/ui/ProjectModal.tsx` | Modal component. Receives a `Project \| null` prop; renders `null` when closed. |

All other changes are modifications to existing files.

---

## 10. Modified files

| File | Change |
|---|---|
| `src/types.ts` | Add 8 new optional/required fields to `Project` interface (§2.1). |
| `src/data/projects.ts` | Populate `startYear`, `endYear` on all existing entries; add new fields where known. |
| `src/App.tsx` | Wrap in `<BrowserRouter>`, add `/projects` route to `<PortfolioPage>`. |
| `src/components/layout/Navbar.tsx` | Add "Portfolio" nav entry with `↗` icon and active-route styling. Update anchor `href` values to be `/`-prefixed when on `/projects`. |
| `src/components/sections/Projects.tsx` | Filter to `featured: true` only; add "View all projects →" CTA. |
| `vite.config.ts` | No change required — `base: '/'` already set. Ensure `build.rollupOptions` does not need updating for SPA fallback on GitHub Pages. |
| `.github/workflows/deploy.yml` | Confirm the existing deploy handles SPA fallback (a `404.html` redirect or GitHub Pages SPA hack) so that hard-refreshing `/projects` works. |

---

## 11. Accessibility requirements

- The modal must have `role="dialog"`, `aria-modal="true"`, and `aria-labelledby` pointing to the modal title.
- The close button must have `aria-label="Close"`.
- Focus must return to the card that triggered the modal when it closes.
- Filter sidebar controls must be `<button>` elements or `<input type="radio">` groups with visible labels.
- All card images (`imageUrl`) must have an `alt` attribute equal to the project title.

---

## 12. Performance

- `PortfolioPage` is lazy-loaded via `React.lazy()` + `<Suspense>` in `App.tsx` (same pattern as existing sections).
- `ProjectModal` is imported statically inside `PortfolioPage` (it is small and only loaded when the page is visited).
- Project `imageUrl` assets: use `loading="lazy"` on all `<img>` tags. Prefer SVG logos (vector, tiny) over raster.
- The existing bundle-size target (< 200 KB gzip) must still be met after adding `react-router-dom` (~25 KB gzip).

---

## 13. Out of scope

The following were considered and explicitly deferred:

| Item | Reason deferred |
|---|---|
| Per-project URL routes (`/projects/modia`) | Low value with 2 projects; data model is forward-compatible (add `slug` later). |
| Search / text filter | Premature with a small portfolio. |
| Sort control in UI | Newest-first covers all current needs. |
| Stat strip in page header | Deferred until project count justifies it. |
| Blog / write-ups per project | Out of scope for this feature. |
