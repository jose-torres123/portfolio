---
name: evaluate
description: Evalúa alcance, esfuerzo y riesgos de un requerimiento antes de implementar. Activar ante "evaluar", "evaluate", "cuánto cuesta", "qué implica", "alcance de".
license: MIT
compatibility: Requires git and basic shell utilities.
metadata:
  author: netxa
  version: "3.4"
argument-hint: descripción del requerimiento
context: fork
model: opus
allowed-tools: Read Glob Grep Bash(ls*) Bash(find*) Bash(wc*) Bash(git*)
---

Evaluar: "$ARGUMENTS"

1. Entender el requerimiento. Preguntar si es ambiguo.
2. Usar subagente `explore` para mapear estado actual del codebase.
3. Producir evaluación:

```
EVALUACIÓN DE ALCANCE
─────────────────────
REQUERIMIENTO: [Resumen]
WORKSPACES AFECTADOS: [apps/web, packages/shared, etc.]
ARCHIVOS: [crear N | modificar N]
TABLAS SUPABASE: [afectadas]
ESFUERZO: [BAJO (<5 archivos) | MEDIO (5-15) | ALTO (>15)]
DEPENDENCIAS NUEVAS: [listar o ninguna]
RIESGOS:
  1. [riesgo] → [mitigación]
PLAN SUGERIDO:
  1. [paso]
ESTIMACIÓN: [N sesiones]
```

4. Esperar confirmación antes de implementar.

## Control de Output
- Si la evaluación tiene >3 riesgos o >5 archivos afectados: escribir a `.claude/docs/eval-[feature].md`.
- En chat: solo el resumen de ESFUERZO + RIESGOS principales. Detalles en el archivo.
