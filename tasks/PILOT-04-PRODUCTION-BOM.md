# Pilot Task 04 — Production & BOM
Status: READY FOR CONTRACT REVIEW; implementation blocked pending shared-contract approval.
Shared proposal: [Shared Domain Contract v0.1 (draft)](https://github.com/bhagyamehta1-lab/ply-erp-builder/blob/main/docs/contracts/PILOT-2-3-4-DOMAIN-CONTRACT.md)

## Goal
Specify a batch-based BOM validation, material allocation/issue, consumption posting and finished-goods receipt flow with hard material-availability gates.

## Non-goals
- No production posting when required materials are unavailable.
- No finished-goods receipt if consumption posting fails.
- Do not create a second stock ledger or invent shared schema/migrations.
- Do not infer private ERP API or source-code structure.
- Do not copy private source or real production data.

## Work items
1. Define versioned BOM and immutable BOM-version snapshot per production batch.
2. Specify material requirement calculation by output quantity and explicit UOM conversion.
3. Specify eligible-lot selection and reservation-aware availability checks.
4. Specify atomic material issue/consumption posting with idempotency and concurrency protection.
5. Specify production batch state machine: draft → validated → materials-issued/consumed → completed/posted; define failure transitions.
6. Specify finished-goods receipt linked to production batch and consumed input lots.
7. Draft synthetic tests: insufficient material, stale BOM version, concurrent allocation, failed consumption, duplicate issue, successful production receipt and reversal.

## Acceptance criteria
- Insufficient required material blocks production before any stock mutation.
- Failed consumption posting blocks production receipt.
- Successful consumption and production receipt are traceable to exact batch and source lots.
- Retrying the same idempotency key cannot consume twice.
- Corrections use linked reversals with complete audit trail.
- Handoff includes files, assumptions, tests/commands/results, gaps and private integration notes.

## Dependencies
Shared Domain Contract v0.1 is not approved. Wait for integration-owner approval before implementing shared tables, migrations or posting logic.

## Synthetic examples
Use BOM-DEMO-001, batch BATCH-DEMO-001, RM-PLY-01 and FG-PLY-18MM-DEMO only.

## Handoff
Submit state machine, validation matrix, payload proposal and synthetic acceptance evidence. Private integration requires review and a private feature branch.
