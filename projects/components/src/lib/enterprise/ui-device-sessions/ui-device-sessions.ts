import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NxIcon } from '../../data-display/ui-icon';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export type NxDeviceSessionType = 'desktop' | 'mobile' | 'tablet';

export interface NxDeviceSession {
  id: string | number;
  /** e.g. "iPhone 15" or "Windows PC" */
  deviceName: string;
  deviceType: NxDeviceSessionType;
  /** e.g. "Chrome 128" */
  browser: string;
  location?: string;
  lastActive: string;
  isCurrent: boolean;
}

/**
 * A list of currently-ACTIVE login sessions, one per device - the "what's live right now"
 * sibling of `nx-login-activity` (the historical attempt log). Each session can be revoked
 * individually; the session matching the current one gets a "This device" badge instead of a
 * revoke button, and `revokeAll` fires when the bulk action is used.
 */
@Component({
  selector: 'nx-device-sessions',
  standalone: true,
  imports: [NxIcon, NxProLocked],
  templateUrl: './ui-device-sessions.html',
  styleUrl: './ui-device-sessions.scss',
})
export class NxDeviceSessions {
  protected readonly licensed = nxProLicenseGranted();

  @Input() sessions: NxDeviceSession[] = [];

  @Output() revoke = new EventEmitter<string | number>();
  @Output() revokeAll = new EventEmitter<void>();

  get otherSessionsCount(): number {
    return this.sessions.filter((session) => !session.isCurrent).length;
  }

  iconFor(deviceType: NxDeviceSessionType): string {
    switch (deviceType) {
      case 'mobile':
      case 'tablet':
        // The library's icon set has no dedicated tablet glyph yet - smartphone is the closest
        // "handheld" stand-in for both.
        return 'nx-smartphone';
      default:
        return 'nx-monitor';
    }
  }

  formatLastActive(iso: string): string {
    const date = new Date(iso);
    return Number.isNaN(date.getTime())
      ? iso
      : date.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
  }

  onRevoke(id: string | number): void {
    this.revoke.emit(id);
  }

  onRevokeAll(): void {
    this.revokeAll.emit();
  }
}
