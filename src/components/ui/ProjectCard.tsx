import clsx from 'clsx'
import { ArrowRight, ExternalLink, Github } from 'lucide-react'
import type { Project } from '../../types'
import { formatProjectYears, projectCategoryLabel } from './projectMeta'
import { Tag } from './Tag'

interface Props {
  project: Project
  index: number
  variant?: 'showcase' | 'catalog'
  onOpen: (project: Project) => void
}

function ProjectActions({ project }: { project: Project }) {
  if (!project.repoUrl && !project.demoUrl) return null

  return (
    <div className="flex items-center gap-4">
      {project.repoUrl && (
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-teal-700 dark:text-slate-400 dark:hover:text-teal-400"
        >
          <Github aria-hidden className="h-4 w-4" />
          Source
        </a>
      )}
      {project.demoUrl && (
        <a
          href={project.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-teal-700 dark:text-slate-400 dark:hover:text-teal-400"
        >
          Demo
          <ExternalLink aria-hidden className="h-3.5 w-3.5" />
        </a>
      )}
    </div>
  )
}

export function ProjectCard({ project, index, variant = 'catalog', onOpen }: Props) {
  if (variant === 'showcase') {
    return (
      <article className="grid gap-6 border-t border-slate-200 py-10 md:grid-cols-12 md:gap-8 dark:border-slate-800">
        <div className="md:col-span-2">
          <p className="font-mono text-xs text-slate-400 dark:text-slate-500">
            {String(index + 1).padStart(2, '0')}
          </p>
          <p className="mt-3 text-xs font-medium uppercase tracking-widest text-teal-700 dark:text-teal-400">
            {projectCategoryLabel(project.category)}
          </p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {formatProjectYears(project)}
          </p>
        </div>

        <div className="md:col-span-6">
          {project.role && (
            <p className="mb-2 font-mono text-xs text-slate-500 dark:text-slate-400">
              {project.role}
            </p>
          )}
          <h3 className="text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl dark:text-white">
            {project.title}
          </h3>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
            {project.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
            <button
              type="button"
              onClick={() => onOpen(project)}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition-colors hover:text-teal-700 dark:text-white dark:hover:text-teal-400"
            >
              View case study
              <ArrowRight
                aria-hidden
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              />
            </button>
            <ProjectActions project={project} />
          </div>
        </div>

        <div className="md:col-span-4 md:border-l md:border-slate-200 md:pl-8 dark:md:border-slate-800">
          {project.highlights && project.highlights.length > 0 && (
            <>
              <p className="font-mono text-xs font-medium uppercase tracking-widest text-slate-400 dark:text-slate-500">
                Evidence
              </p>
              <ul className="mt-3 space-y-3">
                {project.highlights.slice(0, 2).map((highlight) => (
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
            </>
          )}
          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 4).map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
        </div>
      </article>
    )
  }

  return (
    <article
      className={clsx(
        'group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-soft',
        'transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-900/5',
        'dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:shadow-black/20'
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs font-medium uppercase tracking-widest text-teal-700 dark:text-teal-400">
            {projectCategoryLabel(project.category)}
          </p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {formatProjectYears(project)}
          </p>
        </div>
        <span className="font-mono text-xs text-slate-300 dark:text-slate-600">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <h2 className="mt-5 text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
        {project.title}
      </h2>
      {project.role && (
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{project.role}</p>
      )}
      <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        {project.description}
      </p>

      {project.highlights?.[0] && (
        <p className="mt-5 border-l-2 border-teal-600/60 pl-3 text-sm leading-relaxed text-slate-600 dark:border-teal-400/60 dark:text-slate-300">
          {project.highlights[0]}
        </p>
      )}

      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.tags.slice(0, 4).map((tag) => (
          <Tag key={tag} label={tag} />
        ))}
        {project.tags.length > 4 && (
          <span className="self-center font-mono text-xs text-slate-400 dark:text-slate-500">
            +{project.tags.length - 4}
          </span>
        )}
      </div>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-6 dark:border-slate-800">
        <button
          type="button"
          onClick={() => onOpen(project)}
          className="group/button inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition-colors hover:text-teal-700 dark:text-white dark:hover:text-teal-400"
        >
          View case study
          <ArrowRight
            aria-hidden
            className="h-4 w-4 transition-transform group-hover/button:translate-x-0.5"
          />
        </button>
        <ProjectActions project={project} />
      </div>
    </article>
  )
}
