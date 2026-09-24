'use client'

import { useState } from 'react'
import type { Career, Tool, Tutorial } from '@/types'
import { errorMessage } from '@/lib/api'
import { Modal } from '../ui/Modal'
import { FormActions, FormError, PremiumSwitch } from '../ui/FormBits'

interface TutorialFormProps {
  tutorial?: Tutorial
  careers: Career[]
  tools: Tool[]
  defaultCareer?: number
  onClose: () => void
  onSubmit: (data: Partial<Tutorial>) => Promise<void>
}

export default function TutorialForm({ tutorial, careers, tools, defaultCareer, onClose, onSubmit }: TutorialFormProps) {
  const [formData, setFormData] = useState({
    title: tutorial?.title || '',
    content: tutorial?.content || '',
    video_url: tutorial?.video_url || '',
    career: tutorial?.career?.toString() || defaultCareer?.toString() || '',
    tool: tutorial?.tool?.toString() || '',
    is_premium: tutorial?.is_premium || false,
  })
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const careerTools = formData.career ? tools.filter((t) => t.career === parseInt(formData.career)) : tools

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      await onSubmit({
        ...formData,
        career: parseInt(formData.career),
        tool: formData.tool ? parseInt(formData.tool) : undefined,
      })
      onClose()
    } catch (err) {
      setError(errorMessage(err, 'No se pudo guardar el tutorial.'))
    } finally {
      setBusy(false)
    }
  }

  return (
    <Modal open onClose={onClose} size="lg" title={tutorial ? 'Editar tutorial' : 'Nuevo tutorial'} description="Guías paso a paso asociadas a una carrera y, opcionalmente, a una herramienta.">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="title" className="label">Título</label>
          <input id="title" required className="input" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
        </div>
        <div>
          <label htmlFor="content" className="label">Contenido</label>
          <textarea id="content" required rows={6} className="input" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} />
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="career" className="label">Carrera</label>
            <select id="career" required className="input" value={formData.career} onChange={(e) => setFormData({ ...formData, career: e.target.value, tool: '' })}>
              <option value="">Selecciona una carrera</option>
              {careers.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="tool" className="label">Herramienta relacionada <span className="font-normal text-slate-500">(opcional)</span></label>
            <select id="tool" className="input" value={formData.tool} onChange={(e) => setFormData({ ...formData, tool: e.target.value })}>
              <option value="">Ninguna</option>
              {careerTools.map((t) => (
                <option key={t.id} value={t.id}>{t.title}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="video_url" className="label">URL del video <span className="font-normal text-slate-500">(opcional)</span></label>
          <input id="video_url" type="url" className="input" placeholder="https://" value={formData.video_url} onChange={(e) => setFormData({ ...formData, video_url: e.target.value })} />
        </div>
        <PremiumSwitch checked={formData.is_premium} onChange={(v) => setFormData({ ...formData, is_premium: v })} hint="El contenido completo solo estará disponible para usuarios Premium." />
        <FormError message={error} />
        <FormActions onCancel={onClose} busy={busy} submitLabel={tutorial ? 'Guardar cambios' : 'Crear tutorial'} />
      </form>
    </Modal>
  )
}
