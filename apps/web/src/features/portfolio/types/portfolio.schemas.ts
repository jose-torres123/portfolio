import { z } from 'zod'

export const createPortfolioSchema = z.object({
  title: z.string().min(3, 'Mínimo 3 caracteres').max(200),
  description: z.string().min(10, 'Mínimo 10 caracteres').max(500),
  content: z.string().min(20, 'Mínimo 20 caracteres').optional(),
  image_url: z.string().url('URL de imagen inválida'),
  technologies: z.array(z.string()).min(1, 'Al menos una tecnología'),
  github_url: z.string().url().optional().or(z.literal('')),
  live_url: z.string().url().optional().or(z.literal('')),
  featured: z.boolean().default(false),
})

export const updatePortfolioSchema = createPortfolioSchema.partial()

export type CreatePortfolioInput = z.infer<typeof createPortfolioSchema>
export type UpdatePortfolioInput = z.infer<typeof updatePortfolioSchema>
