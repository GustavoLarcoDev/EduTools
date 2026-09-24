'use client'

import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import { CheckCircleIcon, InformationCircleIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'

type Tone = 'success' | 'error' | 'info'
interface ToastItem {
  id: number
  tone: Tone
  message: string
}

const ToastContext = createContext<(message: string, tone?: Tone) => void>(() => {})

const icons = {
  success: <CheckCircleIcon className="h-5 w-5 text-emerald-400" aria-hidden="true" />,
  error: <XCircleIcon className="h-5 w-5 text-rose-400" aria-hidden="true" />,
  info: <InformationCircleIcon className="h-5 w-5 text-accent-300" aria-hidden="true" />,
}

let counter = 0

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([])

  const dismiss = useCallback((id: number) => setItems((all) => all.filter((t) => t.id !== id)), [])

  const toast = useCallback(
    (message: string, tone: Tone = 'success') => {
      const id = ++counter
      setItems((all) => [...all.slice(-2), { id, tone, message }])
      setTimeout(() => dismiss(id), 4200)
    },
    [dismiss]
  )

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] flex flex-col items-center gap-2 p-4 sm:items-end sm:p-6"
      >
        {items.map((t) => (
          <div
            key={t.id}
            role="status"
            className="pointer-events-auto flex w-full max-w-sm animate-fade-up items-start gap-3 rounded-2xl bg-ink px-4 py-3 text-sm text-white shadow-lift ring-1 ring-white/10"
          >
            {icons[t.tone]}
            <p className="flex-1 leading-5">{t.message}</p>
            <button type="button" onClick={() => dismiss(t.id)} className="rounded text-slate-400 hover:text-white" aria-label="Cerrar aviso">
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)
