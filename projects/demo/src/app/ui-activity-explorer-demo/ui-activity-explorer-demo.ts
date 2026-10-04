import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxActivityExplorer, NxActivityEvent } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-activity-explorer-demo',
  imports: [NxActivityExplorer, DemoSection],
  templateUrl: './ui-activity-explorer-demo.html',
  styleUrl: './ui-activity-explorer-demo.scss',
})
export class UiActivityExplorerDemo {
  importCode = `import { NxActivityExplorer } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  events: NxActivityEvent[] = [
    { id: 1, user: 'Bahaa', action: 'updated', entity: 'Project', entityName: 'Marketing Site', detail: 'Status: Draft → Published', date: '2026-10-01T14:20:00', icon: 'nx-edit' },
    { id: 2, user: 'Ahmed', action: 'uploaded', entity: 'Document', entityName: 'Q3-report.pdf', date: '2026-10-01T11:05:00', icon: 'nx-upload' },
    { id: 3, user: 'System', action: 'generated', entity: 'Report', entityName: 'Weekly Analytics', date: '2026-10-01T06:00:00', icon: 'nx-rocket' },
    { id: 4, user: 'Priya', action: 'created', entity: 'Project', entityName: 'Onboarding Flow', date: '2026-09-30T16:40:00', icon: 'nx-folder' },
    { id: 5, user: 'Ahmed', action: 'deleted', entity: 'Document', entityName: 'old-draft.docx', date: '2026-09-30T10:12:00', icon: 'nx-trash' },
    { id: 6, user: 'Bahaa', action: 'commented on', entity: 'Project', entityName: 'Marketing Site', detail: '"Let\'s ship this by Friday"', date: '2026-09-30T09:48:00', icon: 'nx-message' },
    { id: 7, user: 'Priya', action: 'updated', entity: 'Project', entityName: 'Onboarding Flow', detail: 'Owner: Priya → Ahmed', date: '2026-09-29T15:30:00', icon: 'nx-edit' },
    { id: 8, user: 'System', action: 'generated', entity: 'Report', entityName: 'Weekly Analytics', date: '2026-09-29T06:00:00', icon: 'nx-rocket' },
  ];

  basicCode = `<nx-activity-explorer [events]="events"></nx-activity-explorer>`;

  basicTs = `events: NxActivityEvent[] = [
  { id: 1, user: 'Bahaa', action: 'updated', entity: 'Project', entityName: 'Marketing Site',
    detail: 'Status: Draft → Published', date: '2026-10-01T14:20:00', icon: 'nx-edit' },
  { id: 2, user: 'Ahmed', action: 'uploaded', entity: 'Document', entityName: 'Q3-report.pdf',
    date: '2026-10-01T11:05:00', icon: 'nx-upload' },
  // ...more events - grouped by day, filterable by user/action/entity/date range/search
];`;
}
