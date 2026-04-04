import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/query-client'
import { PortfolioForm } from '../components/PortfolioForm'

describe('PortfolioForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render form', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <PortfolioForm />
      </QueryClientProvider>,
    )

    expect(screen.getByText('Crear Nuevo Proyecto')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Nombre del proyecto')).toBeInTheDocument()
  })

  it('should have required fields', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <PortfolioForm />
      </QueryClientProvider>,
    )

    expect(screen.getByLabelText('Título')).toBeInTheDocument()
    expect(screen.getByLabelText('Descripción')).toBeInTheDocument()
    expect(screen.getByLabelText('URL de Imagen')).toBeInTheDocument()
  })
})
