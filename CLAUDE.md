# CLAUDE.md — Project Intelligence v3.4
# ═══════════════════════════════════════
# Monorepo: Turborepo + React/Vite + Vercel + Supabase
# CI/CD: PR → main → auto-deploy Vercel + Supabase migrations
# Este archivo es la fuente de verdad. Se carga en cada sesión.

## 🌐 IDIOMA Y COMUNICACIÓN
- Responder SIEMPRE en español.
- Código, variables, nombres de archivos, commits, y branches en inglés.
- Mensajes de error y logs en inglés (estándar de la industria).
- Documentación técnica (README, comments en código) en inglés.

## 🚨 GESTIÓN DE OUTPUT — EVITAR TRUNCAMIENTO (CRITICAL)

### Regla: NUNCA exceder el límite de tokens de respuesta
Claude Code tiene un límite de ~32K tokens por respuesta. Excederlo causa error fatal y se pierde TODO el trabajo.

### Estrategias OBLIGATORIAS
1. **UN archivo por tool call**: NUNCA generar múltiples archivos completos en un solo mensaje. Usar `Write` o `Edit` para CADA archivo por separado.
2. **Archivos > 80 líneas**: escribir con `Write` tool directamente al disco. NUNCA mostrar el contenido completo en el chat.
3. **Iterar, no acumular**: crear archivo → verificar → siguiente archivo. NO planificar todo y ejecutar de golpe.
4. **Reportes concisos**: resúmenes en bullets cortos, NO texto extenso. Detalles solo si se piden.
5. **Código en archivos, NO en chat**: si el código tiene más de 20 líneas, escribirlo a un archivo. En el chat solo mostrar fragmentos relevantes.
6. **Listas de archivos**: al crear múltiples archivos, reportar solo `path → descripción (N líneas)`. NO mostrar contenido.
7. **Dividir tareas grandes**: si una tarea requiere >5 archivos, dividir en sub-tareas y ejecutar secuencialmente.

### Anti-patrón (PROHIBIDO)
```
❌ "Aquí están los 8 archivos de la feature:"
   [800 líneas de código en el chat]
   → ERROR: exceeded 32000 output token maximum

✅ Crear cada archivo con Write, reportar:
   ✓ services/userService.ts (45 líneas)
   ✓ hooks/useUsers.ts (32 líneas)
   ✓ components/UserList.tsx (67 líneas)
   ...creados 8 archivos. ¿Verifico con type-check?
```

### Red de seguridad (configuración local)
Si aún así se trunca, el usuario puede aumentar el límite en su shell:
```bash
export CLAUDE_CODE_MAX_OUTPUT_TOKENS=64000
```

## ⚙️ DIRECTIVAS DE COMPORTAMIENTO

### 🧭 Principios Fundamentales (rigen TODO el trabajo)
- **Simplicidad Primero**: Haz que cada cambio sea lo más simple posible. Afecta al mínimo código necesario.
- **Sin Pereza**: Encuentra las causas raíz. Nada de arreglos temporales. Estándares de desarrollador senior.
- **Impacto Mínimo**: Los cambios solo deben tocar lo necesario. Evita introducir errores.

---

### 🔄 Orquestación del Flujo de Trabajo

#### 1. Modo Planificación por Defecto
- Entrar en modo planificación para CUALQUIER tarea no trivial (más de 3 pasos o decisiones arquitectónicas).
- Si algo sale mal, PARAR y volver a planificar de inmediato; no sigas forzando.
- Usar el modo planificación para los pasos de verificación, no solo para la construcción.
- Escribir especificaciones detalladas por adelantado para reducir la ambigüedad.
- El plan debe incluir: workspace afectado, archivos a crear/modificar, dependencias, riesgos.
- Si la tarea es ambigua, hacer MAX 3 preguntas de clarificación y esperar respuesta.
- Para tareas cross-workspace: mapear TODOS los consumidores antes de tocar.

