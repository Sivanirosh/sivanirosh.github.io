import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { Link } from 'react-scroll'
import { profile } from '../../data/profile'
import { publications } from '../../data/publications'
import { useActiveSection } from '../../hooks/useActiveSection'
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
        className="mx-auto flex w-full max-w-5xl items-center gap-4 px-6"
      >
        <RouterLink
          to="/"
          className="group flex shrink-0 items-center gap-2.5"
          aria-label="Home"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-slate-900 font-mono text-xs font-semibold text-white dark:bg-slate-100 dark:text-slate-950">
            {profile.name
              .split(' ')
              .map((part) => part[0])
              .slice(0, 2)
              .join('')
              .toUpperCase() || 'NS'}
          </span>
          <span className="hidden whitespace-nowrap text-sm font-semibold tracking-tight text-slate-900 transition-colors group-hover:text-teal-700 dark:text-slate-100 dark:group-hover:text-teal-400 sm:inline">
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
                    'whitespace-nowrap text-[13px] transition-colors',
                    active === item.id
                      ? 'font-medium text-teal-700 dark:text-teal-400'
                      : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
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
                    'cursor-pointer whitespace-nowrap text-[13px] transition-colors',
                    active === item.id
                      ? 'font-medium text-teal-700 dark:text-teal-400'
                      : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
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
              className={clsx(
                'whitespace-nowrap text-[13px] transition-colors',
                isPortfolio
                  ? 'font-medium text-teal-700 dark:text-teal-400'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
              )}
            >
              Portfolio
            </RouterLink>
          </li>
        </ul>

        <div className="ml-auto flex shrink-0 items-center gap-1">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden"
          >
            <svg
              className="h-4 w-4"
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

      {open && (
        <div className="absolute inset-x-0 top-16 max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-lg dark:border-slate-800 dark:bg-slate-950/95 lg:hidden">
          <ul className="mx-auto flex max-w-5xl flex-col gap-1 px-6 py-5">
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
                    smooth
                    duration={200}
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
                Portfolio
              </RouterLink>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
