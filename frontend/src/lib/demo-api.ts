/**
 * In-browser replacement for the Django REST API, used by the static demo build.
 * Same function signatures as http-api.ts. Data lives in memory and is mirrored
 * to sessionStorage so admin edits survive page navigation within the tab.
 * No network requests are made.
 */
import type { AuthResponse, Career, Tool, Tutorial, User } from '@/types'
import { demoCareers, demoTools, demoTutorials, demoUsers } from './demo-data'

interface DemoDb {
  careers: Career[]
  tools: Tool[]
  tutorials: Tutorial[]
}

const DB_KEY = 'edutools-demo-db'
const USER_KEY = 'edutools-demo-user'
const LATENCY_MS = 180

const clone = <T,>(v: T): T => JSON.parse(JSON.stringify(v))
const seed = (): DemoDb => ({ careers: clone(demoCareers), tools: clone(demoTools), tutorials: clone(demoTutorials) })

let memory: DemoDb | null = null

function db(): DemoDb {
  if (memory) return memory
  if (typeof window !== 'undefined') {
    try {
      const raw = sessionStorage.getItem(DB_KEY)
      if (raw) {
        memory = JSON.parse(raw) as DemoDb
        return memory
      }
    } catch {
      /* storage unavailable: fall back to memory */
    }
  }
  memory = seed()
  return memory
}

function save() {
  if (typeof window === 'undefined' || !memory) return
  try {
    sessionStorage.setItem(DB_KEY, JSON.stringify(memory))
  } catch {
    /* ignore */
  }
}

const delay = <T,>(value: T): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(clone(value)), LATENCY_MS))

const now = () => new Date().toISOString()
const nextId = (items: { id: number }[]) => items.reduce((max, i) => Math.max(max, i.id), 0) + 1

class DemoError extends Error {
  response: { status: number; data: { error: string } }
  constructor(status: number, message: string) {
    super(message)
    this.response = { status, data: { error: message } }
  }
}

export function resetDemoData() {
  memory = seed()
  save()
}

// Auth
function issue(user: User): AuthResponse {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(user))
    } catch {
      /* ignore */
    }
  }
  return { tokens: { access: `demo-${user.role}-${user.id}`, refresh: 'demo-refresh' }, user }
}

export const register = async (data: {
  email: string
  password: string
  first_name: string
  last_name: string
}): Promise<AuthResponse> => {
  if (!data.email || !data.password) throw new DemoError(400, 'El correo y la contraseña son obligatorios')
  const user: User = {
    id: 100,
    email: data.email,
    first_name: data.first_name || 'Estudiante',
    last_name: data.last_name || '',
    role: 'client',
    is_premium: false,
  }
  return delay(issue(user))
}

export const login = async (data: { email: string; password: string }): Promise<AuthResponse> => {
  if (!data.email || !data.password) throw new DemoError(400, 'El correo y la contraseña son obligatorios')
  const base = data.email.toLowerCase().includes('admin') ? demoUsers.admin : demoUsers.student
  return delay(issue({ ...base, email: data.email }))
}

/** One-click sign-in used by the demo buttons on the login page. */
export const loginAsDemo = async (who: 'admin' | 'student'): Promise<AuthResponse> => delay(issue(demoUsers[who]))

export const loginWithGoogle = async (_code: string): Promise<AuthResponse> => {
  void _code
  throw new DemoError(501, 'El inicio de sesión con Google no está disponible en la demo')
}

export const verifyToken = async (token: string): Promise<User> => {
  let stored: User | null = null
  try {
    const raw = localStorage.getItem(USER_KEY)
    stored = raw ? (JSON.parse(raw) as User) : null
  } catch {
    stored = null
  }
  if (!token.startsWith('demo-') || !stored) throw new DemoError(401, 'Sesión de demo inválida')
  return clone(stored)
}

// Careers
export const getCareers = async (): Promise<Career[]> => delay(db().careers)

export const getCareer = async (id: number): Promise<Career> => {
  const career = db().careers.find((c) => c.id === id)
  if (!career) throw new DemoError(404, 'Carrera no encontrada')
  return delay(career)
}

export const createCareer = async (data: Partial<Career>): Promise<Career> => {
  const d = db()
  const career: Career = { id: nextId(d.careers), name: data.name ?? '', description: data.description ?? '', created_at: now(), updated_at: now() }
  d.careers.push(career)
  save()
  return delay(career)
}

