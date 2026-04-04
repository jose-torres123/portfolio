import { describe, it, expect } from 'vitest'
import { loginSchema, signupSchema } from '../types/auth.schemas'

describe('Auth Schemas', () => {
  describe('loginSchema', () => {
    it('debe validar email y password válidos', () => {
      const data = { email: 'test@example.com', password: 'password123' }
      const result = loginSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('debe fallar con email inválido', () => {
      const data = { email: 'invalid-email', password: 'password123' }
      const result = loginSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('debe fallar con password corto', () => {
      const data = { email: 'test@example.com', password: 'short' }
      const result = loginSchema.safeParse(data)
      expect(result.success).toBe(false)
    })
  })

  describe('signupSchema', () => {
    it('debe validar datos de signup válidos', () => {
      const data = {
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      }
      const result = signupSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('debe fallar si las contraseñas no coinciden', () => {
      const data = {
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'different123',
      }
      const result = signupSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('debe fallar con email inválido', () => {
      const data = {
        email: 'invalid-email',
        password: 'password123',
        confirmPassword: 'password123',
      }
      const result = signupSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('debe fallar con password corto', () => {
      const data = {
        email: 'test@example.com',
        password: 'short',
        confirmPassword: 'short',
      }
      const result = signupSchema.safeParse(data)
      expect(result.success).toBe(false)
    })
  })
})
