import type { Profile } from '../types'

export const profile: Profile = {
  name: 'Nirosh Sivanesan',
  title: 'Mechanical Engineer · AI Researcher · Full-stack Builder',
  tagline:
    'I design and ship robust systems — from medical vision–language models and industrial digital twins to local-first developer tools.',

  email: 'sivanirosh@gmail.com',
  github: 'https://github.com/sivanirosh',
  linkedin: 'https://www.linkedin.com/in/sivanirosh/',
  orcid: undefined,
  location: 'Biel, Switzerland',
  photoUrl: '/PersonalPhoto.webp',
  featuredLink: {
    label: 'Studyverse',
    url: 'https://sivanirosh.github.io/studyverse/',
  },

  stats: [
    // { label: 'Years in ML', value: '3' },
    // { label: 'Research', value: '1' },
    // { label: 'Awards', value: '1' },
    // { label: 'Projects', value: '3' },
  ],

  distinction: {
    label: 'Academic distinction',
    title: 'Best Thesis Award 2026',
    detail: 'MSc Artificial Intelligence in Medicine · University of Bern',
    url: 'https://www.youtube.com/watch?v=pPtPEK66k9M',
    linkLabel: 'Watch Best Thesis Award 2026 presentation',
  },

  focusAreas: [
    {
      title: 'AI systems',
      detail: 'Medical imaging, vision–language models, contrastive learning',
    },
    {
      title: 'Full-stack products',
      detail: 'React, TypeScript, Python, Rust, local-first architecture',
    },
    {
      title: 'Engineering R&D',
      detail: 'Digital twins, sensing, predictive maintenance, industrial ML',
    },
  ],

  about: [
    'I am a mechanical engineer and AI researcher who works across the complete path from physical systems and data to tested software. I care about sound modelling, clear interfaces, and solutions that remain useful outside a controlled demonstration.',
    'At ARTORG, I developed a metadata-guided contrastive learning method for chest X-ray vision–language models and evaluated it across nine international datasets. The work received the Best Thesis Award from the University of Bern MSc in Artificial Intelligence in Medicine.',
    'Alongside research, I build full-stack and local-first products for engineering, learning, and developer workflows. These projects combine domain modelling, backend systems, data pipelines, accessible interfaces, and deployment — the full product surface rather than isolated prototypes.',
  ],
}
