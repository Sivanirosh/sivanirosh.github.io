import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Award } from 'lucide-react'
import { Link } from 'react-scroll'
import { profile } from '../../data/profile'
import { NoiseOverlay } from '../ui/NoiseOverlay'

function strip(value: string): string {
  return value.replace(/^TODO:\s*/, '')
}

export function Hero() {
  const reduceMotion = useReducedMotion() ?? false
  const motionOffset = reduceMotion ? 0 : 12
  const displayName = strip(profile.name)
  const displayTitle = strip(profile.title)

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-slate-50 pt-16 scroll-mt-16 dark:bg-slate-950"
    >
      <NoiseOverlay />

      <div className="relative mx-auto grid w-full max-w-5xl items-center gap-14 px-6 py-24 md:grid-cols-12 md:py-28 lg:gap-16">
        <div className="md:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: motionOffset }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="font-mono text-xs font-medium uppercase tracking-widest text-slate-500 dark:text-slate-400"
          >
            {displayTitle}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: motionOffset }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.12, ease: 'easeOut' }}
            className="mt-4 font-serif text-hero text-slate-900 dark:text-slate-100"
          >
            {displayName}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: motionOffset }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.22, ease: 'easeOut' }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-slate-700 dark:text-slate-300"
          >
            {strip(profile.tagline)}
          </motion.p>

          {profile.distinction && (
            <motion.aside
              initial={{ opacity: 0, y: motionOffset }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.34, ease: 'easeOut' }}
              aria-label={profile.distinction.label}
              className="mt-8 max-w-xl border-l-2 border-teal-600/70 pl-4 dark:border-teal-400/70"
            >
              <div className="flex items-start gap-3">
                <Award
                  aria-hidden
                  className="mt-0.5 h-4 w-4 shrink-0 text-teal-700 dark:text-teal-400"
                />
                <div>
                  <p className="text-xs font-medium uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    {profile.distinction.label}
                  </p>
                  {profile.distinction.url ? (
                    <a
                      href={profile.distinction.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={profile.distinction.linkLabel ?? profile.distinction.title}
                      className="group mt-1 inline-flex items-center gap-1 text-sm font-medium text-slate-900 transition-colors hover:text-teal-700 dark:text-slate-100 dark:hover:text-teal-400"
                    >
                      {profile.distinction.title}
                      <ArrowUpRight
                        aria-hidden
                        className="h-3.5 w-3.5 text-slate-400 transition-colors group-hover:text-teal-700 dark:group-hover:text-teal-400"
                      />
                    </a>
                  ) : (
                    <p className="mt-1 text-sm font-medium text-slate-900 dark:text-slate-100">
                      {profile.distinction.title}
                    </p>
                  )}
                  <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-400">
                    {profile.distinction.detail}
                  </p>
                </div>
              </div>
            </motion.aside>
          )}

          {profile.stats.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: motionOffset }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.46, ease: 'easeOut' }}
              className="mt-10 grid grid-cols-2 gap-4 border-t border-slate-200 pt-8 sm:grid-cols-4 dark:border-slate-800"
            >
              {profile.stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.46 + index * 0.08, ease: 'easeOut' }}
                >
                  <p className="font-serif text-2xl font-medium text-slate-900 dark:text-slate-100">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500">
                    {strip(stat.label)}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: motionOffset }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.58, ease: 'easeOut' }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Link
              to="contact"
              smooth
              duration={200}
              offset={-60}
              className="group inline-flex cursor-pointer items-center gap-2 rounded-md bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
            >
              Get in touch
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="projects"
              smooth
              duration={200}
              offset={-60}
              className="inline-flex cursor-pointer items-center rounded-md border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:border-slate-500 hover:text-slate-900 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:text-white"
            >
              View selected work
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          className="hidden md:col-span-5 md:block"
        >
          {profile.photoUrl ? (
            <HeroPortrait src={profile.photoUrl} alt={displayName} reduceMotion={reduceMotion} />
          ) : (
            <HeroIllustration />
          )}
        </motion.div>
      </div>
    </section>
  )
}

function HeroPortrait({
  src,
  alt,
  reduceMotion,
}: {
  src: string
  alt: string
  reduceMotion: boolean
}) {
  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-sm">
      <div
        aria-hidden
        className="absolute -inset-4 rounded-[1.5rem] border border-slate-200/80 dark:border-slate-800/80"
      />
      <div
        aria-hidden
        className="absolute -right-3 -top-3 h-16 w-16 border-r border-t border-teal-600/60 dark:border-teal-400/60"
      />

      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.42, ease: 'easeOut' }}
        className="relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-900"
      >
        <img
          src={src}
          alt={alt}
          loading="eager"
          decoding="async"
          className="h-full w-full object-cover object-top"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-slate-950/10 via-transparent to-transparent"
        />
      </motion.div>

      <div
        aria-hidden
        className="absolute -bottom-3 -left-3 h-16 w-16 border-b border-l border-teal-600/60 dark:border-teal-400/60"
      />
    </div>
  )
}

function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 400 400"
      className="h-auto w-full"
      role="img"
      aria-label="Decorative concentric ring illustration"
    >
      <defs>
        <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1D9E75" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
      {[180, 140, 100, 60].map((radius, index) => (
        <motion.circle
          key={radius}
          cx="200"
          cy="200"
          r={radius}
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth={index === 0 ? 1.5 : 1}
          strokeOpacity={0.4 - index * 0.07}
          initial={{ pathLength: 0, rotate: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.3 + index * 0.1, ease: 'easeOut' }}
          style={{ transformOrigin: 'center' }}
        />
      ))}
      <motion.circle
        cx="200"
        cy="200"
        r="8"
        fill="url(#ringGrad)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, delay: 1.1, ease: 'easeOut' }}
        style={{ transformOrigin: 'center' }}
      />
      {[0, 60, 120, 180, 240, 300].map((angle, index) => (
        <motion.line
          key={angle}
          x1="200"
          y1="200"
          x2={200 + 180 * Math.cos((angle * Math.PI) / 180)}
          y2={200 + 180 * Math.sin((angle * Math.PI) / 180)}
          stroke="currentColor"
          className="text-slate-300 dark:text-slate-700"
          strokeWidth="0.5"
          strokeDasharray="2 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.6 + index * 0.05, ease: 'easeOut' }}
          style={{ transformOrigin: 'center' }}
        />
      ))}
    </svg>
  )
}
