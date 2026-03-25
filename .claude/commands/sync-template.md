---
description: Sync tool versions from this template to sibling TypeScript projects
argument-hint: [project-name|all]
---

# TypeScript Template Sync

This project (the current working directory) is the source of truth for TypeScript/Node project configurations. When creating tasks in sibling projects, always reference this template so the task has context about where the target version comes from.

Template path: !`pwd`

## Managed Tools

### Mise Tools (.mise/config.toml)

- just
- node

### Package.json devDependencies

- typescript
- @biomejs/biome
- eslint
- prettier
- vitest

## Sibling Projects

If $ARGUMENTS is a specific project name, only sync that project. If $ARGUMENTS is "all" or empty, sync all projects.

Read the project list from `.llm/sync-projects.md` (gitignored, machine-specific).

## Workflow

### Step 1: Update This Template

Check if this template's versions are the latest:

```bash
mise ls-remote just | tail -1
mise ls-remote node | grep "^24" | tail -1
npm outdated
```

Compare with `.mise/config.toml` and `package.json` in this project. If outdated, update them first.

### Step 2: Pull Improvements from Siblings

Scan sibling projects for any versions NEWER than this template.

If a sibling has a newer version:

1. Ask the user whether to pull it in
2. Update this template to match
3. Then push to all other siblings

### Step 3: Push Template Versions to Siblings

For each sibling project, compare versions and create tasks for any mismatches.

Replace each sibling's `.llm/todo.md` with fresh tasks (do not append to stale lists).

### Task Templates

Every task MUST include a `Source:` line referencing this template project so the task executor knows where the target version comes from.

**Mise tool update:**

```
Update <tool> <current> → <target>
  Edit .mise/config.toml
  Change: <tool> = "<current>"
  To: <tool> = "<target>"
  Source: ~/projects/typescript-template
```

**Package.json dependency update:**

```
Update <dep> <current> → <target>
  Edit package.json devDependencies
  Change: "<dep>": "<current>"
  To: "<dep>": "<target>"
  Run: npm install
  Source: ~/projects/typescript-template
```

## Report Format

After syncing, report:

### This Template Status

- Current versions in this template
- Any updates made

### Improvements Pulled In

- List any newer versions found in siblings

### Tasks Distributed

- Number of siblings that received tasks
- Total tasks created
