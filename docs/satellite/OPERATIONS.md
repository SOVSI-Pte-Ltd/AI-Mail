# Operations

Reviewed source: `7875c433bd53cc5f8a3c2dae5eb0c32b716e66b3` on 2026-11-07. This is a source assessment, not a fresh hosted deployment certification.

## Verification

Documentation changes require JSON parsing, required-page checks, local-link/source-path validation against the reviewed Git tree, and a diff limited to README.md plus docs/satellite. Runtime checks below are the repository commands for a full checkout; listing them is not a claim that this documentation change ran them.

```sh
npm run typecheck
npm test
npm run build
npm run gateway:build
```

Workflows: [.github/workflows/assist-mail-vite.yml](../../.github/workflows/assist-mail-vite.yml), [.github/workflows/ci.yml](../../.github/workflows/ci.yml), [.github/workflows/phase1-verify.yml](../../.github/workflows/phase1-verify.yml).

## Release gates

Browser local-password login is retired (410 SOVSI_ID_REQUIRED); central SOVSI session exchange is distinct from the existing MCP OAuth issuer. Preserve both authentication boundaries. Demo replies are labeled and do not prove mailbox delivery. Do not send or mutate mail during documentation verification.

Promote source only after repository checks and independent review. A docs merge makes no hosted configuration change. For a later runtime release, record the exact commit, environment, migration review, issuer/client trust, scoped test identities and acceptance receipts. Use read-only smoke checks first; sending, publishing, certificate issuance or provider tests that dispatch data need an explicitly scoped release procedure.

## Monitoring and troubleshooting

Use the [API](API.md) error/status distinctions and repository audit trail. Capture correlation IDs, operation, scoped resource, timestamp and redacted failure category; exclude tokens, passwords, message bodies, contact lists and private learner evidence. A configured environment variable or HTTP 200 diagnostic is not proof of a live provider. Check denied identity, stale session, wrong scope, disabled controls and unavailable downstream service separately. Reconcile an accepted mutation before retrying it.

## Rollback

For this documentation-only change, revert the documentation commit/PR; no data rollback is required. For a runtime rollout, restore the previously accepted application deployment and disable the newly introduced path using its reviewed controls. Preserve current MFA/authorization and audit evidence; never bypass denied access or silently fall back to a broader identity. Database rollback requires a separately reviewed backup/compatibility plan; do not execute destructive down migrations or reset hosted data from this guide. Existing accepted messages, published work, stored settings or certificates cannot be undone merely by reverting frontend code.

## Existing operational evidence

- [docs/06-operations/DEPLOYMENT.md](../../docs/06-operations/DEPLOYMENT.md)
- [docs/06-operations/ENVIRONMENTS.md](../../docs/06-operations/ENVIRONMENTS.md)
- [docs/06-operations/MONITORING.md](../../docs/06-operations/MONITORING.md)
- [docs/06-operations/RUNBOOK.md](../../docs/06-operations/RUNBOOK.md)
- [docs/ASSIST-MAIL-RELEASE-AUDIT-2026-10-23.md](../../docs/ASSIST-MAIL-RELEASE-AUDIT-2026-10-23.md)
- [docs/MAIN-MERGE-RELEASE-HOLD.md](../../docs/MAIN-MERGE-RELEASE-HOLD.md)
- [docs/PHASE1-RELEASE.md](../../docs/PHASE1-RELEASE.md)
- [docs/PR_SECURITY_RECONCILIATION_2026-11-07.md](../../docs/PR_SECURITY_RECONCILIATION_2026-11-07.md)
- [docs/sovsi-oauth-rollout.md](../../docs/sovsi-oauth-rollout.md)
- [docs/spire-capability-recovery/RELEASE_ACCEPTANCE.md](../../docs/spire-capability-recovery/RELEASE_ACCEPTANCE.md)
- [docs/spire-capability-recovery/RUNBOOK.md](../../docs/spire-capability-recovery/RUNBOOK.md)
- [docs/spire/CAPABILITY_RECOVERY_ENGINEERING_RUNBOOK.md](../../docs/spire/CAPABILITY_RECOVERY_ENGINEERING_RUNBOOK.md)

[Setup](SETUP.md) · [Architecture](ARCHITECTURE.md)
