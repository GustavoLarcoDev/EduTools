import Link from 'next/link'
import { useId } from 'react'

export function LogoMark({ className = 'h-8 w-8' }: { className?: string }) {
  const id = `et-grad-${useId().replace(/:/g, '')}`
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6D5DFC" />
          <stop offset="1" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill={`url(#${id})`} />
      <path d="M16 8.5 5.5 13.2 16 18l10.5-4.8L16 8.5Z" fill="#fff" />
      <path d="M9.5 16v4.6c0 .5.3 1 .8 1.2 1.8.9 3.7 1.3 5.7 1.3s3.9-.4 5.7-1.3c.5-.2.8-.7.8-1.2V16L16 19l-6.5-3Z" fill="#fff" fillOpacity=".78" />
      <path d="M25 14v5.2" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export function Logo({ dark = false, className = '' }: { dark?: boolean; className?: string }) {
  return (
    <Link href="/" className={`group inline-flex items-center gap-2.5 rounded-lg ${className}`} aria-label="EduTools, ir al inicio">
      <LogoMark className="h-8 w-8 transition-transform duration-300 group-hover:-rotate-6" />
      <span className={`font-display text-xl font-bold tracking-tight ${dark ? 'text-white' : 'text-ink'}`}>
        Edu<span className={dark ? 'text-accent-300' : 'text-brand-600'}>Tools</span>
      </span>
    </Link>
  )
}
