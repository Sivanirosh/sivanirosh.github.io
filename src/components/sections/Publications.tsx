import clsx from 'clsx'
import { ExternalLink, FileText } from 'lucide-react'
import { useMemo, useState } from 'react'
import { publications } from '../../data/publications'
import type { Publication } from '../../types'
import { RevealWrapper } from '../ui/RevealWrapper'
import { SectionHeader } from '../ui/SectionHeader'

type Filter = 'all' | Publication['venueType']

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'journal', label: 'Journal' },
  { id: 'conference', label: 'Conference' },
  { id: 'preprint', label: 'Preprint' },
]

function strip(value: string): string {
  return value.replace(/^TODO:\s*/, '')
}

export function Publications() {
  const [filter, setFilter] = useState<Filter>('all')
  const sorted = useMemo(() => {
    const visible =
      filter === 'all' ? publications : publications.filter((publication) => publication.venueType === filter)
    return [...visible].sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1
      return b.year - a.year
    })
  }, [filter])

  return (
    <section
      id="publications"
      className="scroll-mt-16 border-t border-slate-200 bg-slate-50 py-24 dark:border-slate-800 dark:bg-slate-950"
    >
      <div className="mx-auto max-w-6xl px-6">
        <RevealWrapper>
          <SectionHeader label="Publications" title="Peer-reviewed work." />
        </RevealWrapper>

        <RevealWrapper>
          <div className="mb-8 flex flex-wrap gap-2">
            {FILTERS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                aria-pressed={filter === item.id}
                className={clsx(
                  'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  filter === item.id
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                    : 'text-slate-500 hover:bg-slate-200/70 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white'
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </RevealWrapper>

        <ol className="border-y border-slate-200 dark:border-slate-800">
          {sorted.map((publication, index) => (
            <RevealWrapper key={publication.id} as="li" delay={index * 0.08}>
              <article className="grid gap-4 border-b border-slate-200 py-8 last:border-b-0 md:grid-cols-12 md:gap-8 dark:border-slate-800">
                <p className="font-mono text-xs font-medium uppercase tracking-wider text-teal-700 md:col-span-2 dark:text-teal-400">
                  {publication.venueType} · {publication.year}
                </p>
                <div className="md:col-span-10">
                  <h3 className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white">
                    {publication.doi ? (
                      <a
                        href={publication.doi}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-baseline gap-1 transition-colors hover:text-teal-700 dark:hover:text-teal-400"
                      >
                        {strip(publication.title)}
                        <ExternalLink aria-hidden className="h-3.5 w-3.5" />
                      </a>
                    ) : (
                      strip(publication.title)
                    )}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {publication.authors.map((author, authorIndex) => (
                      <span key={`${publication.id}-${author.name}`}>
                        <span className={clsx(author.isSelf && 'font-semibold text-slate-950 dark:text-white')}>
                          {strip(author.name)}
                        </span>
                        {authorIndex < publication.authors.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </p>
                  <p className="mt-1 text-sm italic text-slate-500 dark:text-slate-400">
                    {strip(publication.venue)}
                  </p>
                  {publication.pdfUrl && (
                    <a
                      href={publication.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 transition-colors hover:text-teal-700 dark:text-slate-300 dark:hover:text-teal-400"
                    >
                      <FileText aria-hidden className="h-4 w-4" /> PDF
                    </a>
                  )}
                </div>
              </article>
            </RevealWrapper>
          ))}
        </ol>
      </div>
    </section>
  )
}
