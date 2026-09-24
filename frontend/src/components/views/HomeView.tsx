'use client'

import Link from 'next/link'
import { useMemo } from 'react'
import {
  AcademicCapIcon,
  ArrowDownTrayIcon,
  BookOpenIcon,
  CheckCircleIcon,
  CreditCardIcon,
  RectangleStackIcon,
  ShieldCheckIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline'
import { ArrowRightIcon, CodeBracketIcon } from '@heroicons/react/20/solid'
import Layout from '@/components/Layout'
import { AppPreview } from '@/components/home/AppPreview'
import { Reveal } from '@/components/ui/Reveal'
import { CareerIcon } from '@/components/ui/career-style'
import { useAuth } from '@/contexts/AuthContext'
import { useCatalog } from '@/hooks/useCatalog'
import { IS_DEMO, REPO_URL, asset } from '@/lib/config'

const stack = ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Django REST', 'JWT', 'Stripe']

const steps = [
  { icon: AcademicCapIcon, title: 'Elige tu carrera', text: 'Filtra el catálogo por tu carrera y ve solo el material que te sirve.' },
  { icon: BookOpenIcon, title: 'Aprende con tutoriales', text: 'Guías paso a paso, con tiempo de lectura y la herramienta que necesitas.' },
  { icon: ArrowDownTrayIcon, title: 'Descarga herramientas', text: 'Plantillas, guías y hojas de cálculo listas para usar en tus entregas.' },
]

const features = [
  {
    icon: RectangleStackIcon,
    title: 'Tutoriales por carrera',
    text: 'Contenido agrupado por carrera, con búsqueda y filtros instantáneos y lectura en un panel lateral.',
    tint: 'bg-brand-50 text-brand-600',
  },
  {
    icon: WrenchScrewdriverIcon,
    title: 'Herramientas descargables',
    text: 'Cada recurso tiene su archivo, su carrera y, si aplica, los tutoriales que lo explican.',
    tint: 'bg-cyan-50 text-cyan-700',
  },
  {
    icon: CreditCardIcon,
    title: 'Contenido Premium',
    text: 'Los recursos Premium se filtran en el servidor y el flujo de suscripción está preparado para Stripe Checkout.',
    tint: 'bg-amber-50 text-amber-700',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Roles admin y estudiante',
    text: 'Autenticación JWT con roles: los administradores gestionan el catálogo y los estudiantes lo consumen.',
    tint: 'bg-emerald-50 text-emerald-700',
  },
]

const architecture = [
  { k: 'Frontend', v: 'Next.js App Router · React 19 · TypeScript · Tailwind · Headless UI' },
  { k: 'API', v: 'Django 5 · Django REST Framework · SimpleJWT · roles admin/cliente' },
  { k: 'Datos', v: 'Modelos User, Career, Tool, Tutorial y Subscription' },
  { k: 'Pagos', v: 'Stripe (checkout de suscripción, en desarrollo)' },
]

function Hero() {
  const { user } = useAuth()
  const primaryHref = user ? '/tools' : IS_DEMO ? '/auth/login' : '/auth/register'
  const primaryLabel = user ? 'Ir a herramientas' : IS_DEMO ? 'Explorar la demo' : 'Crear cuenta gratis'

  return (
    <section className="relative isolate overflow-hidden bg-white">
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_80%_70%_at_30%_20%,black,transparent)]" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-40 -top-40 -z-10 h-[32rem] w-[32rem] rounded-full bg-brand-400/25 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 top-40 -z-10 h-[26rem] w-[26rem] rounded-full bg-accent-400/20 blur-3xl" aria-hidden="true" />

      <div className="container-page grid grid-cols-1 items-center gap-14 pb-20 pt-12 sm:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pb-28 lg:pt-20">
        <div className="animate-fade-up">
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-400" aria-hidden="true" />
            Plataforma para estudiantes universitarios
          </span>
          <h1 className="mt-6 text-[2.3rem] font-extrabold leading-[1.05] min-[400px]:text-[2.6rem] text-ink sm:text-6xl lg:text-[4.1rem]">
            Tutoriales y herramientas para <span className="text-gradient">tu carrera</span>, en un solo lugar.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            EduTools organiza guías paso a paso y recursos descargables por carrera, con contenido Premium y un panel de
            administración para gestionar todo el catálogo.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href={primaryHref} className="btn-primary px-6 py-3 text-base">
              {primaryLabel}
              <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
            </Link>
            <a href={REPO_URL} target="_blank" rel="noreferrer" className="btn-secondary px-6 py-3 text-base">
              <CodeBracketIcon className="h-5 w-5" aria-hidden="true" />
              Ver en GitHub
            </a>
          </div>
          <ul className="mt-10 flex flex-wrap gap-2" aria-label="Tecnologías">
            {stack.map((s) => (
              <li key={s} className="rounded-lg border border-line bg-white/80 px-2.5 py-1 text-xs font-semibold text-slate-600 backdrop-blur">
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-xl animate-fade-up [animation-delay:150ms] lg:max-w-none">
          <div className="relative ml-auto w-[88%] overflow-hidden rounded-[2rem] shadow-lift ring-1 ring-ink/10">
            <img
              src={asset('/images/hero-image.webp')}
              alt="Tres estudiantes sonríen mientras trabajan con sus laptops"
              width={1600}
              height={1067}
              fetchPriority="high"
              decoding="async"
              className="aspect-[4/3.4] w-full object-cover object-[60%_center]"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-ink/40 via-transparent to-transparent" aria-hidden="true" />
          </div>
          <AppPreview className="relative -mt-32 w-[82%] sm:-mt-48 sm:w-[72%] lg:-ml-6 lg:-mt-52" />
          <div className="absolute right-0 top-8 hidden animate-float items-center gap-2.5 rounded-2xl bg-white/95 px-3.5 py-2.5 shadow-lift ring-1 ring-line backdrop-blur sm:flex" aria-hidden="true">
            <CheckCircleIcon className="h-5 w-5 text-emerald-500" />
            <div>
              <p className="text-xs font-bold text-ink">Plantilla descargada</p>
              <p className="text-[11px] text-slate-500">Flujo de caja · Administración</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  return (
    <section className="border-y border-line bg-surface py-20 sm:py-24" aria-labelledby="how-title">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-brand-600">Cómo funciona</p>
          <h2 id="how-title" className="mt-2 text-3xl font-extrabold text-ink sm:text-4xl">
            De la carrera al recurso en tres pasos
          </h2>
        </Reveal>
        <div className="relative mt-14">
        <div className="absolute left-[16%] right-[16%] top-7 hidden h-px bg-gradient-to-r from-brand-200 via-brand-400 to-accent-400 md:block" aria-hidden="true" />
        <ol className="relative grid gap-10 md:grid-cols-3 md:gap-6">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 110} className="relative text-center">
              <span className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-brand-600 shadow-lift ring-1 ring-line">
                <s.icon className="h-7 w-7" aria-hidden="true" />
                <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-ink text-[11px] font-bold text-white">{i + 1}</span>
              </span>
              <h3 className="mt-6 text-lg font-bold text-ink">{s.title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-slate-600">{s.text}</p>
            </Reveal>
          ))}
        </ol>
        </div>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section className="bg-white py-20 sm:py-28" aria-labelledby="features-title">
      <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-sm font-semibold text-brand-600">Funcionalidades</p>
          <h2 id="features-title" className="mt-2 text-3xl font-extrabold text-ink sm:text-4xl">
            Pensada para estudiar mejor y administrar sin fricción
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Una aplicación full stack con frontend en Next.js y una API REST en Django, con autenticación por roles y
            contenido Premium.
          </p>
          <Link href="/careers" className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700">
            Ver las carreras <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 90} className="card p-6 transition duration-300 hover:-translate-y-0.5 hover:shadow-lift">
              <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${f.tint}`}>
                <f.icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-ink">{f.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{f.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function CareersStrip() {
  const { careers, tools, tutorials, loading } = useCatalog(['careers', 'tools', 'tutorials'])
  const counts = useMemo(() => {
    const m = new Map<number, { tools: number; tutorials: number }>()
    careers.forEach((c) => m.set(c.id, { tools: 0, tutorials: 0 }))
    tools.forEach((t) => {
      const n = m.get(t.career)
      if (n) n.tools++
    })
    tutorials.forEach((t) => {
      const n = m.get(t.career)
      if (n) n.tutorials++
    })
    return m
  }, [careers, tools, tutorials])

  if (!loading && careers.length === 0) return null

  return (
    <section className="bg-surface py-20 sm:py-24" aria-labelledby="careers-title">
      <div className="container-page">
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-brand-600">Explora por carrera</p>
            <h2 id="careers-title" className="mt-2 text-3xl font-extrabold text-ink sm:text-4xl">
              Encuentra tu área
            </h2>
            {IS_DEMO && <p className="mt-2 text-sm text-slate-600">Carreras y contenidos de ejemplo incluidos en la demo.</p>}
          </div>
          <Link href="/careers" className="btn-secondary self-start sm:self-auto">
            Ver todas <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(loading ? Array.from({ length: 6 }, (_, i) => ({ id: -i - 1, name: '', description: '' })) : careers.slice(0, 6)).map((c, i) => {
            const n = counts.get(c.id)
            return loading ? (
              <div key={c.id} className="card h-[92px] animate-pulse bg-white/70" aria-hidden="true" />
            ) : (
              <Reveal key={c.id} delay={(i % 3) * 80}>
                <Link
                  href={`/tutorials?career=${c.id}`}
                  className="card group flex items-center gap-4 p-5 transition duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lift"
                >
                  <CareerIcon career={c} size="lg" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-display text-base font-bold text-ink">{c.name}</span>
                    {n && (
                      <span className="mt-0.5 block text-sm text-slate-600">
                        {n.tutorials} tutoriales · {n.tools} herramientas
                      </span>
                    )}
                  </span>
                  <ArrowRightIcon className="h-5 w-5 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-brand-600" aria-hidden="true" />
                </Link>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function UnderTheHood() {
  return (
    <section className="relative overflow-hidden bg-ink py-20 text-white sm:py-28" aria-labelledby="stack-title">
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-brand-600/30 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-accent-500/20 blur-3xl" aria-hidden="true" />
      <div className="container-page relative grid gap-12 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <p className="text-sm font-semibold text-accent-300">Bajo el capó</p>
          <h2 id="stack-title" className="mt-2 text-3xl font-extrabold sm:text-4xl">
            Un frontend en Next.js sobre una API REST en Django
          </h2>
          <p className="mt-4 max-w-lg text-base leading-7 text-slate-300">
            El cliente consume la API con Axios y tokens JWT. En esta versión publicada, una capa de datos de ejemplo
            reemplaza al backend para que puedas recorrer la aplicación completa sin servidor.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={REPO_URL} target="_blank" rel="noreferrer" className="btn bg-white text-ink hover:bg-slate-100">
              <CodeBracketIcon className="h-5 w-5" aria-hidden="true" />
              Leer el código
            </a>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <dl className="divide-y divide-white/10 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur">
            {architecture.map((a) => (
              <div key={a.k} className="grid gap-1 px-6 py-5 sm:grid-cols-[7rem_1fr] sm:gap-6">
                <dt className="text-sm font-semibold text-accent-300">{a.k}</dt>
                <dd className="text-sm leading-6 text-slate-200">{a.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}

function Cta() {
  const { user } = useAuth()
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="container-page">
        <Reveal className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-600 via-brand-700 to-brand-950 px-6 py-14 text-center text-white shadow-lift sm:px-12 sm:py-16">
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-20 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" aria-hidden="true" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-extrabold sm:text-4xl">Empieza por tu carrera</h2>
            <p className="mt-4 text-base leading-7 text-brand-100">
              {IS_DEMO
                ? 'Entra como estudiante o como administrador y recorre la aplicación completa en un clic.'
                : 'Crea tu cuenta y accede a tutoriales y herramientas organizados para ti.'}
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href={user ? '/careers' : IS_DEMO ? '/auth/login' : '/auth/register'} className="btn bg-white px-6 py-3 text-base text-ink hover:bg-slate-100">
                {user ? 'Ver carreras' : IS_DEMO ? 'Probar la demo' : 'Crear cuenta'}
                <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default function HomeView() {
  return (
    <Layout>
      <Hero />
      <HowItWorks />
      <Features />
      <CareersStrip />
      <UnderTheHood />
      <Cta />
    </Layout>
  )
}
