import { useMutation, useQueryClient } from '@tanstack/react-query'
import { portfolioService } from '../services/portfolioService'
import type { CreatePortfolioInput, UpdatePortfolioInput } from '../types'

export function usePortfolioMutations() {
  const queryClient = useQueryClient()

  const createMutation = useMutation({
    mutationFn: (input: CreatePortfolioInput) => portfolioService.createPortfolio(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolios'] })
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdatePortfolioInput }) =>
      portfolioService.updatePortfolio(id, input),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['portfolios'] })
      queryClient.invalidateQueries({ queryKey: ['portfolio', variables.id] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => portfolioService.deletePortfolio(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolios'] })
    },
  })

  return {
    createMutation,
    updateMutation,
    deleteMutation,
  }
}
