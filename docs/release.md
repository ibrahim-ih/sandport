# Release automation

The release workflow still needs to be added. It is intended to build Chrome and Firefox archives and attach release notes to a GitHub release when a `vX.Y.Z` tag on `main` is pushed.

Store submission is intentionally disabled. When maintainers enable it, credentials are expected in repository secrets named with the `CHROME_*`, `FIREFOX_*`, and `EDGE_*` prefixes. Do not add or populate those secrets as part of phase 0.
