import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxCollapse } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-collapse-demo',
  imports: [NxCollapse, DemoSection],
  templateUrl: './ui-collapse-demo.html',
  styleUrl: './ui-collapse-demo.scss',
})
export class UiCollapseDemo {
  importCode = `import { NxCollapse } from 'nexium-ui';`;

  public commonService = inject(CommonService);
  basicCode = `<nx-collapse header="Click to expand">
    This is the collapsible content area.
</nx-collapse>`;

  expandedCode = `<nx-collapse header="Expanded by default" [expanded]="true">
    This content is visible by default.
</nx-collapse>`;

  disabledCode = `<nx-collapse header="Disabled" [disabled]="true">
    This content cannot be toggled.
</nx-collapse>`;
}
