import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Linkedin, Mail } from 'lucide-react'
import { Link } from 'react-scroll'
import { profile } from '../../data/profile'
import { NoiseOverlay } from '../ui/NoiseOverlay'
import { GradientText } from '../ui/GradientText'
import { AwardBadge } from '../ui/Badge'

const FADE_UP = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
}

function strip(s: string): string {
  return s.replace(/^TODO:\s*/, '')
}

function renderTaglineWithAccent(tagline: string, accent: string) {
  const raw = strip(tagline)
  const idx = raw.toLowerCase().indexOf(accent.toLowerCase())
  if (!accent || idx === -1) return raw
  return (
    <>
      {raw.slice(0, idx)}
      <GradientText>{raw.slice(idx, idx + accent.length)}</GradientText>
      {raw.slice(idx + accent.length)}
    </>
  )
}

export function Hero() {
  const displayName = strip(profile.name)
  const displayTitle = strip(profile.title)

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-16 flex items-center overflow-hidden bg-slate-50 dark:bg-slate-950 scroll-mt-16"
    >
      <NoiseOverlay />

      <div
        aria-hidden
        className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full bg-gradient-teal opacity-[0.08] dark:opacity-[0.12] blur-3xl pointer-events-none"
      />

      <div className="relative max-w-5xl mx-auto px-6 py-24 w-full grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-7">
          {profile.photoUrl && (
            <div className="flex md:hidden justify-center mb-6">
              <img
                src={profile.photoUrl}
                alt={displayName}
                loading="eager"
                decoding="async"
                className="w-24 h-24 rounded-full object-cover ring-2 ring-teal-500/30 shadow-lg"
              />
            </div>
          )}
          <motion.p
            {...FADE_UP}
            transition={{ duration: 0.35, delay: 0, ease: 'easeOut' }}
            className="text-xs font-medium uppercase tracking-widest text-teal-600 dark:text-teal-400 mb-4"
          >
            {displayTitle}
          </motion.p>

          <motion.h1
            {...FADE_UP}
            transition={{ duration: 0.35, delay: 0.15, ease: 'easeOut' }}
            className="font-serif text-hero text-slate-900 dark:text-slate-100"
          >
            {displayName}
          </motion.h1>

          <motion.p
            {...FADE_UP}
            transition={{ duration: 0.35, delay: 0.25, ease: 'easeOut' }}
            className="mt-5 text-lg text-slate-700 dark:text-slate-300 max-w-xl leading-relaxed"
          >
            {renderTaglineWithAccent(profile.tagline, profile.heroAccentWord)}
          </motion.p>

          <motion.div
            {...FADE_UP}
            transition={{ duration: 0.35, delay: 0.4, ease: 'easeOut' }}
            className="mt-6 flex flex-wrap gap-2"
          >
            {profile.awards.map((a) => (
              <AwardBadge key={a} label={a} />
            ))}
          </motion.div>

          <motion.div
            {...FADE_UP}
            transition={{ duration: 0.35, delay: 0.55, ease: 'easeOut' }}
            className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-200 dark:border-slate-800 pt-8"
          >
            {profile.stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.55 + i * 0.08, ease: 'easeOut' }}
              >
                <p className="text-2xl font-medium font-serif text-slate-900 dark:text-slate-100">
                  {s.value}
                </p>
                <p className="text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500 mt-1">
                  {strip(s.label)}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            {...FADE_UP}
            transition={{ duration: 0.35, delay: 0.7, ease: 'easeOut' }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <Link
              to="contact"
              smooth
              duration={200}
              offset={-60}
              className="
                group relative inline-flex items-center gap-2
                bg-slate-900 dark:bg-white text-white dark:text-slate-900
                text-sm font-medium px-5 py-2.5 rounded-lg cursor-pointer
                overflow-hidden transition-colors
              "
            >
              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-teal opacity-0 group-hover:opacity-[0.12] transition-opacity"
              />
              <span className="relative">Get in touch</span>
              <ArrowRight className="relative w-4 h-4" />
            </Link>
            <a
              href="https://sivanirosh.github.io/studyverse/"
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center gap-2 text-sm font-medium
                text-slate-700 dark:text-slate-200
                px-5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700
                hover:border-teal-500 hover:text-teal-700 dark:hover:text-teal-400
                transition-colors
              "
            >
              <BookOpen className="w-4 h-4" />
              Studyverse
            </a>
            {profile.email && !profile.email.startsWith('TODO:') && (
              <a
                href={`mailto:${profile.email}`}
                className="
                  inline-flex items-center gap-2 text-sm font-medium
                  text-slate-700 dark:text-slate-200
                  px-5 py-2.5 rounded-lg
                  hover:text-teal-700 dark:hover:text-teal-400
                  transition-colors
                "
              >
                <Mail className="w-4 h-4" />
                Email
              </a>
            )}
            {profile.linkedin && !profile.linkedin.startsWith('TODO:') && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center gap-2 text-sm font-medium
                  text-slate-700 dark:text-slate-200
                  px-5 py-2.5 rounded-lg
                  hover:text-teal-700 dark:hover:text-teal-400
                  transition-colors
                "
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="hidden md:block md:col-span-5"
        >
          {profile.photoUrl ? (
            <HeroPortrait src={profile.photoUrl} alt={displayName} />
          ) : (
            <HeroIllustration />
          )}
        </motion.div>
      </div>
    </section>
  )
}

