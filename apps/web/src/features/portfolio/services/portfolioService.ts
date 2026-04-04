import { supabase } from '@repo/supabase'
import type { Portfolio, PortfolioDetail, CreatePortfolioInput, UpdatePortfolioInput } from '../types'

const TABLE = 'projects'

export const portfolioService = {
  /**
   * Obtener lista de portfolios
   */
  async listPortfolios(): Promise<Portfolio[]> {
    const { data, error } = await supabase
      .from(TABLE)
      .select('id, title, description, image_url, technologies, github_url, live_url, created_at, updated_at')
      .order('created_at', { ascending: false })

    if (error) throw error
    return (data || []) as Portfolio[]
  },

  /**
   * Obtener portafolio por ID
   */
  async getPortfolio(id: string): Promise<PortfolioDetail | null> {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data as PortfolioDetail | null
  },

  /**
   * Crear nuevo portafolio
   */
  async createPortfolio(input: CreatePortfolioInput): Promise<Portfolio> {
    const { data, error } = await supabase
      .from(TABLE)
      .insert([input])
      .select()
      .single()

    if (error) throw error
    return data as Portfolio
  },

  /**
   * Actualizar portafolio
   */
  async updatePortfolio(id: string, input: UpdatePortfolioInput): Promise<Portfolio> {
    const { data, error } = await supabase
      .from(TABLE)
      .update(input)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as Portfolio
  },

  /**
   * Eliminar portafolio (soft-delete)
   */
  async deletePortfolio(id: string): Promise<void> {
    const { error } = await supabase
      .from(TABLE)
      .update({ archived: true })
      .eq('id', id)

    if (error) throw error
  },
}
