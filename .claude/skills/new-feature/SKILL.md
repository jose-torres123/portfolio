---
name: new-feature
description: Scaffold + implementación completa de feature en monorepo. Activar ante "nueva feature", "nuevo módulo", "crear feature", "agregar funcionalidad".
license: MIT
compatibility: Requires pnpm, Turborepo, Supabase CLI, and git.
metadata:
  author: netxa
  version: "3.4"
argument-hint: nombre-de-la-feature
context: fork
model: opus
---

Crear feature "$ARGUMENTS" en el monorepo:

1. **Explorar**: subagente `explore` → verificar que no existe algo similar.
2. **Regenerar tipos**: `supabase gen types typescript --local > src/lib/supabase/types.ts`
3. **Verificar DB**: leer `src/lib/supabase/types.ts` → tablas disponibles.
4. **Scaffold**: skill `scaffold-feature` → generar estructura.
5. **Implementar**: agente `implementer` → contenido de archivos.
6. **Tests**: agente `test-engineer` → tests del servicio y hooks.
7. **Review**: agente `code-reviewer` → verificar calidad.
8. **Verificar**: `turbo run type-check lint test --filter=web --concurrency=10`.
9. **Commit**: `/commit feat: add [feature-name]` → bump patch + commit.

Preguntar ANTES: ¿tabla Supabase? ¿requiere auth? ¿operaciones CRUD?
Lanzar agentes en paralelo donde sea posible (ej: tests + review simultáneos).

## Control de Output (CRITICAL)
- Cada agente invocado debe escribir archivos a disco, NO devolver código en chat.
- Entre cada step, reportar progreso en 1-2 líneas máximo.
- Si un agente devuelve output largo: pedir que lo escriba a archivo.
