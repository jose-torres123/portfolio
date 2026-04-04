import { useQuery } from '@tanstack/react-query'
import { portfolioService } from '../services/portfolioService'

export function usePortfolio(id: string | undefined) {
  return useQuery({
    queryKey: ['portfolio', id],
    queryFn: () => (id ? portfolioService.getPortfolio(id) : Promise.resolve(null)),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
