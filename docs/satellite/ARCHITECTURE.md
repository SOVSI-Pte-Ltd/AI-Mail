# Architecture

Reviewed source: `7875c433bd53cc5f8a3c2dae5eb0c32b716e66b3` on 2026-11-07. This is a source assessment, not a fresh hosted deployment certification.

## Ownership

AI-Mail owns mailbox reading, controlled replies, sending and mail analysis. The Gateway integration remains an independently scoped boundary. COMMS must not treat mailbox access as arbitrary transactional-template authority or inherit user sessions implicitly.

## Current components and data flow

The unified Next.js application serves browser pages, REST handlers, /mcp, OAuth metadata and consent. Browser APIs use signed HTTP-only sessions plus an active server-side session lookup and role capabilities. MCP uses its own bearer/OAuth and host validation. src/gateway re-exports the shared src/mcp and src/mail implementation; the standalone Express entry is src/index.ts. IMAP/SMTP credentials and database connections stay server-side.

## Trust and release boundary

Browser local-password login is retired (410 SOVSI_ID_REQUIRED); central SOVSI session exchange is distinct from the existing MCP OAuth issuer. Preserve both authentication boundaries. Demo replies are labeled and do not prove mailbox delivery. Do not send or mutate mail during documentation verification.

Authentication establishes a principal; tenant/workspace/site and operation authorization must still be enforced by the owning service. Proposal metadata, browser state, capability declarations and imported reference code are not authorization. Upstream evidence must retain source, timestamp and correlation references.

## Source map

- [src/app/mcp/route.ts](../../src/app/mcp/route.ts)
- [src/gateway/mcp/server.ts](../../src/gateway/mcp/server.ts)
- [src/mcp/server.ts](../../src/mcp/server.ts)
- [src/lib/mcp-auth.ts](../../src/lib/mcp-auth.ts)
- [src/lib/session.ts](../../src/lib/session.ts)
- [src/app/api/mail/send/route.ts](../../src/app/api/mail/send/route.ts)

[API](API.md) · [Operations](OPERATIONS.md)

## Deployment accountability

The central allocation registry has no assigned accountable owner, API owner, data owner or independent reviewer for this component at this review. Do not interpret repository ownership or historical deployment URLs as approval. Assign those roles and record environment-specific acceptance before a future production cutover. Existing deployment behavior is preserved by this documentation-only change.
