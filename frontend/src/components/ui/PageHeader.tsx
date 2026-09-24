import type { ReactNode } from 'react'

export function PageHeader({
  eyebrow,
  title,
  description,
  count,
  countLabel,
  actions,
}: {
  eyebrow: string
  title: string
  description: string
  count?: number
  countLabel?: string
  actions?: ReactNode
}) {
  return (
    <header className="relative overflow-hidden border-b border-line bg-white">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 -top-32 h-72 w-72 rounded-full bg-brand-400/20 blur-3xl" aria-hidden="true" />
      <div className="container-page relative flex flex-col gap-6 py-10 sm:py-12 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-brand-600">{eyebrow}</p>
          <h1 className="mt-2 flex flex-wrap items-center gap-3 text-3xl font-extrabold text-ink sm:text-4xl">
            {title}
            {typeof count === 'number' && (
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 font-sans text-sm font-semibold tracking-normal text-slate-600">
                {count} {countLabel}
              </span>
            )}
          </h1>
          <p className="mt-3 text-base text-slate-600">{description}</p>
        </div>
        {actions && <div className="flex shrink-0 gap-3">{actions}</div>}
      </div>
    </header>
  )
}
