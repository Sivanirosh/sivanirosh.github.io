import type { EducationEntry } from '../types'

export const education: EducationEntry[] = [
  {
    id: 'msc-aim',
    institution: 'University of Bern',
    degree: 'MSc',
    field: 'Artificial Intelligence in Medicine',
    startYear: 2023,
    endYear: 2026,
    location: 'Bern, Switzerland',
    award: 'Best Thesis Award 2026',
    description:
      'Developed a metadata-guided contrastive learning method (KAT-InfoNCE) to improve cross-institution robustness of medical vision–language models for chest X-ray analysis..',
  },
  {
    id: 'bsc-heia',
    institution: "University of Applied Science of Fribourg / HEIA-FR",
    degree: 'BSc',
    field: 'Mechanical Engineering',
    startYear: 2020,
    endYear: 2023,
    location: 'Fribourg, Switzerland',
    description:
      'Built a rotor test bench with sensor instrumentation and applied signal processing and machine learning to automate detection and diagnosis of rotordynamic faults.',
  },
  {
    id: 'bsc-eco',
    institution: "University of Neuchâtel",
    degree: 'BSc',
    field: 'Economics and Business',
    startYear: 2014,
    endYear: 2017,
    location: 'Neuchätel, Switzerland',
    description:
      "",
  },
]
