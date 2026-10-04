import { InjectionToken, PLATFORM_ID, Provider, Signal, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/** Holds the token string registered via `provideNxLicense()`, if any. */
export const NX_LICENSE_TOKEN = new InjectionToken<string | undefined>('NX_LICENSE_TOKEN');

/**
 * Holds the enabled/disabled flag registered via `provideNxLicense()`. Missing (optional inject,
 * no provider registered) is treated as enabled - this keeps every existing consumer's behavior
 * unchanged, since they never provide this token at all.
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
 * `enabled` is a local kill switch, not a license check: pass `false` to make every PRO
 * component render unlocked immediately with no network call at all (e.g. while your own
 * license backend isn't live yet). Pass `true` (the default) to run the real check against the
 * live license pool, exactly as before.
 */
export function provideNxLicense(token: string, enabled = true): Provider[] {
  return [
    { provide: NX_LICENSE_TOKEN, useValue: token },
    { provide: NX_LICENSE_ENABLED, useValue: enabled },
  ];
}

// Every consuming app calls this same public endpoint to check a token against the real,
// server-side pool - there is no local algorithm to recompute or forge here anymore. See
// functions/index.js (verifyLicenseToken) for the implementation.
const VERIFY_ENDPOINT = 'https://us-central1-nexium-ui.cloudfunctions.net/verifyLicenseToken';
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
 * If `provideNxLicense(token, false)` was used, checking is disabled entirely and this returns
 * an already-`true` signal with no network call made.
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
