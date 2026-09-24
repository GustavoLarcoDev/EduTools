'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { CardGridSkeleton } from './ui/Skeleton'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && !user) {
      const next = typeof window !== 'undefined' ? pathname + window.location.search : pathname
      router.replace(`/auth/login?next=${encodeURIComponent(next)}`)
    }
  }, [user, isLoading, router, pathname])

  if (isLoading || !user) {
    return (
      <div className="container-page py-12">
        <CardGridSkeleton />
      </div>
    )
  }

  return <>{children}</>
}
