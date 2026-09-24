'use client'

import { ArrowDownTrayIcon, LockClosedIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import type { Career, Tool } from '@/types'
import { CareerIcon, PremiumBadge } from '../ui/career-style'

interface ToolCardProps {
  tool: Tool
  career?: Career
  locked: boolean
  onDownload?: (tool: Tool) => void
  onEdit?: (tool: Tool) => void
  onDelete?: (tool: Tool) => void
}

function fileKind(title: string) {
  if (/plantilla|modelo|formato|canvas/i.test(title)) return 'Plantilla'
  if (/guía|hoja de referencia|esquema|atlas/i.test(title)) return 'Guía'
  if (/calculadora|tabla|financiero/i.test(title)) return 'Hoja de cálculo'
  return 'Recurso'
}

export default function ToolCard({ tool, career, locked, onDownload, onEdit, onDelete }: ToolCardProps) {
  return (
    <article className="group card relative flex flex-col p-5 transition duration-300 hover:-translate-y-0.5 hover:shadow-lift">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <CareerIcon career={career} />
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{fileKind(tool.title)}</p>
            {career && <p className="truncate text-sm text-slate-600">{career.name}</p>}
          </div>
        </div>
        {tool.is_premium && <PremiumBadge />}
      </div>

      <h3 className="mt-4 text-lg font-bold leading-snug text-ink">{tool.title}</h3>
      <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{tool.description}</p>

      <div className="mt-auto flex items-center justify-between gap-2 pt-6">
        {onDownload && (
          <button
            type="button"
            onClick={() => onDownload(tool)}
            className={locked ? 'btn-secondary' : 'btn-primary !shadow-none'}
            aria-label={`${locked ? 'Desbloquear' : 'Descargar'} ${tool.title}`}
          >
            {locked ? <LockClosedIcon className="h-4 w-4 text-amber-600" aria-hidden="true" /> : <ArrowDownTrayIcon className="h-4 w-4" aria-hidden="true" />}
            {locked ? 'Desbloquear' : 'Descargar'}
          </button>
        )}
        {(onEdit || onDelete) && (
          <div className="flex items-center gap-1">
            {onEdit && (
              <button type="button" className="icon-btn" onClick={() => onEdit(tool)} aria-label={`Editar ${tool.title}`} title="Editar">
                <PencilSquareIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            )}
            {onDelete && (
              <button
                type="button"
                className="icon-btn hover:!bg-rose-50 hover:!text-rose-600"
                onClick={() => onDelete(tool)}
                aria-label={`Eliminar ${tool.title}`}
                title="Eliminar"
              >
                <TrashIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            )}
          </div>
        )}
      </div>
    </article>
  )
}
