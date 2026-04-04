import { describe, it, expect, beforeEach, vi } from 'vitest'
import { portfolioService } from '../services/portfolioService'

// Mock de Supabase
vi.mock('@repo/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      single: vi.fn(),
    })),
  },
}))

describe('portfolioService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should list portfolios', async () => {
    // TODO: Implementar test cuando Supabase esté configurado
    expect(true).toBe(true)
  })

  it('should get portfolio by id', async () => {
    // TODO: Implementar test cuando Supabase esté configurado
    expect(true).toBe(true)
  })

  it('should create portfolio', async () => {
    // TODO: Implementar test cuando Supabase esté configurado
    expect(true).toBe(true)
  })

  it('should update portfolio', async () => {
    // TODO: Implementar test cuando Supabase esté configurado
    expect(true).toBe(true)
  })

  it('should delete portfolio', async () => {
    // TODO: Implementar test cuando Supabase esté configurado
    expect(true).toBe(true)
  })
})
