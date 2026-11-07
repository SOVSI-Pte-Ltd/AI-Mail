# AI-Mail: satellite documentation

Direct-user mail workspace and authenticated MCP access to configured IMAP/SMTP mailboxes.

Reviewed source: `7875c433bd53cc5f8a3c2dae5eb0c32b716e66b3` on 2026-11-07. This is a source assessment, not a fresh hosted deployment certification.

| Interface | Source status |
|---|---|
| API | implemented |
| MCP | implemented |
| A2A | planned; no native handler/transport found |

Browser local-password login is retired (410 SOVSI_ID_REQUIRED); central SOVSI session exchange is distinct from the existing MCP OAuth issuer. Preserve both authentication boundaries. Demo replies are labeled and do not prove mailbox delivery. Do not send or mutate mail during documentation verification.

## Engineering guide

- [Architecture and ownership](ARCHITECTURE.md)
- [Local setup and configuration](SETUP.md)
- [API reference](API.md)
- [MCP interface and gaps](MCP.md)
- [A2A task design and gaps](A2A.md)
- [Operations, release and rollback](OPERATIONS.md)
- [Machine-readable interface manifest](interface-manifest.json)

Follow the [ASSIST satellite documentation standard](https://github.com/SOVSI-Pte-Ltd/ASSIST-V2/blob/main/migration-control/SATELLITE_DOCUMENTATION_STANDARD.md). Older product/readiness documents remain historical evidence; resolve conflicts against the reviewed handlers and release gates recorded here.
