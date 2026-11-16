import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import preact from '@preact/preset-vite';
import { defineConfig } from 'wxt';
import { getManifestVersion } from './src/manifest-version';

const extensionPackage = JSON.parse(
  readFileSync(resolve(import.meta.dirname, 'package.json'), 'utf8'),
) as { version: string };
const manifestVersion = getManifestVersion(extensionPackage.version);

export default defineConfig({
  srcDir: '.',
  entrypointsDir: 'entrypoints',
  outDir: '.output',
  vite: () => ({
    plugins: [preact()],
  }),
  manifest: {
    name: 'Sandport',
    description: 'A focused toolkit for commerce development workflows.',
    version: manifestVersion.version,
    ...(manifestVersion.versionName ? { version_name: manifestVersion.versionName } : {}),
    action: {
      default_title: 'Sandport',
    },
    permissions: [],
    host_permissions: [],
    optional_host_permissions: [],
    browser_specific_settings: {
      gecko: {
        id: 'sandport@ibrahim-ih',
        strict_min_version: '128.0',
      },
    },
  },
});
