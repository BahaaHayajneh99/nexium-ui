import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxNavGroup } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-nav-group-demo',
  imports: [NxNavGroup, DemoSection],
  templateUrl: './ui-nav-group-demo.html',
  styleUrl: './ui-nav-group-demo.scss',
})
export class UiNavGroupDemo {
  importCode = `import { NxNavGroup } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  basicCode = `<nx-nav-group label="Workspace" icon="nx-folder">
    <a href="javascript:void(0)">Overview</a>
    <a href="javascript:void(0)">Members</a>
    <a href="javascript:void(0)">Settings</a>
</nx-nav-group>`;

  basicTs = `// Nav links are projected via the default slot - use any content you like.`;

  collapsedCode = `<nx-nav-group label="Archived" icon="nx-folder-open" [defaultExpanded]="false">
    <a href="javascript:void(0)">2023 projects</a>
    <a href="javascript:void(0)">2022 projects</a>
</nx-nav-group>`;

  collapsedTs = `// defaultExpanded controls the initial state only - after that, the
// group's expand/collapse is driven internally by clicking its header.`;

  sidebarCode = `<nx-nav-group label="Workspace" icon="nx-folder">
    <a>Overview</a>
    <a>Members</a>
</nx-nav-group>
<nx-nav-group label="Reports" icon="nx-chart-bar" [defaultExpanded]="false">
    <a>Weekly summary</a>
    <a>Exports</a>
</nx-nav-group>`;

  sidebarTs = `// A typical use case - stacking several groups to build a sidebar section.`;
}
