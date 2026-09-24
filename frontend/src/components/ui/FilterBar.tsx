'use client'

import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/20/solid'
import type { Career } from '@/types'

interface FilterBarProps {
  careers: Career[]
  selected?: number
  onSelect: (id?: number) => void
  query: string
  onQuery: (q: string) => void
  placeholder: string
  premiumOnly?: boolean
  onPremiumOnly?: (v: boolean) => void
}

export function FilterBar({ careers, selected, onSelect, query, onQuery, placeholder, premiumOnly, onPremiumOnly }: FilterBarProps) {
  const pill = (active: boolean) =>
    `shrink-0 rounded-full px-3.5 py-1.5 text-sm font-semibold transition ${
      active ? 'bg-ink text-white shadow-soft' : 'bg-white text-slate-600 ring-1 ring-inset ring-line hover:text-ink hover:ring-slate-300'
    }`

  return (
    <div className="sticky top-16 z-30 -mx-4 border-b border-line/70 bg-surface/85 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
        <div
          role="group"
          aria-label="Filtrar por carrera"
          className="-mx-4 flex min-w-0 gap-2 overflow-x-auto px-4 py-0.5 [scrollbar-width:none] sm:mx-0 sm:px-0 lg:flex-1 lg:pr-6 lg:[mask-image:linear-gradient(to_right,black_92%,transparent)] [&::-webkit-scrollbar]:hidden"
        >
          <button type="button" className={pill(!selected)} aria-pressed={!selected} onClick={() => onSelect(undefined)}>
            Todas
          </button>
          {careers.map((c) => (
            <button key={c.id} type="button" className={pill(selected === c.id)} aria-pressed={selected === c.id} onClick={() => onSelect(c.id)}>
              {c.name}
            </button>
          ))}
        </div>
        <div className="flex shrink-0 items-center gap-3">
          {onPremiumOnly && (
            <label className="flex shrink-0 cursor-pointer items-center gap-2 text-sm font-medium text-slate-600">
              <input
                type="checkbox"
                checked={!!premiumOnly}
                onChange={(e) => onPremiumOnly(e.target.checked)}
                className="h-4 w-4 accent-brand-600"
              />
              Solo Premium
            </label>
          )}
          <div className="relative w-full lg:w-64">
            <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <label htmlFor="search" className="sr-only">
              Buscar
            </label>
            <input
              id="search"
              type="search"
              value={query}
              onChange={(e) => onQuery(e.target.value)}
              placeholder={placeholder}
              className="input pl-9 pr-9"
            />
            {query && (
              <button type="button" onClick={() => onQuery('')} className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-slate-400 hover:text-ink" aria-label="Limpiar búsqueda">
                <XMarkIcon className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