#### 2. Estrategia de Subagentes
- Usar subagentes con frecuencia para mantener limpia la ventana de contexto principal.
- Delegar la investigación, exploración y análisis paralelo a subagentes.
- Para problemas complejos, dedicar más capacidad de cómputo mediante subagentes.
- Una tarea por subagente para una ejecución focalizada.
- Ejemplo: `implementer` crea archivos MIENTRAS `test-engineer` escribe tests.
- Ejemplo: `code-reviewer` revisa MIENTRAS `turbo run test` ejecuta en background.

#### 3. Bucle de Automejora
- Tras CUALQUIER corrección del usuario: actualizar `tasks/lessons.md` con el patrón.
- Escribir reglas para ti mismo que eviten el mismo error.
- Iterar implacablemente sobre estas lecciones hasta que la tasa de errores disminuya.
- Revisar las lecciones al inicio de la sesión para el proyecto correspondiente.

#### 4. Verificación antes de Finalizar
- NUNCA marcar una tarea como completada sin demostrar que funciona.
- Comparar la diferencia (diff) de comportamiento entre la rama principal y tus cambios cuando sea relevante.
- Pregúntate: "¿Aprobaría esto un ingeniero senior (Staff Engineer)?"
- Ejecutar tests, comprobar los logs y demostrar la corrección del código.
- Después de editar: `turbo run type-check lint test --filter=[workspace] --concurrency=10`.

#### 5. Exige Elegancia (Equilibrado)
- Para cambios no triviales: hacer una pausa y preguntar "¿hay una forma más elegante?"
- Si un arreglo parece un parche (hacky): "Sabiendo todo lo que sé ahora, implementar la solución elegante."
- Omitir esto para arreglos simples y obvios; no hacer sobreingeniería.
- Cuestionar tu propio trabajo antes de presentarlo.

#### 6. Corrección de Errores Autónoma
- Cuando recibas un informe de error: simplemente arréglalo. No pidas que te lleven de la mano.
- Identificar logs, errores o tests que fallan y luego resuélvelos.
- Cero necesidad de cambio de contexto por parte del usuario.
- Ir a arreglar los tests de CI que fallan sin que te digan cómo.

---

### 📋 Gestión de Tareas

1. **Planificar Primero**: Escribir el plan en `tasks/todo.md` con elementos verificables.
2. **Verificar Plan**: Confirmar antes de comenzar la implementación.
3. **Seguir el Progreso**: Marcar los elementos como completados a medida que avances.
4. **Explicar Cambios**: Resumen de alto nivel en cada paso.
5. **Documentar Resultados**: Añadir una sección de revisión a `tasks/todo.md`.
6. **Capturar Lecciones**: Actualizar `tasks/lessons.md` después de las correcciones.

---

### Uso de Agentes y Skills
- Los agentes tienen **memoria persistente** (`memory: project`). Consultar su memoria ANTES de empezar trabajo.
- Al terminar trabajo con un agente, pedirle que **guarde lo aprendido** en su memoria.
- Para features nuevas: skill `/scaffold-feature` → agente `implementer` → agente `code-reviewer`.
- Para Supabase: SIEMPRE consultar skill `/supabase-patterns` antes de escribir queries/mutations.
- Para UI y layouts: SIEMPRE consultar skill `/ui-patterns` antes de crear interfaces.
- Para investigar: agente `researcher` ANTES de elegir paquetes o patrones.
- Para tests: agente `test-engineer` después de implementar.
- NUNCA improvisar patrones; SIEMPRE consultar el skill correspondiente.

