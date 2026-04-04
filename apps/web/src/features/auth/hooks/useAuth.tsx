import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from 'react'
import type { User, AuthContextType } from '../types'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Restaurar sesión desde localStorage al montar
  useEffect(() => {
    try {
      const storedSession = localStorage.getItem('auth_session')
      if (storedSession) {
        const session = JSON.parse(storedSession)
        const expiresAt = new Date(session.expiresAt)
        if (expiresAt > new Date()) {
          setUser(session.user)
        } else {
          localStorage.removeItem('auth_session')
        }
      }
    } catch (err) {
      console.error('Error restaurando sesión:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)
    try {
      // Mock auth: validar email y password simples
      if (!email || !password) {
        throw new Error('Email y contraseña son requeridos')
      }

      if (password.length < 8) {
        throw new Error('Contraseña debe tener mínimo 8 caracteres')
      }

      // Simular delay de API
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Mock user
      const mockUser: User = {
        id: `user_${Date.now()}`,
        email,
        fullName: email.split('@')[0],
        createdAt: new Date(),
      }

      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24h

      const session = { user: mockUser, token: 'mock_token_' + Date.now(), expiresAt }
      localStorage.setItem('auth_session', JSON.stringify(session))
      setUser(mockUser)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al iniciar sesión'
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const signup = useCallback(async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)
    try {
      // Mock auth: validar
      if (!email || !password) {
        throw new Error('Email y contraseña son requeridos')
      }

      if (password.length < 8) {
        throw new Error('Contraseña debe tener mínimo 8 caracteres')
      }

      // Simular delay de API
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Mock user
      const mockUser: User = {
        id: `user_${Date.now()}`,
        email,
        fullName: email.split('@')[0],
        createdAt: new Date(),
      }

      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24h

      const session = { user: mockUser, token: 'mock_token_' + Date.now(), expiresAt }
      localStorage.setItem('auth_session', JSON.stringify(session))
      setUser(mockUser)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al crear cuenta'
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('auth_session')
    setUser(null)
    setError(null)
  }, [])

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: user !== null,
    login,
    signup,
    logout,
    error,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