function HeroPortrait({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-full max-w-[420px] mx-auto aspect-square">
      <div
        aria-hidden
        className="absolute inset-[6%] rounded-full bg-gradient-teal opacity-20 dark:opacity-30 blur-3xl"
      />

      <motion.div
        aria-hidden
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: 'center' }}
      >
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <defs>
            <linearGradient id="portraitRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1D9E75" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
          </defs>
          {[195, 178].map((r, i) => (
            <motion.circle
              key={r}
              cx="200"
              cy="200"
              r={r}
              fill="none"
              stroke="url(#portraitRingGrad)"
              strokeWidth={i === 0 ? 1.5 : 1}
              strokeOpacity={i === 0 ? 0.55 : 0.25}
              strokeDasharray={i === 0 ? undefined : '2 6'}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.3 + i * 0.15, ease: 'easeOut' }}
              style={{ transformOrigin: 'center' }}
            />
          ))}
          <motion.circle
            cx="395"
            cy="200"
            r="5"
            fill="url(#portraitRingGrad)"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 0.6, delay: 1.2, ease: 'easeOut' }}
            style={{ transformOrigin: 'center' }}
          />
        </svg>
      </motion.div>

      <motion.div
        className="absolute inset-[10%] rounded-full overflow-hidden ring-1 ring-slate-200 dark:ring-slate-700 shadow-2xl shadow-teal-900/10 bg-slate-100 dark:bg-slate-800"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
      >
        <img
          src={src}
          alt={alt}
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-tr from-slate-900/20 via-transparent to-transparent dark:from-slate-950/40 mix-blend-multiply dark:mix-blend-normal"
        />
      </motion.div>
    </div>
  )
}

function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 400 400"
      className="w-full h-auto"
      role="img"
      aria-label="Decorative concentric ring illustration"
    >
      <defs>
        <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1D9E75" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
      {[180, 140, 100, 60].map((r, i) => (
        <motion.circle
          key={r}
          cx="200"
          cy="200"
          r={r}
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth={i === 0 ? 1.5 : 1}
          strokeOpacity={0.4 - i * 0.07}
          initial={{ pathLength: 0, rotate: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.3 + i * 0.1, ease: 'easeOut' }}
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
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
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
          transition={{ duration: 0.8, delay: 0.6 + i * 0.05, ease: 'easeOut' }}
        />
      ))}
    </svg>
  )
}
