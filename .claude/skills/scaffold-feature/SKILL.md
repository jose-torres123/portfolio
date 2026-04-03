---
name: scaffold-feature
description: Genera estructura completa de feature en monorepo Turborepo. Usar SIEMPRE para features nuevas, módulos, secciones, o páginas. Activar ante "nueva feature", "nuevo módulo", "crear sección", "agregar página", "scaffold", o cualquier solicitud de crear funcionalidad nueva.
license: MIT
compatibility: Requires pnpm, Turborepo, Supabase CLI, and shadcn/ui.
metadata:
  author: netxa
  version: "3.4"
model: opus
---

# Scaffold de Feature (Monorepo)

## Paso 1: Recopilar
1. **Nombre** (kebab-case): ej. `user-profile`
2. **Workspace**: ¿apps/web? ¿otro app?
3. **Tablas Supabase**: verificar en `src/lib/supabase/types.ts`
4. **Requiere auth**: para proteger rutas
5. **Tiene formularios**: ¿CRUD? ¿wizard multi-step?

## Paso 2: Generar Archivos
En `apps/web/src/features/[nombre]/`:
```
components/[Nombre]List.tsx        → Lista con animación stagger
components/[Nombre]Detail.tsx      → Detalle responsive mobile-first
components/[Nombre]Form.tsx        → Form con shadcn/ui + React Hook Form
components/[Nombre]Skeleton.tsx    → Skeleton loading
hooks/use[Nombre]s.ts              → TanStack Query listado
hooks/use[Nombre].ts               → TanStack Query detalle
hooks/use[Nombre]Mutations.ts      → create/update/delete mutations
hooks/use[Nombre]Form.ts           → React Hook Form + zodResolver
services/[nombre]Service.ts        → Acceso a Supabase
types/[nombre].types.ts            → Re-export de DB types + tipos locales
types/[nombre].schemas.ts          → Schemas Zod + tipos inferidos
__tests__/[nombre]Service.test.ts
__tests__/[Nombre]Form.test.ts
index.ts                           → Barrel export
```

Para patrones de código y ejemplos detallados: ver [references/CODE-PATTERNS.md](references/CODE-PATTERNS.md)

## Paso 3: Post-Scaffold
1. Reemplazar TABLE, [Nombre], [nombre] con valores reales.
2. Verificar tipos: `src/lib/supabase/types.ts`. Si no existe, regenerar.
3. Verificar shadcn: `ls packages/ui/src/components/ui/`.
4. Agregar ruta al router.
5. `turbo run type-check --filter=web --concurrency=10`.

## Control de Output (CRITICAL)
- CADA archivo se crea con Write tool individualmente.
- Crear archivos en lotes de 3-4, verificar type-check entre lotes.
- Reportar solo: `✓ path/archivo.ts (N líneas)`.
