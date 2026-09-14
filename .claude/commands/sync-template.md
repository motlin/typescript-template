---
description: Sync tooling and Node process names from this template to sibling TypeScript projects
argument-hint: [project-name|all]
---

# TypeScript Template Sync

This project is the source of truth — a working exemplar — for TypeScript/Node
project configuration. Syncing a sibling means making its config files match this
template's and carrying over its Node process-naming convention.

Template path: !`pwd`

## Managed files

`.mise/config.toml`, `package.json`, `pnpm-workspace.yaml`, `.pre-commit-config.yaml`,
`.github/workflows/*.yml`, `justfile`, `.fallowrc.json`, `.markdownlint.jsonc`,
`.markdownlint-cli2.jsonc`, `.yamllint.yaml`, `scripts/configure-github.sh`.

- `scripts/audit-just-options.py` — repository-wide `just` option policy audit

### Ownership

For projects listed by this template, this command owns every managed path above.
`project-template` may update the baseline in this template, but it must delegate
overlapping paths in TypeScript projects to this command. When the templates
intentionally differ, the TypeScript version is authoritative for those projects.

### The rule

Copy the template's config files into the sibling **nearly verbatim**. Only two
things are allowed to differ:

1. **Placeholders** — project `name`, `version`, `description`, the application's
   own dependencies and `justfile` recipes, per-project ignore lists, and
   `pnpm-workspace.yaml` `allowBuilds` entries (each is a per-project security
   decision — never copy one in without checking the sibling's dependency tree).
2. **Blocks labelled `TEMPLATE-SPECIFIC`** — these exist only because the template
   has no application source (e.g. the `ignoreDependencies` block in
   `.fallowrc.json`). Drop them from siblings.

Everything else — tool versions, hooks, workflows, lint and tool config — is meant
to be identical. When in doubt, copy it.

A sibling not yet on Vite+ needs two prerequisite tasks before any others: add
`"npm:vite-plus"` to `.mise/config.toml`, then run `vp migrate`.

## Runtime process naming

In addition to the managed config files, sync recognizable names for each project's
long-running Node processes. The template sets this in `vite.config.ts`:

```ts
process.title = "typescript-template";
```

For each sibling, inventory its Node startup entrypoints: Vite dev/preview config,
servers, bots, and workers. Set `process.title` early in the process that does the
work, before starting its main loop. Use the unscoped `package.json` project name
instead of `typescript-template`; add a role suffix when a project has multiple
long-running processes, such as `example-app-worker`. Preserve an existing
recognizable project-specific title, such as `example-app-bot`.

This sync owns only the process-title assignment in those entrypoints, not the
surrounding application code or the rest of `vite.config.ts`. Do not add it to
browser entrypoints or shared library modules. Projects without a Node runtime
entrypoint are not applicable; do not invent an application entrypoint for them.

Include these entrypoints in the sync inventory and coverage check. For each missing,
generic, or leftover template title, create a task naming the exact file and intended title,
using the same Source marker and deduplication rules as managed-file tasks. Verify
the name on a safe dev or diagnostic launch with `ps` or Activity Monitor; note that
an already-running process needs a restart to load the change. Do not start or
restart production services just to verify a title.

## Version policy

@.claude/includes/sync-version-policy.md

Also check npm-managed tooling with `npm outdated` (and `vp` where applicable).

## Projects

`$ARGUMENTS` is a project name, `all`, or empty (treated as `all`).

@.claude/includes/sync-project-list.md

## Stale and conflicting tool configs

@.claude/includes/sync-stale-configs.md

Suspect configs for this template's toolchain:

- **Formatting (template uses oxfmt):** `.prettierrc*` (`.prettierrc`,
  `.prettierrc.json`, `.prettierrc.json5`, `.prettierrc.yaml`, `.prettierrc.js`, …),
  `.prettierignore`, `prettier.config.*`, a `prettier` key in `package.json`,
  `.editorconfig` rules that contradict oxfmt.
- **Linting (template uses oxlint):** `biome.json`, `biome.jsonc`, `.eslintrc*`,
  `eslint.config.*`, `.eslintignore`, `tslint.json`.
- **General:** any other dot-config, `package.json` script, devDependency, or
  pre-commit hook referencing a tool the template has dropped.

## Default git test

@.claude/includes/sync-git-test.md

## Just recipe options

@.claude/includes/sync-just-options.md

## Workflow

1. **Refresh the template.** Check for newer tool versions (`mise ls-remote`,
   `npm outdated`) and update the template first if it is behind.
2. **Pull from siblings.** If a sibling has something newer or better than the
   template, ask the user, update the template, then propagate.
3. **Scan for stale configs.** For each sibling, run the stale-config scan above
   before generating tooling tasks. Alert on findings; do not delete.
4. **Audit recipe options.** Run the shared `just` option audit against each project
   and create one project-scoped task for every failure.
5. **Generate tasks.** For each sibling, compare against the template and audit
   runtime process naming. Write tasks into its `.llm/todo.md` for each out-of-sync
   managed file and Node entrypoint that needs a recognizable process title.

## Creating tasks

@.claude/includes/sync-task-dedup.md

Marker for this template: `Source: ~/projects/typescript-template`

### Task templates

**Sync a managed file:**

```
Sync .pre-commit-config.yaml with the template
  Match ~/projects/typescript-template/.pre-commit-config.yaml.
  Keep project-specific excludes.
  Source: ~/projects/typescript-template
```

Tasks with prerequisites (anything depending on `vp migrate`) must say so.

## Report

@.claude/includes/sync-report.md
