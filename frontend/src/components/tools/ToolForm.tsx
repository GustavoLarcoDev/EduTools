'use client'

import { useRef, useState } from 'react'
import type { Career, Tool } from '@/types'
import { errorMessage } from '@/lib/api'
import { IS_DEMO } from '@/lib/config'
import { Modal } from '../ui/Modal'
import { FormActions, FormError, PremiumSwitch } from '../ui/FormBits'

interface ToolFormProps {
  tool?: Tool
  careers: Career[]
  defaultCareer?: number
  onClose: () => void
  onSubmit: (data: FormData) => Promise<void>
}

export default function ToolForm({ tool, careers, defaultCareer, onClose, onSubmit }: ToolFormProps) {
  const [formData, setFormData] = useState({
    title: tool?.title || '',
    description: tool?.description || '',
    career: tool?.career?.toString() || defaultCareer?.toString() || '',
    is_premium: tool?.is_premium || false,
  })
  const fileRef = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const form = new FormData()
    form.append('title', formData.title)
    form.append('description', formData.description)
    form.append('career', formData.career)
    form.append('is_premium', formData.is_premium.toString())
    const file = fileRef.current?.files?.[0]
    if (file) form.append('file', file)

    setBusy(true)
    setError('')
    try {
      await onSubmit(form)
      onClose()
    } catch (err) {
      setError(errorMessage(err, 'No se pudo guardar la herramienta.'))
    } finally {
      setBusy(false)
    }
  }

  return (
    <Modal open onClose={onClose} title={tool ? 'Editar herramienta' : 'Nueva herramienta'} description="Plantillas, guías y archivos descargables para una carrera.">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="title" className="label">Título</label>
          <input id="title" required className="input" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
        </div>
        <div>
          <label htmlFor="description" className="label">Descripción</label>
          <textarea id="description" required rows={3} className="input" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
        </div>
        <div>
          <label htmlFor="career" className="label">Carrera</label>
          <select id="career" required className="input" value={formData.career} onChange={(e) => setFormData({ ...formData, career: e.target.value })}>
            <option value="">Selecciona una carrera</option>
            {careers.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="file" className="label">
            Archivo {IS_DEMO && <span className="font-normal text-slate-500">(opcional en la demo: no se sube a ningún servidor)</span>}
          </label>
          <input
            ref={fileRef}
            type="file"
            id="file"
            name="file"
            required={!tool && !IS_DEMO}
            className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-xl file:border-0 file:bg-brand-50 file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-brand-700 hover:file:bg-brand-100"
          />
        </div>
        <PremiumSwitch checked={formData.is_premium} onChange={(v) => setFormData({ ...formData, is_premium: v })} hint="Solo visible y descargable para usuarios Premium." />
        <FormError message={error} />
        <FormActions onCancel={onClose} busy={busy} submitLabel={tool ? 'Guardar cambios' : 'Crear herramienta'} />
      </form>
    </Modal>
  )
}
