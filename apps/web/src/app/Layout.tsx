import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'

export function Layout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-background">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold">
            Portfolio
          </Link>
          <div className="flex gap-6 items-center">
            <Link to="/portfolio" className="text-sm hover:underline">
              Proyectos
            </Link>
            <Link to="/blog" className="text-sm hover:underline">
              Blog
            </Link>
            <Link to="/login" className="text-sm hover:underline">
              Login
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/50 mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          © 2026 Portfolio. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
