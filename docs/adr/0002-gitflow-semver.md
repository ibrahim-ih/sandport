# ADR 0002: Gitflow and SemVer

- Status: Accepted
- Date: 2026-11-16

## Context

Each delivery phase needs independent review, while release stabilization and urgent fixes must remain distinct from feature work.

## Decision

Use `main`, `develop`, `feature/*`, `release/*`, and `hotfix/*` branches. Feature pull requests target `develop` and use squash merges; release and hotfix pull requests target `main` and use merge commits. Use SemVer, Conventional Commits, annotated `vX.Y.Z` tags, and git-cliff-generated release notes.

## Consequences

Changes are reviewed before integration, releases can be reproduced from tags, and version changes are restricted to release or hotfix branches.
