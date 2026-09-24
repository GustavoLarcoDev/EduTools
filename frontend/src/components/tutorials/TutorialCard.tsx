'use client'

import { BookOpenIcon, LockClosedIcon, PencilSquareIcon, PlayCircleIcon, TrashIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline'
import type { Career, Tool, Tutorial } from '@/types'
import { CareerTag, PremiumBadge } from '../ui/career-style'

interface TutorialCardProps {
  tutorial: Tutorial
  career?: Career
  tool?: Tool
  locked: boolean
  onOpen: (t: Tutorial) => void
  onEdit?: (t: Tutorial) => void
  onDelete?: (t: Tutorial) => void
}

export function readingTime(text: string) {
  return Math.max(1, Math.round(text.trim().split(/\s+/).length / 180))
}

export default function TutorialCard({ tutorial, career, tool, locked, onOpen, onEdit, onDelete }: TutorialCardProps) {
  return (
    <article className="group card relative flex flex-col overflow-hidden transition duration-300 hover:-translate-y-0.5 hover:shadow-lift">
      <div className="h-1.5 w-full bg-gradient-to-r from-brand-500 to-accent-400 opacity-80" aria-hidden="true" />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          <CareerTag career={career} />
          {tutorial.is_premium && <PremiumBadge />}
        </div>

        <h3 className="mt-4 text-lg font-bold leading-snug text-ink">
          <button type="button" onClick={() => onOpen(tutorial)} className="text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
            {tutorial.title}
          </button>
        </h3>
        <p className={`mt-2 line-clamp-3 text-sm leading-6 text-slate-600 ${locked ? 'select-none blur-[3px]' : ''}`} aria-hidden={locked}>
          {tutorial.content}
        </p>
        {locked && <p className="sr-only">Contenido premium bloqueado.</p>}

        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-5 text-xs font-medium text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <BookOpenIcon className="h-4 w-4" aria-hidden="true" />
            {readingTime(tutorial.content)} min de lectura
          </span>
          {tool && (
            <span className="inline-flex min-w-0 items-center gap-1.5">
              <WrenchScrewdriverIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="truncate">{tool.title}</span>
            </span>
          )}
          {tutorial.video_url && (
            <span className="inline-flex items-center gap-1.5">
              <PlayCircleIcon className="h-4 w-4" aria-hidden="true" />
              Video
            </span>
          )}
        </div>

        <div className="relative z-10 mt-4 flex items-center justify-between border-t border-line pt-4">
          <span className={`inline-flex items-center gap-1.5 text-sm font-semibold ${locked ? 'text-amber-700' : 'text-brand-600'}`}>
            {locked ? <LockClosedIcon className="h-4 w-4" aria-hidden="true" /> : null}
            {locked ? 'Contenido Premium' : 'Leer tutorial →'}
          </span>
          {(onEdit || onDelete) && (
            <div className="flex items-center gap-1">
              {onEdit && (
                <button type="button" className="icon-btn" onClick={() => onEdit(tutorial)} aria-label={`Editar ${tutorial.title}`} title="Editar">
                  <PencilSquareIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              )}
              {onDelete && (
                <button
                  type="button"
                  className="icon-btn hover:!bg-rose-50 hover:!text-rose-600"
                  onClick={() => onDelete(tutorial)}
                  aria-label={`Eliminar ${tutorial.title}`}
                  title="Eliminar"
                >
                  <TrashIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
