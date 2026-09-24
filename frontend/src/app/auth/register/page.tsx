import type { Metadata } from 'next'
import { Suspense } from 'react'
import RegisterView from '@/components/views/RegisterView'

export const metadata: Metadata = {
  title: 'Crear cuenta',
}

export default function Page() {
  return (
    <Suspense>
      <RegisterView />
    </Suspense>
  )
}
