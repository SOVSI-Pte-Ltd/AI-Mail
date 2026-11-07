# PR security reconciliation — 7 November 2026

PRs #15 and #16 proposed a temporary October 6 mailbox-ingestion verifier. Their review findings identify a public query-marker authorization bypass and a fallback that ingests an unrelated Sent message. Current main already has a later variant of that diagnostic, so merging either old implementation would regress it.

The temporary endpoint is now retired with HTTP 410 and no mail, attachment, scanner, or credential calls. Its proxy authentication exemption is removed. The regression test exercises GET and POST with obsolete markers/tokens and confirms no mailbox calls. This retirement does not change the normal attachment-ingestion service. No production mailbox or email send was exercised during the review. PRs #15 and #16 are superseded by this reconciliation.
