import { ExternalLink } from 'lucide-react'
import { certificates } from '../../data/certificates'
import { Card } from '../ui/Card'
import { RevealWrapper } from '../ui/RevealWrapper'
import { SectionHeader } from '../ui/SectionHeader'
import { TiltCard } from '../ui/TiltCard'

function strip(s: string): string {
  return s.replace(/^TODO:\s*/, '')
}

export function Certificates() {
  return (
    <section id="certificates" className="bg-slate-50 dark:bg-slate-950 py-24 scroll-mt-16">
      <div className="max-w-5xl mx-auto px-6">
        <RevealWrapper>
          <SectionHeader label="Certificates" title="Continuous learning." />
        </RevealWrapper>

        {certificates.length === 0 && (
          <p className="text-sm text-slate-400 dark:text-slate-500">
            No certificates to show yet.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certificates.map((c, i) => (
            <RevealWrapper key={c.id} delay={i * 0.08} className="h-full">
              <TiltCard className="h-full" maxTilt={4}>
                <Card className="h-full p-4">
                  <div className="flex items-start gap-3">
                    {c.logoUrl && !c.logoUrl.startsWith('TODO:') ? (
                      <img
                        src={c.logoUrl}
                        alt={`${strip(c.platform)} logo`}
                        loading="lazy"
                        className="flex-shrink-0 w-8 h-8 rounded object-contain bg-white border border-slate-200 dark:border-slate-700 p-0.5"
                      />
                    ) : (
                      <span
                        aria-hidden
                        className="flex-shrink-0 inline-block w-8 h-8 rounded"
                        style={{ backgroundColor: c.platformColor }}
                      />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] uppercase tracking-widest text-slate-400 dark:text-slate-500">
                        {strip(c.platform)} · {c.year}
                      </p>
                      <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mt-1 leading-snug">
                        {strip(c.title)}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {strip(c.issuer)}
                      </p>
                      {c.credentialUrl && !c.credentialUrl.startsWith('TODO:') && (
                        <a
                          href={c.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 mt-2 text-xs text-teal-700 dark:text-teal-400 hover:underline"
                        >
                          View credential <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
              </TiltCard>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}
