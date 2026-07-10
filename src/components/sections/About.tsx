import { profile } from '../../data/profile'
import { RevealWrapper } from '../ui/RevealWrapper'
import { SectionHeader } from '../ui/SectionHeader'

function strip(s: string): string {
  return s.replace(/^TODO:\s*/, '')
}

export function About() {
  return (
    <section id="about" className="bg-white dark:bg-slate-900 py-24 scroll-mt-16 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-5xl mx-auto px-6">
        <RevealWrapper>
          <SectionHeader label="About" title="Engineering rigour, medical purpose." />
        </RevealWrapper>

        <div className="grid md:grid-cols-3 gap-10">
          <RevealWrapper className="md:col-span-2 space-y-5 max-w-2xl">
            {profile.about.map((p, i) => (
              <p key={i} className="text-[15px] text-slate-700 dark:text-slate-300 leading-relaxed text-justify hyphens-auto">
                {strip(p)}
              </p>
            ))}
          </RevealWrapper>

          <RevealWrapper delay={0.1}>
            <dl className="space-y-6 border-l border-slate-200 dark:border-slate-800 pl-5 text-sm">
              {profile.location && (
                <div>
                  <dt className="text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500">
                    Based in
                  </dt>
                  <dd className="mt-1 text-slate-900 dark:text-slate-100">{strip(profile.location)}</dd>
                </div>
              )}
              <div>
                <dt className="text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500">
                  Focus
                </dt>
                <dd className="mt-1 text-slate-900 dark:text-slate-100">{strip(profile.title)}</dd>
              </div>
            </dl>
          </RevealWrapper>
        </div>
      </div>
    </section>
  )
}