### Generación de Código — Explícito y Limpio
- TypeScript estricto: `strict: true`, NUNCA `any`, NUNCA `as` sin justificación.
- Cada función con tipado explícito de parámetros Y retorno.
- Componentes < 150 líneas. Hooks < 100 líneas. Servicios < 80 líneas.
- Un archivo = una responsabilidad. Separar UI / lógica / datos.
- Imports con alias `@/` para rutas dentro del workspace, `@repo/` para paquetes compartidos.
- Nombrar explícitamente: `getUserById` > `getUser` > `get`.
- Preferir claridad sobre brevedad. Código autodocumentado > comentarios.
- NO dejar TODOs sin descripción. Formato: `// TODO(autor): qué falta y por qué`.

### Protección del Código Existente
- ANTES de modificar: leer contenido completo con Read. Entender dependencias.
- Identificar y preservar: tests, tipos exportados, barrel exports, contratos de API.
- Cambios mínimos y focalizados. PROHIBIDO refactorizar código no solicitado.
- Si un cambio puede romper otros archivos: listarlos ANTES con impacto estimado.
- En monorepo: verificar consumidores en otros workspaces con `turbo ls --affected`.
- Después de editar: `turbo run type-check lint --filter=[workspace]`.

### Gestión de Contexto y Memoria
- Después de completar cada feature, escribir resumen en `.claude/docs/[feature]-done.md`.
- Cuando el contexto supere ~60%, avisar PROACTIVAMENTE y sugerir `/compact` o `/clear`.
- Al compactar, preservar: decisiones de arquitectura, estado de TODO list, errores encontrados.
- Usar `tasks/todo.md` para rastrear progreso de tareas multi-paso.
- Usar `tasks/lessons.md` para capturar lecciones aprendidas de errores.
- Los agentes DEBEN consultar y actualizar su memoria persistente en cada invocación.
- Para tareas largas (>30 min estimado), crear plan escrito en `tasks/todo.md`.

### Investigación y Evaluación de Alcance
- Ante requerimientos nuevos, PRIMERO evaluar con el comando `/evaluate`.
- Presentar: ALCANCE | ESFUERZO (bajo/medio/alto) | RIESGOS | DEPENDENCIAS | WORKSPACES AFECTADOS.
- Si requiere paquete nuevo: justificar vs solución sin dependencia.
- Para decisiones arquitecturales: 2+ opciones con pros/contras.

### 🖥️ Explotación de Hardware (Mac M-Series 32GB) — OBLIGATORIO
Esta máquina tiene potencia de sobra. SIEMPRE explotarla al máximo:

**Paralelismo de Subagentes**
- Lanzar subagentes en paralelo para tareas independientes. NO secuencializar lo que puede ser paralelo.
- Ejemplo: `implementer` crea archivos MIENTRAS `test-engineer` escribe tests de features anteriores.
- Ejemplo: `code-reviewer` revisa MIENTRAS `turbo run test` ejecuta en background.
- Para `/new-feature`: ejecutar steps 6 (tests) y 7 (review) en paralelo.

**Turborepo — Máxima Concurrencia**
- SIEMPRE usar `--concurrency=10` en turbo commands para saturar los cores del M5.
- Usar `turbo run build --concurrency=10` NO `turbo run build` (default=3).
- Usar `turbo run type-check lint test --concurrency=10` — ejecuta TODO en paralelo.
- Remote Cache habilitado vía Vercel: `TURBO_TOKEN` + `TURBO_TEAM` en CI y local.
- Habilitar local cache: `turbo run build` almacena en `node_modules/.cache/turbo/`.
- `turbo run build --affected` — SOLO reconstruye lo que cambió (usa git diff internamente).
- `turbo run build --dry-run` — preview sin ejecutar (útil para evaluar impacto).

**Vitest — Worker Threads**
- Usar `--pool=threads` (default en Vitest) para tests paralelos por thread.
- Con 32GB de RAM, ejecutar `vitest run --reporter=verbose` sin preocupación de memoria.
- Para test suites grandes: `vitest run --pool=forks --poolOptions.forks.maxForks=8`.

