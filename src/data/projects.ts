import type { Project } from '../types'

export const projects: Project[] = [
  {
    id: 'proj-kat-infonce',
    title: 'KAT-InfoNCE for robust chest X-ray VLMs',
    description:
      'Metadata-guided contrastive learning framework for medical vision–language models, designed to improve cross-institution robustness in chest X-ray analysis and evaluated across nine international datasets.',
    longDescription:
      'Medical vision–language models (VLMs) often fail when deployed at a hospital different from the one that produced the training data — a well-known domain shift problem. KAT-InfoNCE addresses this by guiding the contrastive learning objective with structured metadata (patient age, sex, view position, study date) so the model learns features that generalise across institutions rather than memorising site-specific patterns. The method was evaluated on nine chest X-ray datasets from hospitals across Switzerland, Germany, the US, and India, showing consistent gains over standard CLIP-style training.',
    tags: ['Medical Imaging', 'Vision–Language Models', 'Contrastive Learning', 'PyTorch'],
    repoUrl: undefined,
    demoUrl: undefined,
    featured: true,
    size: 'wide',
    category: 'ai-medical',
    startYear: 2025,
    endYear: 2026,
    role: 'MSc Researcher',
    highlights: [
      'Best Thesis Award 2026 — University of Bern MSc in AI in Medicine',
      'Evaluated across nine international chest X-ray datasets',
      'Improves cross-institution VLM robustness without requiring target-site data',
    ],
    partners: [
      {
        name: 'ARTORG Center for Biomedical Engineering Research',
        logoUrl:
          'https://www.artorg.unibe.ch/unibe/portal/fak_medizin/dept_weitere/ins_artorg/content/WEBuseonly_ARTORG_DD3601_eng.gif',
        url: 'https://www.artorg.unibe.ch/',
      },
    ],
  },
  {
    id: 'proj-ModIA',
    title: 'ModIA — Hybrid digital twins for predictive maintenance',
    description:
      'Hybrid digital-twin methodology combining physics-based simulation and machine learning for prescriptive industrial maintenance, validated with real measurements and industrial partners to reduce sensor count and modelling effort.',
    longDescription:
      'ModIA tackles a practical industrial problem: how to predict machine failures without instrumenting every bearing with expensive sensors. The solution couples a physics-based simulation (the digital twin) with a data-driven ML model that learns the residual between simulation and reality. This hybrid approach means the physics model carries the bulk of the generalisation load while the ML component adapts to installation-specific behaviour. The methodology was co-designed with four industrial partners — STARRAG, Asyril, HID, and HEIA — and validated on real machining centre measurements.',
    tags: [
      'Industry 4.0',
      'Predictive Maintenance',
      'Digital Twins',
      'Physics-Informed Machine Learning',
    ],
    repoUrl: undefined,
    demoUrl: 'https://www.youtube.com/watch?v=Spcu-KlxnrQ',
    featured: true,
    category: 'engineering',
    startYear: 2023,
    endYear: 2025,
    role: 'Research Associate',
    highlights: [
      'Reduced sensor requirements while preserving anomaly detection accuracy',
      'Validated on real industrial machining centres with four industry partners',
      'Presented at AI Days 2024 and 2025',
    ],
    partners: [
      {
        name: 'STARRAG',
        logoUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Starrag_Group_logo.svg/960px-Starrag_Group_logo.svg.png?_=20141205071323',
        url: 'https://www.starrag.com/fr-fr',
      },
      {
        name: 'Asyril',
        logoUrl: 'https://asyril.com/wp-content/themes/asyril/dist/svg/asyril-logo.svg',
        url: 'https://asyril.com/fr/',
      },
      {
        name: 'HID',
        logoUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/HID_Global_logo.svg/120px-HID_Global_logo.svg.png?_=20180124191630',
        url: 'https://www.hidglobal.com/',
      },
      {
        name: 'HEIA-FR',
        logoUrl: 'https://www.heia-fr.ch/media/4zrfx0oj/logo_heia-fr.svg',
        url: 'https://www.heia-fr.ch/',
      },
    ],
  },
  {
    id: 'proj-submission-studio',
    title: 'Submission Studio',
    description:
      'Desktop and web workspace for MO (CVC / HVAC) engineers to manage project dossiers, author submission deliverables, reuse approved content, and preview client-ready PDFs.',
    longDescription:
      'Submission Studio is a full-stack application that digitises a paper-heavy engineering workflow. Engineers manage Project Dossiers, author structured Submission MO documents in a Canvas editor with a cell-based stream (headings, text, tables, pricing sidecars), reuse pre-approved clauses from a CVC Base library, and preview the final PDF — all in one workspace. The system ships as a web application (React + FastAPI + Postgres) and as an Electron desktop alpha for offline use. The domain model — cell stream, rollup, Formal AST, PDF export — lives in a pure Python package shared by both runtimes.',
    tags: ['React', 'FastAPI', 'Python', 'Postgres', 'Electron', 'TypeScript'],
    repoUrl: 'https://github.com/Sivanirosh/ingCVC',
    demoUrl: undefined,
    featured: true,
    size: 'wide',
    category: 'software',
    startYear: 2025,
    endYear: 'ongoing',
    role: 'Full-stack Developer',
    highlights: [
      'Delivered as both web app and desktop Electron alpha',
      'Shared pure Python domain model powers both runtimes',
      'Replaces a paper-and-email workflow with structured digital authoring',
    ],
  },
  {
    id: 'proj-kataforge',
    title: 'KataForge',
    description:
      'Local-first browser workspace for coding interview preparation: compile a curriculum, practice katas in a Monaco editor, and review progress — all with deterministic local state and optional AI assistance.',
    longDescription:
      'KataForge is a coding practice environment that runs entirely in the browser. It includes a curriculum compiler that builds a goal-aware study plan after a short diagnostic, a built-in kata library, a Monaco-based coding workspace with Pyodide-powered Python execution, and optional Anthropic BYOK integration for AI-assisted review. Everything lives in IndexedDB and localStorage — no account, no server, no cloud dependency. Users can also define custom ProblemPacks on disk or import UserKatas at runtime.',
    tags: ['TypeScript', 'Astro', 'Monaco Editor', 'Pyodide', 'IndexedDB'],
    repoUrl: 'https://github.com/Sivanirosh/kataforge',
    demoUrl: undefined,
    featured: false,
    category: 'software',
    startYear: 2026,
    endYear: 'ongoing',
    role: 'Creator & Developer',
    highlights: [
      'Local-first: works offline, no account needed',
      'Browser-based Python execution via Pyodide',
      'BYOK AI integration — API key stays in memory, sent directly to Anthropic',
    ],
  },
  {
    id: 'proj-khazad-doom',
    title: 'Khazad-Doom',
    description:
      'Local CLI and daemon that turns AI coding work into bounded, reviewable units: JSON issue slices, isolated git worktrees, verified handoffs, and a live dashboard.',
    longDescription:
      'Khazad-Doom is a workflow daemon written in Rust. It defines work as JSON Issue Slices — explicit scope, acceptance criteria, verification commands, and must-ask boundaries. Each slice is handed to a Pi coding agent inside an isolated git worktree. The daemon supervises execution, gates integration with verification, checkpoints progress for resume, and produces a PR-ready handoff with structured evidence. The result: bounded, auditable, agentic coding that leaves a trail of machine-readable artifacts instead of a dirty worktree and a confident claim.',
    tags: ['Rust', 'CLI', 'Agentic Workflow', 'Daemon', 'Git Worktrees'],
    repoUrl: 'https://github.com/Sivanirosh/khazad-doom',
    demoUrl: undefined,
    featured: true,
    category: 'engineering',
    startYear: 2026,
    endYear: 'ongoing',
    role: 'Creator & Developer',
    highlights: [
      'Written in Rust with zero-agent-license dependencies',
      'Isolates each agent task in a dedicated git worktree',
      'Verification gate runs before integration completes',
    ],
  },
  {
    id: 'proj-normia',
    title: 'NormIA Copilot',
    description:
      'Private local CLI for Swiss building engineering professionals: ingest regulatory PDFs, search with hybrid retrieval, and get verified, citation-grounded answers — all offline.',
    longDescription:
      'NormIA Copilot solves a specific professional problem: Swiss engineers working with CVC / HVAC regulations need to find and quote exact clauses from hundreds of pages of technical norms. NormIA ingests PDF source documents into a structured SQLite database, builds a hybrid retrieval index (FTS5 lexical + optional BGE-M3 dense embeddings via sqlite-vec), and runs a code-enforced clarification-first agent workflow. Every answer includes verified citations with exact document, unit, page, and quote. No remote API calls for retrieval — everything runs locally. The chat surface asks a targeted clarification question before touching any retrieval tool, so the engineer stays in control.',
    tags: ['Python', 'SQLite', 'Hybrid Search', 'CLI', 'RAG'],
    repoUrl: undefined,
    demoUrl: undefined,
    featured: false,
    category: 'software',
    startYear: 2026,
    endYear: 'ongoing',
    role: 'Creator & Developer',
    highlights: [
      '100% local: no cloud dependency for retrieval or search',
      'Clarification-first agent workflow — asks before touching a document',
      'Every answer cites exact source document, section, and page',
    ],
  },
  {
    id: 'proj-lingua-mate',
    title: 'LinguaMate',
    description:
      'Classical literature reader for German learners: inline annotations, vocabulary support, and an AI-maintained personal wiki — keeps the text at the centre.',
    longDescription:
      'LinguaMate is a reading room built for B1–C1 German learners who want to read original classical texts (Goethe, Kafka, Mann) without switching between a dictionary, grammar reference, and translation tool every sentence. The book is the primary interface; annotations, translations, and grammar notes live in the margin, out of the way. An AI maintains a personal learner wiki — an Obsidian-compatible Markdown vault — that builds a map of concepts, vocabulary, and patterns from the reader\'s encounters. The project is undergoing a direction reset toward a focused reading room with AI-maintained learner memory.',
    tags: ['Python', 'FastAPI', 'React', 'Next.js', 'Postgres', 'Docker'],
    repoUrl: 'https://github.com/Sivanirosh/LinguaMate',
    demoUrl: undefined,
    featured: false,
    category: 'software',
    startYear: 2026,
    endYear: 'ongoing',
    role: 'Creator & Developer',
    highlights: [
      'Reading-first interface — text stays central, support stays in the margin',
      'AI builds a personal learner wiki from reading history',
      'Designed for intermediate-to-advanced learners reading original literature',
    ],
  },
  {
    id: 'proj-synapse',
    title: 'Synapse',
    description:
      'Local-first spaced repetition app with AI-native study tools: source ingestion, concept authoring, retrieval practice, voice transcription, and a learning copilot — all running on your machine.',
    longDescription:
      'Synapse rethinks spaced repetition for the AI era. Instead of static flashcards, it treats Retrieval Facets (narrow, ratifiable memory targets) as the scheduled atom, renders them into varied Prompt Instances on each review, and uses AI to explain, converse, transcribe, and analyse study activity. The system includes source ingestion (PDFs, markdown, links), an authoring workspace for generating retrieval candidates, an FSRS scheduler, voice transcription, and a pedagogy loop tutor. Everything runs locally — SQLite for persistence, Ollama for local models, no cloud dependency. The project includes a full test-driven workflow gate and replayable AI evaluation traces.',
    tags: ['TypeScript', 'Svelte', 'SQLite', 'FSRS', 'Ollama', 'Python'],
    repoUrl: 'https://github.com/Sivanirosh/synapse',
    demoUrl: undefined,
    featured: true,
    size: 'wide',
    category: 'software',
    startYear: 2025,
    endYear: 'ongoing',
    role: 'Creator & Developer',
    highlights: [
      'Full local-first architecture — SQLite, local models, no cloud',
      'AI-native: varied prompt instances per review, not static flashcards',
      'Production-readiness workflow gate that validates the full study cycle',
    ],
  },
]
