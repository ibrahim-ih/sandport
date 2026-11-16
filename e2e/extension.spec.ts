import { expect, test, chromium } from '@playwright/test';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

test('loads the built extension and opens its popup', async () => {
  const extensionPath = resolve('apps/extension/.output/chrome-mv3');
  const manifest = JSON.parse(await readFile(join(extensionPath, 'manifest.json'), 'utf8')) as {
    action: { default_popup: string };
  };
  const userDataDir = await mkdtemp(join(tmpdir(), 'sandport-playwright-'));
  const context = await chromium.launchPersistentContext(userDataDir, {
    args: [
      `--disable-extensions-except=${extensionPath}`,
      `--load-extension=${extensionPath}`,
      '--no-sandbox',
    ],
  });

  try {
    const serviceWorker = context.serviceWorkers()[0] ?? (await context.waitForEvent('serviceworker'));
    const extensionId = new URL(serviceWorker.url()).host;
    const popup = await context.newPage();
    await popup.goto(`chrome-extension://${extensionId}/${manifest.action.default_popup}`);
    await expect(popup.getByRole('heading', { name: 'Sandport' })).toBeVisible();
  } finally {
    await context.close();
    await rm(userDataDir, { recursive: true, force: true });
  }
});
