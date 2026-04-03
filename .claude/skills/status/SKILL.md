---
name: status
description: Estado actual del monorepo. Activar ante "status", "estado", "cómo va", "resumen del proyecto".
license: MIT
compatibility: Requires pnpm, Turborepo, Supabase CLI, jq, and git.
metadata:
  author: netxa
  version: "3.4"
context: fork
model: opus
allowed-tools: Bash(node*) Bash(ls*) Bash(turbo*) Bash(grep*) Bash(git*) Bash(cat*) Bash(jq*) Read Glob Grep
---

Reporte de estado:

1. **Versión**: `jq -r .version package.json` — versión actual.
2. **Workspaces**: `ls apps/ packages/` — listar con descripción breve.
3. **Features**: `ls apps/web/src/features/` — features existentes.
4. **Tipos DB**: verificar `src/lib/supabase/types.ts` — listar tablas encontradas.
5. **Build**: `turbo run type-check --concurrency=10` — ¿compila?
6. **Tests**: `turbo run test --concurrency=10` — resumen.
7. **TODOs**: `grep -rn "TODO\|FIXME" apps/ packages/ --include="*.ts" --include="*.tsx"` — pendientes.
8. **CLAUDE.md**: ¿sección de directivas actualizada?
9. **Git**: `git status` + `git log --oneline -5` — estado del repo.
