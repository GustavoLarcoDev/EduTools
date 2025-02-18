'use client'

import { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import { Tutorial, Career, Tool } from '@/types'
import TutorialList from '@/components/tutorials/TutorialList'
import TutorialForm from '@/components/tutorials/TutorialForm'
import { createTutorial, updateTutorial, deleteTutorial, getCareers, getTools } from '@/lib/api'
import { useSearchParams } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { ProtectedRoute } from '@/components/ProtectedRoute'

export default function TutorialsPage() {
  const { isAdmin } = useAuth()
  const [showForm, setShowForm] = useState(false)
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | undefined>()
  const [refreshKey, setRefreshKey] = useState(0)
  const [careers, setCareers] = useState<Career[]>([])
  const [tools, setTools] = useState<Tool[]>([])
  const searchParams = useSearchParams()
  const careerFilter = searchParams.get('career')

  useEffect(() => {
    loadCareers()
  }, [])

  useEffect(() => {
    if (careerFilter) {
      loadTools()
    }
  }, [careerFilter])

  const loadCareers = async () => {
    try {
      const data = await getCareers()
      setCareers(data)
    } catch (error) {
      console.error('Error loading careers:', error)
    }
  }

  const loadTools = async () => {
    try {
      const data = await getTools(careerFilter ? { career: parseInt(careerFilter) } : undefined)
      setTools(data)
    } catch (error) {
      console.error('Error loading tools:', error)
    }
  }

  const handleCreate = async (data: Partial<Tutorial>) => {
    try {
      await createTutorial(data)
      setShowForm(false)
      setRefreshKey(prev => prev + 1)
    } catch (error) {
      console.error('Error creating tutorial:', error)
    }
  }

  const handleUpdate = async (id: number, data: Partial<Tutorial>) => {
    try {
      await updateTutorial(id, data)
      setSelectedTutorial(undefined)
      setShowForm(false)
      setRefreshKey(prev => prev + 1)
    } catch (error) {
      console.error('Error updating tutorial:', error)
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este tutorial?')) {
      try {
        await deleteTutorial(id)
        setRefreshKey(prev => prev + 1)
      } catch (error) {
        console.error('Error deleting tutorial:', error)
      }
    }
  }

  const handleEdit = (tutorial: Tutorial) => {
    setSelectedTutorial(tutorial)
    setShowForm(true)
  }

  return (
    <Layout>
      <ProtectedRoute>
        <div className="space-y-10 pt-5 sm:pt-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="min-w-0 flex-1">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                Tutoriales
              </h2>
            </div>
            {isAdmin && (
              <div className="mt-4 flex md:ml-4 md:mt-0">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTutorial(undefined)
                    setShowForm(true)
                  }}
                  className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Agregar Tutorial
                </button>
              </div>
            )}
          </div>

          <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
            <TutorialList
              key={refreshKey}
              careerFilter={careerFilter ? parseInt(careerFilter) : undefined}
              onEdit={isAdmin ? handleEdit : undefined}
              onDelete={isAdmin ? handleDelete : undefined}
            />
          </div>

          {showForm && isAdmin && (
            <TutorialForm
              tutorial={selectedTutorial}
              careers={careers}
              tools={tools}
              onClose={() => {
                setShowForm(false)
                setSelectedTutorial(undefined)
              }}
              onSubmit={selectedTutorial ? 
                (data) => handleUpdate(selectedTutorial.id, data) : 
                handleCreate
              }
            />
          )}
        </div>
      </ProtectedRoute>
    </Layout>
  )
}
