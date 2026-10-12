import { Component, Input, signal } from '@angular/core';
import { NxIcon } from '../../data-display/ui-icon';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export interface NxLoginActivityEntry {
  id: string | number;
  timestamp: string;
  ipAddress: string;
  location?: string;
  /** e.g. "Chrome on Windows" */
  device: string;
  success: boolean;
  /** Shown only when `success` is false, e.g. "Incorrect password". */
  failureReason?: string;
}

type NxLoginActivityStatusFilter = 'all' | 'success' | 'failed';

/**
 * A table of login ATTEMPTS - one row per attempt, success and failure both - sorted newest
 * first. Distinct from `nx-device-sessions` (currently-active sessions, not historical attempts)
 * and from `nx-security-event-log` (broader auth security events beyond just login attempts).
 */
@Component({
  selector: 'nx-login-activity',
  standalone: true,
  imports: [NxIcon, NxProLocked],
  templateUrl: './ui-login-activity.html',
  styleUrl: './ui-login-activity.scss',
})
export class NxLoginActivity {
  protected readonly licensed = nxProLicenseGranted();

  @Input() entries: NxLoginActivityEntry[] = [];

  statusFilter = signal<NxLoginActivityStatusFilter>('all');

  get filteredEntries(): NxLoginActivityEntry[] {
    const status = this.statusFilter();
    return this.entries
      .filter((entry) => {
        if (status === 'success') {
          return entry.success;
        }
        if (status === 'failed') {
          return !entry.success;
        }
        return true;
      })
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  formatTimestamp(iso: string): string {
    const date = new Date(iso);
    return Number.isNaN(date.getTime())
      ? iso
      : date.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
  }
}
