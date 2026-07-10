# CONTEXT.md — Domain glossary

This file captures the canonical terms and concepts used in this codebase.
Update it as new terms are resolved. Do not couple terms to implementation details.

---

## Terms

### Project
A piece of work — research, engineering, or personal software — that the owner wants to present publicly. A Project belongs to exactly one **Category** and has a **Lifecycle**.

Not every Project in `src/data/projects.ts` is necessarily public: a Project with `hidden: true` exists in the data but is not rendered on any page.

### Portfolio
The full collection of all visible Projects, presented on the dedicated `/projects` page. Distinct from the **Projects Teaser**.

### Projects Teaser
The `#projects` section on the main page. Shows only `featured: true` Projects. Its purpose is to surface the most representative work inline with the CV narrative. Links to the Portfolio page via a "View all projects →" CTA.

### Category
One of three mutually-exclusive labels that classify a Project by domain:
- `ai-medical` — AI applied to healthcare or medical imaging.
- `engineering` — physical systems, industrial, hardware-adjacent work.
- `software` — web, app, or platform software without a strong AI-medical or engineering angle.

### Lifecycle
The temporal state of a Project, expressed as `startYear` and `endYear`:
- `endYear: number` — the Project is **Completed**.
- `endYear: 'ongoing'` — the Project is **Ongoing**.

There is no separate `status` field; Lifecycle is fully encoded in `endYear`.

### Role
The owner's specific contribution to a Project (e.g. "Lead Researcher", "Algorithm Engineer", "Full-stack Developer"). Distinct from job title. A Project without a `role` field implies sole authorship or a context where the role is self-evident from the description.

### Partner
An external organisation that collaborated on or funded a Project. Represented as `{ name, logoUrl?, url? }`. Partners are displayed as logo strips on the card and in the modal.

### Highlights
A short ordered list of the most measurable or memorable outcomes of a Project (e.g. "Reduced sensor count by 40%"). Mirrors `achievements` in `ExperienceEntry`. Optional; omitted if there are no quantifiable outcomes.

### Portfolio Page
The routed page at `/projects`. Contains the full list of visible Projects, a filter sidebar (Category + Lifecycle), and a card grid. Clicking a card opens the **Project Modal**.

### Project Modal
A full-screen overlay that shows the complete detail of a single Project: long description, highlights, partner logos, videos, and action links. Opened by clicking a Project card on the Portfolio Page. Closed by pressing Escape or clicking the backdrop.
