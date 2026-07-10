import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronDown, ExternalLink } from 'lucide-react'
import { useState } from 'react'
import { experience } from '../../data/experience'
import type { ExperienceEntry } from '../../types'
import { RevealWrapper } from '../ui/RevealWrapper'
import { SectionHeader } from '../ui/SectionHeader'
import { Tag } from '../ui/Tag'

function strip(value: string): string {
  return value.replace(/^TODO:\s*/, '')
}

function initials(name: string): string {
  return strip(name)
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase()
}

function ExperienceArticle({ job }: { job: ExperienceEntry }) {
  return (
    <article className="grid gap-5 py-9 md:grid-cols-12 md:gap-8">
      <div className="md:col-span-3">
        <p className="font-mono text-xs font-medium uppercase tracking-wider text-teal-700 dark:text-teal-400">
          {job.startDate} — {job.endDate === 'present' ? 'present' : job.endDate}
        </p>
        {job.location && (
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {strip(job.location)}
          </p>
        )}
      </div>

      <div className="md:col-span-9">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
            {job.logoUrl && !job.logoUrl.startsWith('TODO:') ? (
              <img
                src={job.logoUrl}
                alt={`${strip(job.company)} logo`}
                loading="lazy"
                className="h-full w-full object-contain p-1.5"
              />
            ) : (
              <span className="font-mono text-xs font-semibold text-teal-700 dark:text-teal-400">
                {initials(job.company)}
              </span>
            )}
          </div>

          <div className="min-w-0">
            <h3 className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white">
              {strip(job.role)}
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {job.companyUrl && !job.companyUrl.startsWith('TODO:') ? (
                <a
                  href={job.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 transition-colors hover:text-teal-700 dark:hover:text-teal-400"
                >
                  {strip(job.company)}
                  <ExternalLink
                    aria-hidden
                    className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              ) : (
                strip(job.company)
              )}
            </p>
          </div>
        </div>

        <ul className="mt-6 max-w-3xl space-y-3">
          {job.achievements.map((achievement) => (
            <li
              key={achievement}
              className="relative pl-5 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300"
            >
              <span
                aria-hidden
                className="absolute left-0 top-2.5 h-1.5 w-1.5 rounded-full bg-teal-600 dark:bg-teal-400"
              />
              {strip(achievement)}
            </li>
          ))}
        </ul>

        {job.tech.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-1.5">
            {job.tech.slice(0, 7).map((technology) => (
              <Tag key={technology} label={strip(technology)} />
            ))}
            {job.tech.length > 7 && (
              <span className="self-center font-mono text-xs text-slate-400 dark:text-slate-500">
                +{job.tech.length - 7}
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  )
}

export function Experience() {
  const reduceMotion = useReducedMotion() ?? false
  const [showEarlier, setShowEarlier] = useState(false)
  const recentExperience = experience.slice(0, 3)
  const earlierExperience = experience.slice(3)
  const hasEarlierExperience = earlierExperience.length > 0

  return (
    <section
      id="experience"
      className="scroll-mt-16 border-t border-slate-100 bg-white py-24 dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="mx-auto max-w-6xl px-6">
        <RevealWrapper>
          <SectionHeader
            label="Experience"
            title="Research, engineering, and delivery."
            description="Recent roles first, with emphasis on technical ownership, measurable outcomes, and work carried from investigation through implementation."
          />
        </RevealWrapper>

        <ol className="border-y border-slate-200 dark:border-slate-800">
          {recentExperience.map((job, index) => (
            <RevealWrapper
              key={job.id}
              as="li"
              delay={index * 0.08}
              className="border-b border-slate-200 last:border-b-0 dark:border-slate-800"
            >
              <ExperienceArticle job={job} />
            </RevealWrapper>
          ))}

          <AnimatePresence initial={false}>
            {showEarlier &&
              earlierExperience.map((job) => (
                <motion.li
                  layout={!reduceMotion}
                  key={job.id}
                  initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.26, ease: 'easeOut' }}
                  className="overflow-hidden border-b border-slate-200 last:border-b-0 dark:border-slate-800"
                >
                  <ExperienceArticle job={job} />
                </motion.li>
              ))}
          </AnimatePresence>
        </ol>

        {hasEarlierExperience && (
          <RevealWrapper>
            <button
              type="button"
              onClick={() => setShowEarlier((value) => !value)}
              aria-expanded={showEarlier}
              className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-teal-700 dark:text-slate-300 dark:hover:text-teal-400"
            >
              {showEarlier ? 'Show recent experience only' : 'Show earlier experience'}
              <motion.span
                aria-hidden
                animate={{ rotate: showEarlier ? 180 : 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.2, ease: 'easeOut' }}
              >
                <ChevronDown className="h-4 w-4" />
              </motion.span>
            </button>
          </RevealWrapper>
        )}
      </div>
    </section>
  )
}
