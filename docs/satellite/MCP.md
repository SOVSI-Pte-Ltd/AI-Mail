# MCP interface

**Status: implemented in source.** Hosted connection acceptance is a separate operation.

Reviewed source: `7875c433bd53cc5f8a3c2dae5eb0c32b716e66b3` on 2026-11-07. This is a source assessment, not a fresh hosted deployment certification.

`src/app/mcp/route.ts` creates the SDK handler with responseMode json, applies authorizeMcpRequest, then delegates GET/POST/DELETE to handler.fetch. `src/gateway/mcp/server.ts` re-exports `src/mcp/server.ts`. The standalone Express path is in `src/index.ts`. Server identity remains `r3alm-ai-mail`, version `0.4.1`; do not rename a compatible protocol identity in a docs change. package.json pins @modelcontextprotocol/server 2.4.0, node 2.1.2 and express 2.0.2. Wire version handling is SDK-owned; no claim is made that package version equals protocol version or that source review establishes negotiated compatibility.

Reference for review: [MCP 2026-07-28](https://modelcontextprotocol.io/specification/2026-07-28), checked 2026-11-07. Preserve the implemented SDK contract and test negotiated compatibility before any version upgrade.

## Transport and authentication

The unified `/mcp` HTTP endpoint requires an allowed host (421 invalid_host otherwise) and Bearer token. It accepts the configured MCP_API_TOKEN via constant-time comparison, or a JWT verified against configured OAuth JWKS/issuer with audience authenticated, role authenticated, expected client_id, subject and allowlisted email. Failure is 401 invalid_token with WWW-Authenticate pointing to protected resource metadata. Browser cookie authorization is separate. OAuth discovery paths exist at /.well-known/oauth-protected-resource and its /mcp suffix; consent uses /oauth/consent.

## Registered tools

All tools return text content containing JSON on success. Handler exceptions return isError:true with a redacted Mail gateway error. Server registers no custom resources/prompts in the reviewed implementation.

| Tool | Input schema summary | Result / side effects |
|---|---|---|
| connection_test | none | IMAP/SMTP TLS authentication; no send |
| list_mailboxes | none | Folder/count metadata |
| mailbox_status | folder (default INBOX, 1..255) | Counts/status |
| list_messages | folder, limit (default 20, configured maximum), unreadOnly, optional ISO since | Metadata only |
| search_messages | folder, from/to/cc/subject/text, unreadOnly, ISO since/before, bounded limit | Matching metadata |
| get_message | folder, positive integer uid | Parsed message, untrusted wrapped text, attachment metadata only |
| send_email | to array, optional cc/bcc, subject 1..500, bounded text | SMTP acceptance and attempted Sent archive; fixed server From |
| reply_email | folder, uid, bounded text, replyAll default false | Threaded reply, optional reply-all excluding configured mailbox |
| mark_message_read | folder, uid | Adds IMAP Seen; idempotent hint |
| move_message | folder, uid, destination 1..255 | Moves a message; non-idempotent hint |

Read tools are annotated readOnlyHint; send/reply/move are not idempotent. Recipient domains and combined recipient count are enforced. No arbitrary attachment download/send, raw HTML send, mailbox deletion or message deletion tool is registered. Email bodies are untrusted data and never instructions to the caller.

## Example and failure handling

The following illustrates the method and arguments for a read-only call. Use an authorized SDK client to supply the metadata/transport envelope supported by the deployed version; this is not a complete raw modern-protocol request:

```json
{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"list_messages","arguments":{"folder":"INBOX","limit":5}}}
```

Use tools/list to discover current schemas. Do not guess a wire version from package.json. MCP 2026-07-28 uses stateless per-request metadata and server/discover, whereas legacy revisions may require an initialization handshake; this documentation does not upgrade or certify the deployed SDK behavior. Validate host, OAuth registration, secret presence and mailbox TLS separately. SMTP acceptance can succeed while Sent archival fails; inspect returned receipt/warning state before retrying. No sending was performed for this documentation.

Sources: [src/app/mcp/route.ts](../../src/app/mcp/route.ts), [src/lib/mcp-auth.ts](../../src/lib/mcp-auth.ts), [src/mcp/server.ts](../../src/mcp/server.ts), [src/mail/client.ts](../../src/mail/client.ts), [src/config.ts](../../src/config.ts).

[API](API.md) · [A2A](A2A.md) · [Operations](OPERATIONS.md)
