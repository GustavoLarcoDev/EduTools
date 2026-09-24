'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { CardGridSkeleton } from './ui/Skeleton'
import { IS_DEMO } from '@/lib/config'

/**
 * Requires a signed-in user. In the static demo, anonymous visitors may browse the
 * catalog read-only as guests (admin actions still need the demo admin login).
 */
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, isLoading } = useAuth()

  useEffect(() => {
    if (!IS_DEMO && !isLoading && !user) {
      const next = typeof window !== 'undefined' ? pathname + window.location.search : pathname
      router.replace(`/auth/login?next=${encodeURIComponent(next)}`)
    }
  }, [user, isLoading, router, pathname])

  if (isLoading || (!user && !IS_DEMO)) {
    return (
      <div className="container-page py-12">
        <CardGridSkeleton />
      </div>
    )
  }

  return <>{children}</>
}
