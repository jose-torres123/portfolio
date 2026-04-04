import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, Button } from '@repo/ui'
import { ExternalLink, Github } from 'lucide-react'
import type { PortfolioDetail } from '../types'

interface PortfolioDetailProps {
  portfolio: PortfolioDetail
  onClose: () => void
  onEdit?: (id: string) => void
}

export function PortfolioDetail({ portfolio, onClose, onEdit }: PortfolioDetailProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="w-full"
    >
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <CardTitle className="text-2xl">{portfolio.title}</CardTitle>
              <p className="text-muted-foreground mt-2">{portfolio.description}</p>
            </div>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
              ✕
            </button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {portfolio.image_url && (
            <img
              src={portfolio.image_url}
              alt={portfolio.title}
              className="w-full h-64 object-cover rounded-lg"
            />
          )}

          {portfolio.content && (
            <div>
              <h3 className="font-semibold mb-2">Descripción</h3>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{portfolio.content}</p>
            </div>
          )}

          <div>
            <h3 className="font-semibold mb-2">Tecnologías</h3>
            <div className="flex flex-wrap gap-2">
              {portfolio.technologies.map(tech => (
                <span
                  key={tech}
                  className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-4 border-t">
            {portfolio.github_url && (
              <a href={portfolio.github_url} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Github className="w-4 h-4" />
                  GitHub
                </Button>
              </a>
            )}
            {portfolio.live_url && (
              <a href={portfolio.live_url} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Ver proyecto
                </Button>
              </a>
            )}
            {onEdit && (
              <Button onClick={() => onEdit(portfolio.id)} size="sm" className="ml-auto">
                Editar
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
