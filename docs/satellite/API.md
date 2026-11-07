# API reference

Reviewed source: `7875c433bd53cc5f8a3c2dae5eb0c32b716e66b3` on 2026-11-07. This is a source assessment, not a fresh hosted deployment certification.

Browser REST uses the signed HTTP-only cookie plus active server session and role capabilities in `src/lib/session.ts`. Mutating calls checked through requireCapability also enforce same origin. A MCP bearer is not a browser session. `/api/auth/login` returns 410 with code SOVSI_ID_REQUIRED; use the implemented central SOVSI exchange flow. `/api/auth/demo` is gated and returns explicit demo behavior.

| Endpoint | Input / authorization | Output / failure behavior |
|---|---|---|
| GET /api/mail | mail:read; folder INBOX or INBOX.Sent; accountId all/primary/UUID; limit 1..50; beforeUid or cursor | messages, paging/account metadata; 400 invalid filters, 503 unconfigured IMAP |
| GET /api/mail/{uid} | mail:read; positive uint32 UID; folder/accountId | message and demo flag; 400 invalid ID, 404 demo message absent |
| PATCH /api/mail/{uid} | mail:write; action read/unread/flag/unflag/archive/tag/untag; optional folder, accountId, tag | Result or explicitly simulated demo action; tag required for tag/untag |
| POST /api/mail/send | mail:write; to email string, optional cc email, subject 1..250, text 1..50000, optional accountId | ok, demo and mail transport result; 400 invalid body, 503 SMTP absent |
| GET /api/status | mail:read | Mail/AI/database/attachment configuration indicators; not an external-delivery receipt |
| /api/mail-accounts and /api/admin/* | Handler-specific session capabilities and server validation | Account/configuration/admin results; secrets stay server-side |
| /api/attachments/*, /api/ai/*, /api/ai-rules, /api/alerts, /api/alert-groups | Handler-specific capability checks | Bounded mail/analysis/alert results; input and error branches are in linked handlers below |
| /mcp | Separate host and bearer/OAuth validation | Native MCP; see MCP.md |
| /.well-known/oauth-protected-resource and /mcp suffix | OAuth discovery | Protected-resource metadata, not a user session |
| GET /healthz | Health route | Application readiness; not a mailbox send test |

Authorized browser read example:

```js
const response = await fetch('/api/mail?folder=INBOX&limit=10', {credentials: 'same-origin'});
const result = await response.json();
```

Do not copy a production session into curl examples. Browser error mapping is centralized in `src/lib/api-error.ts`; common failure classes are 401 unauthenticated, 403 capability/origin denial, 400 validation and service-unavailable errors. SMTP acceptance and Sent-folder archiving are distinct; a partial failure must be reconciled before retry because sends/replies are not idempotent. MCP attachment limits differ from browser attachment APIs: the ten MCP tools do not expose arbitrary attachment-byte download or attachment send.

## Source route inventory

The linked handler is authoritative for full request validation and per-operation permissions. This inventory records source routes, not verified production deployments.

| Method | Route | Source |
|---|---|---|
| GET | `/.well-known/oauth-protected-resource/mcp` | [src/app/.well-known/oauth-protected-resource/mcp/route.ts](../../src/app/.well-known/oauth-protected-resource/mcp/route.ts) |
| GET | `/.well-known/oauth-protected-resource` | [src/app/.well-known/oauth-protected-resource/route.ts](../../src/app/.well-known/oauth-protected-resource/route.ts) |
| GET | `/api/admin/audit/ai-calls` | [src/app/api/admin/audit/ai-calls/route.ts](../../src/app/api/admin/audit/ai-calls/route.ts) |
| GET | `/api/admin/audit` | [src/app/api/admin/audit/route.ts](../../src/app/api/admin/audit/route.ts) |
| PATCH, DELETE | `/api/admin/groups/[id]` | [src/app/api/admin/groups/[id]/route.ts](../../src/app/api/admin/groups/[id]/route.ts) |
| GET, POST | `/api/admin/groups` | [src/app/api/admin/groups/route.ts](../../src/app/api/admin/groups/route.ts) |
| GET | `/api/admin/services/models` | [src/app/api/admin/services/models/route.ts](../../src/app/api/admin/services/models/route.ts) |
| POST | `/api/admin/services/test` | [src/app/api/admin/services/test/route.ts](../../src/app/api/admin/services/test/route.ts) |
| GET, PATCH | `/api/admin/settings` | [src/app/api/admin/settings/route.ts](../../src/app/api/admin/settings/route.ts) |
| PATCH, DELETE | `/api/admin/users/[id]` | [src/app/api/admin/users/[id]/route.ts](../../src/app/api/admin/users/[id]/route.ts) |
| GET, POST | `/api/admin/users` | [src/app/api/admin/users/route.ts](../../src/app/api/admin/users/route.ts) |
| GET | `/api/ai/research/history/[id]` | [src/app/api/ai/research/history/[id]/route.ts](../../src/app/api/ai/research/history/[id]/route.ts) |
| GET | `/api/ai/research/history` | [src/app/api/ai/research/history/route.ts](../../src/app/api/ai/research/history/route.ts) |
| POST | `/api/ai/research` | [src/app/api/ai/research/route.ts](../../src/app/api/ai/research/route.ts) |
| POST | `/api/ai` | [src/app/api/ai/route.ts](../../src/app/api/ai/route.ts) |
| GET, PATCH | `/api/ai-rules` | [src/app/api/ai-rules/route.ts](../../src/app/api/ai-rules/route.ts) |
| GET | `/api/alert-groups` | [src/app/api/alert-groups/route.ts](../../src/app/api/alert-groups/route.ts) |
| GET | `/api/alerts` | [src/app/api/alerts/route.ts](../../src/app/api/alerts/route.ts) |
| POST | `/api/attachments/[id]/analyze` | [src/app/api/attachments/[id]/analyze/route.ts](../../src/app/api/attachments/[id]/analyze/route.ts) |
| GET | `/api/attachments/[id]` | [src/app/api/attachments/[id]/route.ts](../../src/app/api/attachments/[id]/route.ts) |
| GET, POST | `/api/auth/demo` | [src/app/api/auth/demo/route.ts](../../src/app/api/auth/demo/route.ts) |
| POST | `/api/auth/login` | [src/app/api/auth/login/route.ts](../../src/app/api/auth/login/route.ts) |
| POST | `/api/auth/logout` | [src/app/api/auth/logout/route.ts](../../src/app/api/auth/logout/route.ts) |
| GET | `/api/auth/session` | [src/app/api/auth/session/route.ts](../../src/app/api/auth/session/route.ts) |
| POST | `/api/auth/sovsi-session` | [src/app/api/auth/sovsi-session/route.ts](../../src/app/api/auth/sovsi-session/route.ts) |
| GET, POST | `/api/internal/attachment-ingest-verify` | [src/app/api/internal/attachment-ingest-verify/route.ts](../../src/app/api/internal/attachment-ingest-verify/route.ts) |
| POST | `/api/mail/[uid]/remote-images` | [src/app/api/mail/[uid]/remote-images/route.ts](../../src/app/api/mail/[uid]/remote-images/route.ts) |
| GET, PATCH | `/api/mail/[uid]` | [src/app/api/mail/[uid]/route.ts](../../src/app/api/mail/[uid]/route.ts) |
| GET | `/api/mail` | [src/app/api/mail/route.ts](../../src/app/api/mail/route.ts) |
| POST | `/api/mail/send` | [src/app/api/mail/send/route.ts](../../src/app/api/mail/send/route.ts) |
| GET, PATCH, DELETE | `/api/mail-accounts/[id]` | [src/app/api/mail-accounts/[id]/route.ts](../../src/app/api/mail-accounts/[id]/route.ts) |
| POST | `/api/mail-accounts/[id]/test` | [src/app/api/mail-accounts/[id]/test/route.ts](../../src/app/api/mail-accounts/[id]/test/route.ts) |
| GET, POST | `/api/mail-accounts` | [src/app/api/mail-accounts/route.ts](../../src/app/api/mail-accounts/route.ts) |
| GET | `/api/status` | [src/app/api/status/route.ts](../../src/app/api/status/route.ts) |
| GET | `/healthz` | [src/app/healthz/route.ts](../../src/app/healthz/route.ts) |
| GET, POST, DELETE | `/mcp` | [src/app/mcp/route.ts](../../src/app/mcp/route.ts) |
| GET | `/oauth/consent` | [src/app/oauth/consent/route.ts](../../src/app/oauth/consent/route.ts) |

## Implementation evidence

- [src/app/mcp/route.ts](../../src/app/mcp/route.ts)
- [src/gateway/mcp/server.ts](../../src/gateway/mcp/server.ts)
- [src/mcp/server.ts](../../src/mcp/server.ts)
- [src/lib/mcp-auth.ts](../../src/lib/mcp-auth.ts)
- [src/lib/session.ts](../../src/lib/session.ts)
- [src/app/api/mail/send/route.ts](../../src/app/api/mail/send/route.ts)

[Setup](SETUP.md) · [MCP](MCP.md) · [A2A](A2A.md)

## Version and change policy

The reviewed commit pins this contract. Existing paths, fields, authorization behavior and error semantics remain unchanged by these docs. Any interface change must update this reference and the manifest, add meaningful handler/authorization compatibility tests, and define a migration/rollback path for incompatible clients. Package/product version numbers and capability-document versions do not independently establish a protocol wire version.
