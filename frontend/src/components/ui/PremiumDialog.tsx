'use client'

import { useState } from 'react'
import { CheckIcon, LockClosedIcon } from '@heroicons/react/20/solid'
import { createCheckoutSession, errorMessage } from '@/lib/api'
import { IS_DEMO } from '@/lib/config'
import { Modal } from './Modal'

const perks = ['Herramientas y plantillas premium de todas las carreras', 'Tutoriales avanzados completos', 'Se activa en tu misma cuenta']

export function PremiumDialog({ open, onClose, itemTitle }: { open: boolean; onClose: () => void; itemTitle?: string }) {
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const checkout = async () => {
    setError('')
    setBusy(true)
    try {
      const session = await createCheckoutSession()
      if (session?.url) window.location.href = session.url
    } catch (e) {
      setError(errorMessage(e, 'No se pudo iniciar el pago.'))
    } finally {
      setBusy(false)
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="sm"
      title="Contenido Premium"
      description={itemTitle ? `«${itemTitle}» es parte del plan Premium.` : undefined}
      icon={
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-300 to-amber-500 text-white shadow-soft">
          <LockClosedIcon className="h-5 w-5" aria-hidden="true" />
        </span>
      }
    >
      <ul className="space-y-2.5">
        {perks.map((p) => (
          <li key={p} className="flex items-start gap-2.5 text-sm text-slate-700">
            <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
            {p}
          </li>
        ))}
      </ul>
      {IS_DEMO ? (
        <p className="mt-5 rounded-2xl bg-brand-50 p-4 text-sm text-brand-900">
          El plan Premium está pensado para cobrarse con <strong>Stripe Checkout</strong>. En esta demo el pago está
          desactivado: entra como <strong>Admin (demo)</strong> para ver todo el contenido Premium.
        </p>
      ) : (
        error && <p className="mt-5 rounded-2xl bg-rose-50 p-4 text-sm text-rose-700">{error}</p>
      )}
      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button type="button" className="btn-secondary" onClick={onClose}>
          Ahora no
        </button>
        <button type="button" className="btn-primary" onClick={checkout} disabled={IS_DEMO || busy}>
          {IS_DEMO ? 'Pago desactivado en la demo' : busy ? 'Redirigiendo…' : 'Hazte Premium'}
        </button>
      </div>
    </Modal>
  )
}
