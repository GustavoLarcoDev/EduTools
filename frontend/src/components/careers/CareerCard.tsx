'use client'

import Link from 'next/link'
import { ArrowRightIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import type { Career } from '@/types'
import { CareerIcon } from '../ui/career-style'

interface CareerCardProps {
  career: Career
  toolCount: number
  tutorialCount: number
  onEdit?: (c: Career) => void
  onDelete?: (c: Career) => void
}

export default function CareerCard({ career, toolCount, tutorialCount, onEdit, onDelete }: CareerCardProps) {
  return (
    <article className="card group relative flex flex-col p-6 transition duration-300 hover:-translate-y-0.5 hover:shadow-lift">
      <div className="flex items-start justify-between gap-3">
        <CareerIcon career={career} size="lg" />
        {(onEdit || onDelete) && (
          <div className="flex items-center gap-1">
            {onEdit && (
              <button type="button" className="icon-btn" onClick={() => onEdit(career)} aria-label={`Editar ${career.name}`} title="Editar">
                <PencilSquareIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            )}
            {onDelete && (
              <button type="button" className="icon-btn hover:!bg-rose-50 hover:!text-rose-600" onClick={() => onDelete(career)} aria-label={`Eliminar ${career.name}`} title="Eliminar">
                <TrashIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            )}
          </div>
        )}
      </div>
      <h3 className="mt-5 text-xl font-bold text-ink">{career.name}</h3>
      <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">{career.description}</p>

      <dl className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-surface px-3 py-2.5">
          <dt className="text-xs font-medium text-slate-500">Tutoriales</dt>
          <dd className="font-display text-xl font-bold text-ink">{tutorialCount}</dd>
        </div>
        <div className="rounded-xl bg-surface px-3 py-2.5">
          <dt className="text-xs font-medium text-slate-500">Herramientas</dt>
          <dd className="font-display text-xl font-bold text-ink">{toolCount}</dd>
        </div>
      </dl>

      <div className="mt-6 flex flex-wrap gap-2 border-t border-line pt-5">
        <Link href={`/tutorials?career=${career.id}`} className="btn-secondary flex-1 !px-3">
          Tutoriales
          <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
        </Link>
        <Link href={`/tools?career=${career.id}`} className="btn-secondary flex-1 !px-3">
          Herramientas
          <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}
