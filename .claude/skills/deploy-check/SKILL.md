---
name: deploy-check
description: Verifica que el monorepo está listo para merge a main y deploy. Activar ante "deploy", "pre-deploy", "listo para merge", "antes de mergear".
license: MIT
compatibility: Requires pnpm, Turborepo, Supabase CLI, jq, and git.
metadata:
  author: netxa
  version: "3.4"
context: fork
model: opus
allowed-tools: Bash(supabase*) Bash(turbo*) Bash(pnpm*) Bash(npm*) Bash(node*) Bash(git*) Bash(grep*) Bash(jq*) Read Glob Grep
---

Pre-deploy checklist — ejecutar TODOS los pasos:

1. ✅ **Tipos Supabase frescos**: `supabase gen types typescript --local > src/lib/supabase/types.ts`
2. ✅ `turbo run type-check --concurrency=10` — cero errores
3. ✅ `turbo run lint --concurrency=10` — cero errores
4. ✅ `turbo run test --concurrency=10` — todos pasando
5. ✅ `turbo run build --concurrency=10` — build exitoso
6. ✅ **Versión bumpeada**: `jq -r .version package.json` — verificar que es correcta
7. ✅ Secrets: `grep -rn "sk_\|service_role\|secret\|password" apps/ packages/ --include="*.ts" --include="*.tsx"` — DEBE ser vacío
8. ✅ Console.logs: `grep -rn "console.log" apps/ packages/ --include="*.ts" --include="*.tsx"` — eliminar
9. ✅ Env vars: verificar `.env.example` tiene todas las vars necesarias
10. ✅ Migrations: verificar que `supabase/migrations/` tiene las nuevas migrations si hubo cambios de schema
11. ✅ Git: `git status` — working tree clean

Resultado: ✅ READY TO MERGE | ❌ NOT READY (listar blockers con solución)
