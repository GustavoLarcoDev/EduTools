import type { Metadata } from 'next'
import { Suspense } from 'react'
import TutorialsView from '@/components/views/TutorialsView'

export const metadata: Metadata = {
  title: 'Tutoriales',
  description: 'Guías paso a paso organizadas por carrera universitaria.',
}

export default function Page() {
  return (
    <Suspense>
      <TutorialsView />
    </Suspense>
  )
}
