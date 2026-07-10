import { education } from '../../data/education'
import { AwardBadge } from '../ui/Badge'
import { RevealWrapper } from '../ui/RevealWrapper'
import { SectionHeader } from '../ui/SectionHeader'

function strip(value: string): string {
  return value.replace(/^TODO:\s*/, '')
}

export function Timeline() {
  return (
    <section
      id="timeline"
      className="scroll-mt-16 border-t border-slate-200 bg-slate-50 py-24 dark:border-slate-800 dark:bg-slate-950"
    >
      <div className="mx-auto max-w-6xl px-6">
        <RevealWrapper>
          <SectionHeader
            label="Education"
            title="A multidisciplinary foundation."
            description="Formal training spanning mechanical engineering, artificial intelligence in medicine, and economics."
          />
        </RevealWrapper>

        <ol className="border-y border-slate-200 dark:border-slate-800">
          {education.map((entry, index) => (
            <RevealWrapper key={entry.id} as="li" delay={index * 0.08}>
              <article className="grid gap-4 border-b border-slate-200 py-8 last:border-b-0 md:grid-cols-12 md:gap-8 dark:border-slate-800">
                <div className="md:col-span-3">
                  <p className="font-mono text-xs font-medium uppercase tracking-wider text-teal-700 dark:text-teal-400">
                    {entry.startYear} — {entry.endYear === 'present' ? 'present' : entry.endYear}
                  </p>
                  {entry.location && (
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                      {strip(entry.location)}
                    </p>
                  )}
                </div>

                <div className="md:col-span-9">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white">
                        {strip(entry.degree)} · {strip(entry.field)}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        {strip(entry.institution)}
                      </p>
                    </div>
                    {entry.award && <AwardBadge label={entry.award} />}
                  </div>
                  {entry.description && (
                    <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
                      {strip(entry.description)}
                    </p>
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
