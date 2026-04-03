# Claude Code Project Template v3.4

A production-ready template for Claude Code that turns it into a team of specialized agents with persistent memory, domain-specific skills, and automated workflows. Built for **Turborepo + React/Vite + Supabase** monorepos.

**Open Specs compliant** — all 12 skills follow the [Agent Skills](https://agentskills.io) open standard, making them portable to GitHub Copilot, OpenAI Codex CLI, Cursor, and 20+ other compatible tools.

## Why this template?

Claude Code out of the box is a general-purpose assistant. This template transforms it into an opinionated engineering team that:

- **Plans before coding** — evaluates scope, risks, and affected workspaces before writing a single line
- **Follows consistent patterns** — every feature, form, query, and test follows documented conventions
- **Learns from mistakes** — a self-improvement loop captures lessons and prevents repeated errors
- **Verifies its own work** — runs type-check, lint, and tests before marking anything as done
- **Manages context efficiently** — uses subagents and progressive disclosure to stay within token limits

## What's inside

```
.claude/
├── agents/                                  # 4 specialized agents with persistent memory
│   ├── implementer.md                       # Builds features following project conventions
│   ├── code-reviewer.md                     # Reviews code for quality, UI, forms, a11y
│   ├── researcher.md                        # Investigates packages/APIs with anti-hallucination
│   └── test-engineer.md                     # Writes and runs tests (Vitest + Testing Library)
│
├── skills/                                  # 12 skills (Open Specs compliant)
│   ├── scaffold-feature/                    # Generate feature file structure
│   │   ├── SKILL.md
│   │   └── references/CODE-PATTERNS.md
│   ├── supabase-patterns/                   # Validated Supabase patterns
│   │   ├── SKILL.md
│   │   └── references/ADVANCED.md, TANSTACK.md
│   ├── ui-patterns/                         # UI: layouts, tables, feedback, pages
│   │   ├── SKILL.md
│   │   └── references/LAYOUTS.md, DATA-TABLES.md, FEEDBACK.md, PAGES.md
│   ├── forms-validation/                    # Zod + React Hook Form + shadcn/ui
│   │   ├── SKILL.md
│   │   └── references/PATTERNS.md, WIZARD.md
│   ├── code-quality/                        # ESLint, Prettier, tsconfig, Vite configs
│   │   ├── SKILL.md
│   │   └── references/CONFIGS.md
│   ├── commit/SKILL.md                      # Auto-bump patch + conventional commits
│   ├── deploy-check/SKILL.md                # Pre-merge verification checklist
│   ├── new-feature/SKILL.md                 # Full feature pipeline
│   ├── evaluate/SKILL.md                    # Scope, effort, and risk assessment
│   ├── review/SKILL.md                      # Code quality review
│   ├── research/SKILL.md                    # Technical research with source verification
│   └── status/SKILL.md                      # Project status report
│
├── docs/                                    # Agent-generated docs (created during use)
└── settings.json                            # 49 allow rules, deny list, hooks

tasks/
├── todo.md                                  # Active task plan with verifiable checklist
└── lessons.md                               # Self-improvement loop: patterns from mistakes

CLAUDE.md                                    # Project brain: conventions, principles, directives
.env.example                                 # Environment variables template
.github/workflows/ci.yml                     # PR → type-check + lint + test + build
.github/workflows/deploy.yml                 # main → Supabase migrations + Vercel deploy
```

## Quick start

```bash
# 1. Create your monorepo
npx create-turbo@latest my-project --pm pnpm
cd my-project

# 2. Copy the template into your project
cp -r /path/to/template/.claude .
cp -r /path/to/template/.github .
cp -r /path/to/template/tasks .
cp /path/to/template/CLAUDE.md .
cp /path/to/template/.env.example .

# 3. Init Supabase
npx supabase init

# 4. Customize CLAUDE.md for your project
# Edit the "DIRECTIVAS ESPECÍFICAS" section

# 5. Start Claude Code
claude
```

## Daily workflow

```bash
/status                                  # Project overview + version
/evaluate user invitation system         # Assess scope before building
/new-feature invitations                 # Full pipeline: scaffold → implement → test → review → commit
/review                                  # Quality check
/commit feat: add invitations            # Auto-bump patch version + conventional commit
/deploy-check                            # Pre-merge verification
```

## Tech stack

This template is configured for:

| Layer | Technology |
|-------|-----------|
| Monorepo | Turborepo + pnpm workspaces |
| Frontend | React + Vite + SWC |
| Styling | Tailwind CSS v4 + shadcn/ui + Framer Motion |
| Backend | Supabase (Postgres + Auth + Storage + Realtime + Edge Functions) |
| Data fetching | TanStack Query v5 |
| Forms | React Hook Form + Zod + @hookform/resolvers |
| Testing | Vitest + Testing Library + MSW |
| CI/CD | GitHub Actions → Vercel + Supabase |
| Icons | Lucide React |

## Agents

Four specialized agents, each with persistent memory across sessions:

| Agent | Role | Memory stores |
|-------|------|---------------|
| **implementer** | Builds features following all project conventions | Architecture decisions, patterns used, schemas created |
| **code-reviewer** | Reviews for quality, UI/Tailwind, forms, accessibility | Recurring issues, conventions observed, patterns found |
| **researcher** | Evaluates packages and APIs with anti-hallucination protocol | Past investigations, packages evaluated, useful sources |
| **test-engineer** | Creates tests with Vitest + Testing Library + MSW | Testing patterns, MSW handlers, reusable utils |

Every agent starts by reading `tasks/lessons.md` and ends by updating it if corrections were made.

## Skills

All 12 skills follow the [Agent Skills open standard](https://agentskills.io/specification):

| Skill | Trigger | What it does |
|-------|---------|-------------|
| `/scaffold-feature` | "nueva feature", "nuevo módulo" | Generates complete feature file structure |
| `/new-feature <name>` | "crear feature", "agregar funcionalidad" | Full pipeline: scaffold → implement → test → review → commit |
| `/commit <msg>` | "commit", "guardar cambios" | Auto-bump patch + regenerate Supabase types + quality check |
| `/evaluate <req>` | "evaluar", "cuánto cuesta" | Scope, effort (low/med/high), risks, affected workspaces |
| `/review` | "review", "code review" | Full quality review with type-check + lint + test |
| `/deploy-check` | "deploy", "listo para merge" | 11-point pre-merge checklist |
| `/status` | "estado", "cómo va" | Project overview: version, features, build, tests, TODOs |
| `/research` | "investigar", "comparar" | Technical research with official source verification |
| `supabase-patterns` | "supabase", "auth", "RLS" | Validated patterns for queries, auth, realtime, storage |
| `ui-patterns` | "layout", "dashboard", "tabla" | Responsive layouts, data tables, feedback states, page patterns |
| `forms-validation` | "formulario", "form", "validación" | Zod + React Hook Form + shadcn/ui patterns |
| `code-quality` | "eslint", "prettier", "tsconfig" | Monorepo quality configurations |

### Progressive disclosure

Skills use a 3-level loading strategy to minimize token usage:

1. **Metadata** (~100 tokens) — `name` + `description` loaded at startup for all 12 skills
2. **Instructions** (~200 tokens) — `SKILL.md` body loaded only when the skill is activated
3. **References** (on-demand) — detailed files loaded only when the specific task requires them

Five skills include `references/` directories with 10 total reference files that Claude loads selectively.

## Behavioral principles

CLAUDE.md encodes six workflow orchestration directives:

1. **Planning by default** — enter planning mode for any non-trivial task; write specs upfront
2. **Subagent strategy** — delegate research, exploration, and parallel work to subagents
3. **Self-improvement loop** — after every user correction, capture the pattern in `tasks/lessons.md`
4. **Verification before completion** — never mark done without proving it works; ask "would a Staff Engineer approve this?"
5. **Demand elegance** — pause on non-trivial changes and ask "is there a more elegant way?"; no hacky patches
6. **Autonomous error fixing** — when receiving a bug report, fix it without asking for hand-holding

And three core principles that govern all work:

- **Simplicity first** — affect the minimum code necessary
- **No laziness** — find root causes, no temporary fixes, senior developer standards
- **Minimal impact** — changes only touch what's needed, avoid introducing errors

## Open Specs compliance

Every skill meets the [agentskills.io specification](https://agentskills.io/specification):

| Requirement | Status |
|-------------|--------|
| `name` field (lowercase, hyphens, matches directory) | ✅ 12/12 |
| `description` field (1-1024 chars, includes trigger keywords) | ✅ 12/12 |
| `license` field | ✅ 12/12 (MIT) |
| `metadata` (author, version) | ✅ 12/12 |
| `compatibility` (environment requirements) | ✅ 12/12 |
| `allowed-tools` space-delimited | ✅ 4/4 that use it |
| SKILL.md under 500 lines | ✅ max 52 lines |
| Progressive disclosure with `references/` | ✅ 5 skills |

Claude Code extensions (`model`, `context: fork`, `argument-hint`) are preserved for Claude Code users and silently ignored by other compatible tools.

## Anti-hallucination

Multiple layers prevent Claude from inventing APIs, packages, or patterns:

1. **CLAUDE.md** — strict verification protocol for all external references
2. **Researcher agent** — verifies against official docs before recommending
3. **Skills with warnings** — each skill states what to verify and what NOT to assume
4. **Confidence levels** — agents report HIGH/MEDIUM/LOW on recommendations
5. **Honesty principle** — "I don't know" is a valid configured response
6. **Hooks + deny list** — `settings.json` blocks dangerous commands

## Customization

The template is designed to be forked and customized:

- **CLAUDE.md** → edit "DIRECTIVAS ESPECÍFICAS" for your project's domain rules
- **Skills** → add new skills in `.claude/skills/[name]/SKILL.md` following the Open Specs format
- **Agents** → modify agent prompts in `.claude/agents/` to match your team's conventions
- **settings.json** → adjust allow/deny rules for your toolchain
- **tasks/** → the self-improvement loop works automatically as you use the template

### Adapting the stack

While this template targets React + Supabase, the architecture (agents, skills, principles, task management) is stack-agnostic. To adapt:

1. Replace `supabase-patterns` with your backend's patterns
2. Update `scaffold-feature` file structure for your framework
3. Adjust `code-quality` configs for your toolchain
4. Keep everything else — the workflow orchestration, agents, and principles work with any stack

## Version history

| Version | Changes |
|---------|---------|
| **v3.4** | Workflow orchestration principles, `tasks/todo.md` + `tasks/lessons.md` self-improvement loop, autonomous error fixing, elegance checks, Staff Engineer verification gate |
| **v3.3** | Open Specs compliance (license, metadata, compatibility), progressive disclosure with `references/`, `ui-patterns` skill, `allowed-tools` space-delimited |
| **v3.1** | Permission fixes (49 allow rules), quoted commands eliminated, output truncation prevention |
| **v3.0** | Skills migration (`context: fork`), hardware exploitation (M-Series), model upgrade to Opus |
| **v2.1** | Turborepo monorepo, auto-versioning, Supabase types auto-regen, 4 agents with memory |
| **v1.0** | Initial single-app template |

## License

MIT

## Author

**cestay@atomix.cl** — Built with Claude Code for Claude Code.
