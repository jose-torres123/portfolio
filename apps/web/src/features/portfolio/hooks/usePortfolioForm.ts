import { useForm, type UseFormReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createPortfolioSchema, updatePortfolioSchema, type CreatePortfolioInput, type UpdatePortfolioInput } from '../types'
import type { PortfolioDetailData } from '../types'

export function useCreatePortfolioForm(): UseFormReturn<CreatePortfolioInput> {
  return useForm<CreatePortfolioInput>({
    resolver: zodResolver(createPortfolioSchema),
    defaultValues: {
      title: '',
      description: '',
      content: '',
      image_url: '',
      technologies: [],
      github_url: '',
      live_url: '',
      featured: false,
    },
  })
}

export function useUpdatePortfolioForm(
  portfolio: PortfolioDetailData | null | undefined,
): UseFormReturn<UpdatePortfolioInput> {
  return useForm<UpdatePortfolioInput>({
    resolver: zodResolver(updatePortfolioSchema),
    defaultValues: portfolio
      ? {
          title: portfolio.title,
          description: portfolio.description,
          content: portfolio.content,
          image_url: portfolio.image_url,
          technologies: portfolio.technologies,
          github_url: portfolio.github_url,
          live_url: portfolio.live_url,
          featured: portfolio.featured,
        }
      : {},
  })
}
