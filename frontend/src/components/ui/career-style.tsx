import {
  AcademicCapIcon,
  BriefcaseIcon,
  BuildingLibraryIcon,
  CodeBracketSquareIcon,
  CubeTransparentIcon,
  HeartIcon,
  ScaleIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline'
import type { ComponentType, SVGProps } from 'react'
import type { Career } from '@/types'

type Icon = ComponentType<SVGProps<SVGSVGElement>>
interface CareerStyle {
  icon: Icon
  /** tinted square behind the icon */
  tint: string
  /** small tag */
  tag: string
}

const palette: CareerStyle[] = [
  { icon: CodeBracketSquareIcon, tint: 'bg-brand-50 text-brand-600', tag: 'bg-brand-50 text-brand-700 ring-brand-200' },
  { icon: HeartIcon, tint: 'bg-rose-50 text-rose-600', tag: 'bg-rose-50 text-rose-700 ring-rose-200' },
  { icon: ScaleIcon, tint: 'bg-amber-50 text-amber-600', tag: 'bg-amber-50 text-amber-800 ring-amber-200' },
  { icon: BuildingLibraryIcon, tint: 'bg-cyan-50 text-cyan-700', tag: 'bg-cyan-50 text-cyan-800 ring-cyan-200' },
  { icon: BriefcaseIcon, tint: 'bg-emerald-50 text-emerald-600', tag: 'bg-emerald-50 text-emerald-800 ring-emerald-200' },
  { icon: SparklesIcon, tint: 'bg-fuchsia-50 text-fuchsia-600', tag: 'bg-fuchsia-50 text-fuchsia-700 ring-fuchsia-200' },
  { icon: CubeTransparentIcon, tint: 'bg-sky-50 text-sky-600', tag: 'bg-sky-50 text-sky-800 ring-sky-200' },
  { icon: AcademicCapIcon, tint: 'bg-indigo-50 text-indigo-600', tag: 'bg-indigo-50 text-indigo-700 ring-indigo-200' },
]

const keywords: [RegExp, number][] = [
  [/software|sistemas|inform|comput|program/i, 0],
  [/medic|enferm|salud|odont/i, 1],
  [/derecho|leyes|jur/i, 2],
  [/arquitect|diseñ|civil/i, 3],
  [/administ|empresa|econom|contab|negocio/i, 4],
  [/psicolog/i, 5],
]

export function careerStyle(career?: Pick<Career, 'id' | 'name'>): CareerStyle {
  if (!career) return palette[7]
  const hit = keywords.find(([re]) => re.test(career.name))
  return palette[hit ? hit[1] : career.id % palette.length]
}

export function CareerIcon({ career, size = 'md' }: { career?: Pick<Career, 'id' | 'name'>; size?: 'sm' | 'md' | 'lg' }) {
  const s = careerStyle(career)
  const Icon = s.icon
  const box = size === 'lg' ? 'h-12 w-12 rounded-2xl' : size === 'sm' ? 'h-8 w-8 rounded-lg' : 'h-10 w-10 rounded-xl'
  const ic = size === 'lg' ? 'h-6 w-6' : size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'
  return (
    <span className={`inline-flex shrink-0 items-center justify-center ${box} ${s.tint}`}>
      <Icon className={ic} aria-hidden="true" />
    </span>
  )
}

export function CareerTag({ career }: { career?: Pick<Career, 'id' | 'name'> }) {
  if (!career) return null
  return <span className={`chip ring-1 ring-inset ${careerStyle(career).tag}`}>{career.name}</span>
}

export function PremiumBadge() {
  return (
    <span className="chip bg-gradient-to-r from-amber-100 to-amber-50 text-amber-800 ring-1 ring-inset ring-amber-200">
      <svg viewBox="0 0 20 20" className="h-3 w-3" fill="currentColor" aria-hidden="true">
        <path d="M10 1.5 12.4 7l5.9.5-4.5 3.9 1.4 5.8L10 14.1l-5.2 3.1 1.4-5.8L1.7 7.5 7.6 7 10 1.5Z" />
      </svg>
      Premium
    </span>
  )
}
