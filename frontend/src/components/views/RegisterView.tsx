'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { errorMessage, register } from '@/lib/api'
import { IS_DEMO } from '@/lib/config'
import { useAuth } from '@/contexts/AuthContext'
import { AuthShell } from '../auth/AuthShell'
import { FormError } from '../ui/FormBits'

export default function RegisterView() {
  const router = useRouter()
  const { login: authLogin } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    const formData = new FormData(e.currentTarget)
    const password = String(formData.get('password'))
    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.')
      return
    }
    setLoading(true)
    try {
      const res = await register({
        email: String(formData.get('email')),
        password,
        first_name: String(formData.get('first_name')),
        last_name: String(formData.get('last_name')),
      })
      authLogin(res.tokens.access, res.user)
      router.push(IS_DEMO ? '/careers' : '/')
    } catch (err) {
      setError(errorMessage(err, 'No pudimos crear tu cuenta. Inténtalo de nuevo.'))
      setLoading(false)
    }
  }

  return (
    <AuthShell image="/images/students-group.webp" imageAlt="Grupo de estudiantes conversando con sus laptops">
      <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">Crea tu cuenta</h1>
      <p className="mt-2 text-sm text-slate-600">
        {IS_DEMO ? 'En la demo la cuenta se crea solo en tu navegador.' : 'Empieza gratis. Podrás pasar a Premium cuando quieras.'}
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="first_name" className="label">Nombre</label>
            <input id="first_name" name="first_name" autoComplete="given-name" required className="input" />
          </div>
          <div>
            <label htmlFor="last_name" className="label">Apellido</label>
            <input id="last_name" name="last_name" autoComplete="family-name" required className="input" />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="label">Correo electrónico</label>
          <input id="email" name="email" type="email" autoComplete="email" required className="input" />
        </div>
        <div>
          <label htmlFor="password" className="label">Contraseña</label>
          <input id="password" name="password" type="password" autoComplete="new-password" required minLength={8} aria-describedby="password-hint" className="input" />
          <p id="password-hint" className="mt-1.5 text-xs text-slate-500">Mínimo 8 caracteres.</p>
        </div>
        <FormError message={error} />
        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? 'Creando cuenta…' : 'Crear cuenta'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        ¿Ya tienes una cuenta?{' '}
        <Link href="/auth/login" className="font-semibold text-brand-600 hover:text-brand-700">
          Inicia sesión
        </Link>
      </p>
    </AuthShell>
  )
}
