import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Award, Download, Github, Linkedin, MapPin } from 'lucide-react'
import { Link } from 'react-scroll'
import { profile } from '../../data/profile'
import { NoiseOverlay } from '../ui/NoiseOverlay'

function strip(value: string): string {
  return value.replace(/^TODO:\s*/, '')
}

export function Hero() {
  const reduceMotion = useReducedMotion() ?? false
  const displayName = strip(profile.name)
  const displayTitle = strip(profile.title)

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-slate-50 pt-16 scroll-mt-16 dark:bg-slate-950"
    >
      <NoiseOverlay />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-12rem] top-20 h-[34rem] w-[34rem] rounded-full bg-teal-100/40 blur-3xl dark:bg-teal-950/30"
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-6 py-20 md:grid-cols-12 md:py-24 lg:gap-20">
        <div className="md:col-span-7">
          {profile.photoUrl && (
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="mb-8 md:hidden"
            >
              <MobilePortrait
                src={profile.photoUrl}
                alt={displayName}
                reduceMotion={reduceMotion}
              />
            </motion.div>
          )}

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="font-mono text-xs font-medium uppercase tracking-widest text-teal-700 dark:text-teal-400"
          >
            {displayTitle}
          </motion.p>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
            className="mt-5 max-w-3xl text-hero font-semibold text-slate-950 dark:text-white"
          >
            {displayName}
          </motion.h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
            className="mt-7 max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl dark:text-slate-300"
          >
            {strip(profile.tagline)}
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3, ease: 'easeOut' }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Link
              to="projects"
              smooth={!reduceMotion}
              duration={reduceMotion ? 0 : 200}
              offset={-60}
              className="group inline-flex cursor-pointer items-center gap-2 rounded-lg bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-700 dark:bg-white dark:text-slate-950 dark:hover:bg-teal-300"
            >
              Explore selected work
              <ArrowRight
                aria-hidden
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              />
            </Link>
            <a
              href="/cv.pdf"
              download
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white/60 px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-500 hover:text-slate-950 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:text-white"
            >
              <Download aria-hidden className="h-4 w-4" />
              Download CV
            </a>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.38, ease: 'easeOut' }}
            className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-slate-500 dark:text-slate-400"
          >
            {profile.location && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin aria-hidden className="h-4 w-4" />
                {strip(profile.location)}
              </span>
            )}
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-teal-700 dark:hover:text-teal-400"
            >
              <Github aria-hidden className="h-4 w-4" /> GitHub
            </a>
            {profile.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-teal-700 dark:hover:text-teal-400"
              >
                <Linkedin aria-hidden className="h-4 w-4" /> LinkedIn
              </a>
            )}
          </motion.div>

          {profile.distinction && (
            <motion.aside
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.46, ease: 'easeOut' }}
              aria-label={profile.distinction.label}
              className="mt-9 max-w-2xl border-t border-slate-200 pt-6 dark:border-slate-800"
            >
              <div className="flex items-start gap-3">
                <Award
                  aria-hidden
                  className="mt-0.5 h-4 w-4 shrink-0 text-teal-700 dark:text-teal-400"
                />
                <div>
                  <p className="font-mono text-xs font-medium uppercase tracking-widest text-slate-400 dark:text-slate-500">
                    {profile.distinction.label}
                  </p>
                  {profile.distinction.url ? (
                    <a
                      href={profile.distinction.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={profile.distinction.linkLabel ?? profile.distinction.title}
                      className="group mt-1 inline-flex items-center gap-1 text-sm font-semibold text-slate-900 transition-colors hover:text-teal-700 dark:text-slate-100 dark:hover:text-teal-400"
                    >
                      {profile.distinction.title}
                      <ArrowUpRight aria-hidden className="h-3.5 w-3.5 text-slate-400" />
                    </a>
                  ) : (
                    <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {profile.distinction.title}
                    </p>
                  )}
                  <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                    {profile.distinction.detail}
                  </p>
                </div>
              </div>
            </motion.aside>
          )}
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.25, ease: 'easeOut' }}
          className="hidden md:col-span-5 md:block"
        >
          {profile.photoUrl && (
            <HeroPortrait
              src={profile.photoUrl}
              alt={displayName}
              reduceMotion={reduceMotion}
            />
          )}
        </motion.div>
      </div>
    </section>
  )
}

interface PortraitProps {
  src: string
  alt: string
  reduceMotion: boolean
}

function MobilePortrait({ src, alt, reduceMotion }: PortraitProps) {
  return (
    <div className="relative h-24 w-24">
      <motion.div
        aria-hidden
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
        className="absolute -inset-2 rounded-full border border-dashed border-teal-600/45 dark:border-teal-400/45"
      >
        <span className="absolute -right-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-teal-600 ring-2 ring-slate-50 dark:bg-teal-400 dark:ring-slate-950" />
      </motion.div>
      <img
        src={src}
        alt={alt}
        loading="eager"
        decoding="async"
        className="relative h-24 w-24 rounded-full border border-slate-200 object-cover shadow-lg shadow-slate-900/10 ring-4 ring-white dark:border-slate-700 dark:ring-slate-900"
      />
    </div>
  )
}

function HeroPortrait({ src, alt, reduceMotion }: PortraitProps) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[400px]">
      <div
        aria-hidden
        className="absolute inset-10 rounded-full bg-gradient-teal opacity-15 blur-2xl dark:opacity-20"
      />

      <motion.div
        aria-hidden
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0"
      >
        <svg viewBox="0 0 400 400" className="h-full w-full">
          <defs>
            <linearGradient id="portrait-ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1D9E75" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
          </defs>
          <motion.circle
            cx="200"
            cy="200"
            r="195"
            fill="none"
            stroke="url(#portrait-ring-gradient)"
            strokeWidth="1.25"
            strokeOpacity="0.55"
            initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.25, ease: 'easeOut' }}
          />
          <motion.circle
            cx="200"
            cy="200"
            r="177"
            fill="none"
            stroke="url(#portrait-ring-gradient)"
            strokeWidth="1"
            strokeOpacity="0.3"
            strokeDasharray="2 6"
            initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.35, delay: 0.35, ease: 'easeOut' }}
          />
          <motion.circle
            cx="395"
            cy="200"
            r="5"
            fill="url(#portrait-ring-gradient)"
            initial={reduceMotion ? false : { opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.9, ease: 'easeOut' }}
            style={{ transformOrigin: '395px 200px' }}
          />
        </svg>
      </motion.div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
        className="absolute inset-8 overflow-hidden rounded-full border border-white bg-slate-100 shadow-2xl shadow-slate-900/15 ring-1 ring-slate-200 dark:border-slate-900 dark:bg-slate-800 dark:ring-slate-700"
      >
        <img
          src={src}
          alt={alt}
          loading="eager"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </motion.div>
    </div>
  )
}
