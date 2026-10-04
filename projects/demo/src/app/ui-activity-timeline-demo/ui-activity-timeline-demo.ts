import { Component } from '@angular/core';
import { NxActivityTimeline, NxActivityItem } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-activity-timeline-demo',
  imports: [NxActivityTimeline, DemoSection],
  templateUrl: './ui-activity-timeline-demo.html',
  styleUrl: './ui-activity-timeline-demo.scss',
})
export class UiActivityTimelineDemo {
  importCode = `import { NxActivityTimeline } from 'nexium-ui';`;

  items: NxActivityItem[] = [
    {
      id: 1,
      actorName: 'Layla Haddad',
      action: 'updated',
      target: 'the pricing page',
      timestamp: '2 minutes ago',
    },
    {
      id: 2,
      actorName: 'Omar Nassar',
      actorAvatarUrl: 'https://i.pravatar.cc/40?img=12',
      action: 'commented on',
      target: 'Q3 roadmap',
      timestamp: '1 hour ago',
    },
    {
      id: 3,
      actorName: 'Sara Kanaan',
      action: 'created',
      target: 'a new workspace',
      timestamp: 'Yesterday at 4:12 PM',
    },
    {
      id: 4,
      actorName: 'Tariq Odeh',
      action: 'archived',
      target: 'the legacy invoices project',
      timestamp: '2 days ago',
    },
  ];

  basicCode = `<nx-activity-timeline [items]="items"></nx-activity-timeline>`;
  basicTs = `items: NxActivityItem[] = [
  {
    id: 1,
    actorName: 'Layla Haddad',
    action: 'updated',
    target: 'the pricing page',
    timestamp: '2 minutes ago',
  },
  {
    id: 2,
    actorName: 'Omar Nassar',
    actorAvatarUrl: 'https://i.pravatar.cc/40?img=12',
    action: 'commented on',
    target: 'Q3 roadmap',
    timestamp: '1 hour ago',
  },
  // ...more entries
];`;

  emptyCode = `<nx-activity-timeline [items]="[]"></nx-activity-timeline>`;
  emptyTs = `// With no items, the timeline simply renders nothing - pair it with your own
// empty-state message when needed.`;
}
