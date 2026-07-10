import clsx from 'clsx'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { Footer } from '../components/layout/Footer'
import { Navbar } from '../components/layout/Navbar'
import { ProjectCard } from '../components/ui/ProjectCard'
import { ProjectModal } from '../components/ui/ProjectModal'
import { RevealWrapper } from '../components/ui/RevealWrapper'
import { ScrollProgress } from '../components/ui/ScrollProgress'
import { projects } from '../data/projects'
import type { Project } from '../types'

type CategoryFilter = 'all' | Project['category']
type StatusFilter = 'all' | 'ongoing' | 'completed'

const CATEGORIES: { id: CategoryFilter; label: string }[] = [
  { id: 'all', label: 'All work' },
  { id: 'ai-medical', label: 'AI & medical' },
  { id: 'engineering', label: 'Engineering' },
  { id: 'software', label: 'Software' },
]

const STATUSES: { id: StatusFilter; label: string }[] = [
  { id: 'all', label: 'Any status' },
  { id: 'ongoing', label: 'Ongoing' },
  { id: 'completed', label: 'Completed' },
]

function visibleProjects(category: CategoryFilter, status: StatusFilter): Project[] {
  return projects.filter((project) => {
    if (project.hidden) return false
    if (category !== 'all' && project.category !== category) return false
    if (status === 'ongoing' && project.endYear !== 'ongoing') return false
    if (status === 'completed' && project.endYear === 'ongoing') return false
    return true
  })
}

export default function PortfolioPage() {
  const reduceMotion = useReducedMotion() ?? false
  const [category, setCategory] = useState<CategoryFilter>('all')
  const [status, setStatus] = useState<StatusFilter>('all')
  const [selected, setSelected] = useState<Project | null>(null)

  const visible = useMemo(() => visibleProjects(category, status), [category, status])
  const allVisibleProjects = projects.filter((project) => !project.hidden)
  const ongoingCount = allVisibleProjects.filter((project) => project.endYear === 'ongoing').length
  const domainCount = new Set(allVisibleProjects.map((project) => project.category)).size

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className="min-h-screen bg-slate-50 pt-16 dark:bg-slate-950">
        <section className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
            <RevealWrapper>
              <p className="font-mono text-xs font-medium uppercase tracking-widest text-teal-700 dark:text-teal-400">
                Portfolio
              </p>
              <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 md:text-6xl dark:text-white">
                Projects and technical case studies.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                Research, engineering, and software products spanning medical imaging, predictive maintenance, developer tooling, and local-first applications.
              </p>
            </RevealWrapper>

            <RevealWrapper delay={0.1} className="mt-12 grid grid-cols-3 gap-4 border-t border-slate-200 pt-7 dark:border-slate-800">
              <div>
                <p className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
                  {allVisibleProjects.length}
                </p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Projects</p>
              </div>
              <div>
                <p className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
                  {domainCount}
                </p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Technical domains</p>
              </div>
              <div>
                <p className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
                  {ongoingCount}
                </p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Active builds</p>
              </div>
            </RevealWrapper>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <RevealWrapper>
            <div className="flex flex-col gap-6 border-b border-slate-200 pb-8 lg:flex-row lg:items-end lg:justify-between dark:border-slate-800">
              <div>
                <p className="font-mono text-xs font-medium uppercase tracking-widest text-slate-400 dark:text-slate-500">
                  Filter projects
                </p>
                <div className="mt-3 flex flex-wrap gap-2" aria-label="Filter by category">
                  {CATEGORIES.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setCategory(item.id)}
                      aria-pressed={category === item.id}
                      className={clsx(
                        'relative isolate overflow-hidden rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                        category === item.id
                          ? 'text-white dark:text-slate-950'
                          : 'bg-white text-slate-600 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
                      )}
                    >
                      {category === item.id && (
                        <motion.span
                          layoutId="active-category-filter"
                          aria-hidden
                          transition={
                            reduceMotion
                              ? { duration: 0 }
                              : { type: 'spring', stiffness: 500, damping: 38 }
                          }
                          className="absolute inset-0 -z-10 rounded-lg bg-slate-950 dark:bg-white"
                        />
                      )}
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2" aria-label="Filter by status">
                {STATUSES.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setStatus(item.id)}
                    aria-pressed={status === item.id}
                    className={clsx(
                      'relative isolate overflow-hidden rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                      status === item.id
                        ? 'text-teal-900 dark:text-teal-100'
                        : 'text-slate-500 hover:bg-white hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white'
                    )}
                  >
                    {status === item.id && (
                      <motion.span
                        layoutId="active-status-filter"
                        aria-hidden
                        transition={
                          reduceMotion
                            ? { duration: 0 }
                            : { type: 'spring', stiffness: 500, damping: 38 }
                        }
                        className="absolute inset-0 -z-10 rounded-lg bg-teal-100 dark:bg-teal-900"
                      />
                    )}
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </RevealWrapper>

          <p
            aria-live="polite"
            className="mt-6 font-mono text-xs text-slate-400 dark:text-slate-500"
          >
            {visible.length} {visible.length === 1 ? 'project' : 'projects'}
          </p>

          <motion.div layout={!reduceMotion} className="mt-6 grid items-stretch gap-5 lg:grid-cols-2">
            <AnimatePresence initial={false} mode="popLayout">
              {visible.length === 0 ? (
                <motion.p
                  key="empty-projects"
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.18 }}
                  className="col-span-full py-20 text-center text-sm text-slate-500 dark:text-slate-400"
                >
                  No projects match these filters.
                </motion.p>
              ) : (
                visible.map((project, index) => (
                  <motion.div
                    layout={!reduceMotion}
                    key={project.id}
                    initial={reduceMotion ? false : { opacity: 0, scale: 0.985 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={reduceMotion ? undefined : { opacity: 0, scale: 0.985 }}
                    transition={{ duration: reduceMotion ? 0 : 0.18, ease: 'easeOut' }}
                    className="h-full"
                  >
                    <RevealWrapper delay={index * 0.05} className="h-full">
                      <ProjectCard project={project} index={index} onOpen={setSelected} />
                    </RevealWrapper>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </motion.div>
        </section>
      </main>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
      <Footer />
    </>
  )
}
