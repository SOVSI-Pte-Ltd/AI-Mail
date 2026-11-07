# Dependency review — 7 November 2026

Fresh CI on the reconciled main branch exposed vulnerable MCP Node and Hono Node Server dependencies. Updated MCP Node to 2.1.2 with its required Server peer 2.4.0, refreshed compatible locked transitives, and applied the Vitest 4.1.12 security patch. `npm audit` reports zero vulnerabilities across the full graph after the updates. The existing test, typecheck, build and production-audit gates remain required; no audit threshold was weakened. No email send or production mailbox ingestion was performed by this review.