**Dev Server**
- `pnpm dev` lanza TODOS los workspaces en paralelo automáticamente.
- Vite HMR es instantáneo en M-Series gracias al SSD NVMe y los cores de eficiencia.
- Si un workspace no se necesita: `pnpm dev --filter=web` para ahorrar puertos y procesos.

**Build Optimization**
- Vite usa esbuild (nativo, optimizado para ARM64) — los builds son rápidos por defecto.
- `rollupOptions.manualChunks` ya configurado para vendor splitting óptimo.
- SWC (Speedy Web Compiler, Rust-based) para transpilación React vía `@vitejs/plugin-react-swc`.

---

## 🎨 ESTILO VISUAL — Tailwind + shadcn/ui

### Stack UI
- **Tailwind CSS v4** — utility-first, mobile-first responsive.
- **shadcn/ui** — componentes base. NO instalar todos; solo lo que se necesita (`npx shadcn-ui@latest add [componente]`).
- **Framer Motion** — animaciones y transiciones. Usar para page transitions, modals, toasts, y micro-interactions.
- **Lucide React** — iconos. NUNCA instalar otra librería de iconos.

### Principios de Diseño (OBLIGATORIO)
1. **Mobile-first**: SIEMPRE diseñar para móvil primero, luego ampliar con `sm:`, `md:`, `lg:`, `xl:`.
2. **Minimalista**: Espacios amplios, tipografía limpia, colores contenidos. Menos es más.
3. **Consistencia**: Usar SOLO los tokens de diseño definidos en `tailwind.config.ts`. NUNCA colores hardcodeados.
4. **Accesibilidad**: `aria-label` en botones de solo icono, contraste WCAG AA, `focus-visible` en interactivos.

### Responsive Breakpoints
```
default  → móvil (<640px) — diseñar PRIMERO para esto
sm:      → ≥640px
md:      → ≥768px (tablet)
lg:      → ≥1024px (desktop)
xl:      → ≥1280px (wide)
```

### Patrones de Componentes
```tsx
// ✅ CORRECTO — mobile-first, shadcn/ui, layout responsive
<div className="flex flex-col gap-4 p-4 md:flex-row md:gap-6 lg:p-8">
  <Card className="w-full md:w-1/2">
    <CardHeader>
      <CardTitle className="text-lg md:text-xl">Título</CardTitle>
    </CardHeader>
    <CardContent>...</CardContent>
  </Card>
</div>

// ❌ INCORRECTO — desktop-first, colores hardcodeados
<div style={{ display: 'flex', color: '#333' }}>
```

### Framer Motion — Patrones Aprobados
```tsx
// Page transitions
<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>

// Listas animadas (stagger)
<motion.div variants={container} initial="hidden" animate="visible">
  {items.map(item => <motion.div key={item.id} variants={listItem} />)}
</motion.div>

// Skeleton → Content transition
<AnimatePresence mode="wait">
  {isLoading ? <Skeleton /> : <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>...</motion.div>}
</AnimatePresence>
```

### Convenciones Tailwind
- NUNCA usar `@apply` en CSS. Todo inline con clases de Tailwind.
- NUNCA usar `style={{}}` inline excepto para valores dinámicos calculados.
- Orden de clases: layout → spacing → sizing → typography → colors → effects → responsive.
- Usar `cn()` de `@/lib/utils` para clases condicionales (viene con shadcn/ui).
- Variantes con `cva()` de `class-variance-authority` para componentes con múltiples estados.

### shadcn/ui — Reglas
- Componentes instalados en `packages/ui/src/components/ui/` (workspace `@repo/ui`).
- ANTES de usar un componente shadcn: verificar que está instalado con `ls packages/ui/src/components/ui/`.
- Si no está: `npx shadcn-ui@latest add [componente]` en el workspace de UI.
- NUNCA modificar los archivos base de shadcn. Crear wrappers en `packages/ui/src/components/` si se necesita customización.
- Theming vía CSS variables en `apps/web/src/styles/globals.css`.

---

