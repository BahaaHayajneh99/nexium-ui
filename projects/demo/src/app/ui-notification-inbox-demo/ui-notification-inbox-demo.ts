import { Component, inject, signal } from '@angular/core';
import { CommonService } from '../services/common.service';
import {
  NxNotificationInbox,
  NxNotificationInboxItem,
  NxNotificationActionEvent,
} from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

function hoursAgo(hours: number): string {
  const date = new Date();
  date.setHours(date.getHours() - hours);
  return date.toISOString();
}

function daysAgo(days: number, hour = 9): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  date.setHours(hour, 0, 0, 0);
  return date.toISOString();
}

const ALL_NOTIFICATIONS: NxNotificationInboxItem[] = [
  { id: 1, title: 'Server CPU usage spiked', message: 'web-03 crossed 92% CPU for over five minutes.', timestamp: hoursAgo(1), read: false, category: 'System', priority: 'urgent', actions: [{ id: 'view', label: 'View', icon: '👁' }, { id: 'ack', label: 'Acknowledge' }] },
  { id: 2, title: 'Layla mentioned you', message: '"@you can you take a look at the pricing copy before EOD?"', timestamp: hoursAgo(2), read: false, category: 'Mentions', priority: 'high', actions: [{ id: 'reply', label: 'Reply', icon: '↩' }, { id: 'dismiss', label: 'Dismiss' }] },
  { id: 3, title: 'New version 4.2.0 available', message: 'Includes the new query builder and nine bug fixes.', timestamp: hoursAgo(3), read: false, category: 'Updates', priority: 'normal', actions: [{ id: 'view', label: 'View notes' }] },
  { id: 4, title: 'Backup completed', message: 'Nightly database backup finished successfully (4.2 GB).', timestamp: hoursAgo(5), read: true, category: 'System', priority: 'low', actions: [{ id: 'view', label: 'View log' }] },
  { id: 5, title: 'Omar commented on your task', message: '"Looks good, just fix the typo in the second paragraph."', timestamp: hoursAgo(6), read: false, category: 'Mentions', priority: 'normal', actions: [{ id: 'reply', label: 'Reply' }, { id: 'dismiss', label: 'Dismiss' }] },
  { id: 6, title: 'Payment failed', message: 'Your card ending in 4471 was declined for the Pro plan renewal.', timestamp: hoursAgo(8), read: false, category: 'Billing', priority: 'urgent', actions: [{ id: 'retry', label: 'Retry payment', icon: '⟳' }, { id: 'view', label: 'View invoice' }] },
  { id: 7, title: 'Weekly analytics ready', message: 'Your workspace traffic report for last week is ready.', timestamp: hoursAgo(10), read: true, category: 'Updates', priority: 'low', actions: [{ id: 'view', label: 'View report' }] },
  { id: 8, title: 'Disk space low', message: '/var partition on db-01 is at 88% capacity.', timestamp: daysAgo(1, 14), read: false, category: 'System', priority: 'high', actions: [{ id: 'view', label: 'View' }, { id: 'archive', label: 'Archive', icon: '🗄' }] },
  { id: 9, title: 'Priya invited you to a project', message: '"Onboarding Flow" - you were added as a collaborator.', timestamp: daysAgo(1, 10), read: false, category: 'Mentions', priority: 'normal', actions: [{ id: 'accept', label: 'Accept' }, { id: 'dismiss', label: 'Dismiss' }] },
  { id: 10, title: 'Security: new sign-in', message: 'A new sign-in from Chrome on Windows was detected.', timestamp: daysAgo(1, 7), read: true, category: 'System', priority: 'high', actions: [{ id: 'view', label: 'Review activity' }] },
  { id: 11, title: 'Subscription renewed', message: 'Your Pro plan was renewed for another month.', timestamp: daysAgo(1, 6), read: true, category: 'Billing', priority: 'low', actions: [{ id: 'view', label: 'View invoice' }] },
  { id: 12, title: 'Scheduled maintenance tonight', message: 'Expect brief downtime between 2:00-2:30 AM UTC.', timestamp: daysAgo(2, 16), read: false, category: 'Updates', priority: 'high', actions: [{ id: 'view', label: 'Details' }] },
  { id: 13, title: 'Ahmed approved your request', message: 'Your access request for the "Finance" workspace was approved.', timestamp: daysAgo(2, 9), read: true, category: 'Mentions', priority: 'normal', actions: [{ id: 'view', label: 'Open workspace' }] },
  { id: 14, title: 'API rate limit at 80%', message: 'Your integration is approaching its hourly API quota.', timestamp: daysAgo(3, 11), read: false, category: 'System', priority: 'normal', actions: [{ id: 'view', label: 'View usage' }] },
  { id: 15, title: 'New teammate joined', message: 'Nour Saleh accepted their invite and joined the workspace.', timestamp: daysAgo(3, 8), read: true, category: 'Updates', priority: 'low', actions: [{ id: 'view', label: 'View profile' }] },
  { id: 16, title: 'Sara mentioned you in a comment', message: '"Thanks @you, this unblocks the release."', timestamp: daysAgo(4, 15), read: true, category: 'Mentions', priority: 'low', actions: [{ id: 'reply', label: 'Reply' }] },
  { id: 17, title: 'Invoice overdue', message: 'Invoice #4482 is now 5 days overdue.', timestamp: daysAgo(5, 10), read: false, category: 'Billing', priority: 'urgent', actions: [{ id: 'pay', label: 'Pay now' }, { id: 'view', label: 'View invoice' }] },
  { id: 18, title: 'Changelog: dark mode', message: 'Dark mode is now available across the whole dashboard.', timestamp: daysAgo(9, 12), read: true, category: 'Updates', priority: 'normal', actions: [{ id: 'view', label: 'View changelog' }] },
  { id: 19, title: 'Unusual login location', message: 'A sign-in was detected from a new country (Germany).', timestamp: daysAgo(12, 18), read: false, category: 'System', priority: 'urgent', actions: [{ id: 'view', label: 'Review' }, { id: 'ignore', label: 'Ignore' }] },
  { id: 20, title: 'Tariq archived "Legacy invoices"', message: 'The project was moved to the archive.', timestamp: daysAgo(15, 9), read: true, category: 'Mentions', priority: 'low', actions: [{ id: 'view', label: 'View' }] },
  { id: 21, title: 'Storage plan upgraded', message: 'Your workspace storage limit was increased to 500 GB.', timestamp: daysAgo(20, 13), read: true, category: 'Billing', priority: 'normal', actions: [{ id: 'view', label: 'View plan' }] },
  { id: 22, title: 'Quarterly report published', message: 'The Q3 performance report is now available to all admins.', timestamp: daysAgo(26, 9), read: true, category: 'Updates', priority: 'low', actions: [{ id: 'view', label: 'View report' }] },
];

