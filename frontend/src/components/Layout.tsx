'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ArrowRightStartOnRectangleIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useAuth } from '@/contexts/AuthContext'
import { IS_DEMO, REPO_URL } from '@/lib/config'
import { Logo } from './ui/Logo'
import { DemoBanner } from './ui/DemoBanner'

const navigation = [
  { name: 'Inicio', href: '/' },
  { name: 'Carreras', href: '/careers' },
  { name: 'Tutoriales', href: '/tutorials' },
  { name: 'Herramientas', href: '/tools' },
]

function isActive(pathname: string, href: string) {
  const p = pathname.replace(/\/$/, '') || '/'
  return href === '/' ? p === '/' : p.startsWith(href)
}

function initials(first?: string, last?: string, email?: string) {
  const s = `${first?.[0] ?? ''}${last?.[0] ?? ''}`.trim()
  return (s || email?.[0] || '?').toUpperCase()
}

export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only z-[100] rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
    >
      Saltar al contenido
    </a>
  )
}

function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, isAdmin, logout, isLoading } = useAuth()

  const handleLogout = () => {
    logout()
    router.push('/auth/login')
  }

  const name = user ? `${user.first_name ?? ''} ${user.last_name ?? ''}`.trim() || user.email : ''

  return (
    <Disclosure as="header" className="sticky top-0 z-40 border-b border-line/80 bg-white/80 backdrop-blur-xl">
      {({ open }) => (
        <>
          <nav className="container-page flex h-16 items-center justify-between gap-4" aria-label="Principal">
            <div className="flex items-center gap-3">
              <Logo />
              {IS_DEMO && (
                <span className="chip bg-accent-400/15 text-cyan-800 ring-1 ring-inset ring-accent-400/40">Demo</span>
              )}
            </div>

            <div className="hidden items-center gap-1 md:flex">
              {navigation.map((item) => {
                const active = isActive(pathname, item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={`relative rounded-lg px-3.5 py-2 text-sm font-semibold transition ${
                      active ? 'text-ink' : 'text-slate-600 hover:bg-slate-100/70 hover:text-ink'
                    }`}
                  >
                    {item.name}
                    {active && <span className="absolute inset-x-3.5 -bottom-[13px] h-0.5 rounded-full bg-brand-600" aria-hidden="true" />}
                  </Link>
                )
              })}
            </div>

            <div className="hidden items-center gap-2 md:flex">
              {isLoading ? (
                <span className="h-9 w-24" aria-hidden="true" />
              ) : user ? (
                <Menu as="div" className="relative">
                  <MenuButton className="flex items-center gap-2.5 rounded-full py-1 pl-1 pr-2.5 text-left ring-1 ring-inset ring-line transition hover:bg-slate-50">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500 text-xs font-bold text-white">
                      {initials(user.first_name, user.last_name, user.email)}
                    </span>
                    <span className="hidden text-sm font-semibold text-ink lg:block">{user.first_name || name}</span>
                    <span className={`chip ${isAdmin ? 'bg-ink text-white' : 'bg-slate-100 text-slate-700'}`}>{isAdmin ? 'Admin' : 'Estudiante'}</span>
                    <ChevronDownIcon className="h-4 w-4 text-slate-400" aria-hidden="true" />
                  </MenuButton>
                  <MenuItems
                    transition
                    anchor="bottom end"
                    className="z-50 mt-2 w-60 origin-top-right rounded-2xl bg-white p-1.5 shadow-lift ring-1 ring-line transition duration-150 focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                  >
                    <div className="px-3 py-2.5">
                      <p className="truncate text-sm font-semibold text-ink">{name}</p>
                      <p className="truncate text-xs text-slate-500">{user.email}</p>
                    </div>
                    <div className="my-1 h-px bg-line" />
                    <MenuItem>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 data-[focus]:bg-slate-100 data-[focus]:text-ink"
                      >
                        <ArrowRightStartOnRectangleIcon className="h-4 w-4" aria-hidden="true" />
                        Cerrar sesión
                      </button>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              ) : (
                <>
                  <Link href="/auth/login" className="btn-ghost">
                    Iniciar sesión
                  </Link>
                  <Link href={IS_DEMO ? '/auth/login' : '/auth/register'} className="btn-dark">
                    {IS_DEMO ? 'Probar la demo' : 'Registrarse'}
                  </Link>
                </>
              )}
            </div>

            <DisclosureButton className="icon-btn md:hidden" aria-label={open ? 'Cerrar menú' : 'Abrir menú'}>
              {open ? <XMarkIcon className="h-6 w-6" aria-hidden="true" /> : <Bars3Icon className="h-6 w-6" aria-hidden="true" />}
            </DisclosureButton>
          </nav>

          <DisclosurePanel className="border-t border-line bg-white md:hidden">
            <div className="container-page space-y-1 py-3">
              {navigation.map((item) => {
                const active = isActive(pathname, item.href)
                return (
                  <DisclosureButton
                    key={item.href}
                    as={Link}
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={`block rounded-xl px-3 py-2.5 text-base font-semibold ${active ? 'bg-brand-50 text-brand-700' : 'text-slate-700 hover:bg-slate-50'}`}
                  >
                    {item.name}
                  </DisclosureButton>
                )
              })}
            </div>
            <div className="container-page border-t border-line py-4">
              {user ? (
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-ink">{name}</p>
                    <p className="truncate text-xs text-slate-500">{isAdmin ? 'Administrador' : 'Estudiante'} · {user.email}</p>
                  </div>
                  <DisclosureButton as="button" type="button" onClick={handleLogout} className="btn-secondary">
                    Cerrar sesión
                  </DisclosureButton>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <DisclosureButton as={Link} href="/auth/login" className="btn-secondary">
                    Iniciar sesión
                  </DisclosureButton>
                  <DisclosureButton as={Link} href={IS_DEMO ? '/auth/login' : '/auth/register'} className="btn-dark">
                    {IS_DEMO ? 'Probar la demo' : 'Registrarse'}
                  </DisclosureButton>
                </div>
              )}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  )
}

function Footer() {
  return (
    <footer className="bg-ink text-slate-300">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo dark />
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
            Tutoriales y herramientas descargables organizados por carrera universitaria. Proyecto de portafolio de Gustavo Larco.
          </p>
        </div>
        <div>
          <h2 className="font-sans text-sm font-semibold tracking-normal text-white">Explorar</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {navigation.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-white">
                  {n.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-sans text-sm font-semibold tracking-normal text-white">Proyecto</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a href={REPO_URL} target="_blank" rel="noreferrer" className="hover:text-white">
                Código fuente en GitHub
              </a>
            </li>
            <li className="text-slate-400">Next.js · TypeScript · Django REST</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} EduTools · Proyecto de portafolio de Gustavo Larco</p>
          {IS_DEMO && <p>Demo estática con datos de ejemplo. El backend Django no está desplegado.</p>}
        </div>
      </div>
    </footer>
  )
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SkipLink />
      <DemoBanner />
      <Navbar />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}
