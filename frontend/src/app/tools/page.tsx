import type { Metadata } from 'next'
import { Suspense } from 'react'
import ToolsView from '@/components/views/ToolsView'

export const metadata: Metadata = {
  title: 'Herramientas',
  description: 'Plantillas, guías y hojas de cálculo descargables por carrera.',
}

export default function Page() {
  return (
    <Suspense>
      <ToolsView />
    </Suspense>
  )
}
