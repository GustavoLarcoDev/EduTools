'use client'

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { LockClosedIcon, PlayCircleIcon, WrenchScrewdriverIcon, XMarkIcon } from '@heroicons/react/24/outline'
import type { Career, Tool, Tutorial } from '@/types'
import { CareerTag, PremiumBadge } from '../ui/career-style'
import { readingTime } from './TutorialCard'
import { RichText } from './RichText'

interface Props {
  open: boolean
  tutorial?: Tutorial
  career?: Career
  tool?: Tool
  locked: boolean
  onClose: () => void
  onUnlock: () => void
}

const dateFmt = new Intl.DateTimeFormat('es', { day: 'numeric', month: 'long', year: 'numeric' })

export default function TutorialDrawer({ open, tutorial, career, tool, locked, onClose, onUnlock }: Props) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <DialogBackdrop transition className="fixed inset-0 bg-ink/40 backdrop-blur-sm transition duration-300 data-[closed]:opacity-0" />
      <div className="fixed inset-0 overflow-hidden">
        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full sm:pl-10">
          <DialogPanel
            transition
            className="pointer-events-auto flex h-full w-screen max-w-xl flex-col bg-white shadow-lift transition duration-300 ease-out data-[closed]:translate-x-full"
          >
            {tutorial && (
              <>
                <div className="relative overflow-hidden bg-ink px-6 pb-8 pt-6 text-white">
                  <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-brand-500/40 blur-3xl" aria-hidden="true" />
                  <div className="relative flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-wider text-accent-300">Tutorial</p>
                    <button type="button" onClick={onClose} className="rounded-lg p-1.5 text-slate-300 hover:bg-white/10 hover:text-white" aria-label="Cerrar tutorial">
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <DialogTitle as="h2" className="relative mt-4 text-2xl font-extrabold leading-tight sm:text-3xl">
                    {tutorial.title}
                  </DialogTitle>
                  <div className="relative mt-4 flex flex-wrap items-center gap-2">
                    <CareerTag career={career} />
                    {tutorial.is_premium && <PremiumBadge />}
                    <span className="text-xs text-slate-300">
                      {readingTime(tutorial.content)} min · {dateFmt.format(new Date(tutorial.created_at))}
                    </span>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-8">
                  {locked ? (
                    <div className="rounded-3xl border border-amber-200 bg-gradient-to-b from-amber-50 to-white p-6 text-center">
                      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                        <LockClosedIcon className="h-6 w-6" aria-hidden="true" />
                      </span>
                      <h3 className="mt-4 text-lg font-bold text-ink">Este tutorial es Premium</h3>
                      <p className="mt-2 text-sm text-slate-600">Actualiza tu plan para leer el contenido completo y descargar la herramienta asociada.</p>
                      <button type="button" className="btn-primary mt-6" onClick={onUnlock}>
                        Hazte Premium
                      </button>
                    </div>
                  ) : (
                    <RichText text={tutorial.content} />
                  )}

                  {tool && (
                    <div className="mt-8 flex items-center gap-4 rounded-2xl border border-line bg-surface p-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-brand-600 shadow-soft">
                        <WrenchScrewdriverIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Herramienta relacionada</p>
                        <p className="truncate text-sm font-semibold text-ink">{tool.title}</p>
                      </div>
                    </div>
                  )}

                  {!locked && tutorial.video_url && (
                    <a href={tutorial.video_url} target="_blank" rel="noreferrer" className="btn-dark mt-6">
                      <PlayCircleIcon className="h-5 w-5" aria-hidden="true" />
                      Ver video
                    </a>
                  )}
                </div>
              </>
            )}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
