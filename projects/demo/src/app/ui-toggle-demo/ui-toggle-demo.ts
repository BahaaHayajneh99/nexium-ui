import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxToggle } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-toggle-demo',
  imports: [NxToggle, DemoSection],
  templateUrl: './ui-toggle-demo.html',
  styleUrl: './ui-toggle-demo.scss',
})
export class UiToggleDemo {
  importCode = `import { NxToggle } from 'nexium-ui';`;

  public commonService = inject(CommonService);
  bold = false;
  italic = false;

  basicCode = `<nx-toggle [(pressed)]="bold">Bold</nx-toggle>
<nx-toggle [(pressed)]="italic">Italic</nx-toggle>`;

  basicTs = `bold = false;
italic = false;`;
}
