import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'

export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={isDark}
      className="
        inline-flex items-center justify-center w-9 h-9 rounded-full
        text-slate-600 dark:text-slate-300
        hover:text-slate-900 dark:hover:text-white
        hover:bg-slate-100 dark:hover:bg-slate-800
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600
        transition-colors
      "
    >
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  )
}
