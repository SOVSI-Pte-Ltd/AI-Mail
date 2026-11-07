# Setup

Reviewed source: `7875c433bd53cc5f8a3c2dae5eb0c32b716e66b3` on 2026-11-07. This is a source assessment, not a fresh hosted deployment certification.

Use a fresh checkout of the reviewed commit and the committed lockfile. Runtime/package-manager constraints from package.json: `{"node": "22.x"}`; package manager `npm@10.9.2`. Where no engine is pinned, use the Node major in the checked-in CI workflow; do not infer support from a successful editor preview.

```sh
npm ci
npm run dev
```

Copy the repository .env.example to the local environment file expected by its runtime (.env.local for Next.js, .env for Vite/standalone development). Populate approved non-production values outside Git. Public VITE_/NEXT_PUBLIC_ variables enter browser bundles; never place service credentials there.

Unified Next.js is the default. `npm run gateway:dev` starts the standalone Express maintenance gateway; `npm run gateway:build` compiles it. Keep browser AUTH_SECRET/session database, MCP_API_TOKEN and OAuth issuer configuration separate. Database discovery precedence is AI_MAIL_DATABASE_URL, POSTGRES_URL, POSTGRES_URL_NON_POOLING, DATABASE_URL.

## Configuration names

Names below are discovered in .env.example and the reviewed handler/helper sources. They are not values, and not every optional integration is required for a public demo. Provision server credentials only for separately approved integration tests.

`ADMIN_INITIAL_EMAIL`, `ADMIN_INITIAL_PASSWORD`, `AI_MAIL_DATABASE_URL`, `AI_MAIL_DEMO_MODE`, `AI_MAIL_SUPABASE_PROJECT_ID`, `AI_MAIL_SUPABASE_PUBLISHABLE_KEY`, `AI_MAIL_SUPABASE_URL`, `APP_ACCESS_PASSWORD`, `ASSIST_EMAIL_GATEWAY_ENABLED`, `ASSIST_EMAIL_GATEWAY_SERVICE_TOKEN`, `ASSIST_EMAIL_GATEWAY_URL`, `AUTH_SECRET`, `DATABASE_SSL`, `DATABASE_URL`, `ENABLE_DEMO_LOGIN`, `HOST`, `IMAP_HOST`, `IMAP_PASSWORD`, `IMAP_PORT`, `IMAP_SECURE`, `IMAP_USER`, `MAIL_ARCHIVE_FOLDER`, `MAIL_PASSWORD`, `MAIL_USERNAME`, `MAX_MESSAGE_BODY_CHARS`, `MAX_RAW_MESSAGE_BYTES`, `MAX_RECIPIENTS`, `MAX_SEARCH_RESULTS`, `MCP_ALLOWED_HOSTS`, `MCP_API_TOKEN`, `NODE_ENV`, `OAUTH_ALLOWED_EMAILS`, `OAUTH_CLIENT_ID`, `OAUTH_RESOURCE`, `OAUTH_SUPABASE_PUBLISHABLE_KEY`, `OAUTH_SUPABASE_URL`, `OPENAI_API_KEY`, `OPENAI_MODEL`, `OUTBOUND_ALLOWED_DOMAINS`, `PORT`, `POSTGRES_URL`, `POSTGRES_URL_NON_POOLING`, `SMTP_FROM`, `SMTP_HOST`, `SMTP_PASSWORD`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `VERCEL`, `VERCEL_ENV`

## Available package scripts

| Script | Command from package.json |
|---|---|
| `dev` | `next dev --webpack` |
| `build` | `next build --webpack` |
| `start` | `next start` |
| `typecheck` | `tsc --noEmit` |
| `test` | `vitest run && npm run test:phase1` |
| `test:phase1` | `node --test tests/phase1-*.cjs` |
| `check` | `npm run typecheck && npm test` |
| `gateway:dev` | `tsx watch src/index.ts` |
| `gateway:build` | `tsc -p tsconfig.gateway.json` |

## Local and hosted data

Browser local-password login is retired (410 SOVSI_ID_REQUIRED); central SOVSI session exchange is distinct from the existing MCP OAuth issuer. Preserve both authentication boundaries. Demo replies are labeled and do not prove mailbox delivery. Do not send or mutate mail during documentation verification.

A docs checkout needs no hosted migration or provider call. If integration work requires a database, use an isolated disposable local/test project and follow existing repository migration/runbook review. Never treat a documentation merge as permission to reset, migrate or seed a hosted database.