const PAGE_SIZE = 8;

@Component({
  selector: 'app-ui-notification-inbox-demo',
  imports: [NxNotificationInbox, DemoSection],
  templateUrl: './ui-notification-inbox-demo.html',
  styleUrl: './ui-notification-inbox-demo.scss',
})
export class UiNotificationInboxDemo {
  importCode = `import { NxNotificationInbox } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  // The master dataset - mutated in place by mark-all-read / read-toggle / archive
  // so every section below (which each slice a page out of it) stays in sync.
  private readonly all = signal<NxNotificationInboxItem[]>(ALL_NOTIFICATIONS.map((n) => ({ ...n })));

  visibleCount = signal(PAGE_SIZE);
  loading = signal(false);

  notifications = () => this.all().slice(0, this.visibleCount());
  hasMore = () => this.visibleCount() < this.all().length;

  basicCode = `<nx-notification-inbox
    [notifications]="notifications()"
    [hasMore]="hasMore()"
    [loading]="loading()"
    (loadMore)="onLoadMore()"
    (markAllRead)="onMarkAllRead()"
    (readToggle)="onReadToggle($event)"
    (actionClick)="onActionClick($event)">
</nx-notification-inbox>`;

  basicTs = `// 22 sample notifications spanning System / Mentions / Updates / Billing,
// every priority, and a mix of read/unread state across today, yesterday,
// this week, and older - search, the read/category/priority filters, and
// the date grouping all run live against whatever slice is currently loaded.
notifications = () => this.all().slice(0, this.visibleCount());
hasMore = () => this.visibleCount() < this.all().length;

onLoadMore(): void {
  if (this.loading()) return;
  this.loading.set(true);
  setTimeout(() => {
    this.visibleCount.update((n) => n + 8);
    this.loading.set(false);
  }, 400); // simulated network delay
}`;

  onLoadMore(): void {
    if (this.loading()) {
      return;
    }
    this.loading.set(true);
    // Simulated network round-trip for the next page.
    setTimeout(() => {
      this.visibleCount.update((n) => n + PAGE_SIZE);
      this.loading.set(false);
    }, 400);
  }

  onMarkAllRead(): void {
    this.all.update((items) => items.map((item) => ({ ...item, read: true })));
  }

  onReadToggle(item: NxNotificationInboxItem): void {
    this.all.update((items) => items.map((i) => (i.id === item.id ? { ...i, read: !i.read } : i)));
  }

  onActionClick(event: NxNotificationActionEvent): void {
    if (event.action.id === 'archive' || event.action.id === 'dismiss') {
      this.all.update((items) => items.filter((i) => i.id !== event.item.id));
      return;
    }
    // Any other action (view/reply/retry/accept/...) is left for the host app
    // to route - this demo just marks the item read so the effect is visible.
    this.all.update((items) => items.map((i) => (i.id === event.item.id ? { ...i, read: true } : i)));
  }
}
