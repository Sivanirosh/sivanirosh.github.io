import { profile } from '../../data/profile'

export function Footer() {
  const year = new Date().getFullYear()
  const displayName = profile.name.replace(/^TODO:\s*/, '')

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-medium text-slate-200">{displayName}</p>
        <p className="font-mono text-xs">
          © {year} · Engineering, AI, and software systems.
        </p>
      </div>
    </footer>
  )
}
