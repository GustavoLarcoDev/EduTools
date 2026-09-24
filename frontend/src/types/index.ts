export type Role = 'admin' | 'client'

/** Authenticated user, as returned by /auth/login, /auth/register and /auth/verify-token. */
export interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  role: Role | string
  /** Not returned by the current API responses; the demo sets it explicitly. */
  is_premium?: boolean
}

export interface AuthResponse {
  tokens: { access: string; refresh: string }
  user: User
}

export interface Career {
  id: number
  name: string
  description: string
  created_at: string
  updated_at: string
}

export interface Tool {
  id: number
  title: string
  description: string
  career: number
  file: File | string | null
  file_url: string | null
  is_premium: boolean
  created_at: string
  updated_at: string
}

export interface Tutorial {
  id: number
  title: string
  content: string
  career: number
  tool?: number | null
  video_url?: string | null
  is_premium: boolean
  created_at: string
  updated_at: string
}

export interface Subscription {
  id: number
  user: number
  is_active: boolean
  start_date: string
  end_date: string
  created_at: string
  updated_at: string
}
