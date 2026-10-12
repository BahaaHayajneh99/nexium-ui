import { Component, EventEmitter, Input, Output, computed, signal } from '@angular/core';
import { NxIcon } from '../../data-display/ui-icon';
import { NxCopyToClipboard } from '../../directives/nx-copy-to-clipboard/nx-copy-to-clipboard';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export interface NxApiKey {
  id: string | number;
  name: string;
  /** e.g. "sk_live_••••••••a1B2" - the host owns actual masking/generation, this component just displays whatever string it's given. */
  maskedKey: string;
  scopes: string[];
  createdAt: string;
  /** ISO timestamp, or omitted/undefined to render "Never used". */
  lastUsedAt?: string;
}

/**
 * A table of API keys with masked values, scope badges, creation/last-used dates, and a per-row
 * Revoke action. Creating a key is entirely host-driven: this component only emits `createKey`
 * (void) and expects the host to generate the key, push the new row into `apiKeys` itself, and
 * separately pass the one-time plaintext value through `newlyCreatedKey` so this component can
 * show the "copy this now" banner. The banner re-opens whenever `newlyCreatedKey` changes to a
 * new truthy value, even if a previous one was dismissed.
 */
@Component({
  selector: 'nx-api-key-manager',
  standalone: true,
  imports: [NxIcon, NxCopyToClipboard, NxProLocked],
  templateUrl: './ui-api-key-manager.html',
  styleUrl: './ui-api-key-manager.scss',
})
export class NxApiKeyManager {
  protected readonly licensed = nxProLicenseGranted();

  @Input() apiKeys: NxApiKey[] = [];

  // Backed by a signal (not a plain field) so `showBanner` below re-evaluates whenever the host
  // rebinds a new value, rather than freezing on whatever was passed in on first render.
  private readonly newlyCreatedKeySignal = signal<string | null>(null);
  @Input()
  get newlyCreatedKey(): string | null {
    return this.newlyCreatedKeySignal();
  }
  set newlyCreatedKey(value: string | null) {
    this.newlyCreatedKeySignal.set(value ?? null);
    if (value) {
      // A fresh key value always re-opens the banner, even if an earlier one was dismissed.
      this.dismissedKey.set(null);
    }
  }

  @Output() createKey = new EventEmitter<void>();
  @Output() revokeKey = new EventEmitter<string | number>();

  protected readonly dismissedKey = signal<string | null>(null);
  protected readonly copied = signal(false);

  protected readonly showBanner = computed(() => {
    const key = this.newlyCreatedKeySignal();
    return !!key && key !== this.dismissedKey();
  });

  dismissBanner(): void {
    this.dismissedKey.set(this.newlyCreatedKeySignal());
  }

  onCopied(): void {
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
  }

  /** Formats an ISO timestamp, or "Never used" when omitted (used for `lastUsedAt`). */
  formatDate(iso?: string): string {
    if (!iso) return 'Never used';
    return new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  }
}
