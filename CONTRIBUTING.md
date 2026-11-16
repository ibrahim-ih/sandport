# Contributing

## Development setup

Use Node.js 26.12.1 and pnpm 9.15.0. Install dependencies with `pnpm install --frozen-lockfile`, then run `pnpm lint`, `pnpm format:check`, `pnpm typecheck`, `pnpm test`, `pnpm test:e2e`, and `pnpm build`.

Commits and pull request titles follow Conventional Commits. Do not include credentials, customer data, or confidential instance details in commits or test fixtures.

## Gitflow

- `main` contains published code; each release commit is tagged.
- `develop` is the integration branch for the next version.
- Create `feature/<phase>-<topic>` from `develop`; submit a pull request back to `develop` and use squash merge.
- Create `release/X.Y.Z` from `develop` for stabilization only. Submit it to `main` and use a merge commit, tag the merged commit, then merge `main` back into `develop`.
- Create `hotfix/X.Y.Z` from `main`. Submit it to `main` and use a merge commit, tag the merged commit, then merge `main` back into `develop`.
- Never push directly to `main` or `develop`. Branch protection requirements are documented in [docs/branch-protection.md](docs/branch-protection.md).

## Versioning and releases

Sandport uses SemVer and Conventional Commits. The extension package version in `apps/extension/package.json` is the source of truth; WXT derives the manifest version from it. On a `release/*` or `hotfix/*` branch, run `pnpm release:prepare <version>` to update workspace package versions, generate `CHANGELOG.md` with git-cliff, and create a release commit.

The manifest accepts numeric versions only. Prerelease package versions such as `1.0.0-beta.1` are represented by a numeric manifest version (`1.0.0.1`) and a readable `version_name`.

Schema changes require a storage migration. Non-backward-compatible changes must include a `BREAKING CHANGE:` footer.

## Clean-room and instance-dependent behavior

Do not search for, download, or use materials from other extensions as a basis for implementation. Write implementations from this repository's specification.

All assumptions about real Business Manager or WebDAV DOM and URL behavior must be centralized in `packages/sfcc-dom`, marked `TODO(verify-on-sandbox)`, and tested against clearly named synthetic fixtures. Do not claim unverified platform behavior as fact.
