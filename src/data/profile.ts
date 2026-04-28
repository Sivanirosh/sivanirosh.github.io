import type { Profile } from '../types'

export const profile: Profile = {
  name: 'Nirosh Sivanesan',
  title: 'Engineer and AI Researcher',
  tagline: 'Engineer bridging physical systems and AI to build robust, real-world solutions.',

  heroAccentWord: 'AI',

  email: 'sivanirosh@gmail.com',
  github: 'https://github.com/sivanirosh',
  linkedin: undefined, // TODO: https://www.linkedin.com/in/your-handle'
  orcid: undefined,
  location: 'Biel, Switzerland',
  photoUrl: '/sivanirosh/PersonalPhoto.webp',

  stats: [
    // { label: 'Years in ML', value: '3' },
    // { label: 'Research', value: '1' },
    // { label: 'Awards', value: '1' },
    // { label: 'Projects', value: '3' },
  ],

  awards: [],

  about: [
    'I am a mechanical engineer turned AI researcher, trained at the intersection of physical systems and machine intelligence. My BSc at HEIA-FR grounded me in sensor instrumentation, signal processing, and fault diagnosis on real rotating machinery. My MSc in Artificial Intelligence in Medicine at the University of Bern extended that rigour into the clinic — culminating in a Best Thesis Award for developing KAT-InfoNCE, a metadata-guided contrastive learning method that improves the cross-institution robustness of vision–language models for chest X-ray analysis.',
    'I am drawn to problems where physical constraints and data scarcity make naive deep learning fail — and where careful problem framing and hybrid modelling succeed. That thread runs through a physics-informed digital-twin project for prescriptive industrial maintenance, a multilingual AI reading assistant, and my ongoing research in medical imaging. I am actively looking for research collaborations and MedTech / AI roles where I can push robust, deployable AI from prototype to clinical or industrial reality.',
  ],
}
