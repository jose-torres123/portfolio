import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/lib/ui'
import { ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-4 max-w-2xl"
      >
        <h1 className="text-4xl md:text-6xl font-bold">
          Welcome to My Portfolio
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground">
          Explore my projects, read my blog, and get in touch with me
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Link to="/portfolio">
          <Button size="lg" className="flex items-center gap-2">
            View Projects <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
        <Link to="/blog">
          <Button size="lg" variant="outline">
            Read Blog
          </Button>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="pt-8 text-sm text-muted-foreground"
      >
        Built with React, Vite, and Tailwind CSS
      </motion.div>
    </div>
  )
}
