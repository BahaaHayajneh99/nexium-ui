import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxAuditLog, NxAuditLogEntry } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-audit-log-demo',
  imports: [NxAuditLog, DemoSection],
  templateUrl: './ui-audit-log-demo.html',
  styleUrl: './ui-audit-log-demo.scss',
})
export class UiAuditLogDemo {
  importCode = `import { NxAuditLog } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  entries: NxAuditLogEntry[] = [
    {
      id: 1,
      user: 'Alice Chen',
      date: '2025-09-24 14:32',
      action: 'Updated',
      entity: 'Invoice #4821',
      changes: [
        { field: 'status', before: 'Pending', after: 'Paid' },
        { field: 'amount', before: '$1,200.00', after: '$1,180.00' },
      ],
    },
    {
      id: 2,
      user: 'Marcus Reed',
      date: '2025-09-24 11:05',
      action: 'Created',
      entity: 'User "j.doe@example.com"',
    },
    {
      id: 3,
      user: 'Alice Chen',
      date: '2025-09-23 17:48',
      action: 'Updated',
      entity: 'Project "Nexa Redesign"',
      changes: [
        { field: 'owner', before: 'Marcus Reed', after: 'Alice Chen' },
        { field: 'deadline', before: '2025-10-01', after: '2025-10-15' },
        { field: 'priority', before: 'Medium', after: 'High' },
      ],
    },
    {
      id: 4,
      user: 'Priya Nair',
      date: '2025-09-23 09:12',
      action: 'Deleted',
      entity: 'Draft "Q3 report"',
    },
    {
      id: 5,
      user: 'Marcus Reed',
      date: '2025-09-22 16:20',
      action: 'Updated',
      entity: 'Role "Editor"',
      changes: [{ field: 'permissions', before: 'read, write', after: 'read, write, publish' }],
    },
  ];

  basicCode = `<nx-audit-log [entries]="entries"></nx-audit-log>`;

  basicTs = `entries: NxAuditLogEntry[] = [
  {
    id: 1,
    user: 'Alice Chen',
    date: '2025-09-24 14:32',
    action: 'Updated',
    entity: 'Invoice #4821',
    changes: [
      { field: 'status', before: 'Pending', after: 'Paid' },
      { field: 'amount', before: '$1,200.00', after: '$1,180.00' },
    ],
  },
  { id: 2, user: 'Marcus Reed', date: '2025-09-24 11:05', action: 'Created', entity: 'User "j.doe@example.com"' },
  // ...
];`;

  contextCode = `<div class="audit-panel">
    <h4>Activity</h4>
    <nx-audit-log [entries]="entries"></nx-audit-log>
</div>`;

  contextTs = `// Rows with a changes array get an expand chevron - click a row to reveal
// its before/after field table. The search box and action filter above the
// table work against the same entries automatically.`;
}
