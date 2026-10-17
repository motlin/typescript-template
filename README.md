# TypeScript Template

A template for starting TypeScript projects and for keeping many TypeScript projects configured alike over time.

## Who it is for

Use it if you maintain several TypeScript or Node projects and want them to share one set of tooling instead of drifting apart. New projects start from a copy; existing projects are brought back in line by syncing from this template, so a tooling change made here once reaches every project.

## What it covers

- The [Vite+](https://viteplus.dev/guide/) toolchain for development, building, testing, formatting, linting, and type checking
- Pinned tool and runtime versions
- Pre-commit hooks and Markdown, YAML, and justfile linting
- GitHub Actions workflows for pushes, pull requests, and merge queues
- Dependency update automation
- Storybook for UI components

## Related templates

This template extends the language-agnostic [project-template](https://github.com/motlin/project-template), which holds the configuration every project shares regardless of language. Sibling templates such as [java-template](https://github.com/motlin/java-template) and [rust-template](https://github.com/motlin/rust-template) do the same for their languages. Where this template and project-template differ, this one is authoritative for TypeScript projects.
