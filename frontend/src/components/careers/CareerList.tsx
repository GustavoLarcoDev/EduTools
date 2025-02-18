'use client'

import { useEffect, useState } from 'react'
import { Career } from '@/types'
import { getCareers } from '@/lib/api'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'

interface CareerListProps {
  onEdit?: (career: Career) => void
  onDelete?: (id: number) => void
}

export default function CareerList({ onEdit, onDelete }: CareerListProps) {
  const [careers, setCareers] = useState<Career[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCareers()
  }, [])

  const loadCareers = async () => {
    try {
      const data = await getCareers()
      setCareers(data)
    } catch (error) {
      console.error('Error loading careers:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="p-4">Cargando carreras...</div>
  }

  if (careers.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-sm text-gray-500">No hay carreras registradas aún.</p>
      </div>
    )
  }

  return (
    <div className="overflow-hidden">
      <ul role="list" className="divide-y divide-gray-100">
        {careers.map((career) => (
          <li key={career.id} className="flex items-center justify-between gap-x-6 py-5 px-4 hover:bg-gray-50">
            <div className="min-w-0">
              <div className="flex items-start gap-x-3">
                <p className="text-sm font-semibold leading-6 text-gray-900">{career.name}</p>
              </div>
              <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                <p className="truncate">{career.description}</p>
              </div>
            </div>
            <div className="flex flex-none items-center gap-x-4">
              {onEdit && (
                <button
                  type="button"
                  onClick={() => onEdit(career)}
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <PencilIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </button>
              )}
              {onDelete && (
                <button
                  type="button"
                  onClick={() => onDelete(career.id)}
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
