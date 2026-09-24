'use client'

import { useState } from 'react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { Modal } from './Modal'

interface ConfirmDialogProps {
  open: boolean
  title: string
  message: string
  confirmLabel?: string
  onConfirm: () => Promise<void> | void
  onClose: () => void
}

export function ConfirmDialog({ open, title, message, confirmLabel = 'Eliminar', onConfirm, onClose }: ConfirmDialogProps) {
  const [busy, setBusy] = useState(false)
  const confirm = async () => {
    setBusy(true)
    try {
      await onConfirm()
      onClose()
    } finally {
      setBusy(false)
    }
  }
  return (
    <Modal
      open={open}
      onClose={onClose}
      size="sm"
      title={title}
      icon={
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
          <ExclamationTriangleIcon className="h-6 w-6" aria-hidden="true" />
        </span>
      }
    >
      <p className="text-sm text-slate-600">{message}</p>
      <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button type="button" className="btn-secondary" onClick={onClose}>
          Cancelar
        </button>
        <button type="button" className="btn-danger" onClick={confirm} disabled={busy}>
          {busy ? 'Eliminando…' : confirmLabel}
        </button>
      </div>
    </Modal>
  )
}
