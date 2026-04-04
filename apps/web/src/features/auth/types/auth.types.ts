export interface User {
  id: string
  email: string
  fullName?: string
  createdAt: Date
}

export interface AuthSession {
  user: User
  token: string
  expiresAt: Date
}

export interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string) => Promise<void>
  logout: () => void
  error: string | null
}
