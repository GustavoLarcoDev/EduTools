import type { Metadata } from 'next'
import { Suspense } from 'react'
import LoginView from '@/components/views/LoginView'

export const metadata: Metadata = {
  title: 'Iniciar sesión',
}

export default function Page() {
  return (
    <Suspense>
      <LoginView />
    </Suspense>
  )
}
