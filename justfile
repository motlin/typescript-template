# `just --list --unsorted`
[group('default')]
default:
    @just --list --unsorted

ci := env("CI", "")
ci_prefix := if ci != "" { "ci:" } else { "" }

# `npm install` or `npm ci`
[group('setup')]
install:
    {{ if ci != "" { "npm ci" } else { "npm install" } }}

# `npm run dev`
dev *args: install
    npm run dev {{args}}

# `npm run lint`
eslint: install
    npm run {{ci_prefix}}lint

# `npm run biome`
biome: install
    npm run {{ci_prefix}}biome

# `npm run prettier`
prettier: install
    npm run {{ci_prefix}}prettier

# Run all formatters
format: biome prettier

# `npm run test:run`
test *args: install
    {{ if ci != "" { "npx playwright install --with-deps chromium" } else { "true" } }}
    npm run test:run {{args}}

# `npm run typecheck`
typecheck: install
    npm run {{ci_prefix}}typecheck

# `npm run build`
build: install
    npm run build

# `npm run storybook`
storybook *args: install
    npm run storybook {{args}}

# Run all pre-commit checks
precommit: eslint format typecheck build test
    @echo "All pre-commit checks passed!"
