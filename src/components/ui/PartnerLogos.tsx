import clsx from 'clsx'
import type { Partner } from '../../types'

function strip(s: string): string {
  return s.replace(/^TODO:\s*/, '')
}

function initials(name: string): string {
  return strip(name)
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

interface PartnerLogosProps {
  partners: Partner[]
  size?: number
  className?: string
}

export function PartnerLogos({ partners, size = 48, className }: PartnerLogosProps) {
  if (!partners || partners.length === 0) return null

  const dim = { width: size, height: size }

  return (
    <div className={clsx('flex flex-wrap items-center gap-1.5', className)}>
      <span className="text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500 mr-1">
        with
      </span>
      {partners.map((p) => {
        const cleanName = strip(p.name)
        const inner = p.logoUrl && !p.logoUrl.startsWith('TODO:') ? (
          <img
            src={p.logoUrl}
            alt={cleanName}
            style={dim}
            className="rounded-full object-contain bg-white border border-slate-200 dark:border-slate-700"
            loading="lazy"
          />
        ) : (
          <span
            style={dim}
            className="
              inline-flex items-center justify-center rounded-full
              text-xs font-semibold tracking-tight
              bg-slate-100 dark:bg-slate-800
              text-slate-500 dark:text-slate-400
              border border-slate-200 dark:border-slate-700
            "
            aria-hidden
          >
            {initials(cleanName)}
          </span>
        )

        const href = p.url && !p.url.startsWith('TODO:') ? p.url : null

        return href ? (
          <a
            key={p.name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            title={cleanName}
            aria-label={cleanName}
            className="inline-flex hover:opacity-80 transition-opacity"
          >
            {inner}
          </a>
        ) : (
          <span key={p.name} title={cleanName} aria-label={cleanName} className="inline-flex">
            {inner}
          </span>
        )
      })}
    </div>
  )
}
