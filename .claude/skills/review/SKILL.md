---
name: review
description: Revisión completa de calidad del monorepo. Activar ante "review", "revisar", "calidad", "PR review", "code review".
license: MIT
compatibility: Requires pnpm, Turborepo, and git.
metadata:
  author: netxa
  version: "3.4"
context: fork
model: opus
---

Revisión completa:

1. Detectar archivos modificados: `git diff --name-only HEAD~5`
2. Invocar agente `code-reviewer` sobre los archivos modificados.
3. `turbo run type-check --concurrency=10` → reportar errores.
4. `turbo run lint --concurrency=10` → reportar problemas.
5. `turbo run test --concurrency=10` → reportar resultados.
6. Resumen: findings por severidad + score (✅ PASS | ⚠️ REVISAR | ❌ BLOQUEA PR).

Lanzar type-check, lint y test en paralelo aprovechando Turborepo.

## Control de Output (CRITICAL)
- Resultados de turbo commands: solo PASS/FAIL + conteo de errores. NO pegar output completo.
- Code review: máximo 3 líneas por finding. Fixes largos → aplicar con Edit tool.
- Si >20 findings: escribir reporte completo a `.claude/docs/review-[fecha].md`.
