import { profile } from '../../data/profile'
import { RevealWrapper } from '../ui/RevealWrapper'
import { SectionHeader } from '../ui/SectionHeader'

function strip(s: string): string {
  return s.replace(/^TODO:\s*/, '')
}

export function About() {
  return (
    <section id="about" className="bg-white dark:bg-slate-900 py-24 scroll-mt-16">
      <div className="max-w-5xl mx-auto px-6">
        <RevealWrapper>
          <SectionHeader label="About" title="Engineering rigour, medical purpose." />
        </RevealWrapper>

        <div className="grid md:grid-cols-3 gap-10">
          <RevealWrapper className="md:col-span-2 space-y-5 max-w-2xl">
            {profile.about.map((p, i) => (
              <p key={i} className="text-[15px] text-slate-700 dark:text-slate-300 leading-relaxed">
                {strip(p)}
              </p>
            ))}
          </RevealWrapper>

          <RevealWrapper delay={0.1}>
            <div className="space-y-5 text-sm">
              {profile.location && (
                <div>
                  <p className="text-[11px] uppercase tracking-widest text-slate-400 dark:text-slate-500">
                    Based in
                  </p>
                  <p className="mt-1 text-slate-900 dark:text-slate-100">{strip(profile.location)}</p>
                </div>
              )}
              <div>
                <p className="text-[11px] uppercase tracking-widest text-slate-400 dark:text-slate-500">
                  Focus
                </p>
                <p className="mt-1 text-slate-900 dark:text-slate-100">{strip(profile.title)}</p>
              </div>
              {profile.awards[0] && (
                <div>
                  <p className="text-[11px] uppercase tracking-widest text-slate-400 dark:text-slate-500">
                    Recognition
                  </p>
                  <p className="mt-1 text-slate-900 dark:text-slate-100">{profile.awards[0]}</p>
                </div>
              )}
            </div>
          </RevealWrapper>
        </div>
      </div>
    </section>
  )
}
