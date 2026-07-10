import { useMemo, useState } from 'react'
import { ExternalLink, Github } from 'lucide-react'
import { projects } from '../data/projects'
import type { Project } from '../types'
import { Badge } from '../components/ui/Badge'
import { Card } from '../components/ui/Card'
import { PartnerLogos } from '../components/ui/PartnerLogos'
import { RevealWrapper } from '../components/ui/RevealWrapper'
import { SectionHeader } from '../components/ui/SectionHeader'
import { Tag } from '../components/ui/Tag'
import { TiltCard } from '../components/ui/TiltCard'
import { ProjectModal } from '../components/ui/ProjectModal'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { ScrollProgress } from '../components/ui/ScrollProgress'

type CategoryFilter = 'all' | Project['category']
type StatusFilter = 'all' | 'ongoing' | 'completed'

const CATEGORIES: { id: CategoryFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'ai-medical', label: 'AI & Medical' },
  { id: 'engineering', label: 'Engineering' },
  { id: 'software', label: 'Software' },
]

const STATUSES: { id: StatusFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'ongoing', label: 'Ongoing' },
  { id: 'completed', label: 'Completed' },
]

function visibleProjects(category: CategoryFilter, status: StatusFilter): Project[] {
  return projects.filter((p) => {
    if (p.hidden) return false
    if (category !== 'all' && p.category !== category) return false
    if (status === 'ongoing' && p.endYear !== 'ongoing') return false
    if (status === 'completed' && p.endYear === 'ongoing') return false
    return true
  })
}

function initials(title: string): string {
  return title
    .replace(/[—–-].*$/, '') // strip subtitle after em/en dash
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .replace(/[^A-Z]/g, '')
}

function formatYearRange(project: Project): string {
  const start = String(project.startYear)
  if (project.endYear === 'ongoing') return `${start}–present`
  return `${start}–${project.endYear}`
}

export default function PortfolioPage() {
  const [category, setCategory] = useState<CategoryFilter>('all')
  const [status, setStatus] = useState<StatusFilter>('all')
  const [selected, setSelected] = useState<Project | null>(null)

  const visible = useMemo(() => visibleProjects(category, status), [category, status])

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <div className="min-h-screen bg-white dark:bg-slate-900 pt-16">
      <div className="max-w-6xl mx-auto px-6 pt-28 pb-24">
        <RevealWrapper>
          <SectionHeader
            label="Portfolio"
            title="All projects."
            description="A collection of research, engineering, and software projects I have built — from medical imaging and predictive maintenance to developer tools and learning apps."
          />
        </RevealWrapper>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar filters */}
          <aside className="md:w-48 shrink-0">
            <RevealWrapper className="space-y-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">
                  Category
                </p>
                <div className="flex flex-wrap md:flex-col gap-1">
                  {CATEGORIES.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setCategory(f.id)}
                      className={`text-left text-sm px-3 py-1.5 rounded-md transition-colors ${
                        category === f.id
                          ? 'bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-400 font-medium'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">
                  Status
                </p>
                <div className="flex flex-wrap md:flex-col gap-1">
                  {STATUSES.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setStatus(f.id)}
                      className={`text-left text-sm px-3 py-1.5 rounded-md transition-colors ${
                        status === f.id
                          ? 'bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-400 font-medium'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            </RevealWrapper>
          </aside>

          {/* Project grid */}
          <div className="flex-1">
            {visible.length === 0 ? (
              <p className="text-sm text-slate-400 dark:text-slate-500 text-center py-12">
                No projects match these filters.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {visible
                  .sort((a, b) => b.startYear - a.startYear)
                  .map((p, i) => (
                    <button
                      key={p.id}
                      onClick={() => setSelected(p)}
                      className="text-left w-full"
                    >
                      <RevealWrapper delay={i * 0.06}>
                        <TiltCard className="h-full">
                          <Card className="h-full flex flex-col cursor-pointer transition-shadow hover:shadow-md">
                            {/* Header row: title + links */}
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div className="flex items-center gap-2 min-w-0">
                                {p.imageUrl ? (
                                  <img
                                    src={p.imageUrl}
                                    alt={p.title}
                                    className="w-10 h-10 rounded-lg object-cover shrink-0"
                                    loading="lazy"
                                  />
                                ) : (
                                  <span className="w-10 h-10 rounded-lg bg-teal-100 dark:bg-teal-900 flex items-center justify-center text-xs font-semibold text-teal-700 dark:text-teal-300 shrink-0">
                                    {initials(p.title)}
                                  </span>
                                )}
                                <div className="min-w-0">
                                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-snug truncate">
                                    {p.title}
                                  </h3>
                                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                    {p.role && <span>{p.role} · </span>}
                                    {formatYearRange(p)}
                                  </p>
                                </div>
                              </div>
                              <div
                                className="flex items-center gap-1 shrink-0 pt-0.5"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {p.repoUrl && (
                                  <a
                                    href={p.repoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Repository"
                                    className="text-slate-400 hover:text-teal-700 dark:hover:text-teal-400 transition-colors"
                                  >
                                    <Github className="w-3.5 h-3.5" />
                                  </a>
                                )}
                                {p.demoUrl && (
                                  <a
                                    href={p.demoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Live demo"
                                    className="text-slate-400 hover:text-teal-700 dark:hover:text-teal-400 transition-colors"
                                  >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                  </a>
                                )}
                              </div>
                            </div>

                            {/* Description */}
                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2 flex-1">
                              {p.description}
                            </p>

                            {/* Partners */}
                            {p.partners && p.partners.length > 0 && (
                              <PartnerLogos partners={p.partners} size={48} className="mt-2" />
                            )}

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1 mt-2">
                              {p.endYear === 'ongoing' && (
                                <Badge className="bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-400 border-teal-100 dark:border-teal-900">
                                  Ongoing
                                </Badge>
                              )}
                              {p.tags.slice(0, 3).map((t) => (
                                <Tag key={t} label={t} />
                              ))}
                              {p.tags.length > 3 && (
                                <span className="text-xs text-slate-400 dark:text-slate-500 self-center">
                                  +{p.tags.length - 3}
                                </span>
                              )}
                            </div>
                          </Card>
                        </TiltCard>
                      </RevealWrapper>
                    </button>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
      </div>
      <Footer />
    </>
  )
}
