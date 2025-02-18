'use client'

import { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import { Tool, Career } from '@/types'
import ToolList from '@/components/tools/ToolList'
import ToolForm from '@/components/tools/ToolForm'
import { createTool, updateTool, deleteTool, getCareers } from '@/lib/api'
import { useSearchParams } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { ProtectedRoute } from '@/components/ProtectedRoute'

export default function ToolsPage() {
  const { isAdmin } = useAuth()
  const [showForm, setShowForm] = useState(false)
  const [selectedTool, setSelectedTool] = useState<Tool | undefined>()
  const [refreshKey, setRefreshKey] = useState(0)
  const [careers, setCareers] = useState<Career[]>([])
  const searchParams = useSearchParams()
  const careerFilter = searchParams.get('career')

  const handleCreate = async (data: FormData) => {
    try {
      await createTool(data)
      setShowForm(false)
      setRefreshKey(prev => prev + 1)
    } catch (error) {
      console.error('Error creating tool:', error)
    }
  }

  const handleUpdate = async (id: number, data: FormData) => {
    try {
      await updateTool(id, data)
      setSelectedTool(undefined)
      setShowForm(false)
      setRefreshKey(prev => prev + 1)
    } catch (error) {
      console.error('Error updating tool:', error)
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta herramienta?')) {
      try {
        await deleteTool(id)
        setRefreshKey(prev => prev + 1)
      } catch (error) {
        console.error('Error deleting tool:', error)
      }
    }
  }

  const handleEdit = (tool: Tool) => {
    setSelectedTool(tool)
    setShowForm(true)
  }

  const loadCareers = async () => {
    try {
      const data = await getCareers()
      setCareers(data)
    } catch (error) {
      console.error('Error loading careers:', error)
    }
  }

  useEffect(() => {
    loadCareers()
  }, [])

  return (
    <Layout>
      <ProtectedRoute>
        <div className="space-y-10 pt-5 sm:pt-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="min-w-0 flex-1">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                Herramientas Educativas
              </h2>
            </div>
            {isAdmin && (
              <div className="mt-4 flex md:ml-4 md:mt-0">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTool(undefined)
                    setShowForm(true)
                  }}
                  className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Agregar Herramienta
                </button>
              </div>
            )}
          </div>

          <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
            <ToolList
              key={refreshKey}
              careerFilter={careerFilter ? parseInt(careerFilter) : undefined}
              onEdit={isAdmin ? handleEdit : undefined}
              onDelete={isAdmin ? handleDelete : undefined}
            />
          </div>

          {showForm && isAdmin && (
            <ToolForm
              tool={selectedTool}
              careers={careers}
              onClose={() => {
                setShowForm(false)
                setSelectedTool(undefined)
              }}
              onSubmit={selectedTool ? 
                (data) => handleUpdate(selectedTool.id, data) : 
                handleCreate
              }
            />
          )}
        </div>
      </ProtectedRoute>
    </Layout>
  )
}
