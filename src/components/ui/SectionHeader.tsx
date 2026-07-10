import clsx from 'clsx'

interface Props {
  label: string
  title: string
  description?: string
  className?: string
}

export function SectionHeader({ label, title, description, className }: Props) {
  return (
    <div className={clsx('mb-10', className)}>
      <p className="text-xs font-medium uppercase tracking-widest text-teal-700 dark:text-teal-400 mb-2">
        {label}
      </p>
      <h2 className="text-2xl md:text-3xl font-serif text-slate-900 dark:text-slate-100 leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-[15px] text-slate-700 dark:text-slate-300 max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}
