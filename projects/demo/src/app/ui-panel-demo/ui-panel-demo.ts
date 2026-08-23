import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxPanel } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-panel-demo',
  imports: [NxPanel, DemoSection],
  templateUrl: './ui-panel-demo.html',
  styleUrl: './ui-panel-demo.scss',
})
export class UiPanelDemo {
  importCode = `import { NxPanel } from 'nexium-ui';`;

  public commonService = inject(CommonService);
  basicCode = `<nx-panel header="Panel Title">
    Panel body content goes here.
</nx-panel>`;

  outlinedCode = `<nx-panel header="Outlined Panel" variant="outlined">
    This panel uses the outlined variant.
</nx-panel>`;

  footerCode = `<nx-panel header="Panel with Footer">
    Panel body content goes here.
    <div nx-panel-footer>Footer content</div>
</nx-panel>`;
}
