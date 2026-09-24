'use client'

import { useMemo, useState } from 'react'
import { PlusIcon } from '@heroicons/react/20/solid'
import Layout from '@/components/Layout'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import CareerCard from '@/components/careers/CareerCard'
import CareerForm from '@/components/careers/CareerForm'
import { PageHeader } from '@/components/ui/PageHeader'
import { CardGridSkeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/EmptyState'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { useToast } from '@/components/ui/Toast'
import { useAuth } from '@/contexts/AuthContext'
import { useCatalog } from '@/hooks/useCatalog'
import { createCareer, deleteCareer, errorMessage, updateCareer } from '@/lib/api'
import type { Career } from '@/types'

function count<T extends { career: number }>(items: T[]) {
  const m = new Map<number, number>()
  items.forEach((i) => m.set(i.career, (m.get(i.career) ?? 0) + 1))
  return m
}

function CareersInner() {
  const { isAdmin } = useAuth()
  const toast = useToast()
  const { careers, tools, tutorials, loading, reload } = useCatalog(['careers', 'tools', 'tutorials'])
  const [editing, setEditing] = useState<Career | undefined>()
  const [showForm, setShowForm] = useState(false)
  const [toDelete, setToDelete] = useState<Career | undefined>()

  const toolCounts = useMemo(() => count(tools), [tools])
  const tutorialCounts = useMemo(() => count(tutorials), [tutorials])

  const submit = async (data: Partial<Career>) => {
    if (editing) await updateCareer(editing.id, data)
    else await createCareer(data)
    toast(editing ? 'Carrera actualizada' : 'Carrera creada')
    setEditing(undefined)
    await reload()
  }

  const remove = async () => {
    if (!toDelete) return
    try {
      await deleteCareer(toDelete.id)
      toast('Carrera eliminada')
      await reload()
    } catch (e) {
      toast(errorMessage(e), 'error')
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Explora por área"
        title="Carreras"
        description="Cada carrera reúne sus tutoriales y herramientas. Elige la tuya para ver solo lo que te sirve."
        count={loading ? undefined : careers.length}
        countLabel={careers.length === 1 ? 'carrera' : 'carreras'}
        actions={
          isAdmin && (
            <button type="button" className="btn-primary" onClick={() => { setEditing(undefined); setShowForm(true) }}>
              <PlusIcon className="h-5 w-5" aria-hidden="true" />
              Agregar carrera
            </button>
          )
        }
      />
      <div className="container-page py-10 pb-20">
        {loading ? (
          <CardGridSkeleton />
        ) : careers.length === 0 ? (
          <EmptyState title="Aún no hay carreras" description="Cuando un administrador agregue carreras aparecerán aquí." />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {careers.map((c) => (
              <CareerCard
                key={c.id}
                career={c}
                toolCount={toolCounts.get(c.id) ?? 0}
                tutorialCount={tutorialCounts.get(c.id) ?? 0}
                onEdit={isAdmin ? (career) => { setEditing(career); setShowForm(true) } : undefined}
                onDelete={isAdmin ? setToDelete : undefined}
              />
            ))}
          </div>
        )}
      </div>

      {showForm && isAdmin && (
        <CareerForm career={editing} onClose={() => { setShowForm(false); setEditing(undefined) }} onSubmit={submit} />
      )}
      <ConfirmDialog
        open={!!toDelete}
        title="Eliminar carrera"
        message={`«${toDelete?.name ?? ''}» y todo su contenido asociado se eliminarán de forma permanente.`}
        onConfirm={remove}
        onClose={() => setToDelete(undefined)}
      />
    </>
  )
}

export default function CareersView() {
  return (
    <Layout>
      <ProtectedRoute>
        <CareersInner />
      </ProtectedRoute>
    </Layout>
  )
}
