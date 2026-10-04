import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxCookieBanner, NxButton } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-cookie-banner-demo',
  imports: [NxCookieBanner, NxButton, DemoSection],
  templateUrl: './ui-cookie-banner-demo.html',
  styleUrl: './ui-cookie-banner-demo.scss',
})
export class UiCookieBannerDemo {
  importCode = `import { NxCookieBanner } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  storageKey = 'nx-cookie-consent-demo';
  showBanner = true;
  lastChoice = '';

  storageKeySimple = 'nx-cookie-consent-demo-simple';
  showBannerSimple = true;
  lastChoiceSimple = '';

  onAccepted(): void {
    this.lastChoice = 'Accepted';
  }

  onDeclined(): void {
    this.lastChoice = 'Declined';
  }

  // Demo-only: a real app only ever needs the component itself - this reset button exists so
  // visitors can clear their stored choice and see the banner reappear without clearing
  // localStorage by hand. Toggling the *ngIf-like block destroys and recreates the component so
  // its ngOnInit re-checks localStorage from scratch.
  resetConsent(): void {
    try {
      localStorage.removeItem(this.storageKey);
    } catch {
      // ignore
    }
    this.lastChoice = '';
    this.showBanner = false;
    setTimeout(() => (this.showBanner = true));
  }

  onAcceptedSimple(): void {
    this.lastChoiceSimple = 'Accepted';
  }

  onDeclinedSimple(): void {
    this.lastChoiceSimple = 'Declined';
  }

  resetConsentSimple(): void {
    try {
      localStorage.removeItem(this.storageKeySimple);
    } catch {
      // ignore
    }
    this.lastChoiceSimple = '';
    this.showBannerSimple = false;
    setTimeout(() => (this.showBannerSimple = true));
  }

  basicCode = `<nx-cookie-banner
    message="We use cookies to improve your experience."
    [showCustomize]="true"
    (accepted)="onAccepted()"
    (declined)="onDeclined()">
</nx-cookie-banner>`;

  basicTs = `onAccepted(): void {
  // user accepted, or saved preferences with at least one category on
}

onDeclined(): void {
  // user declined all non-required cookies
}`;

  simpleCode = `<nx-cookie-banner
    message="This site uses essential cookies only."
    [showCustomize]="false"
    (accepted)="onAccepted()"
    (declined)="onDeclined()">
</nx-cookie-banner>`;

  simpleTs = `// With showCustomize false, only Accept / Decline are shown - no per-category toggles.`;
}
