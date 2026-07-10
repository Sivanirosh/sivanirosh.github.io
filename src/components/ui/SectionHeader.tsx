import clsx from 'clsx'

interface Props {
  label: string
  title: string
  description?: string
  className?: string
}

export function SectionHeader({ label, title, description, className }: Props) {
  return (
    <div className={clsx('mb-12', className)}>
      <p className="mb-3 font-mono text-xs font-medium uppercase tracking-widest text-teal-700 dark:text-teal-400">
        {label}
      </p>
      <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl dark:text-white">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300">
          {description}
        </p>
      )}
    </div>
  )
}
