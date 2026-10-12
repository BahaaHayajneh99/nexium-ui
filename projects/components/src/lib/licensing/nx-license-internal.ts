import { InjectionToken } from '@angular/core';

/**
 * INTERNAL ONLY - deliberately NOT re-exported from `public-api.ts`/`provideNxLicense()`, so a
 * real `npm install nexium-ui` consumer has no way to ever obtain a reference to this token.
 * Angular DI tokens resolve by object identity, not by name or string - without the exported
 * reference there is no way to target it and provide a value for it, not even by reading the
 * compiled/minified bundle.
 *
 * This exists purely so this monorepo's own demo/docs site can skip the live network check for
 * its own already-known-good, real, paid token (see `projects/demo/src/app/app.config.ts`) -
 * avoiding an unnecessary round trip and a flash of the locked state on every page load. It is
 * imported there via a direct relative path into this library's source, not through the published
 * package surface, specifically so this convenience is never reachable from a real consumer's app.
 *
 * Previously this was a second `enabled` parameter on the public `provideNxLicense()` function -
 * which meant any consumer could call `provideNxLicense('anything', false)` and unlock every PRO
 * component for free, offline, with no purchase at all. Moving it here closes that off.
 */
export const NX_LICENSE_ENABLED = new InjectionToken<boolean>('NX_LICENSE_ENABLED_INTERNAL');
