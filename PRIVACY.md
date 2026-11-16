# Privacy

Sandport is designed to keep extension data in the browser. The extension does not operate a server, use telemetry, or make network requests to domains other than instances configured by the user. Browser-store distribution and GitHub release infrastructure are outside the extension's runtime.

The extension may store configured instance details and preferences in browser-local extension storage. Credential handling and encryption are being implemented in a later development phase; do not enter credentials into this foundation build.

Sandport requests only the browser permissions required by enabled features. Optional host permissions are requested when a user configures an instance that needs them.

For security concerns, see [SECURITY.md](SECURITY.md).
