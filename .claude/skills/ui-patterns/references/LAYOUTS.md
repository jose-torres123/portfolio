# Layouts y Navegación

## App Shell — Sidebar + Content
```tsx
// Layout principal con sidebar collapsible
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Button } from '@repo/ui';
import { cn } from '@/lib/utils';

export function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 transform bg-card border-r transition-transform duration-200 md:relative md:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-16 items-center justify-between px-4 border-b">
          <span className="text-lg font-semibold">Logo</span>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="flex flex-col gap-1 p-4">
          {/* NavItems aquí */}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center gap-4 border-b px-4">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Página</h1>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
```

## NavItem — Con indicador activo
```tsx
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

export function NavItem({ href, icon, label }: NavItemProps) {
  const { pathname } = useLocation();
  const active = pathname === href;

  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
        active
          ? "bg-primary/10 text-primary font-medium"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      )}
    >
      {icon}
      {label}
    </Link>
  );
}
```

## Top Bar Only (sin sidebar)
```tsx
export function TopBarLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
          <span className="text-lg font-semibold">Logo</span>
          <nav className="hidden items-center gap-6 md:flex">
            {/* Links */}
          </nav>
          {/* Mobile menu button */}
        </div>
      </header>
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
```

## Page Header — Título + acciones
```tsx
interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex gap-2">{actions}</div>}
    </div>
  );
}
```

## Grid Responsive
```tsx
// 1 col mobile → 2 cols tablet → 3 cols desktop
<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
  {items.map(item => <Card key={item.id}>...</Card>)}
</div>

// 1 col mobile → sidebar + content desktop
<div className="flex flex-col gap-6 lg:flex-row">
  <aside className="w-full lg:w-64 lg:shrink-0">...</aside>
  <div className="flex-1">...</div>
</div>
```
