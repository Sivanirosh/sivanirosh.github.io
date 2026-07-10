import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { projects } from '../../data/projects'
import type { Project } from '../../types'
import { ProjectCard } from '../ui/ProjectCard'
import { ProjectModal } from '../ui/ProjectModal'
import { RevealWrapper } from '../ui/RevealWrapper'
import { SectionHeader } from '../ui/SectionHeader'

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)
  const featured = projects.filter((project) => !project.hidden && project.featured).slice(0, 4)

  return (
    <section
      id="projects"
      className="scroll-mt-16 border-t border-slate-200 bg-slate-50 py-24 dark:border-slate-800 dark:bg-slate-950"
    >
      <div className="mx-auto max-w-6xl px-6">
        <RevealWrapper>
          <SectionHeader
            label="Selected work"
            title="Systems built from first principles to working product."
            description="A focused selection across medical AI, industrial engineering, and full-stack software. Each case study highlights the problem, technical approach, and evidence of impact."
          />
        </RevealWrapper>

        <div className="border-b border-slate-200 dark:border-slate-800">
          {featured.map((project, index) => (
            <RevealWrapper key={project.id} delay={index * 0.08}>
              <ProjectCard
                project={project}
                index={index}
                variant="showcase"
                onOpen={setSelected}
              />
            </RevealWrapper>
          ))}
        </div>

        <RevealWrapper delay={0.15}>
          <div className="mt-10 flex justify-end">
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition-colors hover:text-teal-700 dark:text-white dark:hover:text-teal-400"
            >
              Browse all projects
              <ArrowRight
                aria-hidden
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </RevealWrapper>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
