import { execFileSync } from 'node:child_process';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const version = process.argv[2];
if (!version || !/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$/.test(version)) {
  throw new Error('Usage: pnpm release:prepare <semver-version>');
}

const branch = execFileSync('git', ['branch', '--show-current'], { encoding: 'utf8' }).trim();
if (!/^(release|hotfix)\/.+$/.test(branch)) {
  throw new Error('Release preparation is only allowed on release/* or hotfix/* branches.');
}

async function updateVersions(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name === 'node_modules') continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      await updateVersions(path);
    } else if (entry.name === 'package.json') {
      const pkg = JSON.parse(await readFile(path, 'utf8'));
      if (typeof pkg.version === 'string') {
        pkg.version = version;
        await writeFile(path, `${JSON.stringify(pkg, null, 2)}\n`);
      }
    }
  }
}

await updateVersions('apps');
await updateVersions('packages');

const rootPackage = JSON.parse(await readFile('package.json', 'utf8'));
rootPackage.version = version;
await writeFile('package.json', `${JSON.stringify(rootPackage, null, 2)}\n`);

execFileSync(
  'pnpm',
  ['exec', 'git-cliff', '--config', 'cliff.toml', '--tag', `v${version}`, '--output', 'CHANGELOG.md'],
  { stdio: 'inherit' },
);
execFileSync('git', ['add', 'package.json', 'apps', 'packages', 'CHANGELOG.md']);
execFileSync('git', [
  'commit',
  '-m',
  `chore(release): v${version}`,
  '-m',
  'Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>',
]);
