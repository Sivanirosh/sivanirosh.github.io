import { education } from '../../data/education'
import { AwardBadge } from '../ui/Badge'
import { Card } from '../ui/Card'
import { RevealWrapper } from '../ui/RevealWrapper'
import { SectionHeader } from '../ui/SectionHeader'
import { TimelineNode } from '../ui/TimelineNode'

function strip(s: string): string {
  return s.replace(/^TODO:\s*/, '')
}

export function Timeline() {
  return (
    <section id="timeline" className="bg-slate-50 dark:bg-slate-950 py-24 scroll-mt-16 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-5xl mx-auto px-6">
        <RevealWrapper>
          <SectionHeader label="Education" title="Academic trajectory." />
        </RevealWrapper>

        <ol className="relative space-y-8">
          {education.map((e, i) => (
            <RevealWrapper
              key={e.id}
              as="li"
              delay={i * 0.1}
              className="relative pl-10"
            >
              <TimelineNode isLast={i === education.length - 1} />
              <Card>
                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 mb-2">
                  <p className="text-xs uppercase tracking-widest text-teal-700 dark:text-teal-400">
                    {e.startYear} — {e.endYear === 'present' ? 'present' : e.endYear}
                  </p>
                  {e.award && <AwardBadge label={e.award} />}
                </div>
                <h3 className="text-base font-medium text-slate-900 dark:text-slate-100">
                  {strip(e.degree)} · {strip(e.field)}
                </h3>
                <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">
                  {strip(e.institution)}
                  {e.location ? ` — ${strip(e.location)}` : ''}
                </p>
                {e.description && (
                  <p className="text-[15px] text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
                    {strip(e.description)}
                  </p>
                )}
              </Card>
            </RevealWrapper>
          ))}
        </ol>
      </div>
    </section>
  )
}
