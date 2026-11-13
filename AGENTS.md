# ASSIST canonical engineering agent instructions

For major implementations, migrations, deployments, interface/scene changes, provider integrations, security/auth changes, schema changes, or cross-satellite work, follow SOVSI-Pte-Ltd/sovsi-knowledge-fabric/docs/knowledge/ASSIST_KNOWLEDGE_SYNC_001.md (canonical policy, ASSIST-KNOWLEDGE-SYNC-001).

MANDATORY: as part of authorized implementation work, inspect and update the relevant Knowledge Fabric architecture/decision record, satellite operator runbooks, local docs and SPIRE tracking. Include actual tests/CI, deployment evidence, contract/schema versions, relevant approvals, owner, rollback, and gaps. Prefer the same pull request/implementation workflow. No documentation update or documented proof it is already current means the knowledge-sync release gate is BLOCKED, not silently passed.

For MOSAIC or ASSIST-V2 extraction work consult Knowledge Fabric docs/audits/2026-11-13-mosaic-satellite-extraction-audit.md and assist-spire/docs/runbooks/ASSIST_MOSAIC_SATELLITE_MIGRATION_001.md. MOSAIC is the canonical visualization library and scene contract; SOVSI ID and MANDATE remain identity and policy authorities. Do not infer runtime status from filenames or commit code deletions without parity, authorization and rollback evidence.

Agents should perform synchronization proactively when repository write access and user authorization permit. If blocked, explicitly report NOT SYNCED and provide the required changes. Never imply ChatGPT globally loads these instructions, or claim unrun checks / unverified deploys succeeded.