## 📝 FORMULARIOS Y VALIDACIÓN — Zod + React Hook Form

### Stack de Forms
- **React Hook Form** — manejo de estado del form. NUNCA usar `useState` para forms.
- **Zod** — schemas de validación. NUNCA validar manualmente con `if/else`.
- **@hookform/resolvers** — conecta Zod con React Hook Form.
- **shadcn/ui Form** — componentes `<Form>`, `<FormField>`, `<FormItem>`, `<FormMessage>` para UI consistente.

### Patrón Obligatorio para TODO Formulario
```tsx
// 1. Schema Zod (en types/ de la feature)
import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(2, 'Mínimo 2 caracteres').max(100),
  email: z.string().email('Email inválido'),
  age: z.coerce.number().min(18, 'Debe ser mayor de edad').optional(),
});
export type CreateUserInput = z.infer<typeof createUserSchema>;

// 2. Hook del form (en hooks/ de la feature)
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export function useCreateUserForm() {
  return useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
    defaultValues: { name: '', email: '' },
  });
}

// 3. Componente (en components/ de la feature)
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@repo/ui';

export function CreateUserForm() {
  const form = useCreateUserForm();
  const mutation = useCreateUser();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="flex flex-col gap-4">
        <FormField control={form.control} name="name" render={({ field }) => (
          <FormItem>
            <FormLabel>Nombre</FormLabel>
            <FormControl><Input {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? 'Guardando...' : 'Crear'}
        </Button>
      </form>
    </Form>
  );
}
```

### Reglas de Validación
- Schemas Zod en `features/[feature]/types/[feature].schemas.ts` — separados de los tipos.
- SIEMPRE exportar tanto el schema como el tipo inferido (`z.infer<typeof schema>`).
- Reutilizar schemas: `updateSchema = createSchema.partial()` para updates parciales.
- Validación server-side: usar el MISMO schema Zod en edge functions de Supabase.
- Mensajes de error en español para UI, en inglés para logs.
- Para forms complejos (wizard/multi-step): un schema por step, `z.union()` o `z.discriminatedUnion()` para el total.

### Convenciones de Naming
- Schema: `create[Entity]Schema`, `update[Entity]Schema`, `filter[Entity]Schema`
- Tipo inferido: `Create[Entity]Input`, `Update[Entity]Input`, `Filter[Entity]Input`
- Hook del form: `useCreate[Entity]Form()`, `useUpdate[Entity]Form()`
- Componente: `Create[Entity]Form`, `Update[Entity]Form`

---

## 🛡️ ANTI-ALUCINACIÓN — PROTOCOLO ESTRICTO

### Verificación de APIs (OBLIGATORIO)
1. **Supabase**: NUNCA asumir que un método existe. Verificar en https://supabase.com/docs antes de usar.
2. **React/Vite**: Verificar hooks y APIs contra https://react.dev y https://vite.dev. React 19 tiene cambios breaking.
3. **TanStack Query**: Verificar contra https://tanstack.com/query/latest. La API cambió significativamente en v5.
4. **shadcn/ui**: Verificar con `ls packages/ui/src/components/ui/`. NUNCA asumir que un componente está instalado.
5. **Tailwind CSS**: Verificar clases contra https://tailwindcss.com/docs. NUNCA inventar clases de utilidad.
6. **Framer Motion**: Verificar API contra https://motion.dev/docs. La API cambió de `framer-motion` a `motion/react` en v11.
7. **React Hook Form + Zod**: Verificar contra https://react-hook-form.com/docs y https://zod.dev. NUNCA inventar métodos de schema.

### Verificación de Paquetes npm (OBLIGATORIO)
- NUNCA sugerir un paquete sin verificar que existe en npmjs.com.
- Verificar: última actualización < 6 meses, soporte TS nativo, compatible con ESM/Vite.
- Si el paquete no existe o está deprecado: DECIRLO, no inventar alternativas.

