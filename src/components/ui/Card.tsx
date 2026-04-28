import clsx from 'clsx'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  featured?: boolean
  as?: 'div' | 'article' | 'li'
}

export function Card({ children, className, featured, as: Tag = 'div' }: Props) {
  return (
    <Tag
      className={clsx(
        'bg-white dark:bg-slate-900',
        'border border-slate-200 dark:border-slate-800',
        'transition-colors duration-200',
        'hover:border-slate-300 dark:hover:border-slate-700',
        featured
          ? 'border-l-2 border-l-teal-600 dark:border-l-teal-400 rounded-r-xl rounded-l-none pl-4 p-5'
          : 'rounded-xl p-5',
        className
      )}
    >
      {children}
    </Tag>
  )
}
