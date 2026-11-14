import { Component, inject } from '@angular/core';
import { NxNotificationCategory, NxNotificationChannel, NxNotificationPreferences } from 'components';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-notification-preferences-demo',
  imports: [NxNotificationPreferences, DemoSection],
  templateUrl: './ui-notification-preferences-demo.html',
  styleUrl: './ui-notification-preferences-demo.scss',
})
export class UiNotificationPreferencesDemo {
  importCode = `import { NxNotificationPreferences } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  categories: NxNotificationCategory[] = [
    { key: 'comments', label: 'Comments', description: 'Replies and comments on items you follow' },
    { key: 'mentions', label: 'Mentions', description: 'Someone mentions you directly' },
    { key: 'digest', label: 'Weekly Digest', description: 'A weekly summary of activity' },
    { key: 'security', label: 'Security Alerts', description: 'Sign-ins and account changes' },
  ];

  channels: NxNotificationChannel[] = [
    { key: 'email', label: 'Email' },
    { key: 'push', label: 'Push' },
    { key: 'sms', label: 'SMS' },
  ];

  values: Record<string, Record<string, boolean>> = {
    comments: { email: true, push: true, sms: false },
    mentions: { email: true, push: true, sms: true },
    digest: { email: true, push: false, sms: false },
    security: { email: true, push: true, sms: true },
  };

  lastChange = '';

  basicCode = `<nx-notification-preferences
  [categories]="categories"
  [channels]="channels"
  [values]="values"
  (valuesChange)="onValuesChange($event)">
</nx-notification-preferences>`;

  basicTs = `categories: NxNotificationCategory[] = [
  { key: 'comments', label: 'Comments', description: 'Replies and comments on items you follow' },
  { key: 'mentions', label: 'Mentions', description: 'Someone mentions you directly' },
  { key: 'digest', label: 'Weekly Digest', description: 'A weekly summary of activity' },
  { key: 'security', label: 'Security Alerts', description: 'Sign-ins and account changes' },
];

channels: NxNotificationChannel[] = [
  { key: 'email', label: 'Email' },
  { key: 'push', label: 'Push' },
  { key: 'sms', label: 'SMS' },
];

values: Record<string, Record<string, boolean>> = {
  comments: { email: true, push: true, sms: false },
  mentions: { email: true, push: true, sms: true },
  digest: { email: true, push: false, sms: false },
  security: { email: true, push: true, sms: true },
};

onValuesChange(next: Record<string, Record<string, boolean>>): void {
  this.values = next;
}`;

  onValuesChange(next: Record<string, Record<string, boolean>>): void {
    this.values = next;
    this.lastChange = `values updated: ${JSON.stringify(next)}`;
  }
}
