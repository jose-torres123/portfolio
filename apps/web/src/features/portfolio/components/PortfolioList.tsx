import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui'
import { Github, ExternalLink } from 'lucide-react'
import type { Portfolio } from '../types'

interface PortfolioListProps {
  portfolios: Portfolio[]
  isLoading?: boolean
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export function PortfolioList({ portfolios, isLoading }: PortfolioListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-64 bg-muted rounded-lg animate-pulse" />
        ))}
      </div>
    )
  }

  if (portfolios.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No projects found</p>
      </div>
    )
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {portfolios.map(project => (
        <motion.div key={project.id} variants={itemVariants}>
          <Link to={`/portfolio/${project.id}`}>
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
              <div className="overflow-hidden h-40">
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-2">{project.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 3).map(tech => (
                    <span
                      key={tech}
                      className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-xs text-muted-foreground px-2 py-1">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Links */}
                <div className="flex gap-2 pt-2">
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      title="GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  )
}
