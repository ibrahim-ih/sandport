# Architecture (phase 0)

Sandport is a pnpm workspace. The browser extension lives in `apps/extension`; reusable extension-independent code will live in `packages/`. Apps may depend on packages, but packages must not depend on apps. `packages/core` will not depend on other workspace packages.

WXT builds Manifest V3 output for Chromium-based browsers and Firefox. Preact is integrated through the Vite Preact preset. The extension has a minimal popup and service worker so browser builds and extension loading can be exercised before feature work begins.

The extension uses the `browser.*` API supplied by WXT for cross-browser code. No browser permission is requested in this foundation build. Planned permissions must be added only with a feature that uses them: `storage` for local settings and vault metadata, `alarms` for keep-alive scheduling, `contextMenus` for the navigation menu, `notifications` for user-visible security events, `scripting` for service-worker-controlled form filling, and optional host permissions for user-configured non-sandbox instances. The precise permission set must be reviewed as those features are implemented.

The extension performs no telemetry or server-side processing. Runtime network activity is restricted to configured instances.
