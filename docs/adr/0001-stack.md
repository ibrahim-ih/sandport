# ADR 0001: Project stack

- Status: Accepted
- Date: 2026-11-16

## Context

Sandport must be a cross-browser extension with a typed, testable architecture and a small shared-code surface.

## Decision

Use TypeScript 5 with strict compiler options, WXT and Manifest V3, Preact, pnpm workspaces, Zod, Vitest, and Playwright. Keep reusable modules under `packages/` and extension integration under `apps/extension`.

## Consequences

WXT handles browser-specific extension builds and provides the `browser.*` API. Preact keeps extension UI small. Unit tests can exercise pure packages without a browser; Playwright covers extension loading in Chromium.
