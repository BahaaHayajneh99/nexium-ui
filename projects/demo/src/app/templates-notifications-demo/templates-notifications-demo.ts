import { Component } from '@angular/core';
import { NxNotificationCenter, NxNotificationItem, NxCard, NxCardHeader, NxCardTitle, NxCardContent, NxSwitch } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-templates-notifications-demo',
  imports: [NxNotificationCenter, NxCard, NxCardHeader, NxCardTitle, NxCardContent, NxSwitch, DemoSection],
  templateUrl: './templates-notifications-demo.html',
})
export class TemplatesNotificationsDemo {
  notifications: NxNotificationItem[] = [
    { id: 1, title: 'New comment', message: 'Grace Hopper commented on your PR.', time: '5m ago', read: false },
    { id: 2, title: 'Deploy succeeded', message: 'production was deployed successfully.', time: '1h ago', read: false },
    { id: 3, title: 'Weekly summary', message: 'Your team closed 12 issues this week.', time: 'Yesterday', read: true },
  ];

  emailOnComment = true;
  emailOnMention = true;
  emailOnDigest = false;
  pushOnDeploy = true;

  bellCode = `<nx-notification-center [notifications]="notifications"></nx-notification-center>`;

  prefsCode = `<nx-card variant="elevated">
    <nx-card-header>
        <nx-card-title>Email Notifications</nx-card-title>
    </nx-card-header>
    <nx-card-content>
        <div>
            <div>Comments on my work</div>
            <nx-switch [(checked)]="emailOnComment"></nx-switch>
        </div>
        <div>
            <div>Mentions</div>
            <nx-switch [(checked)]="emailOnMention"></nx-switch>
        </div>
        <div>
            <div>Weekly digest</div>
            <nx-switch [(checked)]="emailOnDigest"></nx-switch>
        </div>
    </nx-card-content>
</nx-card>`;
}
