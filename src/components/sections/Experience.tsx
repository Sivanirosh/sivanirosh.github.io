import { ExternalLink } from 'lucide-react'
import { experience } from '../../data/experience'
import { Card } from '../ui/Card'
import { RevealWrapper } from '../ui/RevealWrapper'
import { SectionHeader } from '../ui/SectionHeader'
import { Tag } from '../ui/Tag'

function strip(s: string): string {
  return s.replace(/^TODO:\s*/, '')
}

export function Experience() {
  return (
    <section id="experience" className="bg-white dark:bg-slate-900 py-24 scroll-mt-16">
      <div className="max-w-5xl mx-auto px-6">
        <RevealWrapper>
          <SectionHeader label="Experience" title="Where the work has happened." />
        </RevealWrapper>

        <ol className="space-y-6">
          {experience.map((job, i) => (
            <RevealWrapper key={job.id} as="li" delay={i * 0.1}>
              <Card>
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <div>
                    <h3 className="text-base font-medium text-slate-900 dark:text-slate-100">
                      {strip(job.role)}
                    </h3>
                    <p className="text-sm text-slate-700 dark:text-slate-300 mt-0.5">
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
                  <p className="text-[11px] uppercase tracking-widest text-slate-400 dark:text-slate-500">
                    {job.startDate} — {job.endDate === 'present' ? 'present' : job.endDate}
                  </p>
                </div>

                <ul className="mt-4 space-y-2">
                  {job.achievements.map((a, idx) => (
                    <li
                      key={idx}
                      className="relative pl-4 text-[15px] text-slate-700 dark:text-slate-300 leading-relaxed"
                    >
                      <span
                        aria-hidden
                        className="absolute left-0 top-2.5 w-1 h-1 rounded-full bg-teal-600 dark:bg-teal-400"
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
              </Card>
            </RevealWrapper>
          ))}
        </ol>
      </div>
    </section>
  )
}
