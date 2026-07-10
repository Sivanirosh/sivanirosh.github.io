import clsx from 'clsx'
import { Award } from 'lucide-react'
import type { ReactNode } from 'react'

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full',
        'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300',
        'border border-slate-200 dark:border-slate-700',
        className
      )}
    >
      {children}
    </span>
  )
}

export function AwardBadge({ label, className }: { label: string; className?: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 border-l-2 border-teal-600/70 dark:border-teal-400/70 pl-2',
        'text-xs font-medium text-slate-600 dark:text-slate-300',
        className
      )}
    >
      <Award aria-hidden className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
      {label}
    </span>
  )
}
