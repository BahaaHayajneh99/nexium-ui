import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxStatusIndicator } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-status-indicator-demo',
  imports: [NxStatusIndicator, DemoSection],
  templateUrl: './ui-status-indicator-demo.html',
  styleUrl: './ui-status-indicator-demo.scss',
})
export class UiStatusIndicatorDemo {
  importCode = `import { NxStatusIndicator } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  basicCode = `<nx-status-indicator variant="success" label="Active"></nx-status-indicator>
<nx-status-indicator variant="warning" label="Away"></nx-status-indicator>
<nx-status-indicator variant="danger" label="Offline"></nx-status-indicator>
<nx-status-indicator variant="info" label="In progress"></nx-status-indicator>
<nx-status-indicator variant="neutral" label="Unknown"></nx-status-indicator>`;

  basicTs = `// variant accepts 'success' | 'danger' | 'warning' | 'info' | 'neutral' (default).`;

  pulseCode = `<nx-status-indicator variant="success" label="Live" [pulse]="true"></nx-status-indicator>
<nx-status-indicator variant="danger" label="Recording" [pulse]="true"></nx-status-indicator>`;

  pulseTs = `// pulse adds an animated expanding ring - useful for something actively happening right now.`;

  servers = [
    { name: 'api-prod-1', status: 'success' as const, label: 'Healthy' },
    { name: 'api-prod-2', status: 'success' as const, label: 'Healthy' },
    { name: 'worker-queue', status: 'warning' as const, label: 'Degraded' },
    { name: 'db-replica', status: 'danger' as const, label: 'Down' },
  ];

  contextCode = `<div class="server-row" *ngFor="let server of servers">
    <span>{{ server.name }}</span>
    <nx-status-indicator [variant]="server.status" [label]="server.label"></nx-status-indicator>
</div>`;

  contextTs = `servers = [
  { name: 'api-prod-1', status: 'success', label: 'Healthy' },
  { name: 'api-prod-2', status: 'success', label: 'Healthy' },
  { name: 'worker-queue', status: 'warning', label: 'Degraded' },
  { name: 'db-replica', status: 'danger', label: 'Down' },
];`;
}
