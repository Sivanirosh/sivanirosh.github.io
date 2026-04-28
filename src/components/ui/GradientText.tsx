import clsx from 'clsx'
import type { ReactNode } from 'react'

export function GradientText({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={clsx(
        'bg-gradient-teal bg-clip-text text-transparent',
        className
      )}
    >
      {children}
    </span>
  )
}
