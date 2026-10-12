import { Component, Input, signal } from '@angular/core';
import { NxIcon } from '../../data-display/ui-icon';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export type NxSecurityEventSeverity = 'info' | 'warning' | 'critical';

export interface NxSecurityEvent {
  id: string | number;
  /** e.g. 'password_changed' | 'mfa_enabled' | 'login_failed' | 'suspicious_ip' | 'api_key_created' - freeform so consumers can extend it. */
  type: string;
  label: string;
  severity: NxSecurityEventSeverity;
  timestamp: string;
  ipAddress?: string;
  location?: string;
  userAgent?: string;
}

type NxSecurityEventSeverityFilter = 'all' | NxSecurityEventSeverity;

/**
 * A chronological timeline of auth/security-specific events - password changes, MFA toggles,
 * failed logins, suspicious IPs, API key creation, etc. - each with a severity-driven dot/badge.
 * Narrower and auth-focused compared to `nx-audit-log` (generic entity before/after field-change
 * history) and `nx-audit-timeline` (a dense, generic who-did-what-when compliance log); this
 * component is specifically about security events, and adds a severity filter + search box.
 */
@Component({
  selector: 'nx-security-event-log',
  standalone: true,
  imports: [NxIcon, NxProLocked],
  templateUrl: './ui-security-event-log.html',
  styleUrl: './ui-security-event-log.scss',
})
export class NxSecurityEventLog {
  protected readonly licensed = nxProLicenseGranted();

  @Input() events: NxSecurityEvent[] = [];

  searchText = signal('');
  severityFilter = signal<NxSecurityEventSeverityFilter>('all');

  get filteredEvents(): NxSecurityEvent[] {
    const search = this.searchText().trim().toLowerCase();
    const severity = this.severityFilter();
    return this.events
      .filter((event) => {
        if (severity !== 'all' && event.severity !== severity) {
          return false;
        }
        if (!search) {
          return true;
        }
        return (
          event.label.toLowerCase().includes(search) ||
          (event.ipAddress?.toLowerCase().includes(search) ?? false) ||
          (event.location?.toLowerCase().includes(search) ?? false)
        );
      })
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  iconFor(severity: NxSecurityEventSeverity): string {
    switch (severity) {
      case 'critical':
        return 'nx-x-circle';
      case 'warning':
        return 'nx-alert-triangle';
      default:
        return 'nx-info-circle';
    }
  }

  formatTimestamp(iso: string): string {
    const date = new Date(iso);
    return Number.isNaN(date.getTime())
      ? iso
      : date.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
  }
}
