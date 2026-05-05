import { lazy, Suspense } from 'react'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { ScrollProgress } from './components/ui/ScrollProgress'
import { Hero } from './components/sections/Hero'
import { ErrorBoundary } from './components/ui/ErrorBoundary'

const About = lazy(() => import('./components/sections/About').then((m) => ({ default: m.About })))
const Timeline = lazy(() =>
  import('./components/sections/Timeline').then((m) => ({ default: m.Timeline }))
)
const Experience = lazy(() =>
  import('./components/sections/Experience').then((m) => ({ default: m.Experience }))
)
const Publications = lazy(() =>
  import('./components/sections/Publications').then((m) => ({ default: m.Publications }))
)
const Projects = lazy(() =>
  import('./components/sections/Projects').then((m) => ({ default: m.Projects }))
)
const Certificates = lazy(() =>
  import('./components/sections/Certificates').then((m) => ({ default: m.Certificates }))
)
const Contact = lazy(() =>
  import('./components/sections/Contact').then((m) => ({ default: m.Contact }))
)

function SectionFallback() {
  return (
    <div className="min-h-[60vh] px-6 py-24 max-w-5xl mx-auto space-y-6" aria-hidden>
      <div className="h-8 w-48 rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse" />
      <div className="h-4 w-full rounded bg-slate-100 dark:bg-slate-800/60 animate-pulse" />
      <div className="h-4 w-5/6 rounded bg-slate-100 dark:bg-slate-800/60 animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {[1, 2, 3].map((n) => (
          <div key={n} className="h-40 rounded-xl bg-slate-100 dark:bg-slate-800/60 animate-pulse" />
        ))}
      </div>
    </div>
  )
}

export default function App() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <ErrorBoundary>
          <Suspense fallback={<SectionFallback />}>
            <About />
            <Timeline />
            <Experience />
            <Publications />
            <Projects />
            <Certificates />
            <Contact />
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
    </>
  )
}
