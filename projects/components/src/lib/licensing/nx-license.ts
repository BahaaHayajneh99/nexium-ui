import { InjectionToken, PLATFORM_ID, Provider, Signal, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/** Holds the token string registered via `provideNxLicense()`, if any. */
export const NX_LICENSE_TOKEN = new InjectionToken<string | undefined>('NX_LICENSE_TOKEN');

/**
 * NOT a supported part of this package's public API, despite being exported (an `InjectionToken`
 * can only be targeted by a provider if the exact same object reference is reachable by whoever
 * writes that provider - keeping this reachable only via `dist/components`, the same compiled
 * module `nxProLicenseGranted()` itself reads from, is what lets a single internal consumer
 * (this monorepo's own demo/docs site, see `app.config.ts`) share the identical token instance.
 * A separate, unexported copy canNOT be shared across independently-compiled module graphs - that
 * was tried and broke the demo site, since the two copies don't resolve to the same instance).
 *
 * Forces `nxProLicenseGranted()` to skip the live network check entirely when provided `false`,
 * returning an already-granted signal - used so the docs site doesn't pay a network round trip to
 * re-verify its own already-known-good, real, paid token on every single page load. No prose in
 * this package's README/JSDoc ever tells a consuming app this exists or what it does; treat it as
 * unsupported/undocumented and subject to removal without notice if you find it some other way.
 */
export const NX_LICENSE_ENABLED = new InjectionToken<boolean>('NX_LICENSE_ENABLED');

/**
 * Registers a NexiumUI PRO license token, unlocking PRO-tier components
 * (e.g. `NxKanban`, `NxQueryBuilder`). Get a token from the "Get PRO License"
 * page after a one-time purchase, then add this to your app's providers:
 *
 * ```ts
 * bootstrapApplication(AppComponent, {
 *   providers: [provideNxLicense('YOUR-TOKEN-HERE')],
 * });
 * ```
 *
 * Always runs the real check against the live license pool - there is no local kill switch here
 * to pass. (An earlier version of this function took a second `enabled` boolean that skipped the
 * check entirely when `false` - that was a real, published bypass: anyone could call
 * `provideNxLicense('anything', false)` and unlock every PRO component for free. It's gone.)
 */
export function provideNxLicense(token: string): Provider[] {
  return [{ provide: NX_LICENSE_TOKEN, useValue: token }];
}

// Every consuming app calls this same public endpoint to check a token against the real,
// server-side pool - there is no local algorithm to recompute or forge here anymore. See
// api/verifyLicenseToken.js (a Vercel serverless function, not a Firebase Cloud Function - that
// would require Firebase's paid Blaze plan for no benefit here) for the implementation.
const VERIFY_ENDPOINT = 'https://nexium-ui.vercel.app/api/verifyLicenseToken';
const CACHE_KEY_PREFIX = 'nx-license-verified:';
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

// Module-level cache so every PRO component instance sharing the same token triggers only one
// network request per page load, no matter how many are rendered.
const verificationCache = new Map<string, Promise<boolean>>();

function readCachedResult(token: string): boolean | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY_PREFIX + token);
    if (!raw) {
      return null;
    }
    const { valid, checkedAt } = JSON.parse(raw) as { valid: boolean; checkedAt: number };
    if (Date.now() - checkedAt > CACHE_TTL_MS) {
      return null;
    }
    return valid;
  } catch {
    return null;
  }
}

function writeCachedResult(token: string, valid: boolean): void {
  try {
    localStorage.setItem(CACHE_KEY_PREFIX + token, JSON.stringify({ valid, checkedAt: Date.now() }));
  } catch {
    // Private browsing / blocked storage - the in-memory cache above still avoids duplicate
    // requests within this page load, so this is a soft failure only.
  }
}

function verifyTokenRemotely(token: string): Promise<boolean> {
  const cached = readCachedResult(token);
  if (cached !== null) {
    return Promise.resolve(cached);
  }

  let pending = verificationCache.get(token);
  if (!pending) {
    pending = fetch(`${VERIFY_ENDPOINT}?token=${encodeURIComponent(token)}`)
      .then((response) => (response.ok ? response.json() : { valid: false }))
      .then((data: { valid?: boolean }) => {
        const valid = !!data.valid;
        writeCachedResult(token, valid);
        return valid;
      })
      .catch(() => false);
    verificationCache.set(token, pending);
  }
  return pending;
}

/**
 * Call from a PRO component's field initializer (an injection context) to check whether it's
 * licensed: `protected readonly licensed = nxProLicenseGranted();`, then `@if (licensed())` in
 * the template. Returns a signal that starts `false` and flips to `true` once the token is
 * confirmed against the live license pool - there's no synchronous/local check to forge, the
 * pool lookup is the only authority. Always `false` during server-side rendering; the real
 * check runs client-side after hydration.
 *
 * `NX_LICENSE_ENABLED` can force this to skip the check and return an already-granted signal - see
 * that token's own doc comment for why this isn't a supported, documented way to do so.
 */
export function nxProLicenseGranted(): Signal<boolean> {
  const platformId = inject(PLATFORM_ID);
  const token = inject(NX_LICENSE_TOKEN, { optional: true });
  const enabled = inject(NX_LICENSE_ENABLED, { optional: true }) ?? true;
  const granted = signal(!enabled);

  if (enabled && token && isPlatformBrowser(platformId)) {
    verifyTokenRemotely(token).then((valid) => granted.set(valid));
  }

  return granted;
}
