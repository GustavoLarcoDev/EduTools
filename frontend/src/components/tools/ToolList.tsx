'use client'

import { useEffect, useState } from 'react'
import { Tool } from '@/types'
import { getTools } from '@/lib/api'
import { PencilIcon, TrashIcon, ArrowDownTrayIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import { useAuth } from '@/contexts/AuthContext'

interface ToolListProps {
  careerFilter?: number
  onEdit?: (tool: Tool) => void
  onDelete?: (id: number) => void
}

export default function ToolList({ careerFilter, onEdit, onDelete }: ToolListProps) {
  const [tools, setTools] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)
  const { isAdmin, isClient } = useAuth()

  useEffect(() => {
    loadTools()
  }, [careerFilter])

  const loadTools = async () => {
    try {
      const data = await getTools(careerFilter ? { career: careerFilter } : undefined)
      setTools(data)
    } catch (error) {
      console.error('Error loading tools:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = (tool: Tool) => {
    if (!tool.is_premium || isAdmin || (isClient && tool.is_premium)) {
      if (!tool.file_url) {
        alert('Lo sentimos, el archivo no está disponible.')
        return
      }

      // Obtener el nombre del archivo de la URL
      const fileName = tool.file_url.split('/').pop() || 'archivo'

      // Crear un enlace temporal
      const link = document.createElement('a')
      link.href = tool.file_url // La URL ya viene completa del backend
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } else {
      alert('Este es un recurso premium. Por favor, actualiza tu cuenta para acceder.')
    }
  }

  if (loading) {
    return <div className="p-4">Cargando herramientas...</div>
  }

  if (tools.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-sm text-gray-500">No hay herramientas registradas aún.</p>
      </div>
    )
  }

  return (
    <div className="overflow-hidden">
      <ul role="list" className="divide-y divide-gray-100">
        {tools.map((tool) => (
          <li key={tool.id} className="flex items-center justify-between gap-x-6 py-5 px-4 hover:bg-gray-50">
            <div className="min-w-0 flex-1">
              <div className="flex items-start gap-x-3">
                <p className="text-sm font-semibold leading-6 text-gray-900">{tool.title}</p>
                {tool.is_premium && (
                  <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                    Premium
                  </span>
                )}
              </div>
              <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                <p className="truncate">{tool.description}</p>
              </div>
            </div>
            <div className="flex flex-none items-center gap-x-4">
              <button
                onClick={() => handleDownload(tool)}
                className={`rounded-md px-2.5 py-1.5 text-sm font-semibold shadow-sm ring-1 ring-inset ${
                  tool.is_premium && !isAdmin && !isClient
                    ? 'bg-gray-100 text-gray-400 ring-gray-200 cursor-not-allowed'
                    : 'bg-white text-gray-900 ring-gray-300 hover:bg-gray-50'
                }`}
              >
                {tool.is_premium && !isAdmin && !isClient ? (
                  <LockClosedIcon className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <ArrowDownTrayIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                )}
              </button>
              
              {onEdit && isAdmin && (
                <button
                  type="button"
                  onClick={() => onEdit(tool)}
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <PencilIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </button>
              )}
              
              {onDelete && isAdmin && (
                <button
                  type="button"
                  onClick={() => onDelete(tool.id)}
                  className="rounded-md bg-red-50 px-2.5 py-1.5 text-sm font-semibold text-red-600 shadow-sm ring-1 ring-inset ring-red-300 hover:bg-red-100"
                >
                  <TrashIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
