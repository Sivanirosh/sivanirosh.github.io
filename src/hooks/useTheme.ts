import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

function readInitialTheme(): Theme {
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(readInitialTheme)

  const applyTheme = useCallback((next: Theme) => {
    const root = document.documentElement
    if (next === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    try {
      localStorage.setItem('theme', next)
    } catch {
      /* storage may be unavailable (private mode) — silent fallback */
    }
    setThemeState(next)
  }, [])

  const toggle = useCallback(() => {
    applyTheme(theme === 'dark' ? 'light' : 'dark')
  }, [theme, applyTheme])

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (e: MediaQueryListEvent) => {
      const hasExplicitChoice = (() => {
        try {
          return localStorage.getItem('theme') !== null
        } catch {
          return false
        }
      })()
      if (!hasExplicitChoice) applyTheme(e.matches ? 'dark' : 'light')
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [applyTheme])

  return { theme, toggle, setTheme: applyTheme }
}
