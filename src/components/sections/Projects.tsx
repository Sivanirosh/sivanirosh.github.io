import clsx from 'clsx'
import { ArrowRight, ExternalLink, Github } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { projects } from '../../data/projects'
import type { Project } from '../../types'
import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'
import { PartnerLogos } from '../ui/PartnerLogos'
import { RevealWrapper } from '../ui/RevealWrapper'
import { SectionHeader } from '../ui/SectionHeader'
import { Tag } from '../ui/Tag'
import { TiltCard } from '../ui/TiltCard'

type Filter = 'all' | Project['category']

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'ai-medical', label: 'AI & Medical' },
  { id: 'engineering', label: 'Engineering' },
  { id: 'software', label: 'Software' },
]

function strip(s: string): string {
  return s.replace(/^TODO:\s*/, '')
}

function spanClasses(p: Project): string {
  if (p.featured) return 'md:col-span-4 md:row-span-2'
  if (p.size === 'wide') return 'md:col-span-4 md:row-span-1'
  return 'md:col-span-3 md:row-span-1'
}

export function Projects() {
  const [filter, setFilter] = useState<Filter>('all')

  // Only show featured projects on the main page
  const visible = useMemo(
    () =>
      projects
        .filter((p) => !p.hidden && p.featured)
        .filter((p) => (filter === 'all' ? true : p.category === filter)),
    [filter]
  )

  return (
    <section
      id="projects"
      className="bg-white dark:bg-slate-900 py-24 scroll-mt-16 border-t border-slate-100 dark:border-slate-800"
    >
      <div className="max-w-5xl mx-auto px-6">
        <RevealWrapper>
          <SectionHeader label="Projects" title="Selected work." />
        </RevealWrapper>

        <RevealWrapper>
          <div className="flex flex-wrap gap-6 border-b border-slate-200 dark:border-slate-800 mb-8">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={clsx(
                  'relative -mb-px pb-2 text-sm transition-colors',
                  filter === f.id
                    ? 'text-teal-700 dark:text-teal-400 border-b-2 border-teal-600 dark:border-teal-400 font-medium'
                    : 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </RevealWrapper>

        {visible.length === 0 && (
          <p className="text-sm text-slate-400 dark:text-slate-500">
            No projects in this category yet.
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-6 auto-rows-[minmax(200px,auto)] gap-4">
          {visible.map((p, i) => (
            <RevealWrapper
              key={p.id}
              delay={i * 0.08}
              className={clsx('h-full', spanClasses(p))}
            >
              <TiltCard className="h-full">
                <Card className="h-full flex flex-col">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-400 border-teal-100 dark:border-teal-900">
                        ★ Featured
                      </Badge>
                      <span className="text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500">
                        {p.category === 'ai-medical'
                          ? 'AI & Medical'
                          : p.category === 'engineering'
                          ? 'Engineering'
                          : 'Software'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {p.repoUrl && !p.repoUrl.startsWith('TODO:') && (
                        <a
                          href={p.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Repository"
                          className="text-slate-400 hover:text-teal-700 dark:hover:text-teal-400 transition-colors"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {p.demoUrl && !p.demoUrl.startsWith('TODO:') && (
                        <a
                          href={p.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Live demo"
                          className="text-slate-400 hover:text-teal-700 dark:hover:text-teal-400 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                  <h3
                    className={clsx(
                      'font-medium text-slate-900 dark:text-slate-100 leading-snug',
                      p.featured ? 'text-lg' : 'text-base'
                    )}
                  >
                    {strip(p.title)}
                  </h3>
                  <p className="text-[14px] text-slate-600 dark:text-slate-400 mt-2 leading-relaxed flex-1">
                    {strip(p.description)}
                  </p>
                  {p.partners && p.partners.length > 0 && (
                    <PartnerLogos partners={p.partners} className="mt-3" />
                  )}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {p.tags.map((t) => (
                      <Tag key={t} label={strip(t)} />
                    ))}
                  </div>
                </Card>
              </TiltCard>
            </RevealWrapper>
          ))}
        </div>

        {/* View all CTA */}
        <RevealWrapper delay={0.2}>
          <div className="mt-10 text-center">
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-teal-700 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 transition-colors"
            >
              View all projects
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </RevealWrapper>
      </div>
    </section>
  )
}
