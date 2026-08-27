import { Component } from '@angular/core';
import { NxNotificationCenter, NxNotificationItem, NxButton } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-how-to-notification-feed-demo',
  imports: [NxNotificationCenter, NxButton, DemoSection],
  templateUrl: './how-to-notification-feed-demo.html',
})
export class HowToNotificationFeedDemo {
  notifications: NxNotificationItem[] = [
    { id: 1, title: 'New comment', message: 'Grace Hopper commented on your PR.', time: '2m ago', read: false },
    { id: 2, title: 'Deploy succeeded', message: 'Production deploy finished with no errors.', time: '1h ago', read: false },
    { id: 3, title: 'Weekly summary', message: 'Your weekly activity report is ready.', time: '1d ago', read: true },
  ];

  private nextId = 4;

  simulate(): void {
    this.notifications = [
      { id: this.nextId++, title: 'New notification', message: 'Something just happened in your workspace.', time: 'just now', read: false },
      ...this.notifications,
    ];
  }

  onMarkAllRead(): void {
    this.notifications = this.notifications.map((n) => ({ ...n, read: true }));
  }

  onDismiss(item: NxNotificationItem): void {
    this.notifications = this.notifications.filter((n) => n.id !== item.id);
  }

  code = `<nx-button variant="primary" (click)="simulate()">Simulate New Notification</nx-button>

<nx-notification-center
    [notifications]="notifications"
    (markAllRead)="onMarkAllRead()"
    (dismiss)="onDismiss($event)">
</nx-notification-center>`;

  tsCode = `notifications: NxNotificationItem[] = [ /* ... */ ];
private nextId = 4;

simulate(): void {
  this.notifications = [
    { id: this.nextId++, title: 'New notification', message: '...', time: 'just now', read: false },
    ...this.notifications,
  ];
}

onMarkAllRead(): void {
  this.notifications = this.notifications.map((n) => ({ ...n, read: true }));
}

onDismiss(item: NxNotificationItem): void {
  this.notifications = this.notifications.filter((n) => n.id !== item.id);
}`;
}
