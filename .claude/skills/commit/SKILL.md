---
name: commit
description: Commit con auto-bump de patch version, regeneración de tipos Supabase, y verificación de calidad. Usar SIEMPRE para hacer commits en lugar de git commit directo. Activar ante "commit", "guardar cambios", "commitear", "versionar".
license: MIT
compatibility: Requires pnpm, Turborepo, Supabase CLI, jq, and git.
metadata:
  author: netxa
  version: "3.4"
argument-hint: mensaje del commit (ej. feat: add auth system)
context: fork
model: opus
allowed-tools: Bash(supabase*) Bash(turbo*) Bash(pnpm*) Bash(npm*) Bash(node*) Bash(git*) Bash(jq*) Read Glob Grep
---

Ejecutar commit con versionado automático para "$ARGUMENTS":

## 1. Regenerar tipos Supabase
```bash
supabase gen types typescript --local > src/lib/supabase/types.ts 2>/dev/null || echo "⚠️ Supabase local no disponible, skip tipos"
```

## 2. Verificación rápida de calidad
```bash
turbo run type-check lint --concurrency=10
```
Si falla: DETENERSE. Reportar errores. NO continuar con el commit.

## 3. Bump patch version (OBLIGATORIO — regla inquebrantable)
```bash
npm version patch --no-git-tag-version
```
El bump de patch ocurre en CADA commit sin excepción, a menos que el usuario explícitamente indique minor o major.

## 4. Leer nueva versión
```bash
jq -r .version package.json
```

## 5. Stage + commit
```bash
git add -A
VERSION=$(jq -r .version package.json)
git commit -m "$ARGUMENTS (v$VERSION)"
```

## 6. Confirmar
Mostrar `git log --oneline -1` y la nueva versión.

IMPORTANTE: El mensaje "$ARGUMENTS" debe usar conventional commits (feat:, fix:, refactor:, etc.). Si el usuario no incluye prefijo, inferir el más apropiado.
