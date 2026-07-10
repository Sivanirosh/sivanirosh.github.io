import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, ExternalLink, Github, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import type { Project } from '../../types'
import { formatProjectYears, projectCategoryLabel } from './projectMeta'
import { Tag } from './Tag'

interface Props {
  project: Project | null
  onClose: () => void
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function ProjectModal({ project, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const previousFocus = useRef<HTMLElement | null>(null)
  const reduceMotion = useReducedMotion() ?? false
  const isOpen = project !== null

  useEffect(() => {
    if (!isOpen) return

    previousFocus.current = document.activeElement as HTMLElement
    document.body.style.overflow = 'hidden'
    const frame = window.requestAnimationFrame(() => closeRef.current?.focus())

    return () => {
      window.cancelAnimationFrame(frame)
      document.body.style.overflow = ''
      previousFocus.current?.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key !== 'Tab' || !panelRef.current) return
      const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 pt-12 sm:p-8 sm:pt-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            aria-describedby="project-modal-description"
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.98, y: reduceMotion ? 0 : 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.98, y: reduceMotion ? 0 : 16 }}
            transition={{ duration: reduceMotion ? 0 : 0.24, ease: 'easeOut' }}
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close project case study"
              className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/90 text-slate-500 shadow-soft transition-colors hover:bg-slate-100 hover:text-slate-950 dark:bg-slate-900/90 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <X aria-hidden className="h-4 w-4" />
            </button>

            <header className="border-b border-slate-200 bg-slate-50 px-6 py-8 pr-16 sm:px-10 sm:py-10 dark:border-slate-800 dark:bg-slate-950">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs">
                <span className="font-medium uppercase tracking-widest text-teal-700 dark:text-teal-400">
                  {projectCategoryLabel(project.category)}
                </span>
                <span className="text-slate-400 dark:text-slate-500">
                  {formatProjectYears(project)}
                </span>
                {project.role && (
                  <span className="text-slate-500 dark:text-slate-400">{project.role}</span>
                )}
              </div>
              <h2
                id="project-modal-title"
                className="mt-5 max-w-3xl text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl dark:text-white"
              >
                {project.title}
              </h2>
            </header>

            <div className="max-h-[70vh] overflow-y-auto px-6 py-8 sm:px-10 sm:py-10">
              <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
                <div>
                  <p className="font-mono text-xs font-medium uppercase tracking-widest text-slate-400 dark:text-slate-500">
                    Project overview
                  </p>
                  <p
                    id="project-modal-description"
                    className="mt-4 text-[15px] leading-7 text-slate-600 dark:text-slate-300"
                  >
                    {project.longDescription || project.description}
                  </p>

                  {project.partners && project.partners.length > 0 && (
                    <div className="mt-9 border-t border-slate-200 pt-7 dark:border-slate-800">
                      <p className="font-mono text-xs font-medium uppercase tracking-widest text-slate-400 dark:text-slate-500">
                        Partners
                      </p>
                      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-4">
                        {project.partners.map((partner) => {
                          const content = partner.logoUrl ? (
                            <img
                              src={partner.logoUrl}
                              alt={partner.name}
                              className="h-8 w-auto max-w-[110px] object-contain"
                              loading="lazy"
                            />
                          ) : (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                              {partner.name}
                            </span>
                          )

                          return partner.url ? (
                            <a
                              key={partner.name}
                              href={partner.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              title={partner.name}
                              className="opacity-75 grayscale transition hover:opacity-100 hover:grayscale-0"
                            >
                              {content}
                            </a>
                          ) : (
                            <span key={partner.name}>{content}</span>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {project.videos && project.videos.length > 0 && (
                    <div className="mt-8">
                      <p className="font-mono text-xs font-medium uppercase tracking-widest text-slate-400 dark:text-slate-500">
                        Videos
                      </p>
                      <div className="mt-3 flex flex-wrap gap-4">
                        {project.videos.map((video) => (
                          <a
                            key={video.url}
                            href={video.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 transition-colors hover:text-teal-700 dark:text-slate-200 dark:hover:text-teal-400"
                          >
                            {video.label}
                            <ExternalLink aria-hidden className="h-3.5 w-3.5" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <aside className="rounded-xl bg-slate-50 p-5 dark:bg-slate-950">
                  <p className="font-mono text-xs font-medium uppercase tracking-widest text-slate-400 dark:text-slate-500">
                    Key outcomes
                  </p>
                  {project.highlights && project.highlights.length > 0 ? (
                    <ul className="mt-4 space-y-4">
                      {project.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="relative pl-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300"
                        >
                          <span
                            aria-hidden
                            className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-teal-600 dark:bg-teal-400"
                          />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {project.description}
                    </p>
                  )}
                </aside>
              </div>

              <div className="mt-10 flex flex-col gap-6 border-t border-slate-200 pt-7 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <Tag key={tag} label={tag} />
                  ))}
                </div>

                <div className="flex shrink-0 flex-wrap gap-3">
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-500 hover:text-slate-950 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:text-white"
                    >
                      <Github aria-hidden className="h-4 w-4" /> Source
                      <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-700 dark:bg-white dark:text-slate-950 dark:hover:bg-teal-300"
                    >
                      Demo / presentation
                      <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
