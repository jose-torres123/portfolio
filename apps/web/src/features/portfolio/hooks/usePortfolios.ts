import { useQuery } from '@tanstack/react-query'
import { portfolioService } from '../services/portfolioService'

export function usePortfolios() {
  return useQuery({
    queryKey: ['portfolios'],
    queryFn: () => portfolioService.listPortfolios(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
