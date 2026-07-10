import clsx from 'clsx'
import { ExternalLink, FileText } from 'lucide-react'
import { useMemo, useState } from 'react'
import { publications } from '../../data/publications'
import type { Publication } from '../../types'
import { Card } from '../ui/Card'
import { RevealWrapper } from '../ui/RevealWrapper'
import { SectionHeader } from '../ui/SectionHeader'

type Filter = 'all' | Publication['venueType']

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'journal', label: 'Journal' },
  { id: 'conference', label: 'Conference' },
  { id: 'preprint', label: 'Preprint' },
]

function strip(s: string): string {
  return s.replace(/^TODO:\s*/, '')
}

export function Publications() {
  const [filter, setFilter] = useState<Filter>('all')

  const sorted = useMemo(() => {
    const visible =
      filter === 'all' ? publications : publications.filter((p) => p.venueType === filter)
    return [...visible].sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1
      return b.year - a.year
    })
  }, [filter])

  return (
    <section id="publications" className="bg-slate-50 dark:bg-slate-950 py-24 scroll-mt-16 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-5xl mx-auto px-6">
        <RevealWrapper>
          <SectionHeader label="Publications" title="Peer-reviewed work." />
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

        {sorted.length === 0 && (
          <p className="text-sm text-slate-400 dark:text-slate-500">
            No publications in this category yet.
          </p>
        )}

        <ol className="space-y-4">
          {sorted.map((pub, i) => (
            <RevealWrapper key={pub.id} as="li" delay={i * 0.08}>
              <Card featured={pub.featured}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-2">
                  <p className="text-xs uppercase tracking-widest text-teal-700 dark:text-teal-400">
                    {pub.venueType} · {pub.year}
                  </p>
                </div>

                <h3 className="text-base font-medium text-slate-900 dark:text-slate-100 leading-snug">
                  {pub.doi && !pub.doi.startsWith('TODO:') ? (
                    <a
                      href={pub.doi}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-teal-700 dark:hover:text-teal-400 transition-colors inline-flex items-baseline gap-1"
                    >
                      {strip(pub.title)}
                      <ExternalLink className="w-3 h-3 translate-y-0.5" />
                    </a>
                  ) : (
                    strip(pub.title)
                  )}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed text-justify hyphens-auto">
                  {pub.authors.map((a, idx) => (
                    <span key={idx}>
                      <span
                        className={clsx(
                          a.isSelf && 'font-medium text-slate-900 dark:text-slate-100'
                        )}
                      >
                        {strip(a.name)}
                      </span>
                      {idx < pub.authors.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </p>

                <p className="text-sm text-slate-500 dark:text-slate-500 mt-1 italic">
                  {strip(pub.venue)}
                </p>

                {pub.pdfUrl && !pub.pdfUrl.startsWith('TODO:') && (
                  <a
                    href={pub.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs mt-3 text-slate-700 dark:text-slate-300 hover:text-teal-700 dark:hover:text-teal-400 transition-colors"
                  >
                    <FileText className="w-3 h-3" /> PDF
                  </a>
                )}
              </Card>
            </RevealWrapper>
          ))}
        </ol>
      </div>
    </section>
  )
}
