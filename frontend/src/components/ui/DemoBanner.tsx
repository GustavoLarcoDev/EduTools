'use client'

import { ArrowPathIcon, CodeBracketIcon, SparklesIcon } from '@heroicons/react/20/solid'
import { IS_DEMO, REPO_URL } from '@/lib/config'
import { resetDemoData } from '@/lib/api'

/** Slim bar shown on every page of the static demo build. */
export function DemoBanner() {
  if (!IS_DEMO) return null
  const reset = () => {
    resetDemoData()
    window.location.reload()
  }
  return (
    <div className="relative z-50 bg-ink text-white">
      <div className="container-page flex min-h-9 flex-wrap items-center justify-center gap-x-4 gap-y-1 py-1.5 text-center text-xs sm:justify-between sm:text-[13px]">
        <p className="flex items-center gap-2">
          <SparklesIcon className="h-4 w-4 shrink-0 text-accent-300" aria-hidden="true" />
          <span>
            <strong className="font-semibold">Demo — datos de ejemplo</strong>
            <span className="hidden text-slate-300 sm:inline"> · sin backend, los cambios se guardan solo en esta pestaña</span>
          </span>
        </p>
        <div className="flex items-center gap-3">
          <button type="button" onClick={reset} className="inline-flex items-center gap-1 text-slate-300 underline-offset-4 hover:text-white hover:underline">
            <ArrowPathIcon className="h-3.5 w-3.5" aria-hidden="true" />
            Restablecer datos
          </button>
          <a href={REPO_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-semibold text-accent-300 underline-offset-4 hover:underline">
            <CodeBracketIcon className="h-3.5 w-3.5" aria-hidden="true" />
            Código en GitHub
          </a>
        </div>
      </div>
    </div>
  )
}
