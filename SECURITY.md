# Security

## Reporting a vulnerability

Please report suspected vulnerabilities privately through GitHub's security advisory feature for this repository. Do not include passwords, tokens, customer data, or sensitive instance URLs in public issues.

## Credential handling

Credential storage and the encrypted vault are not part of the phase 0 foundation. Until that work is implemented and reviewed, this build must not be used to store credentials.

The planned default vault uses a non-exportable encryption key held in extension IndexedDB. This is intended to protect stored ciphertext from casual inspection and accidental disclosure; it does not protect against a compromised browser profile, malicious local software, or code running with access to the extension origin. A master-password mode will require unlocking again after browser restart and will keep its derived key in memory only.

## Secure development constraints

- Never log, export, or expose passwords to content scripts.
- Do not load remote executable code.
- Do not use log content as HTML.
- Keep requests limited to user-configured instance domains.
