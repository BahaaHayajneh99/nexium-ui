import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxSecurityEventLog, NxSecurityEvent } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-security-event-log-demo',
  imports: [NxSecurityEventLog, DemoSection],
  templateUrl: './ui-security-event-log-demo.html',
  styleUrl: './ui-security-event-log-demo.scss',
})
export class UiSecurityEventLogDemo {
  importCode = `import { NxSecurityEventLog } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  events: NxSecurityEvent[] = [
    {
      id: 1,
      type: 'suspicious_ip',
      label: 'Suspicious IP detected',
      severity: 'critical',
      timestamp: '2026-10-07T22:14:00',
      ipAddress: '185.220.101.47',
      location: 'Unknown',
      userAgent: 'curl/8.4.0',
    },
    {
      id: 2,
      type: 'login_failed',
      label: 'Failed login attempt',
      severity: 'warning',
      timestamp: '2026-10-07T21:58:00',
      ipAddress: '185.220.101.47',
      location: 'Unknown',
    },
    {
      id: 3,
      type: 'api_key_created',
      label: 'API key created',
      severity: 'warning',
      timestamp: '2026-10-06T15:03:00',
      ipAddress: '94.123.11.9',
      location: 'Amman, Jordan',
      userAgent: 'Chrome 128 on Windows',
    },
    {
      id: 4,
      type: 'mfa_enabled',
      label: 'MFA enabled',
      severity: 'info',
      timestamp: '2026-10-05T09:42:00',
      ipAddress: '94.123.11.9',
      location: 'Amman, Jordan',
    },
    {
      id: 5,
      type: 'password_changed',
      label: 'Password changed',
      severity: 'info',
      timestamp: '2026-10-04T18:11:00',
      ipAddress: '94.123.11.9',
      location: 'Amman, Jordan',
    },
    {
      id: 6,
      type: 'login_failed',
      label: 'Failed login attempt',
      severity: 'warning',
      timestamp: '2026-10-03T07:30:00',
      ipAddress: '203.0.113.19',
      location: 'Berlin, Germany',
    },
    {
      id: 7,
      type: 'account_locked',
      label: 'Account temporarily locked',
      severity: 'critical',
      timestamp: '2026-10-03T07:31:00',
      ipAddress: '203.0.113.19',
      location: 'Berlin, Germany',
    },
    {
      id: 8,
      type: 'login_success',
      label: 'Signed in',
      severity: 'info',
      timestamp: '2026-10-01T08:05:00',
      ipAddress: '94.123.11.9',
      location: 'Amman, Jordan',
    },
  ];

  basicCode = `<nx-security-event-log [events]="events"></nx-security-event-log>`;

  basicTs = `events: NxSecurityEvent[] = [
  {
    id: 1, type: 'suspicious_ip', label: 'Suspicious IP detected',
    severity: 'critical', timestamp: '2026-10-07T22:14:00',
    ipAddress: '185.220.101.47', location: 'Unknown', userAgent: 'curl/8.4.0',
  },
  {
    id: 2, type: 'login_failed', label: 'Failed login attempt',
    severity: 'warning', timestamp: '2026-10-07T21:58:00',
    ipAddress: '185.220.101.47', location: 'Unknown',
  },
  // ...more events
];`;
}
