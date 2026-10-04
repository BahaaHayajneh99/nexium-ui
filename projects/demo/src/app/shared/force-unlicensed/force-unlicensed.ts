import { Component } from '@angular/core';
import { NX_LICENSE_TOKEN } from 'components';

/**
 * Overrides NX_LICENSE_TOKEN to undefined for anything projected inside it, regardless of the
 * real token provided at the app root - used only on the "Using PRO" guide page to show a PRO
 * component's real locked state live, side by side with its normal (unlocked, on this docs site)
 * state elsewhere on the same page.
 */
@Component({
  selector: 'app-force-unlicensed',
  standalone: true,
  template: `<ng-content></ng-content>`,
  providers: [{ provide: NX_LICENSE_TOKEN, useValue: undefined }],
})
export class ForceUnlicensed {}
