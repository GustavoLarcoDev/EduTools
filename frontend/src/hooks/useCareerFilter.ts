'use client'

import { useCallback } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

/** Career filter stored in the ?career= query string so links like /tools?career=1 keep working. */
export function useCareerFilter() {
  const params = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const raw = params.get('career')
  const career = raw ? Number(raw) || undefined : undefined

  const setCareer = useCallback(
    (id?: number) => {
      router.replace(id ? `${pathname}?career=${id}` : pathname, { scroll: false })
    },
    [router, pathname]
  )

  return [career, setCareer] as const
}

export const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
