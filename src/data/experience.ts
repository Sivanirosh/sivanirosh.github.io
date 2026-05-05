import type { ExperienceEntry } from '../types'

export const experience: ExperienceEntry[] = [

  {
    id: 'HEIA',
    role: 'Research Associate',
    company: 'HEIA',
    logoUrl: '/companyLogos/logo_heia-fr_version_courte.jpg',
    companyUrl: "https://www.heia-fr.ch/fr/recherche-appliquee/instituts/sesi/",
    location: 'Fribourg, Switzerland',
    startDate: 'Sept 2023',
    endDate: 'Sept 2025',
    achievements: [
      'Designed and validated a generic hybrid digital twin methodology for predictive maintenance in the ModIA project, from on‑site measurements to presenting results to four industrial partners and at the AI Days 2024 and 2025 conferences.',
      'Independently delivered machine learning solutions and vibration data analysis across ModIA, FileML, and SpindleMonitor, consistently producing clear, structured code and actionable insights.',
      'Owned the full data‑analysis pipeline – from sensor measurements to UI automation – for the SpindleMonitor mandate, adapting the tool to Starrag’s operational needs with minimal supervision.'
    ],
    tech: ['Python', 'Machine Learning', 'Vibration Analysis', 'Digital Twins', 'Data Analysis', 'UI Programming'],
  },

  {
    id: 'ELIS',
    role: 'Customer Service Manager',
    company: 'ELIS',
    logoUrl: '/companyLogos/Elis_logo.svg',
    companyUrl: "https://ch.elis.com/fr/secteurs-dactivite/elis-cleanroom",
    location: 'Brügg, Switzerland',
    startDate: 'Mar 2019',
    endDate: 'Aug 2019',
    achievements: [
      'Achieved full autonomy in end-to-end order-to-cash and ERP management within a few months, earning complete managerial trust.',
      'Led continuous improvement of procedures and voluntarily took ownership of additional high-impact projects beyond daily responsibilities.',
      'Served as trilingual coordinator (FR/DE/EN) for clients and suppliers, ensuring seamless cross-border operations.'
    ],
    tech: ['ERP Systems', 'Process Improvement', 'Multilingual Communication (FR/DE/EN)'],
  },

  {
    id: 'HIB',
    role: 'Medical Simulation Technical Assistant',
    company: 'HIB (Hôpital intercantonal de la Broye)',
    logoUrl: '/companyLogos/logo_hib.svg',
    companyUrl: "https://hopital-broye.ch/",
    location: 'Payerne, Switzerland',
    startDate: 'Oct 2018',
    endDate: 'Feb 2019',
    achievements: [
      'Advised on the simulation centre’s financial plan and training policy, leveraging analytical skills to shape its strategic foundation.',
      'Streamlined administrative and inventory workflows by programming databases and Excel tools, significantly improving operational efficiency.',
      'Independently managed day‑to‑day operations — equipment preparation, AV support, and logistics — ensuring flawless training sessions even in the manager’s absence.',
    ],
    tech: ['Medical Simulation Equipment', 'Database & Excel Automation', 'Audio‑Visual Technical Support', 'Process Optimization'],
  },

  {
    id: 'owner',
    role: 'Owner',
    company: 'Family Business',
    companyUrl: undefined,
    location: 'La Chaux-de-Fonds, Switzerland',
    startDate: 'Jan 2012',
    endDate: 'Oct 2018',
    achievements: [
      'Managed a family business for 6 years, from startup to stable revenue.',
    ],
    tech: ['Management', 'Customer Service', 'Sales'],
  },

]
