import clsx from 'clsx'
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
        'relative inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full',
        'bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-400',
        className
      )}
      style={{
        backgroundClip: 'padding-box',
      }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full p-px bg-gradient-teal opacity-60"
        style={{
          WebkitMask:
            'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      <span className="relative z-10 text-xs">★</span>
      <span className="relative z-10">{label}</span>
    </span>
  )
}
