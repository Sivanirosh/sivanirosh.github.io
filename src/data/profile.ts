import type { Profile } from '../types'

export const profile: Profile = {
  name: 'Nirosh Sivanesan',
  title: 'Engineer and AI Researcher',
  tagline: 'Mechanical engineer, AI researcher, software builder — I turn complex problems into working solutions across physical systems, medical imaging, and developer tools.',

  heroAccentWord: 'working',

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

  awards: ['Best Thesis Award 2026', 'Eurobot Finalists 2022'],

  about: [
    'I started in mechanical engineering at HEIA-FR, where I built rotor test benches, instrumented them with sensors, and wrote signal processing pipelines to detect and diagnose rotordynamic faults. That hands-on experience taught me that real-world data is never clean and that modelling physical systems requires understanding what to measure, why it matters, and where the uncertainty lives.',
    'My MSc in Artificial Intelligence in Medicine at the University of Bern pushed me deeper into the same problem — messy, scarce data — but in a clinical setting. I developed a metadata-guided contrastive learning method for chest X-ray vision–language models that was tested across nine international datasets and received the Best Thesis Award. The approach is deliberately simple: instead of stacking more architecture, we asked what structured information the model was ignoring and found a way to feed it into the learning objective.',
    'Since then I have been building software that spans the full stack: a digital-twin methodology for predictive maintenance validated on real factory equipment, a full-stack dossier management workspace for building engineers, a local-first coding practice app, a workflow daemon in Rust for bounded agentic coding, and a spaced repetition app rethought for the local-AI era. Each project is a different answer to the same curiosity: what does it take to make something that actually works outside the lab?',
    'I am looking for roles and collaborations where I can build things that bridge engineering, medical AI, and developer tools — preferably at the prototype-to-product edge where the hard problems live.',
  ],
}
