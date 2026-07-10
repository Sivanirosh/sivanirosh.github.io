import clsx from 'clsx'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { Link } from 'react-scroll'
import { profile } from '../../data/profile'
import { publications } from '../../data/publications'
import { useActiveSection } from '../../hooks/useActiveSection'
import { ThemeToggle } from '../ui/ThemeToggle'

const BASE_NAV = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'publications', label: 'Publications' },
  { id: 'timeline', label: 'Education' },
  { id: 'certificates', label: 'Credentials' },
  { id: 'contact', label: 'Contact' },
]

const NAV = BASE_NAV.filter((item) => item.id !== 'publications' || publications.length > 0)
const NAV_IDS = NAV.map((item) => item.id)

function ActiveNavIndicator({ visible, reduceMotion }: { visible: boolean; reduceMotion: boolean }) {
  if (!visible) return null

  return (
    <motion.span
      layoutId="primary-nav-active"
      aria-hidden
      transition={
        reduceMotion
          ? { duration: 0 }
          : { type: 'spring', stiffness: 500, damping: 36 }
      }
      className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-teal-600 dark:bg-teal-400"
    />
  )
}

export function Navbar() {
  const { pathname } = useLocation()
  const isPortfolio = pathname === '/projects'
  const active = useActiveSection(NAV_IDS)
  const reduceMotion = useReducedMotion() ?? false
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-40 flex h-16 items-center',
        'border-b border-slate-200/70 bg-white/85 backdrop-blur-lg dark:border-slate-800/70 dark:bg-slate-950/85',
        'transition-[box-shadow,background-color] duration-200',
        scrolled && 'shadow-soft'
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex w-full max-w-6xl items-center gap-4 px-6"
      >
        <RouterLink
          to="/"
          className="group shrink-0"
          aria-label="Home"
        >
          <span className="whitespace-nowrap text-sm font-semibold tracking-tight text-slate-900 transition-colors group-hover:text-teal-700 dark:text-slate-100 dark:group-hover:text-teal-400">
            {profile.name.replace(/^TODO:\s*/, '')}
          </span>
        </RouterLink>

        <ul className="hidden min-w-0 flex-1 items-center justify-center gap-4 lg:flex xl:gap-5">
          {NAV.map((item) => (
            <li key={item.id}>
              {isPortfolio ? (
                <RouterLink
                  to={`/#${item.id}`}
                  className={clsx(
                    'relative inline-flex whitespace-nowrap py-2 text-[13px] transition-colors',
                    !isPortfolio && active === item.id
                      ? 'font-medium text-teal-700 dark:text-teal-400'
                      : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
                  )}
                >
                  {item.label}
                  <ActiveNavIndicator
                    visible={!isPortfolio && active === item.id}
                    reduceMotion={reduceMotion}
                  />
                </RouterLink>
              ) : (
                <Link
                  to={item.id}
                  smooth={!reduceMotion}
                  duration={reduceMotion ? 0 : 200}
                  offset={-60}
                  className={clsx(
                    'relative inline-flex cursor-pointer whitespace-nowrap py-2 text-[13px] transition-colors',
                    active === item.id
                      ? 'font-medium text-teal-700 dark:text-teal-400'
                      : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
                  )}
                >
                  {item.label}
                  <ActiveNavIndicator
                    visible={active === item.id}
                    reduceMotion={reduceMotion}
                  />
                </Link>
              )}
            </li>
          ))}
          <li>
            <RouterLink
              to="/projects"
              className={clsx(
                'relative inline-flex whitespace-nowrap py-2 text-[13px] transition-colors',
                isPortfolio
                  ? 'font-medium text-teal-700 dark:text-teal-400'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
              )}
            >
              All projects
              <ActiveNavIndicator visible={isPortfolio} reduceMotion={reduceMotion} />
            </RouterLink>
          </li>
        </ul>

        <div className="ml-auto flex shrink-0 items-center gap-1">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={open}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden"
          >
            <span aria-hidden className="relative h-4 w-4">
              <motion.span
                animate={open ? { y: 5, rotate: 45 } : { y: 0, rotate: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.18, ease: 'easeOut' }}
                className="absolute left-0 top-0.5 h-0.5 w-4 rounded-full bg-current"
              />
              <motion.span
                animate={{ opacity: open ? 0 : 1, scaleX: open ? 0.5 : 1 }}
                transition={{ duration: reduceMotion ? 0 : 0.14, ease: 'easeOut' }}
                className="absolute left-0 top-[7px] h-0.5 w-4 rounded-full bg-current"
              />
              <motion.span
                animate={open ? { y: -5, rotate: -45 } : { y: 0, rotate: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.18, ease: 'easeOut' }}
                className="absolute bottom-0.5 left-0 h-0.5 w-4 rounded-full bg-current"
              />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.18, ease: 'easeOut' }}
            className="absolute inset-x-0 top-16 max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950 lg:hidden"
          >
            <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-5">
              {NAV.map((item) => (
                <li key={item.id}>
                  {isPortfolio ? (
                    <RouterLink
                      to={`/#${item.id}`}
                      onClick={() => setOpen(false)}
                      className={clsx(
                        'block rounded-md px-3 py-2 text-sm transition-colors',
                        active === item.id
                          ? 'bg-teal-50 font-medium text-teal-700 dark:bg-teal-950 dark:text-teal-400'
                          : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                      )}
                    >
                      {item.label}
                    </RouterLink>
                  ) : (
                    <Link
                      to={item.id}
                      smooth={!reduceMotion}
                      duration={reduceMotion ? 0 : 200}
                      offset={-60}
                      onClick={() => setOpen(false)}
                      className={clsx(
                        'block cursor-pointer rounded-md px-3 py-2 text-sm transition-colors',
                        active === item.id
                          ? 'bg-teal-50 font-medium text-teal-700 dark:bg-teal-950 dark:text-teal-400'
                          : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                      )}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
              <li>
                <RouterLink
                  to="/projects"
                  onClick={() => setOpen(false)}
                  className={clsx(
                    'block rounded-md px-3 py-2 text-sm transition-colors',
                    isPortfolio
                      ? 'bg-teal-50 font-medium text-teal-700 dark:bg-teal-950 dark:text-teal-400'
                      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                  )}
                >
                  All projects
                </RouterLink>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