### Verificación de Estructura (OBLIGATORIO)
- ANTES de importar un archivo, verificar que existe con `Glob` o `Read`.
- ANTES de usar un tipo de Supabase, verificar que la tabla existe en `src/lib/supabase/types.ts`.
- Si `types.ts` no existe o está vacío: regenerar con `supabase gen types typescript --local > src/lib/supabase/types.ts`.
- ANTES de referenciar un componente de shadcn, verificar que está instalado.
- NUNCA asumir la estructura de carpetas; siempre verificar con `Glob`.

### Verificación de Configuración (OBLIGATORIO)
- NUNCA inventar opciones de `vite.config.ts`, `turbo.json`, o `tsconfig.json`.
- Si no estás seguro de una opción de configuración: buscar en docs oficiales.
- Las env vars de Supabase son `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` para frontend.
- NUNCA `SUPABASE_SERVICE_ROLE_KEY` en código frontend.

### Protocolo de Honestidad
- Si no sabes algo: **DECIRLO** explícitamente. "No estoy seguro de X, déjame verificar."
- Si una búsqueda no arroja resultados claros: reportarlo, no inventar.
- Si un approach tiene riesgos que no puedes evaluar: listar los riesgos con "NO VERIFICADO".
- NUNCA decir "esto debería funcionar" sin haberlo verificado contra documentación.
- Preferir "según la documentación de [fuente]..." sobre afirmaciones sin respaldo.

---

## 🏗️ ARQUITECTURA MONOREPO (TURBOREPO)

### Estructura del Monorepo
```
root/
├── apps/
│   ├── web/                    # App principal React+Vite
│   │   ├── src/
│   │   │   ├── app/            # Layout, providers, router
│   │   │   ├── features/       # Feature-based architecture
│   │   │   ├── shared/         # Compartido dentro de web
│   │   │   ├── lib/
│   │   │   │   ├── supabase/
│   │   │   │   │   ├── client.ts   # createClient<Database>
│   │   │   │   │   └── types.ts    # ← GENERADO: supabase gen types
│   │   │   │   ├── query-client.ts
│   │   │   │   └── utils.ts
│   │   │   └── styles/         # Globals CSS
│   │   ├── index.html
│   │   ├── vite.config.ts
│   │   ├── tsconfig.json
│   │   └── package.json
│   └── mobile/                 # (futuro) React Native / Expo
├── packages/
│   ├── ui/                     # Componentes compartidos (shadcn wrappers)
│   │   ├── src/components/
│   │   ├── package.json        # name: "@repo/ui"
│   │   └── tsconfig.json
│   ├── shared/                 # Tipos de dominio, utils, constantes compartidas
│   │   ├── src/
│   │   │   ├── types/          # Tipos de dominio (NO database types, esos van en apps/web)
│   │   │   ├── utils/          # Helpers genéricos
│   │   │   └── constants/      # Constantes compartidas
│   │   ├── package.json        # name: "@repo/shared"
│   │   └── tsconfig.json
│   ├── supabase/               # Cliente + config de Supabase
│   │   ├── src/
│   │   │   ├── client.ts       # createClient<Database>
│   │   │   ├── auth.ts         # Auth helpers
│   │   │   └── index.ts
│   │   ├── package.json        # name: "@repo/supabase"
│   │   └── tsconfig.json
│   └── config/                 # Configs compartidas
│       ├── eslint/
│       ├── typescript/
│       └── tailwind/
├── supabase/                   # Supabase CLI project
│   ├── migrations/             # SQL migrations
│   ├── functions/              # Edge Functions (Deno)
│   ├── seed.sql
│   └── config.toml
├── .github/workflows/          # CI/CD
│   ├── ci.yml                  # PR checks
│   └── deploy.yml              # Deploy on merge to main
├── turbo.json                  # Pipeline Turborepo
├── package.json                # Root workspace
├── pnpm-workspace.yaml
├── CLAUDE.md                   # ← ESTE ARCHIVO
└── .claude/                    # Config de Claude Code
```

