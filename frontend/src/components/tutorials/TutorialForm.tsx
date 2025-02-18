'use client'

import { useState, useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Tutorial, Career, Tool } from '@/types'
import { getTools } from '@/lib/api'

interface TutorialFormProps {
  tutorial?: Tutorial
  careers: Career[]
  tools: Tool[]
  onClose: () => void
  onSubmit: (data: Partial<Tutorial>) => Promise<void>
}

export default function TutorialForm({ tutorial, careers, tools, onClose, onSubmit }: TutorialFormProps) {
  const [formData, setFormData] = useState({
    title: tutorial?.title || '',
    content: tutorial?.content || '',
    video_url: tutorial?.video_url || '',
    career: tutorial?.career.toString() || '',
    tool: tutorial?.tool?.toString() || '',
    is_premium: tutorial?.is_premium || false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await onSubmit({
        ...formData,
        career: parseInt(formData.career),
        tool: formData.tool ? parseInt(formData.tool) : undefined,
      })
      onClose()
    } catch (error) {
      console.error('Error submitting tutorial:', error)
    }
  }

  return (
    <Dialog as="div" className="relative z-10" onClose={onClose} open={true}>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
            <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
              <button
                type="button"
                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={onClose}
              >
                <span className="sr-only">Cerrar</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                  {tutorial ? 'Editar Tutorial' : 'Nuevo Tutorial'}
                </Dialog.Title>
                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                      Título
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="title"
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="content" className="block text-sm font-medium leading-6 text-gray-900">
                      Contenido
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="content"
                        name="content"
                        rows={4}
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="video_url" className="block text-sm font-medium leading-6 text-gray-900">
                      URL del Video (opcional)
                    </label>
                    <div className="mt-2">
                      <input
                        type="url"
                        name="video_url"
                        id="video_url"
                        value={formData.video_url}
                        onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="career" className="block text-sm font-medium leading-6 text-gray-900">
                      Carrera
                    </label>
                    <div className="mt-2">
                      <select
                        id="career"
                        name="career"
                        value={formData.career}
                        onChange={(e) => setFormData({ ...formData, career: e.target.value })}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        required
                      >
                        <option value="">Selecciona una carrera</option>
                        {careers.map((career) => (
                          <option key={career.id} value={career.id}>
                            {career.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="tool" className="block text-sm font-medium leading-6 text-gray-900">
                      Herramienta Relacionada (opcional)
                    </label>
                    <div className="mt-2">
                      <select
                        id="tool"
                        name="tool"
                        value={formData.tool}
                        onChange={(e) => setFormData({ ...formData, tool: e.target.value })}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      >
                        <option value="">Ninguna</option>
                        {tools.map((tool) => (
                          <option key={tool.id} value={tool.id}>
                            {tool.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="relative flex items-start">
                    <div className="flex h-6 items-center">
                      <input
                        id="is_premium"
                        name="is_premium"
                        type="checkbox"
                        checked={formData.is_premium}
                        onChange={(e) => setFormData({ ...formData, is_premium: e.target.checked })}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="ml-3 text-sm leading-6">
                      <label htmlFor="is_premium" className="font-medium text-gray-900">
                        Contenido Premium
                      </label>
                      <p className="text-gray-500">Este tutorial solo estará disponible para usuarios premium.</p>
                    </div>
                  </div>

                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                    >
                      {tutorial ? 'Guardar Cambios' : 'Crear Tutorial'}
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={onClose}
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  )
}
