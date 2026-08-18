import { Component } from '@angular/core';
import { UiNotificationCenter, NxNotificationItem } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-notification-center-demo',
  imports: [UiNotificationCenter, DemoSection],
  templateUrl: './ui-notification-center-demo.html',
})
export class UiNotificationCenterDemo {
  notifications: NxNotificationItem[] = [
    { id: 1, title: 'New comment', message: 'Ada Lovelace commented on your PR.', time: '2m ago', read: false },
    { id: 2, title: 'Deploy succeeded', message: 'nexium-demo deployed to production.', time: '1h ago', read: false },
    { id: 3, title: 'Weekly digest', message: 'Your activity summary is ready.', time: 'Yesterday', read: true },
  ];

  basicCode = `<nx-notification-center
    [notifications]="notifications"
    (markAllRead)="onMarkAllRead()"
    (dismiss)="onDismiss($event)">
</nx-notification-center>`;

  basicTs = `notifications: NxNotificationItem[] = [
  { id: 1, title: 'New comment', message: 'Ada Lovelace commented on your PR.', time: '2m ago', read: false },
  { id: 2, title: 'Deploy succeeded', message: 'nexium-demo deployed to production.', time: '1h ago', read: false },
  { id: 3, title: 'Weekly digest', message: 'Your activity summary is ready.', time: 'Yesterday', read: true },
];

onMarkAllRead(): void {
  this.notifications = this.notifications.map((n) => ({ ...n, read: true }));
}

onDismiss(item: NxNotificationItem): void {
  this.notifications = this.notifications.filter((n) => n.id !== item.id);
}`;

  onMarkAllRead(): void {
    this.notifications = this.notifications.map((n) => ({ ...n, read: true }));
  }

  onDismiss(item: NxNotificationItem): void {
    this.notifications = this.notifications.filter((n) => n.id !== item.id);
  }

  emptyCode = `<nx-notification-center
    [notifications]="[]"
    emptyMessage="No notifications yet - check back later.">
</nx-notification-center>`;
}
