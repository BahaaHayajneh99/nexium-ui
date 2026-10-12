import { Component, inject, signal } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxDeviceSessions, NxDeviceSession } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-device-sessions-demo',
  imports: [NxDeviceSessions, DemoSection],
  templateUrl: './ui-device-sessions-demo.html',
  styleUrl: './ui-device-sessions-demo.scss',
})
export class UiDeviceSessionsDemo {
  importCode = `import { NxDeviceSessions } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  // Signal rather than a plain property: revoke/revokeAll below rebuild this immutably, and in
  // this zoneless demo app a plain property write wouldn't be picked up until some unrelated
  // click happened to trigger a re-render.
  sessions = signal<NxDeviceSession[]>([
    {
      id: 1,
      deviceName: 'Windows PC',
      deviceType: 'desktop',
      browser: 'Chrome 128',
      location: 'Amman, Jordan',
      lastActive: '2026-10-08T09:10:00',
      isCurrent: true,
    },
    {
      id: 2,
      deviceName: 'iPhone 15',
      deviceType: 'mobile',
      browser: 'Safari 18',
      location: 'Amman, Jordan',
      lastActive: '2026-10-08T07:40:00',
      isCurrent: false,
    },
    {
      id: 3,
      deviceName: 'iPad Air',
      deviceType: 'tablet',
      browser: 'Safari 18',
      location: 'Amman, Jordan',
      lastActive: '2026-10-06T20:05:00',
      isCurrent: false,
    },
    {
      id: 4,
      deviceName: 'MacBook Pro',
      deviceType: 'desktop',
      browser: 'Firefox 131',
      location: 'Berlin, Germany',
      lastActive: '2026-10-05T12:22:00',
      isCurrent: false,
    },
    {
      id: 5,
      deviceName: 'Galaxy S23',
      deviceType: 'mobile',
      browser: 'Chrome 128',
      location: 'Cairo, Egypt',
      lastActive: '2026-10-03T16:48:00',
      isCurrent: false,
    },
  ]);

  onRevoke(id: string | number): void {
    this.sessions.update((current) => current.filter((session) => session.id !== id));
  }

  onRevokeAll(): void {
    this.sessions.update((current) => current.filter((session) => session.isCurrent));
  }

  basicCode = `<nx-device-sessions
    [sessions]="sessions()"
    (revoke)="onRevoke($event)"
    (revokeAll)="onRevokeAll()">
</nx-device-sessions>`;

  basicTs = `sessions: NxDeviceSession[] = [
  {
    id: 1, deviceName: 'Windows PC', deviceType: 'desktop', browser: 'Chrome 128',
    location: 'Amman, Jordan', lastActive: '2026-10-08T09:10:00', isCurrent: true,
  },
  {
    id: 2, deviceName: 'iPhone 15', deviceType: 'mobile', browser: 'Safari 18',
    location: 'Amman, Jordan', lastActive: '2026-10-08T07:40:00', isCurrent: false,
  },
  // ...more sessions
];

onRevoke(id: string | number): void {
  // Remove (or call your API to revoke) the session matching this id.
}

onRevokeAll(): void {
  // Revoke every session except the current one.
}`;
}
