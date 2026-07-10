import clsx from 'clsx'
import { BookOpen, ArrowUpRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { Link } from 'react-scroll'
import { useActiveSection } from '../../hooks/useActiveSection'
import { profile } from '../../data/profile'
import { publications } from '../../data/publications'
import { AwardBadge } from '../ui/Badge'
import { ThemeToggle } from '../ui/ThemeToggle'

const BASE_NAV = [
  { id: 'about', label: 'About' },
  { id: 'timeline', label: 'Education' },
  { id: 'experience', label: 'Experience' },
  { id: 'publications', label: 'Publications' },
  { id: 'projects', label: 'Projects' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'contact', label: 'Contact' },
]

const NAV = BASE_NAV.filter((item) => item.id !== 'publications' || publications.length > 0)
const NAV_IDS = NAV.map((item) => item.id)

export function Navbar() {
  const { pathname } = useLocation()
  const isPortfolio = pathname === '/projects'
  const active = useActiveSection(NAV_IDS)
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

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-40 h-16 flex items-center',
        'bg-white/60 dark:bg-slate-950/60 backdrop-blur-xl backdrop-saturate-150',
        'border-b border-slate-200/60 dark:border-slate-800/60',
        'transition-shadow duration-200',
        scrolled && 'shadow-sm'
      )}
    >
      <nav className="w-full max-w-5xl mx-auto px-6 flex items-center justify-between gap-4">
        {/* Logo / home link */}
        <RouterLink
          to="/"
          className="flex items-center gap-3 group"
          aria-label="Back to top"
        >
          <span className="relative inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-teal text-white text-xs font-medium">
            {profile.name
              .split(' ')
              .map((p) => p[0])
              .slice(0, 2)
              .join('')
              .toUpperCase() || 'YN'}
          </span>
          <span className="hidden sm:inline text-sm font-medium text-slate-900 dark:text-slate-100 group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">
            {profile.name.replace(/^TODO:\s*/, '')}
          </span>
          {profile.awards[0] && (
            <span className="hidden md:inline">
              <AwardBadge label={profile.awards[0]} />
            </span>
          )}
        </RouterLink>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-5">
          {NAV.map((item) => (
            <li key={item.id}>
              {isPortfolio ? (
                <RouterLink
                  to={`/#${item.id}`}
                  className={clsx(
                    'text-[13px] transition-colors',
                    active === item.id
                      ? 'text-teal-700 dark:text-teal-400 font-medium'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                  )}
                >
                  {item.label}
                </RouterLink>
              ) : (
                <Link
                  to={item.id}
                  smooth
                  duration={200}
                  offset={-60}
                  className={clsx(
                    'text-[13px] transition-colors cursor-pointer',
                    active === item.id
                      ? 'text-teal-700 dark:text-teal-400 font-medium'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                  )}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}

          {/* Portfolio link */}
          <li>
            <RouterLink
              to="/projects"
              className={clsx(
                'inline-flex items-center gap-1 text-[13px] transition-colors',
                isPortfolio
                  ? 'text-teal-700 dark:text-teal-400 font-medium'
                  : 'text-slate-500 dark:text-slate-400 hover:text-teal-700 dark:hover:text-teal-400'
              )}
            >
              Portfolio
              <ArrowUpRight className="w-3 h-3" />
            </RouterLink>
          </li>

          {profile.featuredLink && (
            <li>
              <a
                href={profile.featuredLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-teal-700 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5" />
                {profile.featuredLink.label}
              </a>
            </li>
          )}
        </ul>

        {/* Right: theme toggle + hamburger */}
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            className="lg:hidden inline-flex items-center justify-center w-9 h-9 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              {open ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden absolute top-16 inset-x-0 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 shadow-sm max-h-[calc(100vh-4rem)] overflow-y-auto">
          <ul className="max-w-5xl mx-auto px-6 py-4 flex flex-col gap-3">
            {NAV.map((item) => (
              <li key={item.id}>
                {isPortfolio ? (
                  <RouterLink
                    to={`/#${item.id}`}
                    onClick={() => setOpen(false)}
                    className={clsx(
                      'block text-sm py-2',
                      active === item.id
                        ? 'text-teal-700 dark:text-teal-400 font-medium'
                        : 'text-slate-700 dark:text-slate-300'
                    )}
                  >
                    {item.label}
                  </RouterLink>
                ) : (
                  <Link
                    to={item.id}
                    smooth
                    duration={200}
                    offset={-60}
                    onClick={() => setOpen(false)}
                    className={clsx(
                      'block text-sm py-2 cursor-pointer',
                      active === item.id
                        ? 'text-teal-700 dark:text-teal-400 font-medium'
                        : 'text-slate-700 dark:text-slate-300'
                    )}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}

            {/* Portfolio (mobile) */}
            <li>
              <RouterLink
                to="/projects"
                onClick={() => setOpen(false)}
                className={clsx(
                  'block text-sm py-2',
                  isPortfolio
                    ? 'text-teal-700 dark:text-teal-400 font-medium'
                    : 'text-slate-700 dark:text-slate-300'
                )}
              >
                Portfolio
              </RouterLink>
            </li>

            {profile.featuredLink && (
              <li>
                <a
                  href={profile.featuredLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 text-sm py-2 text-teal-700 dark:text-teal-400 font-medium"
                >
                  <BookOpen className="w-4 h-4" />
                  {profile.featuredLink.label}
                </a>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  )
}
