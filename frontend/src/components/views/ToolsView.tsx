'use client'

import { useMemo, useState } from 'react'
import { PlusIcon } from '@heroicons/react/20/solid'
import Layout from '@/components/Layout'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import ToolCard from '@/components/tools/ToolCard'
import ToolForm from '@/components/tools/ToolForm'
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
import { createTool, deleteTool, errorMessage, updateTool } from '@/lib/api'
import { IS_DEMO } from '@/lib/config'
import type { Tool } from '@/types'

function ToolsInner() {
  const { isAdmin, canAccessPremium } = useAuth()
  const toast = useToast()
  const { careers, tools, loading, reload } = useCatalog(['careers', 'tools'])
  const [career, setCareer] = useCareerFilter()
  const [query, setQuery] = useState('')
  const [premiumOnly, setPremiumOnly] = useState(false)
  const [editing, setEditing] = useState<Tool | undefined>()
  const [showForm, setShowForm] = useState(false)
  const [toDelete, setToDelete] = useState<Tool | undefined>()
  const [premiumFor, setPremiumFor] = useState<Tool | undefined>()

  const careerById = useMemo(() => new Map(careers.map((c) => [c.id, c])), [careers])
  const visible = useMemo(() => {
    const q = normalize(query.trim())
    return tools.filter(
      (t) =>
        (!career || t.career === career) &&
        (!premiumOnly || t.is_premium) &&
        (!q || normalize(`${t.title} ${t.description}`).includes(q))
    )
  }, [tools, career, query, premiumOnly])

  const download = (tool: Tool) => {
    if (tool.is_premium && !canAccessPremium) {
      setPremiumFor(tool)
      return
    }
    if (IS_DEMO || !tool.file_url || tool.file_url === '#') {
      toast(IS_DEMO ? `Descarga simulada: «${tool.title}». La demo no incluye archivos reales.` : 'El archivo no está disponible.', 'info')
      return
    }
    const link = document.createElement('a')
    link.href = tool.file_url
    link.setAttribute('download', tool.file_url.split('/').pop() || 'archivo')
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  const submit = async (data: FormData) => {
    if (editing) await updateTool(editing.id, data)
    else await createTool(data)
    toast(editing ? 'Herramienta actualizada' : 'Herramienta creada')
    setEditing(undefined)
    await reload()
  }

  const remove = async () => {
    if (!toDelete) return
    try {
      await deleteTool(toDelete.id)
      toast('Herramienta eliminada')
      await reload()
    } catch (e) {
      toast(errorMessage(e), 'error')
    }
  }

  const selectedCareer = career ? careerById.get(career) : undefined

  return (
    <>
      <PageHeader
        eyebrow={selectedCareer ? selectedCareer.name : 'Biblioteca'}
        title="Herramientas"
        description="Plantillas, guías y hojas de cálculo listas para descargar, organizadas por carrera."
        count={loading ? undefined : visible.length}
        countLabel={visible.length === 1 ? 'recurso' : 'recursos'}
        actions={
          isAdmin && (
            <button type="button" className="btn-primary" onClick={() => { setEditing(undefined); setShowForm(true) }}>
              <PlusIcon className="h-5 w-5" aria-hidden="true" />
              Agregar herramienta
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
          placeholder="Buscar herramientas…"
          premiumOnly={premiumOnly}
          onPremiumOnly={setPremiumOnly}
        />
        <div className="pt-8">
          {loading ? (
            <CardGridSkeleton />
          ) : visible.length === 0 ? (
            <EmptyState
              title="No encontramos herramientas"
              description="Prueba con otra carrera o cambia el texto de búsqueda."
              action={
                <button type="button" className="btn-secondary" onClick={() => { setQuery(''); setPremiumOnly(false); setCareer(undefined) }}>
                  Limpiar filtros
                </button>
              }
            />
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((tool) => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  career={careerById.get(tool.career)}
                  locked={tool.is_premium && !canAccessPremium}
                  onDownload={download}
                  onEdit={isAdmin ? (t) => { setEditing(t); setShowForm(true) } : undefined}
                  onDelete={isAdmin ? setToDelete : undefined}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {showForm && isAdmin && (
        <ToolForm
          tool={editing}
          careers={careers}
          defaultCareer={career}
          onClose={() => { setShowForm(false); setEditing(undefined) }}
          onSubmit={submit}
        />
      )}
      <ConfirmDialog
        open={!!toDelete}
        title="Eliminar herramienta"
        message={`«${toDelete?.title ?? ''}» se eliminará de forma permanente.`}
        onConfirm={remove}
        onClose={() => setToDelete(undefined)}
      />
      <PremiumDialog open={!!premiumFor} itemTitle={premiumFor?.title} onClose={() => setPremiumFor(undefined)} />
    </>
  )
}

export default function ToolsView() {
  return (
    <Layout>
      <ProtectedRoute>
        <ToolsInner />
      </ProtectedRoute>
    </Layout>
  )
}
