import type { ReactNode } from 'react'

export function EmptyState({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return (
    <div className="card flex flex-col items-center px-6 py-14 text-center">
      <svg viewBox="0 0 120 96" className="h-24 w-28" aria-hidden="true">
        <rect x="14" y="20" width="92" height="64" rx="12" fill="#F3F1FF" />
        <rect x="26" y="34" width="44" height="6" rx="3" fill="#D3CDFF" />
        <rect x="26" y="46" width="68" height="6" rx="3" fill="#E8E5FF" />
        <rect x="26" y="58" width="56" height="6" rx="3" fill="#E8E5FF" />
        <circle cx="88" cy="26" r="16" fill="#fff" stroke="#6D5DFC" strokeWidth="3" />
        <path d="m99.5 37.5 9 9" stroke="#6D5DFC" strokeWidth="4" strokeLinecap="round" />
      </svg>
      <h3 className="mt-5 text-lg font-bold text-ink">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm text-slate-600">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
