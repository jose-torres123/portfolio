import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { PortfolioList } from '../components/PortfolioList'
import { PortfolioDetail } from '../components/PortfolioDetail'
import type { PortfolioDetailData } from '../types'
import { mockPortfolios, mockPortfolioDetails } from '../data/mockData'

export default function PortfolioPage() {
  const { id } = useParams<{ id: string }>()
  const [selectedId, setSelectedId] = useState<string | null>(id || null)

  if (selectedId) {
    const detail = mockPortfolioDetails[selectedId]
    if (!detail) return <div>Not found</div>

    return (
      <div>
        <button
          onClick={() => setSelectedId(null)}
          className="mb-6 text-sm text-blue-600 hover:underline"
        >
          ← Back to Portfolio
        </button>
        <PortfolioDetail
          portfolio={detail}
          onClose={() => setSelectedId(null)}
        />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">My Portfolio</h1>
        <p className="text-muted-foreground">
          Showcase of my recent projects and achievements
        </p>
      </div>

      <PortfolioList portfolios={mockPortfolios} />
    </div>
  )
}
