# A2A task contract

**Status: proposed; no native A2A handler, task store, streaming transport or served Agent Card is implemented.** Do not advertise a discovery URL or treat a REST capability manifest as a live Agent Card.

Reviewed source: `7875c433bd53cc5f8a3c2dae5eb0c32b716e66b3` on 2026-11-07. This is a source assessment, not a fresh hosted deployment certification.

Design reference: [A2A specification v1.0.0](https://a2a-protocol.org/v1.0.0/specification/) (release 1.0.0 / wire version 1.0, checked 2026-11-07). Existing older integration notes remain historical design evidence, not deployed interoperability claims.

## Proposed task

**Prepare a mailbox research result**

| Contract field | Proposed meaning |
|---|---|
| Input | delegated mailbox/account scope, bounded query, authorized message identifiers, purpose and correlation_id |
| Artifact | bounded research artifact with message references; external send/reply requires a separate authorized action |
| Authority | Verified delegated principal and explicit tenant/workspace/site scope; payload identifiers are not grants |
| Correlation | Stable request/correlation/idempotency references, with downstream receipts retained |
| Completion | Task artifact prepared and authorized owner receipt captured; never equate it with external delivery |
| Cancellation | Stop unstarted work; report already accepted downstream actions accurately |

Proposed lifecycle: submitted → working → completed, with input-required/auth-required when evidence or authorization is missing, and failed/rejected/canceled terminal outcomes as appropriate. These are design mappings, not persistent states currently served by this repository. External operations require the owning service's distinct approval/consent and idempotency controls.

## Work required before interoperability

Implement an authenticated Agent Card endpoint with real supported interfaces, version and security declarations; select and implement A2A bindings; validate messages/parts and task identifiers; add tenant-scoped durable task/artifact storage, polling/cancellation and any advertised streaming/push support. Add replay protection, token expiry/revocation checks, bounded payloads, audit and error mapping. Do not advertise push/streaming before implementing and testing it. Preserve denial details without exposing secrets or private records across tenants.

Acceptance must cover cross-tenant denial, missing/expired authority, malformed messages, duplicate submission, interrupted polling, cancellation races and downstream accepted-but-not-completed receipts. Record the exact negotiated version and interoperability evidence before declaring implemented status.

Browser local-password login is retired (410 SOVSI_ID_REQUIRED); central SOVSI session exchange is distinct from the existing MCP OAuth issuer. Preserve both authentication boundaries. Demo replies are labeled and do not prove mailbox delivery. Do not send or mutate mail during documentation verification.

[API](API.md) · [MCP](MCP.md) · [Operations](OPERATIONS.md)
