# Sandport

Sandport is an open-source browser extension that streamlines everyday development work with Salesforce B2C Commerce Business Manager and WebDAV. It is designed for Chrome, Edge, and Firefox.

The project is under active development. See [Contributing](CONTRIBUTING.md) for the Gitflow process and [Privacy](PRIVACY.md) for how extension data is handled.

## Development

Requirements: Node.js 26.12.1 and pnpm 9.15.0.

```sh
pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
pnpm test
pnpm test:e2e
pnpm build
```

## License

The intended license is MIT. The license file must be added before distribution.

Sandport is an independent project, not affiliated with or endorsed by Salesforce, Inc. Salesforce is a trademark of Salesforce, Inc.
