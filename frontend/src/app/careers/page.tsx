import type { Metadata } from 'next'
import { Suspense } from 'react'
import CareersView from '@/components/views/CareersView'

export const metadata: Metadata = {
  title: 'Carreras',
  description: 'Explora las carreras y sus tutoriales y herramientas.',
}

export default function Page() {
  return (
    <Suspense>
      <CareersView />
    </Suspense>
  )
}
