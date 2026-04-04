import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { AuthProvider, useAuth } from './useAuth'
import type { ReactNode } from 'react'

const wrapper = ({ children }: { children: ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
)

describe('useAuth', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('debe inicializar con usuario nulo', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })

    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
  })

  it('debe hacer login correctamente', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper })

    await act(async () => {
      await result.current.login('test@example.com', 'password123')
    })

    expect(result.current.user).not.toBeNull()
    expect(result.current.user?.email).toBe('test@example.com')
    expect(result.current.isAuthenticated).toBe(true)
  })

  it('debe fallar login con contraseña corta', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper })

    await act(async () => {
      try {
        await result.current.login('test@example.com', 'short')
      } catch {
        // Error esperado
      }
    })

    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
  })

  it('debe hacer signup correctamente', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper })

    await act(async () => {
      await result.current.signup('newuser@example.com', 'password123')
    })

    expect(result.current.user).not.toBeNull()
    expect(result.current.user?.email).toBe('newuser@example.com')
    expect(result.current.isAuthenticated).toBe(true)
  })

  it('debe hacer logout correctamente', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper })

    // Login first
    await act(async () => {
      await result.current.login('test@example.com', 'password123')
    })

    expect(result.current.isAuthenticated).toBe(true)

    // Logout
    act(() => {
      result.current.logout()
    })

    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
  })

  it('debe persistir sesión en localStorage', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper })

    await act(async () => {
      await result.current.login('test@example.com', 'password123')
    })

    const stored = localStorage.getItem('auth_session')
    expect(stored).not.toBeNull()

    const session = JSON.parse(stored!)
    expect(session.user.email).toBe('test@example.com')
  })

  it('debe restaurar sesión desde localStorage', async () => {
    const mockSession = {
      user: { id: 'user_123', email: 'test@example.com', createdAt: new Date().toISOString() },
      token: 'mock_token',
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    }

    localStorage.setItem('auth_session', JSON.stringify(mockSession))

    const { result } = renderHook(() => useAuth(), { wrapper })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.user?.email).toBe('test@example.com')
    expect(result.current.isAuthenticated).toBe(true)
  })
})
