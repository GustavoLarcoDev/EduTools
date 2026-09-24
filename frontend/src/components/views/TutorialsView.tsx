'use client'

import { useMemo, useState } from 'react'
import { PlusIcon } from '@heroicons/react/20/solid'
import Layout from '@/components/Layout'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import TutorialCard from '@/components/tutorials/TutorialCard'
import TutorialDrawer from '@/components/tutorials/TutorialDrawer'
import TutorialForm from '@/components/tutorials/TutorialForm'
import { PageHeader } from '@/components/ui/PageHeader'
import { FilterBar } from '@/components/ui/FilterBar'
import { CardGridSkeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/EmptyState'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { PremiumDialog } from '@/components/ui/PremiumDialog'
import { useToast } from '@/components/ui/Toast'
import { useAuth } from '@/contexts/AuthContext'
import { useCatalog } from '@/hooks/useCatalog'
import { normalize, useCareerFilter } from '@/hooks/useCareerFilter'
import { createTutorial, deleteTutorial, errorMessage, updateTutorial } from '@/lib/api'
import type { Tutorial } from '@/types'

function TutorialsInner() {
  const { isAdmin, canAccessPremium } = useAuth()
  const toast = useToast()
  const { careers, tools, tutorials, loading, reload } = useCatalog(['careers', 'tools', 'tutorials'])
  const [career, setCareer] = useCareerFilter()
  const [query, setQuery] = useState('')
  const [premiumOnly, setPremiumOnly] = useState(false)
  const [editing, setEditing] = useState<Tutorial | undefined>()
  const [showForm, setShowForm] = useState(false)
  const [toDelete, setToDelete] = useState<Tutorial | undefined>()
  const [reading, setReading] = useState<Tutorial | undefined>()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [premiumOpen, setPremiumOpen] = useState(false)

  const careerById = useMemo(() => new Map(careers.map((c) => [c.id, c])), [careers])
  const toolById = useMemo(() => new Map(tools.map((t) => [t.id, t])), [tools])
  const visible = useMemo(() => {
    const q = normalize(query.trim())
    return tutorials.filter(
      (t) =>
        (!career || t.career === career) &&
        (!premiumOnly || t.is_premium) &&
        (!q || normalize(`${t.title} ${t.content}`).includes(q))
    )
  }, [tutorials, career, query, premiumOnly])

  const submit = async (data: Partial<Tutorial>) => {
    if (editing) await updateTutorial(editing.id, data)
    else await createTutorial(data)
    toast(editing ? 'Tutorial actualizado' : 'Tutorial creado')
    setEditing(undefined)
    await reload()
  }

  const remove = async () => {
    if (!toDelete) return
    try {
      await deleteTutorial(toDelete.id)
      toast('Tutorial eliminado')
      await reload()
    } catch (e) {
      toast(errorMessage(e), 'error')
    }
  }

  const selectedCareer = career ? careerById.get(career) : undefined
  const isLocked = (t?: Tutorial) => !!t?.is_premium && !canAccessPremium

  return (
    <>
      <PageHeader
        eyebrow={selectedCareer ? selectedCareer.name : 'Aprende paso a paso'}
        title="Tutoriales"
        description="Guías prácticas escritas para cada carrera, conectadas con las herramientas que vas a usar."
        count={loading ? undefined : visible.length}
        countLabel={visible.length === 1 ? 'tutorial' : 'tutoriales'}
        actions={
          isAdmin && (
            <button type="button" className="btn-primary" onClick={() => { setEditing(undefined); setShowForm(true) }}>
              <PlusIcon className="h-5 w-5" aria-hidden="true" />
              Agregar tutorial
            </button>
          )
        }
      />
      <div className="container-page pb-20">
        <FilterBar
          careers={careers}
          selected={career}
          onSelect={setCareer}
          query={query}
          onQuery={setQuery}
          placeholder="Buscar tutoriales…"
          premiumOnly={premiumOnly}
          onPremiumOnly={setPremiumOnly}
        />
        <div className="pt-8">
          {loading ? (
            <CardGridSkeleton />
          ) : visible.length === 0 ? (
            <EmptyState
              title="No hay tutoriales que coincidan"
              description="Prueba con otra carrera o cambia el texto de búsqueda."
              action={
                <button type="button" className="btn-secondary" onClick={() => { setQuery(''); setPremiumOnly(false); setCareer(undefined) }}>
                  Limpiar filtros
                </button>
              }
            />
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((t) => (
                <TutorialCard
                  key={t.id}
                  tutorial={t}
                  career={careerById.get(t.career)}
                  tool={t.tool ? toolById.get(t.tool) : undefined}
                  locked={isLocked(t)}
                  onOpen={(tut) => { setReading(tut); setDrawerOpen(true) }}
                  onEdit={isAdmin ? (tut) => { setEditing(tut); setShowForm(true) } : undefined}
                  onDelete={isAdmin ? setToDelete : undefined}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <TutorialDrawer
        open={drawerOpen}
        tutorial={reading}
        career={reading ? careerById.get(reading.career) : undefined}
        tool={reading?.tool ? toolById.get(reading.tool) : undefined}
        locked={isLocked(reading)}
        onClose={() => setDrawerOpen(false)}
        onUnlock={() => { setDrawerOpen(false); setPremiumOpen(true) }}
      />
      {showForm && isAdmin && (
        <TutorialForm
          tutorial={editing}
          careers={careers}
          tools={tools}
          defaultCareer={career}
          onClose={() => { setShowForm(false); setEditing(undefined) }}
          onSubmit={submit}
        />
      )}
      <ConfirmDialog
        open={!!toDelete}
        title="Eliminar tutorial"
        message={`«${toDelete?.title ?? ''}» se eliminará de forma permanente.`}
        onConfirm={remove}
        onClose={() => setToDelete(undefined)}
      />
      <PremiumDialog open={premiumOpen} itemTitle={reading?.title} onClose={() => setPremiumOpen(false)} />
    </>
  )
}

export default function TutorialsView() {
  return (
    <Layout>
      <ProtectedRoute>
        <TutorialsInner />
      </ProtectedRoute>
    </Layout>
  )
}
