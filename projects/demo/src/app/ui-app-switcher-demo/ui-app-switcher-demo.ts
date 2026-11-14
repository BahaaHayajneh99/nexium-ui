import { Component, inject, signal } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxAppSwitcher, NxAppSwitcherItem } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-app-switcher-demo',
  imports: [NxAppSwitcher, DemoSection],
  templateUrl: './ui-app-switcher-demo.html',
  styleUrl: './ui-app-switcher-demo.scss',
})
export class UiAppSwitcherDemo {
  importCode = `import { NxAppSwitcher, NxAppSwitcherItem } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  apps: NxAppSwitcherItem[] = [
    { label: 'Dashboard', icon: 'nx-monitor', url: 'https://app.example.com/dashboard' },
    { label: 'Analytics', icon: 'nx-chart-bar', url: 'https://app.example.com/analytics' },
    { label: 'Billing', icon: 'nx-credit-card', url: 'https://app.example.com/billing' },
    { label: 'Support', icon: 'nx-help-circle', url: 'https://app.example.com/support' },
    { label: 'Docs', icon: 'nx-book', url: 'https://app.example.com/docs' },
    { label: 'Settings', icon: 'nx-settings', url: 'https://app.example.com/settings' },
  ];

  // Signal: the demo reflects the most recently chosen app back into the view, and in this
  // zoneless app a plain property write wouldn't be picked up until some unrelated click happened.
  lastSelected = signal<NxAppSwitcherItem | null>(null);

  onAppSelected(app: NxAppSwitcherItem): void {
    this.lastSelected.set(app);
  }

  basicCode = `<nx-app-switcher
    [apps]="apps"
    triggerLabel="Switch app"
    (appSelected)="onAppSelected($event)">
</nx-app-switcher>`;

  basicTs = `apps: NxAppSwitcherItem[] = [
  { label: 'Dashboard', icon: 'nx-monitor', url: 'https://app.example.com/dashboard' },
  { label: 'Analytics', icon: 'nx-chart-bar', url: 'https://app.example.com/analytics' },
  { label: 'Billing', icon: 'nx-credit-card', url: 'https://app.example.com/billing' },
  // ...more apps
];

onAppSelected(app: NxAppSwitcherItem): void {
  // e.g. window.open(app.url, '_blank') or router navigation
}`;
}
