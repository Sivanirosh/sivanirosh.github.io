import clsx from 'clsx'

interface Props {
  label: string
  className?: string
}

export function Tag({ label, className }: Props) {
  return (
    <span
      className={clsx(
        'inline-flex rounded-md bg-slate-100 px-2 py-1 font-mono text-xs leading-none text-slate-600',
        'dark:bg-slate-800 dark:text-slate-300',
        className
      )}
    >
      {label}
    </span>
  )
}
