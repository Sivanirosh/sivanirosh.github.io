import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, X } from 'lucide-react'
import type { Project } from '../../types'
import { Tag } from './Tag'

interface Props {
  project: Project | null
  onClose: () => void
}

function formatYearRange(project: Project): string {
  const start = String(project.startYear)
  if (project.endYear === 'ongoing') return `${start}–present`
  return `${start}–${project.endYear}`
}

export function ProjectModal({ project, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const prevFocus = useRef<HTMLElement | null>(null)

  const isOpen = project !== null

  useEffect(() => {
    if (isOpen) {
      prevFocus.current = document.activeElement as HTMLElement
      document.body.style.overflow = 'hidden'
      // Focus the close button after animation
      setTimeout(() => closeRef.current?.focus(), 100)
    } else {
      document.body.style.overflow = ''
      prevFocus.current?.focus()
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  const p = project

  return (
    <AnimatePresence>
      {p && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-20 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />

          {/* Modal panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 p-6 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3 min-w-0">
                {p.imageUrl ? (
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    className="w-12 h-12 rounded-lg object-cover shrink-0"
                  />
                ) : (
                  <span className="w-12 h-12 rounded-lg bg-teal-100 dark:bg-teal-900 flex items-center justify-center text-sm font-semibold text-teal-700 dark:text-teal-300 shrink-0">
                    {p.title
                      .replace(/[—–-].*$/, '')
                      .split(/\s+/)
                      .slice(0, 2)
                      .map((w) => w[0])
                      .join('')
                      .toUpperCase()
                      .replace(/[^A-Z]/g, '')}
                  </span>
                )}
                <div className="min-w-0">
                  <h2
                    id="project-modal-title"
                    className="text-lg font-semibold text-slate-900 dark:text-slate-100 leading-snug"
                  >
                    {p.title}
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                    {p.role && <span>{p.role} · </span>}
                    {formatYearRange(p)}
                    <span className="mx-1.5">·</span>
                    {p.category === 'ai-medical'
                      ? 'AI & Medical'
                      : p.category === 'engineering'
                      ? 'Engineering'
                      : 'Software'}
                  </p>
                </div>
              </div>
              <button
                ref={closeRef}
                onClick={onClose}
                aria-label="Close"
                className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
              {/* Long description */}
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {p.longDescription || p.description}
              </p>

              {/* Highlights */}
              {p.highlights && p.highlights.length > 0 && (
                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">
                    Key outcomes
                  </p>
                  <ul className="space-y-1.5">
                    {p.highlights.map((h, i) => (
                      <li
                        key={i}
                        className="relative pl-4 text-sm text-slate-700 dark:text-slate-300 leading-relaxed"
                      >
                        <span
                          aria-hidden
                          className="absolute left-0 top-[7px] w-1.5 h-1.5 rounded-full bg-teal-500 dark:bg-teal-400"
                        />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Partners */}
              {p.partners && p.partners.length > 0 && (
                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">
                    Partners
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {p.partners.map((partner) => {
                      const inner = partner.logoUrl ? (
                        <img
                          src={partner.logoUrl}
                          alt={partner.name}
                          className="h-8 w-auto max-w-[120px] object-contain rounded"
                          loading="lazy"
                        />
                      ) : (
                        <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                          {partner.name}
                        </span>
                      )
                      return partner.url ? (
                        <a
                          key={partner.name}
                          href={partner.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 hover:opacity-80 transition-opacity"
                          title={partner.name}
                        >
                          {inner}
                        </a>
                      ) : (
                        <span key={partner.name} className="inline-flex items-center gap-1">
                          {inner}
                        </span>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Videos */}
              {p.videos && p.videos.length > 0 && (
                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">
                    Videos
                  </p>
                  <ul className="space-y-1">
                    {p.videos.map((v, i) => (
                      <li key={i}>
                        <a
                          href={v.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm text-teal-700 dark:text-teal-400 hover:underline"
                        >
                          <span>{v.label}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <Tag key={t} label={t} />
                ))}
              </div>

              {/* Action links */}
              <div className="flex flex-wrap gap-2 pt-1">
                {p.repoUrl && (
                  <a
                    href={p.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 px-3 py-1.5 rounded-lg hover:border-teal-600 hover:text-teal-700 dark:hover:text-teal-400 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    Source
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {p.demoUrl && (
                  <a
                    href={p.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 px-3 py-1.5 rounded-lg hover:border-teal-600 hover:text-teal-700 dark:hover:text-teal-400 transition-colors"
                  >
                    Live demo
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
