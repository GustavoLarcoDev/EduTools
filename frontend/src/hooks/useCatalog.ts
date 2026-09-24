'use client'

import { useCallback, useEffect, useState } from 'react'
import { getCareers, getTools, getTutorials } from '@/lib/api'
import type { Career, Tool, Tutorial } from '@/types'

interface Catalog {
  careers: Career[]
  tools: Tool[]
  tutorials: Tutorial[]
}

type Part = keyof Catalog

/**
 * Loads the requested collections in parallel. Each collection fails independently
 * (e.g. tutorials require auth in API mode) so one error doesn't blank the page.
 */
export function useCatalog(parts: Part[]) {
  const key = parts.join(',')
  const [data, setData] = useState<Catalog>({ careers: [], tools: [], tutorials: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const load = useCallback(async () => {
    const want = key.split(',') as Part[]
    const loaders: Record<Part, () => Promise<unknown[]>> = { careers: getCareers, tools: () => getTools(), tutorials: () => getTutorials() }
    const results = await Promise.allSettled(want.map((p) => loaders[p]()))
    const next: Partial<Catalog> = {}
    let failed = false
    results.forEach((r, i) => {
      if (r.status === 'fulfilled') (next as Record<Part, unknown[]>)[want[i]] = r.value
      else failed = true
    })
    setData((prev) => ({ ...prev, ...next }))
    setError(failed && Object.keys(next).length === 0)
    setLoading(false)
  }, [key])

  useEffect(() => {
    load()
  }, [load])

  return { ...data, loading, error, reload: load }
}
