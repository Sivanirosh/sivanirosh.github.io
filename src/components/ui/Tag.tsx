import clsx from 'clsx'

interface Props {
  label: string
  className?: string
}

export function Tag({ label, className }: Props) {
  return (
    <span
      className={clsx(
        'inline-block text-[11px] px-2 py-0.5 rounded',
        'bg-slate-100 dark:bg-slate-800',
        'text-slate-500 dark:text-slate-400',
        'border border-slate-200 dark:border-slate-700',
        className
      )}
    >
      {label}
    </span>
  )
}