export const updateCareer = async (id: number, data: Partial<Career>): Promise<Career> => {
  const d = db()
  const i = d.careers.findIndex((c) => c.id === id)
  if (i < 0) throw new DemoError(404, 'Carrera no encontrada')
  d.careers[i] = { ...d.careers[i], ...data, id, updated_at: now() }
  save()
  return delay(d.careers[i])
}

export const deleteCareer = async (id: number): Promise<void> => {
  const d = db()
  d.careers = d.careers.filter((c) => c.id !== id)
  d.tools = d.tools.filter((t) => t.career !== id)
  d.tutorials = d.tutorials.filter((t) => t.career !== id)
  save()
  await delay(null)
}

// Tools
export const getTools = async (params?: { career?: number }): Promise<Tool[]> =>
  delay(db().tools.filter((t) => !params?.career || t.career === params.career))

export const getTool = async (id: number): Promise<Tool> => {
  const tool = db().tools.find((t) => t.id === id)
  if (!tool) throw new DemoError(404, 'Herramienta no encontrada')
  return delay(tool)
}

function toolFromForm(form: FormData): Partial<Tool> {
  const out: Partial<Tool> = {}
  const title = form.get('title')
  const description = form.get('description')
  const career = form.get('career')
  const premium = form.get('is_premium')
  if (title !== null) out.title = String(title)
  if (description !== null) out.description = String(description)
  if (career !== null) out.career = Number(career)
  if (premium !== null) out.is_premium = String(premium) === 'true'
  return out
}

export const createTool = async (data: FormData): Promise<Tool> => {
  const d = db()
  const tool: Tool = {
    id: nextId(d.tools),
    title: '',
    description: '',
    career: d.careers[0]?.id ?? 1,
    is_premium: false,
    file: null,
    file_url: '#',
    created_at: now(),
    updated_at: now(),
    ...toolFromForm(data),
  }
  d.tools.unshift(tool)
  save()
  return delay(tool)
}

export const updateTool = async (id: number, data: FormData): Promise<Tool> => {
  const d = db()
  const i = d.tools.findIndex((t) => t.id === id)
  if (i < 0) throw new DemoError(404, 'Herramienta no encontrada')
  d.tools[i] = { ...d.tools[i], ...toolFromForm(data), id, updated_at: now() }
  save()
  return delay(d.tools[i])
}

export const deleteTool = async (id: number): Promise<void> => {
  const d = db()
  d.tools = d.tools.filter((t) => t.id !== id)
  d.tutorials = d.tutorials.map((t) => (t.tool === id ? { ...t, tool: null } : t))
  save()
  await delay(null)
}

// Tutorials
export const getTutorials = async (params?: { career?: number; tool?: number }): Promise<Tutorial[]> =>
  delay(
    db().tutorials.filter(
      (t) => (!params?.career || t.career === params.career) && (!params?.tool || t.tool === params.tool)
    )
  )

export const getTutorial = async (id: number): Promise<Tutorial> => {
  const tutorial = db().tutorials.find((t) => t.id === id)
  if (!tutorial) throw new DemoError(404, 'Tutorial no encontrado')
  return delay(tutorial)
}

export const createTutorial = async (data: Partial<Tutorial>): Promise<Tutorial> => {
  const d = db()
  const tutorial: Tutorial = {
    id: nextId(d.tutorials),
    title: '',
    content: '',
    career: d.careers[0]?.id ?? 1,
    tool: null,
    video_url: null,
    is_premium: false,
    created_at: now(),
    updated_at: now(),
    ...data,
  }
  d.tutorials.unshift(tutorial)
  save()
  return delay(tutorial)
}

export const updateTutorial = async (id: number, data: Partial<Tutorial>): Promise<Tutorial> => {
  const d = db()
  const i = d.tutorials.findIndex((t) => t.id === id)
  if (i < 0) throw new DemoError(404, 'Tutorial no encontrado')
  d.tutorials[i] = { ...d.tutorials[i], ...data, id, updated_at: now() }
  save()
  return delay(d.tutorials[i])
}

export const deleteTutorial = async (id: number): Promise<void> => {
  const d = db()
  d.tutorials = d.tutorials.filter((t) => t.id !== id)
  save()
  await delay(null)
}

// Subscriptions
export const createCheckoutSession = async (): Promise<{ url?: string; sessionId?: string }> => {
  throw new DemoError(501, 'El pago con Stripe está desactivado en la demo')
}
