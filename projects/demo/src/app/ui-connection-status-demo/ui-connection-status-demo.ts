import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxConnectionState, NxConnectionStatus } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-connection-status-demo',
  imports: [NxConnectionStatus, DemoSection],
  templateUrl: './ui-connection-status-demo.html',
  styleUrl: './ui-connection-status-demo.scss',
})
export class UiConnectionStatusDemo {
  importCode = `import { NxConnectionStatus } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  basicCode = `<nx-connection-status></nx-connection-status>`;
  basicTs = `// display defaults to 'pill' - a small inline indicator, e.g. for a navbar
// or status bar. It auto-detects via navigator.onLine unless you pass 'status'.`;

  demoStatus: NxConnectionState = 'online';

  toggle(): void {
    this.demoStatus = this.demoStatus === 'online' ? 'offline' : 'online';
  }

  manualCode = `<nx-connection-status [status]="demoStatus"></nx-connection-status>`;
  manualTs = `demoStatus: NxConnectionState = 'online';

toggle(): void {
  this.demoStatus = this.demoStatus === 'online' ? 'offline' : 'online';
}`;
}
