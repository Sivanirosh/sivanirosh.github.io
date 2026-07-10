import { ArrowUpRight, Download, Github, Linkedin, Mail } from 'lucide-react'
import { profile } from '../../data/profile'
import { RevealWrapper } from '../ui/RevealWrapper'

function strip(value: string): string {
  return value.replace(/^TODO:\s*/, '')
}

export function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-16 border-t border-slate-800 bg-slate-950 py-24 text-white"
    >
      <div className="mx-auto max-w-6xl px-6">
        <RevealWrapper className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="font-mono text-xs font-medium uppercase tracking-widest text-teal-400">
              Contact
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
              Build something rigorous and useful.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300">
              Open to AI, MedTech, engineering software, and research collaborations. The fastest way to reach me is by email.
            </p>
          </div>

          <div className="md:col-span-5 md:flex md:justify-end">
            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-teal-300"
              >
                <Mail aria-hidden className="h-4 w-4" />
                {strip(profile.email)}
              </a>
              <a
                href="/cv.pdf"
                download
                className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-200 transition-colors hover:border-slate-500 hover:text-white"
              >
                <Download aria-hidden className="h-4 w-4" /> Download CV
              </a>
            </div>
          </div>
        </RevealWrapper>

        <RevealWrapper delay={0.1} className="mt-14 flex flex-wrap gap-x-6 gap-y-3 border-t border-slate-800 pt-7">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-teal-400"
          >
            <Github aria-hidden className="h-4 w-4" /> GitHub
            <ArrowUpRight aria-hidden className="h-3 w-3" />
          </a>
          {profile.linkedin && (
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-teal-400"
            >
              <Linkedin aria-hidden className="h-4 w-4" /> LinkedIn
              <ArrowUpRight aria-hidden className="h-3 w-3" />
            </a>
          )}
          {profile.featuredLink && (
            <a
              href={profile.featuredLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-teal-400"
            >
              {profile.featuredLink.label}
              <ArrowUpRight aria-hidden className="h-3 w-3" />
            </a>
          )}
        </RevealWrapper>
      </div>
    </section>
  )
}
