import type { Project } from '../types'

export const projects: Project[] = [
  {
    id: 'proj-ModIA',
    title: 'ModIA',
    description:
      'The ModIA project combines physics-based simulation and machine learning into hybrid digital twins for prescriptive maintenance, reducing both model complexity and the number of sensors required to enable real-time industrial use. Its measurable outcome is a co-designed framework validated on real industrial installations that demonstrably cuts sensor count and modelling effort while improving anomaly detection.',
    tags: ['Industry 4.0', 'Predictive Maintenance', 'Digital Twins', 'Physics-Informed Machine Learning'],
    repoUrl: undefined,
    demoUrl: 'https://www.youtube.com/watch?v=Spcu-KlxnrQ',
    featured: true,
    category: 'engineering',
    partners: [
      { name: 'STARRAG', logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Starrag_Group_logo.svg/960px-Starrag_Group_logo.svg.png?_=20141205071323", url: 'https://www.starrag.com/fr-fr' },
      { name: 'Asyril', logoUrl: 'https://asyril.com/wp-content/themes/asyril/dist/svg/asyril-logo.svg', url: 'https://asyril.com/fr/' },
      { name: 'HID', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/HID_Global_logo.svg/120px-HID_Global_logo.svg.png?_=20180124191630', url: 'https://www.hidglobal.com/' },
      { name: 'HEIA', logoUrl: 'https://www.heia-fr.ch/media/4zrfx0oj/logo_heia-fr.svg', url: 'https://icosys.ch/' },
    ],
  },
  {
    id: 'proj-LinguaMate',
    title: 'LinguaMate',
    description: 'AI-powered reading comprehension assistant for multilingual learning integrated with Gutenberg Project Bookshelf.',
    tags: ['Postgres', 'Python', 'FastAPI', 'React', 'Next.js', 'Docker'],
    repoUrl: 'https://github.com/Sivanirosh/LinguaMate',
    category: 'software',
  },

]
