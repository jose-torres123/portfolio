# Patrones de Página

## Dashboard — Stats + Charts + Activity
```tsx
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui';
import { motion } from 'motion/react';
import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react';

// Stat card animada
function StatCard({ title, value, icon, trend }: {
  title: string; value: string; icon: React.ReactNode; trend?: string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && <p className="mt-1 text-xs text-muted-foreground">{trend}</p>}
      </CardContent>
    </Card>
  );
}

// Layout del dashboard
const container = { hidden: {}, visible: { transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export function DashboardPage() {
  return (
    <motion.div variants={container} initial="hidden" animate="visible" className="flex flex-col gap-6">
      {/* Stats row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <motion.div variants={item}>
          <StatCard title="Ingresos" value="$45,231" icon={<DollarSign className="h-4 w-4 text-muted-foreground" />} trend="+20.1% vs mes anterior" />
        </motion.div>
        <motion.div variants={item}>
          <StatCard title="Usuarios" value="2,350" icon={<Users className="h-4 w-4 text-muted-foreground" />} trend="+180 este mes" />
        </motion.div>
        {/* ... más stats */}
      </div>

      {/* Content row: chart + activity */}
      <div className="grid gap-4 lg:grid-cols-7">
        <motion.div variants={item} className="lg:col-span-4">
          <Card className="h-full">
            <CardHeader><CardTitle>Resumen</CardTitle></CardHeader>
            <CardContent>{/* Chart aquí */}</CardContent>
          </Card>
        </motion.div>
        <motion.div variants={item} className="lg:col-span-3">
          <Card className="h-full">
            <CardHeader><CardTitle>Actividad reciente</CardTitle></CardHeader>
            <CardContent>{/* Activity list aquí */}</CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
```

## Detail Page — Breadcrumb + Header + Tabs
```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/ui';
import { Badge } from '@repo/ui';
import { Button } from '@repo/ui';
import { ChevronRight, Pencil, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export function DetailPage({ item }: { item: Item }) {
  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-muted-foreground">
        <Link to="/items" className="hover:text-foreground">Items</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">{item.name}</span>
      </nav>

      {/* Header con acciones */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">{item.name}</h1>
            <Badge variant={item.active ? 'default' : 'secondary'}>
              {item.active ? 'Activo' : 'Inactivo'}
            </Badge>
          </div>
          <p className="mt-1 text-muted-foreground">{item.description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Pencil className="mr-2 h-4 w-4" /> Editar
          </Button>
          <Button variant="destructive" size="sm">
            <Trash2 className="mr-2 h-4 w-4" /> Eliminar
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="activity">Actividad</TabsTrigger>
          <TabsTrigger value="settings">Configuración</TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="mt-4">...</TabsContent>
        <TabsContent value="activity" className="mt-4">...</TabsContent>
        <TabsContent value="settings" className="mt-4">...</TabsContent>
      </Tabs>
    </div>
  );
}
```

## Settings Page — Secciones con separadores
```tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/ui';
import { Separator } from '@repo/ui';

function SettingsSection({ title, description, children }: {
  title: string; description: string; children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export function SettingsPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">Configuración</h1>
        <p className="text-muted-foreground">Administra tu cuenta y preferencias.</p>
      </div>

      <SettingsSection title="Perfil" description="Información pública de tu cuenta.">
        {/* ProfileForm aquí */}
      </SettingsSection>

      <SettingsSection title="Notificaciones" description="Configura cómo recibes notificaciones.">
        {/* NotificationsForm aquí */}
      </SettingsSection>

      <SettingsSection title="Zona de peligro" description="Acciones irreversibles.">
        <div className="flex items-center justify-between rounded-lg border border-destructive/50 p-4">
          <div>
            <p className="font-medium">Eliminar cuenta</p>
            <p className="text-sm text-muted-foreground">Esta acción es irreversible.</p>
          </div>
          <Button variant="destructive" size="sm">Eliminar</Button>
        </div>
      </SettingsSection>
    </div>
  );
}
```

## Auth Page — Login/Register centrado
```tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/ui';
import { motion } from 'motion/react';

export function AuthLayout({ children, title, description }: {
  children: React.ReactNode; title: string; description: string;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>{children}</CardContent>
        </Card>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          ¿No tienes cuenta? <Link to="/register" className="text-primary hover:underline">Regístrate</Link>
        </p>
      </motion.div>
    </div>
  );
}
```

## Landing Page — Hero + Features + CTA
```tsx
export function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-4 py-20 text-center md:py-32">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl"
        >
          Título principal del producto
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-4 max-w-xl text-lg text-muted-foreground"
        >
          Descripción breve que explica el valor.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 flex gap-3"
        >
          <Button size="lg">Comenzar gratis</Button>
          <Button size="lg" variant="outline">Ver demo</Button>
        </motion.div>
      </section>

      {/* Features grid */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center text-3xl font-bold">Características</h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full p-6">
                <feat.icon className="h-10 w-10 text-primary" />
                <h3 className="mt-4 text-lg font-semibold">{feat.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{feat.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
```
