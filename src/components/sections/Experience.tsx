import { ExternalLink } from 'lucide-react'
import { experience } from '../../data/experience'
import { Card } from '../ui/Card'
import { RevealWrapper } from '../ui/RevealWrapper'
import { SectionHeader } from '../ui/SectionHeader'
import { Tag } from '../ui/Tag'

function strip(s: string): string {
  return s.replace(/^TODO:\s*/, '')
}

function initials(name: string): string {
  return strip(name)
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

export function Experience() {
  return (
    <section id="experience" className="bg-white dark:bg-slate-900 py-24 scroll-mt-16 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-5xl mx-auto px-6">
        <RevealWrapper>
          <SectionHeader label="Experience" title="Where the work has happened." />
        </RevealWrapper>

        <div className="relative">
          <div
            aria-hidden
            className="absolute left-5 top-8 bottom-8 w-px bg-teal-200 dark:bg-teal-900 hidden md:block"
          />

          <ol className="space-y-6">
            {experience.map((job, i) => (
              <RevealWrapper key={job.id} as="li" delay={i * 0.1} className="relative md:pl-14">
                <div
                  aria-hidden
                  className="absolute left-[14px] top-6 w-3.5 h-3.5 rounded-full border-2 border-teal-500 dark:border-teal-400 bg-white dark:bg-slate-900 hidden md:block"
                />

                <Card>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                      {job.logoUrl && !job.logoUrl.startsWith('TODO:') ? (
                        <img
                          src={job.logoUrl}
                          alt={`${strip(job.company)} logo`}
                          loading="lazy"
                          className="w-full h-full object-contain p-1"
                        />
                      ) : (
                        <span className="text-sm font-semibold text-teal-700 dark:text-teal-400">
                          {initials(job.company)}
                        </span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-0.5">
                        <div>
                          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 leading-snug">
                            {strip(job.role)}
                          </h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                            {job.companyUrl && !job.companyUrl.startsWith('TODO:') ? (
                              <a
                                href={job.companyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 hover:text-teal-700 dark:hover:text-teal-400 transition-colors"
                              >
                                {strip(job.company)}
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            ) : (
                              strip(job.company)
                            )}
                            {job.location ? ` · ${strip(job.location)}` : ''}
                          </p>
                        </div>
                        <p className="text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500 whitespace-nowrap pt-0.5">
                          {job.startDate} — {job.endDate === 'present' ? 'present' : job.endDate}
                        </p>
                      </div>

                      <ul className="mt-3 space-y-2">
                        {job.achievements.map((a, idx) => (
                          <li
                            key={idx}
                            className="relative pl-4 text-[15px] text-slate-700 dark:text-slate-300 leading-relaxed text-justify hyphens-auto"
                          >
                            <span
                              aria-hidden
                              className="absolute left-0 top-[10px] w-1.5 h-1.5 rounded-full bg-teal-500 dark:bg-teal-400"
                            />
                            {strip(a)}
                          </li>
                        ))}
                      </ul>

                      {job.tech.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-4">
                          {job.tech.map((t) => (
                            <Tag key={t} label={strip(t)} />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </RevealWrapper>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
