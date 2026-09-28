import { Component, Input } from '@angular/core';

export type NxAuditSeverity = 'info' | 'warning' | 'critical';

export interface NxAuditEntry {
  id: string | number;
  actor: string;
  action: string;
  target?: string;
  timestamp: string;
  ipAddress?: string;
  severity?: NxAuditSeverity;
}

/**
 * A dense, scannable log of who-did-what-when for compliance/security
 * review - each row surfaces the actor, action, target, IP address and a
 * severity badge. Denser and more literal than `nx-activity-timeline`
 * (which is tuned for a friendly, avatar-led "what's been happening" view
 * rather than an audit trail).
 */
@Component({
  selector: 'nx-audit-timeline',
  standalone: true,
  imports: [],
  templateUrl: './ui-audit-timeline.html',
  styleUrl: './ui-audit-timeline.scss',
})
export class NxAuditTimeline {
  @Input() entries: NxAuditEntry[] = [];
}
