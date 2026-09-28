import { Component } from '@angular/core';
import { NxAuditTimeline, NxAuditEntry } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-audit-timeline-demo',
  imports: [NxAuditTimeline, DemoSection],
  templateUrl: './ui-audit-timeline-demo.html',
  styleUrl: './ui-audit-timeline-demo.scss',
})
export class UiAuditTimelineDemo {
  importCode = `import { NxAuditTimeline } from 'nexium-ui';`;

  entries: NxAuditEntry[] = [
    {
      id: 1,
      actor: 'layla.haddad@company.com',
      action: 'signed in from a new device',
      timestamp: '2026-09-26 09:14:02',
      ipAddress: '10.0.4.21',
      severity: 'info',
    },
    {
      id: 2,
      actor: 'omar.nassar@company.com',
      action: 'changed permissions for',
      target: 'the Finance workspace',
      timestamp: '2026-09-26 08:52:41',
      ipAddress: '10.0.4.9',
      severity: 'warning',
    },
    {
      id: 3,
      actor: 'unknown',
      action: 'failed 5 login attempts on',
      target: 'admin@company.com',
      timestamp: '2026-09-26 03:11:57',
      ipAddress: '203.0.113.4',
      severity: 'critical',
    },
    {
      id: 4,
      actor: 'sara.kanaan@company.com',
      action: 'exported',
      target: 'the customer invoices report',
      timestamp: '2026-09-25 17:40:12',
      ipAddress: '10.0.4.33',
      severity: 'info',
    },
  ];

  basicCode = `<nx-audit-timeline [entries]="entries"></nx-audit-timeline>`;
  basicTs = `entries: NxAuditEntry[] = [
  {
    id: 1,
    actor: 'layla.haddad@company.com',
    action: 'signed in from a new device',
    timestamp: '2026-09-26 09:14:02',
    ipAddress: '10.0.4.21',
    severity: 'info',
  },
  {
    id: 3,
    actor: 'unknown',
    action: 'failed 5 login attempts on',
    target: 'admin@company.com',
    timestamp: '2026-09-26 03:11:57',
    ipAddress: '203.0.113.4',
    severity: 'critical',
  },
  // ...more entries
];`;

  emptyCode = `<nx-audit-timeline [entries]="[]"></nx-audit-timeline>`;
  emptyTs = `// With no entries, the timeline shows a plain "No audit entries." message.`;
}
