const MAX_MANIFEST_COMPONENT = 65_535;
const VERSION_PATTERN =
  /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z.-]+)?$/;

export interface ManifestVersion {
  version: string;
  versionName?: string;
}

export function getManifestVersion(packageVersion: string): ManifestVersion {
  const match = VERSION_PATTERN.exec(packageVersion);
  if (!match) {
    throw new Error(`Invalid extension package version: ${packageVersion}`);
  }

  const [, major, minor, patch, prerelease] = match;
  const stableVersion = `${major}.${minor}.${patch}`;
  const components = [major, minor, patch].map(Number);

  if (components.some((component) => component > MAX_MANIFEST_COMPONENT)) {
    throw new Error(`Extension version exceeds the manifest component limit: ${packageVersion}`);
  }

  if (!prerelease) {
    return { version: stableVersion };
  }

  const prereleaseParts = prerelease.split('.');
  const finalPart = prereleaseParts.at(-1);
  const sequence = finalPart && /^\d+$/.test(finalPart) ? Number(finalPart) : 1;
  if (sequence > MAX_MANIFEST_COMPONENT) {
    throw new Error(`Extension prerelease sequence exceeds the manifest component limit: ${packageVersion}`);
  }

  return {
    version: `${stableVersion}.${sequence}`,
    versionName: packageVersion,
  };
}
