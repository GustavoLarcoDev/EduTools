'use client'

import { useEffect, useState } from 'react'
import { Tutorial } from '@/types'
import { getTutorials } from '@/lib/api'
import { PencilIcon, TrashIcon, PlayIcon } from '@heroicons/react/24/outline'

interface TutorialListProps {
  careerFilter?: number
  onEdit?: (tutorial: Tutorial) => void
  onDelete?: (id: number) => void
}

export default function TutorialList({ careerFilter, onEdit = () => {}, onDelete = () => {} }: TutorialListProps) {
  const [tutorials, setTutorials] = useState<Tutorial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadTutorials()
  }, [careerFilter])

  const loadTutorials = async () => {
    try {
      const data = await getTutorials(careerFilter ? { career: careerFilter } : undefined)
      setTutorials(data)
    } catch (error) {
      console.error('Error loading tutorials:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="p-4">Cargando tutoriales...</div>
  }

  if (tutorials.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-sm text-gray-500">No hay tutoriales registrados aún.</p>
      </div>
    )
  }

  return (
    <div className="overflow-hidden">
      <ul role="list" className="divide-y divide-gray-100">
        {tutorials.map((tutorial) => (
          <li key={tutorial.id} className="flex items-center justify-between gap-x-6 py-5 px-4 hover:bg-gray-50">
            <div className="min-w-0 flex-1">
              <div className="flex items-start gap-x-3">
                <p className="text-sm font-semibold leading-6 text-gray-900">{tutorial.title}</p>
                {tutorial.is_premium && (
                  <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                    Premium
                  </span>
                )}
              </div>
              <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                <p className="truncate">{tutorial.content}</p>
              </div>
            </div>
            <div className="flex flex-none items-center gap-x-4">
              {tutorial.video_url && (
                <a
                  href={tutorial.video_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <PlayIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </a>
              )}
              <button
                type="button"
                onClick={() => onEdit(tutorial)}
                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <PencilIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => onDelete(tutorial.id)}
                className="rounded-md bg-red-50 px-2.5 py-1.5 text-sm font-semibold text-red-600 shadow-sm ring-1 ring-inset ring-red-300 hover:bg-red-100"
              >
                <TrashIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
