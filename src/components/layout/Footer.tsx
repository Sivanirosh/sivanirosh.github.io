import { BookOpen, Github, Linkedin, Mail } from 'lucide-react'
import { profile } from '../../data/profile'

export function Footer() {
  const year = new Date().getFullYear()
  const displayName = profile.name.replace(/^TODO:\s*/, '')

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 border-t border-slate-800">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <p className="text-sm text-white font-medium">{displayName}</p>
          <p className="text-xs text-slate-400 mt-1">
            © {year} · Engineered precision, medical purpose.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {profile.email && !profile.email.startsWith('TODO:') && (
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-slate-800 hover:bg-teal-600 transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
          )}
          {profile.github && (
            <a
              href={profile.github.startsWith('TODO:') ? '#' : profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-slate-800 hover:bg-teal-600 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {profile.linkedin && (
            <a
              href={profile.linkedin.startsWith('TODO:') ? '#' : profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-slate-800 hover:bg-teal-600 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          )}
          {profile.featuredLink && (
            <a
              href={profile.featuredLink.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${profile.featuredLink.label} learning blog`}
              className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-slate-800 hover:bg-teal-600 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </footer>
  )
}
