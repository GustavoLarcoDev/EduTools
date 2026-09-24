import type { ReactNode } from 'react'
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { asset } from '@/lib/config'
import { Logo } from '../ui/Logo'
import { DemoBanner } from '../ui/DemoBanner'
import { SkipLink } from '../Layout'

const points = ['Tutoriales organizados por carrera', 'Plantillas y guías descargables', 'Roles de estudiante y administrador']

export function AuthShell({ image, imageAlt, children }: { image: string; imageAlt: string; children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <SkipLink />
      <DemoBanner />
      <div className="flex flex-1">
        <aside className="relative hidden w-[46%] overflow-hidden bg-ink lg:block">
          <img src={asset(image)} alt={imageAlt} width={1400} height={933} decoding="async" className="absolute inset-0 h-full w-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-brand-900/40" aria-hidden="true" />
          <div className="relative flex h-full flex-col justify-between p-12 text-white">
            <Logo dark />
            <div className="max-w-md">
              <p className="font-display text-4xl font-extrabold leading-tight tracking-tight">
                Todo lo que necesitas para tu carrera, <span className="text-accent-300">en un solo lugar.</span>
              </p>
              <ul className="mt-8 space-y-3">
                {points.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-slate-200">
                    <CheckCircleIcon className="h-5 w-5 text-accent-300" aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-xs text-slate-400">EduTools · Proyecto de portafolio de Gustavo Larco</p>
          </div>
        </aside>

        <main id="main" className="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-10 sm:px-6">
          <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" aria-hidden="true" />
          <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-brand-400/25 blur-3xl" aria-hidden="true" />
          <div className="relative w-full max-w-md">
            <div className="mb-8 flex justify-center lg:hidden">
              <Logo />
            </div>
            <div className="rounded-3xl border border-line bg-white/90 p-6 shadow-lift backdrop-blur sm:p-8">{children}</div>
          </div>
        </main>
      </div>
    </div>
  )
}
