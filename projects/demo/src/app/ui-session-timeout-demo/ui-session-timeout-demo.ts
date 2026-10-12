import { Component, inject, signal } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxSessionTimeout } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-session-timeout-demo',
  imports: [NxSessionTimeout, DemoSection],
  templateUrl: './ui-session-timeout-demo.html',
  styleUrl: './ui-session-timeout-demo.scss',
})
export class UiSessionTimeoutDemo {
  importCode = `import { NxSessionTimeout } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  // Shortened so the full idle -> warning -> countdown -> expire flow is visible in seconds
  // instead of the real 15-minute default - clearly called out in the demo copy below.
  demoIdleTimeoutMs = 8000;
  demoWarningDurationMs = 10000;

  eventLog = signal<string[]>([]);

  onSessionExpired(): void {
    this.logEvent('sessionExpired - countdown reached zero, session treated as expired.');
  }

  onExtended(): void {
    this.logEvent('extended - user clicked "Stay signed in", idle timer restarted.');
  }

  onSignedOut(): void {
    this.logEvent('signedOut - user clicked "Sign out" explicitly.');
  }

  private logEvent(message: string): void {
    const stamp = new Date().toLocaleTimeString();
    this.eventLog.update((current) => [`[${stamp}] ${message}`, ...current].slice(0, 8));
  }

  basicCode = `<nx-session-timeout
    [idleTimeoutMs]="8000"
    [warningDurationMs]="10000"
    (sessionExpired)="onSessionExpired()"
    (extended)="onExtended()"
    (signedOut)="onSignedOut()">
</nx-session-timeout>`;

  basicTs = `// Real-world usage would use the 15-minute/60-second defaults:
<nx-session-timeout
  (sessionExpired)="logOutUser()"
  (extended)="refreshAuthToken()"
  (signedOut)="logOutUser()">
</nx-session-timeout>

// idleTimeoutMs: how long with no activity before the warning shows (default 15 min)
// warningDurationMs: how long the countdown in the warning dialog runs (default 60 sec)
// activityEvents: DOM events on document that count as "user is active"
//   (default ['mousedown', 'keydown', 'scroll', 'touchstart'])`;

  inactiveCode = `<nx-session-timeout [active]="false"></nx-session-timeout>`;

  inactiveTs = `// Set [active]="false" on pages with no session to protect yet, e.g. a login screen.
// Idle-tracking is fully disabled - no listeners are bound and no timers run.`;
}
