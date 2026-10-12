import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxLoginActivity, NxLoginActivityEntry } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-login-activity-demo',
  imports: [NxLoginActivity, DemoSection],
  templateUrl: './ui-login-activity-demo.html',
  styleUrl: './ui-login-activity-demo.scss',
})
export class UiLoginActivityDemo {
  importCode = `import { NxLoginActivity } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  entries: NxLoginActivityEntry[] = [
    {
      id: 1,
      timestamp: '2026-10-07T21:58:00',
      ipAddress: '185.220.101.47',
      location: 'Unknown',
      device: 'Firefox on Linux',
      success: false,
      failureReason: 'Incorrect password',
    },
    {
      id: 2,
      timestamp: '2026-10-07T21:55:00',
      ipAddress: '185.220.101.47',
      location: 'Unknown',
      device: 'Firefox on Linux',
      success: false,
      failureReason: 'Incorrect password',
    },
    {
      id: 3,
      timestamp: '2026-10-06T15:03:00',
      ipAddress: '94.123.11.9',
      location: 'Amman, Jordan',
      device: 'Chrome 128 on Windows',
      success: true,
    },
    {
      id: 4,
      timestamp: '2026-10-05T09:42:00',
      ipAddress: '94.123.11.9',
      location: 'Amman, Jordan',
      device: 'Safari on iPhone',
      success: true,
    },
    {
      id: 5,
      timestamp: '2026-10-03T07:30:00',
      ipAddress: '203.0.113.19',
      location: 'Berlin, Germany',
      device: 'Chrome on Android',
      success: false,
      failureReason: 'Account locked',
    },
    {
      id: 6,
      timestamp: '2026-10-01T08:05:00',
      ipAddress: '94.123.11.9',
      location: 'Amman, Jordan',
      device: 'Chrome 128 on Windows',
      success: true,
    },
    {
      id: 7,
      timestamp: '2026-09-29T19:12:00',
      ipAddress: '41.202.8.33',
      location: 'Cairo, Egypt',
      device: 'Edge on Windows',
      success: false,
      failureReason: 'Incorrect password',
    },
  ];

  basicCode = `<nx-login-activity [entries]="entries"></nx-login-activity>`;

  basicTs = `entries: NxLoginActivityEntry[] = [
  {
    id: 1, timestamp: '2026-10-07T21:58:00', ipAddress: '185.220.101.47',
    location: 'Unknown', device: 'Firefox on Linux',
    success: false, failureReason: 'Incorrect password',
  },
  {
    id: 2, timestamp: '2026-10-06T15:03:00', ipAddress: '94.123.11.9',
    location: 'Amman, Jordan', device: 'Chrome 128 on Windows', success: true,
  },
  // ...more attempts
];`;
}
