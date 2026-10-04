import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxMaintenanceState } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-maintenance-state-demo',
  imports: [NxMaintenanceState, DemoSection],
  templateUrl: './ui-maintenance-state-demo.html',
  styleUrl: './ui-maintenance-state-demo.scss',
})
export class UiMaintenanceStateDemo {
  importCode = `import { NxMaintenanceState } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  basicCode = `<nx-maintenance-state></nx-maintenance-state>`;
  basicTs = `// nx-maintenance-state is a preset of nx-result for "temporarily unavailable" pages.`;

  customCode = `<nx-maintenance-state
    title="Upgrading our servers"
    description="Expected to be back by 3:00 PM UTC. Thanks for your patience!"
    actionLabel="Check status page">
</nx-maintenance-state>`;

  customTs = `// actionLabel is empty by default (no button) - set it to add one, e.g. a link to a status page.`;
}
