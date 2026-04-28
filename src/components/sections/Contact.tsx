import { Download, ExternalLink, Github, Linkedin, Mail } from 'lucide-react'
import { profile } from '../../data/profile'
import { RevealWrapper } from '../ui/RevealWrapper'
import { SectionHeader } from '../ui/SectionHeader'

function strip(s: string): string {
  return s.replace(/^TODO:\s*/, '')
}

function resolve(url: string): string | null {
  if (!url || url.startsWith('TODO:')) return null
  return url
}

export function Contact() {
  const emailOk = profile.email && !profile.email.startsWith('TODO:')
  const githubOk = resolve(profile.github)
  const linkedinOk = profile.linkedin ? resolve(profile.linkedin) : null
  const orcidOk = profile.orcid ? resolve(profile.orcid) : null

  return (
    <section id="contact" className="bg-white dark:bg-slate-900 py-24 scroll-mt-16">
      <div className="max-w-5xl mx-auto px-6">
        <RevealWrapper>
          <SectionHeader
            label="Contact"
            title="Let's talk."
            description="Open to research collaborations, MedTech / AI roles, and consulting. Fastest reply by email."
          />
        </RevealWrapper>

        <RevealWrapper className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            {emailOk && (
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 px-4 py-2 rounded-lg hover:border-teal-600 hover:text-teal-700 dark:hover:text-teal-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
                {strip(profile.email)}
              </a>
            )}
            {githubOk && (
              <a
                href={githubOk}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-teal-700 dark:hover:text-teal-400 transition-colors"
              >
                <Github className="w-4 h-4" /> GitHub <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {linkedinOk && (
              <a
                href={linkedinOk}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-teal-700 dark:hover:text-teal-400 transition-colors"
              >
                <Linkedin className="w-4 h-4" /> LinkedIn <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {orcidOk && (
              <a
                href={orcidOk}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-teal-700 dark:hover:text-teal-400 transition-colors"
              >
                ORCID <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          <a
            href="/cv.pdf"
            download
            className="group relative inline-flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium px-5 py-2.5 rounded-lg overflow-hidden"
          >
            <span
              aria-hidden
              className="absolute inset-0 bg-gradient-teal opacity-0 group-hover:opacity-[0.12] transition-opacity"
            />
            <Download className="relative w-4 h-4" />
            <span className="relative">Download CV</span>
          </a>
        </RevealWrapper>
      </div>
    </section>
  )
}
