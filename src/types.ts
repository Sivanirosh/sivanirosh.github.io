export interface ProfileLink {
  label: string
  url: string
}

export interface Profile {
  name: string
  title: string
  tagline: string
  heroAccentWord: string
  email: string
  github: string
  linkedin?: string
  orcid?: string
  location?: string
  photoUrl?: string
  featuredLink?: ProfileLink
  stats: { label: string; value: string }[]
  awards: string[]
  about: string[]
}

export interface EducationEntry {
  id: string
  institution: string
  degree: string
  field: string
  startYear: number
  endYear: number | 'present'
  location?: string
  award?: string
  description?: string
}

export interface ExperienceEntry {
  id: string
  role: string
  company: string
  companyUrl?: string
  logoUrl?: string
  location?: string
  startDate: string
  endDate: string | 'present'
  achievements: string[]
  tech: string[]
}

export interface Publication {
  id: string
  title: string
  authors: { name: string; isSelf?: boolean }[]
  venue: string
  venueType: 'journal' | 'conference' | 'preprint'
  year: number
  doi?: string
  pdfUrl?: string
  featured?: boolean
}

export interface Partner {
  name: string
  logoUrl?: string
  url?: string
}

export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  repoUrl?: string
  demoUrl?: string
  featured?: boolean
  size?: 'regular' | 'wide'
  category: 'ai-medical' | 'engineering' | 'software'
  partners?: Partner[]
  imageUrl?: string
  videos?: { label: string; url: string }[]
  startYear: number
  endYear: number | 'ongoing'
  role?: string
  longDescription?: string
  highlights?: string[]
  hidden?: boolean
}

export interface Certificate {
  id: string
  title: string
  issuer: string
  platform: string
  year: number
  credentialUrl?: string
  platformColor: string
  logoUrl?: string
}
