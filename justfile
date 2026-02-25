# `just --list --unsorted`
[group('default')]
default:
    @just --list --unsorted

ci := env("CI", "")
_ci := if ci != "" { ":ci" } else { "" }

# `npm install` or `npm ci`
[group('setup')]
install:
    {{ if ci != "" { "npm ci" } else { "npm install" } }}

# Run dev server
dev *args: install
    npm run dev {{args}}

# Run ESLint
eslint: install
    npm run eslint{{_ci}}

# Run Biome formatter
biome: install
    npm run biome{{_ci}}

# Run Prettier formatter
prettier: install
    npm run prettier{{_ci}}

# Run all formatters
format: biome prettier

# Run tests
test *args: install
    {{ if ci != "" { "npx playwright install --with-deps chromium" } else { "true" } }}
    npm run test:run {{args}}

# Type-check the project
typecheck: install
    npm run typecheck

# Build the project
build: install
    npm run build

# Run Storybook
storybook *args: install
    npm run storybook {{args}}

# Run all pre-commit checks
[arg("quick", long, value="true", help="Skip tests")]
precommit quick="": eslint format typecheck build
    {{ if quick != "true" { "just test" } else { "true" } }}
    @echo "All pre-commit checks passed!"
