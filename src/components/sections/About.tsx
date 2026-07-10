import { profile } from '../../data/profile'
import { RevealWrapper } from '../ui/RevealWrapper'
import { SectionHeader } from '../ui/SectionHeader'

function strip(value: string): string {
  return value.replace(/^TODO:\s*/, '')
}

export function About() {
  return (
    <section
      id="about"
      className="scroll-mt-16 border-t border-slate-100 bg-white py-24 dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="mx-auto max-w-6xl px-6">
        <RevealWrapper>
          <SectionHeader
            label="Profile"
            title="Engineering depth with product range."
            description="A cross-disciplinary practice grounded in physical systems, rigorous AI research, and software that is designed to be used."
          />
        </RevealWrapper>

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <RevealWrapper className="space-y-5 lg:col-span-7">
            {profile.about.map((paragraph) => (
              <p
                key={paragraph}
                className="max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300"
              >
                {strip(paragraph)}
              </p>
            ))}
          </RevealWrapper>

          <RevealWrapper delay={0.1} className="lg:col-span-5">
            <p className="font-mono text-xs font-medium uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Core practice
            </p>
            <ol className="mt-4 border-t border-slate-200 dark:border-slate-800">
              {profile.focusAreas.map((area, index) => (
                <li
                  key={area.title}
                  className="grid grid-cols-[2rem_1fr] gap-4 border-b border-slate-200 py-5 dark:border-slate-800"
                >
                  <span className="font-mono text-xs text-teal-700 dark:text-teal-400">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-950 dark:text-white">
                      {area.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                      {area.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </RevealWrapper>
        </div>
      </div>
    </section>
  )
}
