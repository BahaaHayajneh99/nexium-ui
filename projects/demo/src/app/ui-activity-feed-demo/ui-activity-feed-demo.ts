import { Component } from '@angular/core';
import { NxActivityFeed, NxActivityFeedItem } from 'components';
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
}
