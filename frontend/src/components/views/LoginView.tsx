'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { AcademicCapIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'
import { ArrowRightIcon } from '@heroicons/react/20/solid'
import { errorMessage, login, loginAsDemo } from '@/lib/api'
import { IS_DEMO } from '@/lib/config'
import { useAuth } from '@/contexts/AuthContext'
import { AuthShell } from '../auth/AuthShell'
import { FormError } from '../ui/FormBits'
import type { AuthResponse } from '@/types'

function safeNext(raw: string | null) {
  return raw && raw.startsWith('/') && !raw.startsWith('//') ? raw : null
}

export default function LoginView() {
  const router = useRouter()
  const params = useSearchParams()
  const next = safeNext(params.get('next'))
  const { login: authLogin } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState<'form' | 'admin' | 'student' | null>(null)

  const finish = (res: AuthResponse) => {
    authLogin(res.tokens.access, res.user)
    router.push(next ?? (IS_DEMO ? '/tools' : '/'))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading('form')
    const formData = new FormData(e.currentTarget)
    try {
      finish(await login({ email: String(formData.get('email')), password: String(formData.get('password')) }))
    } catch (err) {
      setError(errorMessage(err, 'No pudimos iniciar sesión. Revisa tus datos.'))
      setLoading(null)
    }
  }

  const demo = async (who: 'admin' | 'student') => {
    setLoading(who)
    finish(await loginAsDemo(who))
  }

  return (
    <AuthShell image="/images/students-learning.webp" imageAlt="Estudiantes trabajando juntos en una biblioteca">
      <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">Inicia sesión</h1>
      <p className="mt-2 text-sm text-slate-600">
        {IS_DEMO ? 'Elige un perfil para explorar la demo en un clic.' : 'Accede a tus tutoriales y herramientas.'}
      </p>

      {IS_DEMO && (
        <div className="mt-6 grid gap-3">
          <button
            type="button"
            onClick={() => demo('student')}
            disabled={!!loading}
            className="group flex items-center gap-4 rounded-2xl border border-line bg-white p-4 text-left transition hover:border-brand-300 hover:shadow-soft disabled:opacity-60"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <AcademicCapIcon className="h-6 w-6" aria-hidden="true" />
            </span>
            <span className="flex-1">
              <span className="block text-sm font-bold text-ink">{loading === 'student' ? 'Entrando…' : 'Entrar como Estudiante (demo)'}</span>
              <span className="block text-xs text-slate-600">Ve el catálogo; el contenido Premium aparece bloqueado.</span>
            </span>
            <ArrowRightIcon className="h-5 w-5 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-brand-600" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => demo('admin')}
            disabled={!!loading}
            className="group flex items-center gap-4 rounded-2xl bg-ink p-4 text-left text-white transition hover:bg-ink-700 disabled:opacity-60"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-accent-300">
              <ShieldCheckIcon className="h-6 w-6" aria-hidden="true" />
            </span>
            <span className="flex-1">
              <span className="block text-sm font-bold">{loading === 'admin' ? 'Entrando…' : 'Entrar como Admin (demo)'}</span>
              <span className="block text-xs text-slate-300">Crea, edita y elimina carreras, tutoriales y herramientas.</span>
            </span>
            <ArrowRightIcon className="h-5 w-5 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-white" aria-hidden="true" />
          </button>
        </div>
      )}

      {IS_DEMO && (
        <div className="my-7 flex items-center gap-3 text-xs font-medium uppercase tracking-wider text-slate-500">
          <span className="h-px flex-1 bg-line" />o con correo<span className="h-px flex-1 bg-line" />
        </div>
      )}

      <form onSubmit={handleSubmit} className={`space-y-5 ${IS_DEMO ? '' : 'mt-8'}`}>
        <div>
          <label htmlFor="email" className="label">Correo electrónico</label>
          <input id="email" name="email" type="email" autoComplete="email" required className="input" defaultValue={IS_DEMO ? 'estudiante@demo.edutools' : undefined} />
          {IS_DEMO && <p className="mt-1.5 text-xs text-slate-500">Cualquier correo con «admin» entra como administrador.</p>}
        </div>
        <div>
          <label htmlFor="password" className="label">Contraseña</label>
          <input id="password" name="password" type="password" autoComplete="current-password" required className="input" defaultValue={IS_DEMO ? 'demo1234' : undefined} />
        </div>
        <FormError message={error} />
        <button type="submit" disabled={!!loading} className="btn-primary w-full">
          {loading === 'form' ? 'Iniciando sesión…' : 'Iniciar sesión'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        ¿No tienes una cuenta?{' '}
        <Link href="/auth/register" className="font-semibold text-brand-600 hover:text-brand-700">
          Regístrate
        </Link>
      </p>
    </AuthShell>
  )
}
