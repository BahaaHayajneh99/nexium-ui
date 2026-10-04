import { Component, EventEmitter, Input, OnInit, Output, booleanAttribute, signal } from '@angular/core';
import { NxSwitch } from '../../forms/ui-switch';

export interface NxCookieCategories {
  analytics: boolean;
  marketing: boolean;
}

interface NxStoredCookieConsent {
  accepted: boolean;
  categories: NxCookieCategories;
  decidedAt: number;
}

// Mirrors the safe-localStorage read/write convention used by `nx-license.ts`'s
// `readCachedResult`/`writeCachedResult` - private browsing / blocked storage should degrade
// to "the banner just can't remember the choice", never throw and break the component.
function readStoredConsent(storageKey: string): NxStoredCookieConsent | null {
  try {
    const raw = localStorage.getItem(storageKey);
    return raw ? (JSON.parse(raw) as NxStoredCookieConsent) : null;
  } catch {
    return null;
  }
}

function writeStoredConsent(storageKey: string, value: NxStoredCookieConsent): void {
  try {
    localStorage.setItem(storageKey, JSON.stringify(value));
  } catch {
    // Private browsing / blocked storage - the choice just won't be remembered next visit.
  }
}

/**
 * A fixed-position cookie consent banner. Checks `storageKey` in localStorage on init and stays
 * hidden entirely if a choice was already recorded; otherwise shows Accept/Decline (and,
 * optionally, a "Customize" step with per-category toggles) and persists whichever choice is made.
 */
@Component({
  selector: 'nx-cookie-banner',
  standalone: true,
  imports: [NxSwitch],
  templateUrl: './ui-cookie-banner.html',
  styleUrl: './ui-cookie-banner.scss',
})
export class NxCookieBanner implements OnInit {
  @Input() message = 'We use cookies to improve your experience.';
  @Input() storageKey = 'nx-cookie-consent';
  @Input({ transform: booleanAttribute }) showCustomize = true;

  @Output() accepted = new EventEmitter<void>();
  @Output() declined = new EventEmitter<void>();

  readonly visible = signal(false);
  readonly customizing = signal(false);

  categories: NxCookieCategories = { analytics: true, marketing: false };

  ngOnInit(): void {
    this.visible.set(readStoredConsent(this.storageKey) === null);
  }

  openCustomize(): void {
    this.customizing.set(true);
  }

  accept(): void {
    this.persist(true, { analytics: true, marketing: true });
    this.accepted.emit();
  }

  decline(): void {
    this.persist(false, { analytics: false, marketing: false });
    this.declined.emit();
  }

  savePreferences(): void {
    const categories = { ...this.categories };
    this.persist(categories.analytics || categories.marketing, categories);
    this.accepted.emit();
  }

  private persist(accepted: boolean, categories: NxCookieCategories): void {
    writeStoredConsent(this.storageKey, { accepted, categories, decidedAt: Date.now() });
    this.visible.set(false);
    this.customizing.set(false);
  }
}
