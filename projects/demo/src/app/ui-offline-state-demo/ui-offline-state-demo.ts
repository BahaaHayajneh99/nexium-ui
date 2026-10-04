import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxConnectionState, NxConnectionStatus } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-offline-state-demo',
  imports: [NxConnectionStatus, DemoSection],
  templateUrl: './ui-offline-state-demo.html',
  styleUrl: './ui-offline-state-demo.scss',
})
export class UiOfflineStateDemo {
  importCode = `import { NxConnectionStatus } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  autoCode = `<nx-connection-status display="banner"></nx-connection-status>`;
  autoTs = `// With no 'status' input, it auto-detects via navigator.onLine and the
// browser's online/offline events - the banner only appears while you're
// actually offline (try your devtools' network throttling to see it).`;

  demoStatus: NxConnectionState = 'online';

  goOffline(): void {
    this.demoStatus = 'offline';
  }

  goOnline(): void {
    this.demoStatus = 'online';
  }

  manualCode = `<nx-connection-status display="banner" [status]="demoStatus"></nx-connection-status>`;
  manualTs = `demoStatus: NxConnectionState = 'online';

goOffline(): void { this.demoStatus = 'offline'; }
goOnline(): void { this.demoStatus = 'online'; }`;
}