### Convenciones de Workspace
- **Apps** (`apps/`): Aplicaciones deployables. Cada una tiene su propio `vite.config.ts`.
- **Packages** (`packages/`): Librerías internas. Se importan como `@repo/nombre`.
- **Supabase** (`supabase/`): Migrations, functions, seeds. NO es un workspace de Turborepo.

### Imports entre Workspaces
```tsx
// Desde apps/web:
import { Button } from '@repo/ui';                          // Componentes compartidos
import { supabase } from '@repo/supabase';                   // Cliente Supabase
import type { Database } from '@/lib/supabase/types';        // Tipos DB (GENERADO, local a apps/web)
import { formatDate } from '@repo/shared';                   // Utils compartidos
import type { UserProfile } from '@repo/shared';             // Tipos de dominio
```

### Feature-Based Architecture (dentro de apps/web)
```
src/features/[feature-name]/
├── components/     # UI de la feature
├── hooks/          # Lógica de negocio
├── services/       # Queries a Supabase
├── types/          # Tipos locales de la feature
├── utils/          # Helpers específicos
├── __tests__/      # Tests colocados
└── index.ts        # Barrel export
```

### Turbo Pipeline (`turbo.json`)
```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "dev": {
      "dependsOn": ["^build"],
      "persistent": true,
      "cache": false
    },
    "lint": {
      "dependsOn": ["^build"]
    },
    "type-check": {
      "dependsOn": ["^build"]
    },
    "test": {
      "dependsOn": ["^build"],
      "outputs": ["coverage/**"]
    },
    "db:types": {
      "cache": false,
      "outputs": ["apps/web/src/lib/supabase/types.ts"]
    }
  }
}
```

---

## 🔄 CI/CD — GITHUB + VERCEL + SUPABASE

### Flujo de Deploy
```
feature branch → PR → CI checks → merge to main → auto-deploy
                  │                       │
                  ├─ turbo build          ├─ Vercel: deploy apps/web
                  ├─ turbo type-check     ├─ Supabase: push migrations
                  ├─ turbo lint           └─ Supabase: deploy edge functions
                  └─ turbo test
```

### Reglas de Branching
- `main`: Producción. SOLO merge vía PR aprobado.
- `develop`: Integración (opcional).
- `feat/*`, `fix/*`, `refactor/*`: Branches de trabajo.
- Convencional commits: `feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `chore:`.

### Variables de Entorno (NUNCA en código)
```
# Vercel (dashboard)
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbG...

# GitHub Secrets (para CI/CD)
SUPABASE_ACCESS_TOKEN=sbp_xxx
SUPABASE_PROJECT_ID=xxx
SUPABASE_DB_PASSWORD=xxx
VERCEL_TOKEN=xxx
VERCEL_ORG_ID=xxx
VERCEL_PROJECT_ID=xxx
```

---

## 🗄️ SUPABASE — Reglas

### Tipos Generados (OBLIGATORIO)
- Ubicación ÚNICA: `src/lib/supabase/types.ts`
- Comando de generación: `supabase gen types typescript --local > src/lib/supabase/types.ts`
- SIEMPRE regenerar tipos después de CUALQUIER cambio en el schema (migrations, nuevas tablas, columnas).
- SIEMPRE regenerar ANTES de implementar servicios que consuman tablas modificadas.
- SIEMPRE usar tipos generados. NUNCA crear tipos manuales para tablas de Supabase.
- Si los tipos no están actualizados, el agente DEBE regenerarlos antes de continuar.
- Import: `import type { Database } from '@/lib/supabase/types'` (SIEMPRE desde apps/web).

### Reglas Generales
- TODAS las tablas con RLS habilitado. NUNCA desactivar.
- Migrations en `supabase/migrations/`. NUNCA modificar las ya aplicadas.
- Edge Functions en `supabase/functions/` (Deno runtime, NO Node).
- Después de crear migration: regenerar tipos inmediatamente.

---

## 🔢 VERSIONADO — Regla Inquebrantable

### Bump de Patch en CADA Commit — SIN EXCEPCIÓN
- CADA commit incrementa patch: `1.0.1` → `1.0.2` → `1.0.3`. NO hay commits sin bump.
- Esta regla es INQUEBRANTABLE. Solo el usuario puede pedir minor o major explícitamente.
- El bump se aplica al `package.json` raíz del monorepo.
- Comando: `npm version patch --no-git-tag-version` (solo modifica package.json, no crea tag).
- El commit DEBE incluir el package.json con la versión actualizada.
- Formato de commit: `feat: descripción (v1.0.2)` — incluir versión en el mensaje.
- NUNCA hacer `git commit` sin antes ejecutar `npm version patch --no-git-tag-version`.
- Si olvidaste el bump: hacer `git commit --amend` con la versión corregida.
- Usar SIEMPRE `/commit` en lugar de `git commit` directo para automatizar esto.

### Flujo de Commit
```bash
# 1. Verificar calidad
turbo run type-check lint test --filter=[workspace]

