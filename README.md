# TypeScript Template

A standardized TypeScript project template built on [Vite+](https://viteplus.dev/guide/), the unified toolchain wrapping Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task.

## Getting started

```bash
vp install
just dev
```

## Commands

`vp <name>` runs a built-in Vite+ command; `vp run <name>` runs a `package.json` script or a `vite.config.ts` task. The justfile wraps the common ones and installs dependencies first.

| Command          | Purpose                                             |
| ---------------- | --------------------------------------------------- |
| `just dev`       | Start the dev server                                |
| `just check`     | Format, lint, and type check                        |
| `just test`      | Run the Vitest suite                                |
| `just build`     | Build for production                                |
| `just storybook` | Start Storybook                                     |
| `just precommit` | Full verification: check, build, fallow, pre-commit |

## Layout

- `src/` — application source, including Storybook stories
- `tests/` — Vitest unit tests
- `.github/workflows/` — CI for pushes, pull requests, and merge queues
- `.pre-commit-config.yaml` — pre-commit framework hooks

## Troubleshooting

If setup, runtime, or package-manager behavior looks wrong, run `vp env doctor`.
