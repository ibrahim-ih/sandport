import { describe, expect, it } from 'vitest';
import { getManifestVersion } from './manifest-version';

describe('getManifestVersion', () => {
  it('keeps stable versions numeric', () => {
    expect(getManifestVersion('1.2.3')).toEqual({ version: '1.2.3' });
  });

  it('maps a prerelease to a numeric manifest version and keeps its display name', () => {
    expect(getManifestVersion('1.0.0-beta.1')).toEqual({
      version: '1.0.0.1',
      versionName: '1.0.0-beta.1',
    });
  });

  it('uses sequence one when the prerelease has no numeric suffix', () => {
    expect(getManifestVersion('1.0.0-rc')).toEqual({
      version: '1.0.0.1',
      versionName: '1.0.0-rc',
    });
  });

  it('rejects invalid versions and components unsupported by extension manifests', () => {
    expect(() => getManifestVersion('01.0.0')).toThrow('Invalid extension package version');
    expect(() => getManifestVersion('1.0.0-rc.65536')).toThrow(
      'prerelease sequence exceeds the manifest component limit',
    );
  });
});
