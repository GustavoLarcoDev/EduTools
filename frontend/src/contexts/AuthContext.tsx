'use client'

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { verifyToken } from '@/lib/api'
import type { User } from '@/types'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAdmin: boolean
  isClient: boolean
  /** Whether the current user may open premium tools and tutorials. */
  canAccessPremium: boolean
  login: (token: string, userData: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      let token: string | null = null
      try {
        token = localStorage.getItem('token')
      } catch {
        token = null
      }
      if (token) {
        try {
          setUser(await verifyToken(token))
        } catch {
          try {
            localStorage.removeItem('token')
          } catch {
            /* ignore */
          }
          setUser(null)
        }
      }
      setIsLoading(false)
    }
    initAuth()
  }, [])

  const login = useCallback((token: string, userData: User) => {
    try {
      localStorage.setItem('token', token)
    } catch {
      /* ignore */
    }
    setUser(userData)
  }, [])

  const logout = useCallback(() => {
    try {
      localStorage.removeItem('token')
    } catch {
      /* ignore */
    }
    setUser(null)
  }, [])

  const value = useMemo<AuthContextType>(() => {
    const isAdmin = user?.role === 'admin'
    const isClient = user?.role === 'client'
    // The API does not return `is_premium` in auth responses yet; premium content is
    // already filtered server-side, so clients keep access unless the flag says otherwise.
    const canAccessPremium = isAdmin || user?.is_premium === true || (isClient && user?.is_premium === undefined)
    return { user, isLoading, isAdmin, isClient, canAccessPremium, login, logout }
  }, [user, isLoading, login, logout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
