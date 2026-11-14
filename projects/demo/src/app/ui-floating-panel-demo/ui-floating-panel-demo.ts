import { Component, OnDestroy, inject, signal } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxFloatingPanel } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-floating-panel-demo',
  imports: [NxFloatingPanel, DemoSection],
  templateUrl: './ui-floating-panel-demo.html',
  styleUrl: './ui-floating-panel-demo.scss',
})
export class UiFloatingPanelDemo implements OnDestroy {
  importCode = `import { NxFloatingPanel } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  // Signals: visible/collapsed/activeUsers all change after user interaction (close, collapse
  // toggle, the live-updating stat below) - in this zoneless demo app a plain property write
  // wouldn't be picked up until some unrelated click happened to trigger a re-render.
  panelVisible = signal(true);
  panelCollapsed = signal(false);
  activeUsers = signal(128);

  private readonly statInterval = setInterval(() => {
    this.activeUsers.update((count) => Math.max(0, count + Math.round((Math.random() - 0.45) * 6)));
  }, 1500);

  ngOnDestroy(): void {
    clearInterval(this.statInterval);
  }

  onClosed(): void {
    this.panelVisible.set(false);
  }

  onCollapsedChange(collapsed: boolean): void {
    this.panelCollapsed.set(collapsed);
  }

  reopenPanel(): void {
    this.panelVisible.set(true);
    this.panelCollapsed.set(false);
  }

  basicCode = `<nx-floating-panel
    title="Live Stats"
    [initialX]="24"
    [initialY]="24"
    [collapsed]="panelCollapsed()"
    (closed)="onClosed()"
    (collapsedChange)="onCollapsedChange($event)">
    <p>Active users right now: <strong>{{ activeUsers() }}</strong></p>
</nx-floating-panel>`;

  basicTs = `panelCollapsed = signal(false);
activeUsers = signal(128);

onClosed(): void {
  // Host decides whether to actually remove the panel - e.g. hide it behind a "reopen" button.
  this.panelVisible.set(false);
}

onCollapsedChange(collapsed: boolean): void {
  this.panelCollapsed.set(collapsed);
}`;
}
