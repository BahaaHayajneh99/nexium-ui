import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-pattern-notifications-demo',
  standalone: true,
  imports: [CommonModule, DemoSection],
  templateUrl: './pattern-notifications-demo.html',
  styleUrls: ['./pattern-notifications-demo.scss'],
})
export class PatternNotificationsDemo {
  commonService = inject(CommonService);

  features = [
    { name: 'Toast Notifications', description: 'Transient messages' },
    { name: 'In-app Alerts', description: 'Important announcements' },
    { name: 'Notification Center', description: 'Message history' },
    { name: 'Push Notifications', description: 'Browser/device alerts' },
    { name: 'Email Notifications', description: 'Email delivery' },
    { name: 'Sound Alerts', description: 'Audio notifications' },
  ];

  useCases = [
    { title: 'System Updates', description: 'Server maintenance alerts' },
    { title: 'Order Status', description: 'Order tracking updates' },
    { title: 'Message Alerts', description: 'New message notifications' },
    { title: 'Reminders', description: 'Appointment reminders' },
    { title: 'Error Notifications', description: 'Error reporting' },
    { title: 'Success Confirmations', description: 'Action completion' },
  ];

  notificationTypes = [
    { type: 'Success', icon: '✓', color: 'green', message: 'Operation completed successfully' },
    { type: 'Error', icon: '✕', color: 'red', message: 'An error occurred' },
    { type: 'Warning', icon: '!', color: 'orange', message: 'Please check this' },
    { type: 'Info', icon: 'ℹ', color: 'blue', message: 'Here\'s some information' },
  ];
}
