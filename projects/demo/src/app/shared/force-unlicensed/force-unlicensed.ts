import { Component } from '@angular/core';
import { NX_LICENSE_TOKEN } from 'components';
// Deep import, not through the published package surface - see nx-license-internal.ts.
import { NX_LICENSE_ENABLED } from '../../../../../components/src/lib/licensing/nx-license-internal';

/**
 * Forces anything projected inside it into the real "no license" state, regardless of the
 * docs site's own root providers - used only on the "Using PRO" guide page to show a PRO
 * component's real locked state live, side by side with its normal (unlocked, on this docs site)
 * state elsewhere on the same page.
 *
 * Both tokens must be overridden here, not just `NX_LICENSE_TOKEN`: the docs site's root
 * providers set `NX_LICENSE_ENABLED` to `false` (the "always unlocked" kill switch - see
 * `nxProLicenseGranted()`), which short-circuits to a granted signal before the token is ever
 * even read. Overriding only the token left that kill switch in place, so both sides of the
 * "locked vs. unlocked" comparison rendered identically unlocked. Re-enabling the real check
 * here (`NX_LICENSE_ENABLED: true`) while nulling the token out is what actually forces the
 * locked placeholder.
 */
@Component({
  selector: 'app-force-unlicensed',
  standalone: true,
  template: `<ng-content></ng-content>`,
  providers: [
    { provide: NX_LICENSE_TOKEN, useValue: undefined },
    { provide: NX_LICENSE_ENABLED, useValue: true },
  ],
})
export class ForceUnlicensed {}
