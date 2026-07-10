import { ArrowUpRight } from 'lucide-react'
import { certificates } from '../../data/certificates'
import { RevealWrapper } from '../ui/RevealWrapper'
import { SectionHeader } from '../ui/SectionHeader'

function strip(value: string): string {
  return value.replace(/^TODO:\s*/, '')
}

export function Certificates() {
  const sortedCertificates = [...certificates].sort((a, b) => b.year - a.year)

  return (
    <section
      id="certificates"
      className="scroll-mt-16 border-t border-slate-100 bg-white py-24 dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="mx-auto max-w-6xl px-6">
        <RevealWrapper>
          <SectionHeader
            label="Credentials"
            title="Continuous, applied learning."
            description="Selected certificates that complement formal education and project-based practice."
          />
        </RevealWrapper>

        {sortedCertificates.length === 0 ? (
          <p className="text-sm text-slate-400 dark:text-slate-500">No certificates to show yet.</p>
        ) : (
          <div className="grid gap-x-10 md:grid-cols-2">
            {sortedCertificates.map((certificate, index) => {
              const content = (
                <>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
                    {certificate.logoUrl && !certificate.logoUrl.startsWith('TODO:') ? (
                      <img
                        src={certificate.logoUrl}
                        alt={`${strip(certificate.issuer)} logo`}
                        loading="lazy"
                        className="h-full w-full object-contain p-1.5"
                      />
                    ) : (
                      <span
                        aria-hidden
                        className="h-4 w-4 rounded-full"
                        style={{ backgroundColor: certificate.platformColor }}
                      />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-xs text-slate-400 dark:text-slate-500">
                      {certificate.year} · {strip(certificate.platform)}
                    </p>
                    <h3 className="mt-1 text-sm font-semibold leading-snug text-slate-950 dark:text-white">
                      {strip(certificate.title)}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {strip(certificate.issuer)}
                    </p>
                  </div>
                  {certificate.credentialUrl && !certificate.credentialUrl.startsWith('TODO:') && (
                    <ArrowUpRight
                      aria-hidden
                      className="h-4 w-4 shrink-0 text-slate-400 transition-colors group-hover:text-teal-700 dark:group-hover:text-teal-400"
                    />
                  )}
                </>
              )

              return (
                <RevealWrapper key={certificate.id} delay={index * 0.06}>
                  {certificate.credentialUrl && !certificate.credentialUrl.startsWith('TODO:') ? (
                    <a
                      href={certificate.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-4 border-t border-slate-200 py-6 transition-colors hover:border-teal-600 dark:border-slate-800 dark:hover:border-teal-400"
                    >
                      {content}
                    </a>
                  ) : (
                    <article className="flex items-start gap-4 border-t border-slate-200 py-6 dark:border-slate-800">
                      {content}
                    </article>
                  )}
                </RevealWrapper>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
