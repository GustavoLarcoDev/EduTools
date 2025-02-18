'use client'

import { useState } from 'react'
import Layout from '@/components/Layout'
import { Career } from '@/types'
import CareerList from '@/components/careers/CareerList'
import CareerForm from '@/components/careers/CareerForm'
import { createCareer, updateCareer, deleteCareer } from '@/lib/api'
import { useAuth } from '@/contexts/AuthContext'
import { ProtectedRoute } from '@/components/ProtectedRoute'

export default function CareersPage() {
  const { isAdmin } = useAuth()
  const [showForm, setShowForm] = useState(false)
  const [selectedCareer, setSelectedCareer] = useState<Career>()
  const [refreshKey, setRefreshKey] = useState(0)

  const handleCreate = async (data: Partial<Career>) => {
    try {
      await createCareer(data)
      setShowForm(false)
      setRefreshKey(prev => prev + 1)
    } catch (error) {
      console.error('Error creating career:', error)
    }
  }

  const handleUpdate = async (id: number, data: Partial<Career>) => {
    try {
      await updateCareer(id, data)
      setShowForm(false)
      setSelectedCareer(undefined)
      setRefreshKey(prev => prev + 1)
    } catch (error) {
      console.error('Error updating career:', error)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteCareer(id)
      setRefreshKey(prev => prev + 1)
    } catch (error) {
      console.error('Error deleting career:', error)
    }
  }

  const handleEdit = (career: Career) => {
    setSelectedCareer(career)
    setShowForm(true)
  }

  return (
    <Layout>
      <ProtectedRoute>
        <div className="space-y-10 pt-5 sm:pt-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="min-w-0 flex-1">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                Carreras
              </h2>
            </div>
            {isAdmin && (
              <div className="mt-4 flex md:ml-4 md:mt-0">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCareer(undefined)
                    setShowForm(true)
                  }}
                  className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Agregar Carrera
                </button>
              </div>
            )}
          </div>

          <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
            <CareerList
              key={refreshKey}
              onEdit={isAdmin ? handleEdit : undefined}
              onDelete={isAdmin ? handleDelete : undefined}
            />
          </div>

          {showForm && isAdmin && (
            <CareerForm
              career={selectedCareer}
              onClose={() => {
                setShowForm(false)
                setSelectedCareer(undefined)
              }}
              onSubmit={selectedCareer ? 
                (data) => handleUpdate(selectedCareer.id, data) : 
                handleCreate
              }
            />
          )}
        </div>
      </ProtectedRoute>
    </Layout>
  )
}
