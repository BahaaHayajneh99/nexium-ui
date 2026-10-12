import { Component } from '@angular/core';
import { NxActivityFeed, NxActivityFeedAction, NxActivityFeedItem } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

function hoursAgo(hours: number): string {
  const date = new Date();
  date.setHours(date.getHours() - hours);
  return date.toISOString();
}

function daysAgo(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
}

@Component({
  selector: 'app-ui-activity-feed-demo',
  imports: [NxActivityFeed, DemoSection],
  templateUrl: './ui-activity-feed-demo.html',
  styleUrl: './ui-activity-feed-demo.scss',
})
export class UiActivityFeedDemo {
  importCode = `import { NxActivityFeed } from 'nexium-ui';`;

  items: NxActivityFeedItem[] = [
    { id: 1, actorName: 'Layla Haddad', action: 'updated', target: 'the pricing page', timestamp: hoursAgo(1) },
    { id: 2, actorName: 'Omar Nassar', actorAvatarUrl: 'https://i.pravatar.cc/40?img=12', action: 'commented on', target: 'Q3 roadmap', timestamp: hoursAgo(4) },
    { id: 3, actorName: 'Sara Kanaan', action: 'created', target: 'a new workspace', timestamp: daysAgo(1) },
    { id: 4, actorName: 'Tariq Odeh', action: 'archived', target: 'the legacy invoices project', timestamp: daysAgo(1) },
    { id: 5, actorName: 'Nour Saleh', action: 'invited', target: 'two teammates', timestamp: daysAgo(6) },
  ];

  basicCode = `<nx-activity-feed [items]="items"></nx-activity-feed>`;
  basicTs = `// groupByDay defaults to true - entries are bucketed under 'Today',
// 'Yesterday', or a full date, based on each item's ISO timestamp.
items: NxActivityFeedItem[] = [
  { id: 1, actorName: 'Layla Haddad', action: 'updated', target: 'the pricing page', timestamp: '...' },
  { id: 2, actorName: 'Omar Nassar', actorAvatarUrl: '...', action: 'commented on', target: 'Q3 roadmap', timestamp: '...' },
  // ...more entries
];`;

  flatCode = `<nx-activity-feed [items]="items" [groupByDay]="false"></nx-activity-feed>`;
  flatTs = `// Set groupByDay to false for one flat list with no day headers.`;

  visibleItems: NxActivityFeedItem[] = this.items.slice(0, 3);

  loadMoreCode = `<nx-activity-feed
    [items]="visibleItems"
    [showLoadMore]="visibleItems.length < items.length"
    (loadMore)="onLoadMore()">
</nx-activity-feed>`;

  loadMoreTs = `visibleItems = this.items.slice(0, 3);

onLoadMore(): void {
  this.visibleItems = this.items;
}`;

  onLoadMore(): void {
    this.visibleItems = this.items;
  }

  // PRO: a richer dataset carrying `category` (for the actor/type filters), `metadata`
  // (rendered in an expandable detail row), and per-item `actions`.
  richItems: NxActivityFeedItem[] = [
    {
      id: 101,
      actorName: 'Layla Haddad',
      action: 'approved',
      target: 'refund request #4821',
      category: 'billing',
      timestamp: hoursAgo(1),
      metadata: [
        { label: 'Amount', value: '$128.00' },
        { label: 'Customer', value: 'Bluewave Inc.' },
        { label: 'Reason', value: 'Duplicate charge' },
      ],
      actions: [
        { id: 'view', label: 'View', icon: 'nx-eye' },
        { id: 'undo', label: 'Undo', icon: 'nx-refresh' },
      ],
    },
    {
      id: 102,
      actorName: 'Omar Nassar',
      actorAvatarUrl: 'https://i.pravatar.cc/40?img=12',
      action: 'flagged',
      target: 'a failed login attempt',
      category: 'security',
      timestamp: hoursAgo(3),
      metadata: [
        { label: 'IP address', value: '203.0.113.42' },
        { label: 'Location', value: 'Amman, JO' },
        { label: 'Attempts', value: '5' },
      ],
      actions: [{ id: 'view', label: 'View', icon: 'nx-eye' }],
    },
    {
      id: 103,
      actorName: 'Sara Kanaan',
      action: 'commented on',
      target: 'Q3 roadmap',
      category: 'comment',
      timestamp: hoursAgo(6),
    },
    {
      id: 104,
      actorName: 'Tariq Odeh',
      action: 'deleted',
      target: 'the staging database snapshot',
      category: 'security',
      timestamp: daysAgo(1),
      metadata: [{ label: 'Snapshot id', value: 'snap-9f21c' }],
      actions: [{ id: 'undo', label: 'Undo', icon: 'nx-refresh' }],
    },
    {
      id: 105,
      actorName: 'Nour Saleh',
      action: 'issued',
      target: 'a billing credit',
      category: 'billing',
      timestamp: daysAgo(2),
      metadata: [
        { label: 'Amount', value: '$40.00' },
        { label: 'Customer', value: 'Orbit Labs' },
      ],
    },
  ];

  lastAction = '';

  metadataCode = `<nx-activity-feed [items]="items"></nx-activity-feed>`;
  metadataTs = `// Any item with a \`metadata\` array renders a small chevron that expands
// into a label/value detail row - handy for billing, security or audit-style entries.
items: NxActivityFeedItem[] = [
  {
    id: 101,
    actorName: 'Layla Haddad',
    action: 'approved',
    target: 'refund request #4821',
    timestamp: '...',
    metadata: [
      { label: 'Amount', value: '$128.00' },
      { label: 'Customer', value: 'Bluewave Inc.' },
      { label: 'Reason', value: 'Duplicate charge' },
    ],
  },
  // ...more entries
];`;

  filtersCode = `<nx-activity-feed [items]="items" [showFilters]="true"></nx-activity-feed>`;
  filtersTs = `// Give items an optional 'category' and turn on showFilters - a filter bar appears
// automatically whenever there's more than one actor or any categories to narrow by.
items: NxActivityFeedItem[] = [
  { id: 101, actorName: 'Layla Haddad', action: 'approved', category: 'billing', timestamp: '...' },
  { id: 102, actorName: 'Omar Nassar', action: 'flagged', category: 'security', timestamp: '...' },
  // ...more entries
];`;

  actionsCode = `<nx-activity-feed
    [items]="items"
    [itemActions]="defaultActions"
    (actionInvoked)="onActionInvoked($event)">
</nx-activity-feed>`;

  actionsTs = `// itemActions is the fallback action set for every item; an item can override it with
// its own \`actions\` array instead (e.g. only offering "Undo" on destructive entries).
defaultActions: NxActivityFeedAction[] = [{ id: 'view', label: 'View', icon: 'nx-eye' }];

onActionInvoked({ item, action }: { item: NxActivityFeedItem; action: NxActivityFeedAction }): void {
  console.log(action.id, 'on', item.target ?? item.action);
}`;

  defaultActions: NxActivityFeedAction[] = [{ id: 'view', label: 'View', icon: 'nx-eye' }];

  onActionInvoked({ item, action }: { item: NxActivityFeedItem; action: NxActivityFeedAction }): void {
    this.lastAction = `${action.label} → ${item.actorName}: ${item.action} ${item.target ?? ''}`.trim();
  }
}
