'use client'

import { useState } from 'react'
import type { Career } from '@/types'
import { errorMessage } from '@/lib/api'
import { Modal } from '../ui/Modal'
import { FormActions, FormError } from '../ui/FormBits'

interface CareerFormProps {
  career?: Career
  onClose: () => void
  onSubmit: (data: Partial<Career>) => Promise<void>
}

export default function CareerForm({ career, onClose, onSubmit }: CareerFormProps) {
  const [formData, setFormData] = useState({ name: career?.name || '', description: career?.description || '' })
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const missing = !formData.name.trim() ? 'El nombre es obligatorio.' : !formData.description.trim() ? 'La descripción es obligatoria.' : ''
    if (missing) {
      setError(missing)
      return
    }
    setBusy(true)
    setError('')
    try {
      await onSubmit(formData)
      onClose()
    } catch (err) {
      setError(errorMessage(err, 'No se pudo guardar la carrera.'))
    } finally {
      setBusy(false)
    }
  }

  return (
    <Modal open onClose={onClose} title={career ? 'Editar carrera' : 'Nueva carrera'} description="Las carreras agrupan tutoriales y herramientas.">
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div>
          <label htmlFor="name" className="label">Nombre</label>
          <input id="name" required className="input" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Ej. Ingeniería Civil" />
        </div>
        <div>
          <label htmlFor="description" className="label">Descripción</label>
          <textarea id="description" required rows={4} className="input" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
        </div>
        <FormError message={error} />
        <FormActions onCancel={onClose} busy={busy} submitLabel={career ? 'Guardar cambios' : 'Crear carrera'} />
      </form>
    </Modal>
  )
}
