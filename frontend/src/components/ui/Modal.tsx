'use client'

import type { ReactNode } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  icon?: ReactNode
  children: ReactNode
  size?: 'sm' | 'md' | 'lg'
}

const sizes = { sm: 'sm:max-w-md', md: 'sm:max-w-lg', lg: 'sm:max-w-2xl' }

export function Modal({ open, onClose, title, description, icon, children, size = 'md' }: ModalProps) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-ink/50 backdrop-blur-sm transition duration-200 data-[closed]:opacity-0"
      />
      <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-3 sm:items-center sm:p-6">
          <DialogPanel
            transition
            className={`relative w-full ${sizes[size]} rounded-3xl bg-white p-6 shadow-lift ring-1 ring-line transition duration-200 ease-out data-[closed]:translate-y-4 data-[closed]:opacity-0 sm:p-7 sm:data-[closed]:scale-95 sm:data-[closed]:translate-y-0`}
          >
            <button type="button" onClick={onClose} className="icon-btn absolute right-4 top-4" aria-label="Cerrar">
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="flex items-start gap-4 pr-8">
              {icon}
              <div className="min-w-0">
                <DialogTitle as="h2" className="text-xl font-bold text-ink">
                  {title}
                </DialogTitle>
                {description && <p className="mt-1 text-sm text-slate-600">{description}</p>}
              </div>
            </div>
            <div className="mt-6">{children}</div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
