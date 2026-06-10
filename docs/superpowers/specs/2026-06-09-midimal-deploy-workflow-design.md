# Midimal — GitHub Actions Deploy Workflow

## Goal
Deploy Midimal (static Vite+React app) to Arch server at `midimal.arateki.com` on every push to `main`.

## Infrastructure
- **Runner:** Existing self-hosted runner on the Arch server (same as Raiznet)
- **Deploy path:** `/opt/home-server/websites/midimal/`
- **Subdomain:** `midimal.arateki.com` (web server config assumed already in place)

## Approach
Direct rsync from self-hosted runner — checkout, build, sync.

## Workflow

```yaml
name: Deploy Midimal

on:
  push:
    branches: ["main"]
  workflow_dispatch:

env:
  DEPLOY_DIR: /opt/home-server/websites/midimal

jobs:
  deploy:
    runs-on: self-hosted
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22.x
          cache: npm
      - run: npm ci
      - run: npm run build
      - name: Deploy
        run: rsync -a --delete dist/ "$DEPLOY_DIR/"
```

## Rationale
- **Self-hosted runner** → build and sync run on the target machine; no SSH keys or secrets needed
- **Node 22.x** → current LTS, compatible with Vite 6
- **`dist/`** → multi-file output with code splitting for browser caching
- **`rsync -a --delete`** → atomic sync, removes stale files from previous builds
- **`push: main` + `workflow_dispatch`** → auto-deploy on push, manual trigger for testing

## Key decisions
| Decision | Choice | Why |
|---|---|---|
| Runner | Self-hosted (existing) | Zero config, same machine as deploy target |
| Build output | `dist/` | Better caching, faster loads than single-file |
| Installation | `npm ci` | Deterministic, respects lockfile |
| Deploy method | `rsync` | Efficient, `--delete` keeps directory clean |
