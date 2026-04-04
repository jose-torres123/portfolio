/**
 * Tipos locales de la feature portfolio
 * Para tipos de DB generados: usar Database['public']['Tables']['projects']['Row']
 */

export interface Portfolio {
  id: string
  title: string
  description: string
  image_url: string
  technologies: string[]
  github_url?: string
  live_url?: string
  created_at: string
  updated_at: string
}

export interface PortfolioDetail extends Portfolio {
  content: string
  featured: boolean
}
