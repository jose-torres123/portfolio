---
name: code-quality
description: Configuraciones de calidad para monorepo Turborepo. ESLint, Prettier, tsconfig, Vite. Usar al configurar proyecto, resolver errores de config, o agregar reglas. Activar ante "eslint", "prettier", "tsconfig", "lint", "formato", "turbo.json", "configuración", "vite.config".
license: MIT
compatibility: Requires pnpm, Turborepo, ESLint, Prettier, TypeScript, and Vite.
metadata:
  author: netxa
  version: "3.4"
model: opus
---

# Configuraciones de Calidad — Monorepo Turborepo

## Reglas Generales
- NUNCA inventar opciones de config. Verificar docs oficiales.
- Configs compartidas en `packages/config/`.
- Cada workspace hereda del config compartido y puede extender.

## Comandos
```bash
turbo run lint --concurrency=10          # ESLint todos los workspaces
turbo run type-check --concurrency=10    # TypeScript check todos
turbo run test --concurrency=10          # Tests todos
pnpm format                              # Prettier todos
pnpm quality                             # lint + type-check + test
```

Para configuraciones detalladas de ESLint, tsconfig, Prettier y Vite: ver [references/CONFIGS.md](references/CONFIGS.md)