# 2. Regenerar tipos si hubo cambios de schema
supabase gen types typescript --local > src/lib/supabase/types.ts

# 3. Bump patch version
npm version patch --no-git-tag-version

# 4. Stage + commit
git add -A
VERSION=$(jq -r .version package.json)
git commit -m "feat: descripción del cambio (v$VERSION)"
```

---

## 📋 COMANDOS

```bash
# Desarrollo
pnpm dev                          # Todos los workspaces en paralelo
pnpm dev --filter=web             # Solo app web
pnpm build                        # Build de todos los workspaces
pnpm build --filter=web           # Solo app web

# Calidad
pnpm lint                         # Lint todos
pnpm type-check                   # TypeScript check todos
pnpm test                         # Tests todos
pnpm format                       # Prettier todos
pnpm quality                      # lint + type-check + test

# Supabase
pnpm db:types                     # Regenerar tipos (--local)
pnpm db:migrate                   # Push migrations
pnpm db:reset                     # Reset DB local
pnpm db:start                     # Supabase local

# Versionado
pnpm version:patch                # Bump patch (OBLIGATORIO en cada commit)
pnpm version:minor                # Bump minor (manual)
pnpm version:major                # Bump major (manual)

# Turborepo
pnpm turbo run build --affected   # Solo lo que cambió
pnpm turbo run build --graph      # Visualizar dependency graph
```

---

## 🎯 DIRECTIVAS ESPECÍFICAS DEL PROYECTO
<!-- ═══════════════════════════════════════════════════════════ -->
<!-- EDITA ESTA SECCIÓN para cada proyecto.                     -->
<!-- Aquí van las reglas únicas de TU proyecto.                 -->
<!-- Los agentes consultan esta sección para contexto.          -->
<!-- ═══════════════════════════════════════════════════════════ -->

### Nombre del Proyecto
[NOMBRE]

### Descripción
[Qué hace el proyecto, en una oración]

### Dominio de Negocio
[e-commerce, SaaS, fintech, etc.]

### Repositorio GitHub
[URL del repo]

### URLs de Deploy
- **Production**: [URL Vercel producción]
- **Staging**: [URL Vercel preview]
- **Supabase Dashboard**: [URL]

### Tablas Principales de Supabase
<!-- Listar tablas y relaciones -->

### Reglas de Negocio Críticas
<!-- Reglas que NUNCA deben violarse -->

### APIs Externas / Integraciones
<!-- Servicios externos con los que se integra -->

### Restricciones Técnicas
<!-- Cualquier restricción especial del proyecto -->

### TODO / Roadmap Activo
<!-- Estado actual — mantener actualizado -->
