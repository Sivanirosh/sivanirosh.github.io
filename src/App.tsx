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
  return <div className="min-h-[60vh]" aria-hidden />
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
