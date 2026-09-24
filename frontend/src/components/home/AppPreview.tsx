import { ArrowDownTrayIcon, LockClosedIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { demoCareers, demoTools } from '@/lib/demo-data'
import { CareerIcon } from '../ui/career-style'

/** Decorative, non-interactive mini render of the Tools screen using the bundled sample data. */
export function AppPreview({ className = '' }: { className?: string }) {
  const careerById = new Map(demoCareers.map((c) => [c.id, c]))
  const tools = [demoTools[0], demoTools[12], demoTools[3], demoTools[14]]

  return (
    <div className={`overflow-hidden rounded-2xl border border-white/60 bg-white shadow-lift ring-1 ring-ink/5 ${className}`} aria-hidden="true">
      <div className="flex items-center gap-2 border-b border-line bg-slate-50/80 px-3 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        <span className="ml-3 flex-1 truncate rounded-md bg-white px-3 py-1 text-[10px] font-medium text-slate-500 ring-1 ring-line">
          edutools / herramientas
        </span>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="font-display text-base font-bold text-ink">Herramientas</p>
          <span className="flex items-center gap-1.5 rounded-lg bg-white px-2 py-1 text-[10px] text-slate-400 ring-1 ring-line">
            <MagnifyingGlassIcon className="h-3 w-3" />
            Buscar…
          </span>
        </div>
        <div className="mt-3 flex gap-1.5 overflow-hidden">
          {['Todas', ...demoCareers.slice(0, 4).map((c) => c.name.split(' ')[0])].map((n, i) => (
            <span key={n} className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold ${i === 0 ? 'bg-ink text-white' : 'bg-white text-slate-500 ring-1 ring-line'}`}>
              {n}
            </span>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          {tools.map((t) => (
            <div key={t.id} className="rounded-xl border border-line bg-white p-3 shadow-soft">
              <div className="flex items-center justify-between">
                <CareerIcon career={careerById.get(t.career)} size="sm" />
                {t.is_premium && <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-[9px] font-bold text-amber-800">Premium</span>}
              </div>
              <p className="mt-2.5 line-clamp-2 text-[11px] font-bold leading-snug text-ink">{t.title}</p>
              <p className="mt-1 line-clamp-2 text-[9.5px] leading-snug text-slate-500">{t.description}</p>
              <span
                className={`mt-2.5 inline-flex items-center gap-1 rounded-md px-2 py-1 text-[9.5px] font-semibold ${
                  t.is_premium ? 'bg-slate-100 text-slate-600' : 'bg-brand-600 text-white'
                }`}
              >
                {t.is_premium ? <LockClosedIcon className="h-2.5 w-2.5" /> : <ArrowDownTrayIcon className="h-2.5 w-2.5" />}
                {t.is_premium ? 'Desbloquear' : 'Descargar'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
