# Branch protection checklist

Apply these settings in the repository's branch protection rules. This document describes the required configuration; contributors do not change repository settings.

## `main`

- Require pull requests before merging; disallow direct pushes and force pushes.
- Require the CI checks to pass before merging.
- Require merge commits for `release/*` and `hotfix/*` pull requests.
- Restrict releases to reviewed changes and require the release tag to point to the merged commit.

## `develop`

- Require pull requests before merging; disallow direct pushes and force pushes.
- Require the CI checks to pass before merging.
- Use squash merge for `feature/*` pull requests.
- Require a Conventional Commit pull request title.

Revisit required check names if the CI workflow is renamed.
