import type { Project } from '../../types'

export function projectCategoryLabel(category: Project['category']): string {
  if (category === 'ai-medical') return 'AI & medical'
  if (category === 'engineering') return 'Engineering'
  return 'Software'
}

export function formatProjectYears(project: Project): string {
  if (project.endYear === 'ongoing') return `${project.startYear}–present`
  if (project.startYear === project.endYear) return String(project.startYear)
  return `${project.startYear}–${project.endYear}`
}
