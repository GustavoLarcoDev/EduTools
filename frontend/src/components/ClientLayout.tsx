'use client'

import { Providers } from './Providers'

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return <Providers>{children}</Providers>
}
