# TypeScript Template Sync

This template is the source of truth for TypeScript/Node project configurations.

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

Read the project list from `.llm/sync-projects.md` (gitignored, machine-specific).

## Workflow

### Step 1: Update This Template

Check if this template's versions are the latest:

```bash
# Check latest mise tool versions
mise ls-remote just | tail -1
mise ls-remote node | grep "^24" | tail -1
```

Compare with `.mise/config.toml` in this project. If outdated, update them first.

For package.json dependencies, check npm:
```bash
npm outdated
```

### Step 2: Pull Improvements from Siblings

Scan sibling projects for any versions NEWER than this template:

```bash
# Read each sibling's .mise/config.toml and package.json
# Compare versions - if sibling has newer, consider pulling it in
```

If a sibling has a newer version:
1. Verify it's intentional (not a mistake)
2. Update this template to match
3. Then push to all other siblings

### Step 3: Push Template Versions to Siblings

For each sibling project, compare versions and create tasks for any mismatches.

Use task_add.py to add tasks to each sibling's `.llm/todo.md`:

```bash
/Users/craig/.claude/plugins/cache/motlin-claude-code-plugins/markdown-tasks/1.4.1/scripts/task_add.py ~/projects/<sibling>/.llm/todo.md "Update <tool> <current> → <target>
  Edit <file>
  Change: <old value>
  To: <new value>"
```

### Task Templates

**Mise tool update:**
```
Update just <current> → <target>
  Edit .mise/config.toml
  Change: just = "<current>"
  To: just = "<target>"
```

**Package.json dependency update:**
```
Update TypeScript dependencies
  Edit package.json devDependencies
  <dep>: <current> → <target>
  Run: npm install
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
