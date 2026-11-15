import { Component, EventEmitter, Input, OnInit, Output, computed, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { NxIcon } from '../../data-display/ui-icon';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export interface NxJwtDecoded {
  header: unknown;
  payload: unknown;
}

/** Base64url-decodes `segment` (handling `-`/`_` and missing `=` padding) and JSON.parses it. */
function decodeSegment(segment: string): unknown {
  const base64 = segment.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
  const decoded = atob(padded);
  // atob gives us a "binary string" (one char per byte) - re-encode as UTF-8 before JSON.parse so
  // multi-byte characters in the payload (names, emoji, etc) come out correctly instead of mojibake.
  const bytes = Uint8Array.from(decoded, (ch) => ch.charCodeAt(0));
  const utf8 = new TextDecoder('utf-8').decode(bytes);
  return JSON.parse(utf8);
}

function formatDuration(totalSeconds: number): string {
  const seconds = Math.abs(totalSeconds);
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m`;
  return `${seconds}s`;
}

/**
 * Decodes a JWT's header and payload segments client-side (base64url decode + JSON.parse) for
 * inspection - it does NOT verify the signature, which is called out explicitly in the UI. Shows
 * both segments as pretty-printed JSON plus a derived expiry badge from the payload's `exp` claim.
 */
@Component({
  selector: 'nx-jwt-decoder',
  standalone: true,
  imports: [NgIf, NxIcon, NxProLocked],
  templateUrl: './ui-jwt-decoder.html',
  styleUrl: './ui-jwt-decoder.scss',
})
export class NxJwtDecoder implements OnInit {
  protected readonly licensed = nxProLicenseGranted();

  @Input() token = '';

  @Output() decoded = new EventEmitter<NxJwtDecoded | null>();

  protected readonly tokenText = signal('');

  ngOnInit(): void {
    this.tokenText.set(this.token);
    this.decoded.emit(this.result());
  }

  onTokenChange(value: string): void {
    this.tokenText.set(value);
    this.decoded.emit(this.result());
  }

  protected readonly result = computed<{ header: unknown; payload: unknown } | null>(() => {
    const parts = this.tokenText().trim().split('.');
    if (parts.length !== 3 || parts.some((part) => part.length === 0)) {
      return null;
    }
    try {
      const header = decodeSegment(parts[0]);
      const payload = decodeSegment(parts[1]);
      return { header, payload };
    } catch {
      return null;
    }
  });

  protected readonly headerJson = computed(() => {
    const r = this.result();
    return r ? JSON.stringify(r.header, null, 2) : '';
  });

  protected readonly payloadJson = computed(() => {
    const r = this.result();
    return r ? JSON.stringify(r.payload, null, 2) : '';
  });

  protected readonly isInvalid = computed(() => this.tokenText().trim().length > 0 && this.result() === null);

  protected readonly expiryLabel = computed(() => {
    const r = this.result();
    const payload = r?.payload;
    if (!payload || typeof payload !== 'object' || !('exp' in (payload as Record<string, unknown>))) {
      return 'No expiry claim';
    }
    const exp = (payload as Record<string, unknown>)['exp'];
    if (typeof exp !== 'number') {
      return 'No expiry claim';
    }
    const diffSeconds = exp - Math.floor(Date.now() / 1000);
    if (diffSeconds >= 0) {
      return `Expires in ${formatDuration(diffSeconds)}`;
    }
    return `Expired ${formatDuration(diffSeconds)} ago`;
  });

  protected readonly isExpired = computed(() => {
    const r = this.result();
    const payload = r?.payload as Record<string, unknown> | undefined;
    const exp = payload?.['exp'];
    return typeof exp === 'number' && exp - Math.floor(Date.now() / 1000) < 0;
  });
}
