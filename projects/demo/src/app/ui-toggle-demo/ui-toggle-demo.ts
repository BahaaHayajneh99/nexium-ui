import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { UiToggle } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-toggle-demo',
  imports: [UiToggle, DemoSection],
  templateUrl: './ui-toggle-demo.html',
  styleUrl: './ui-toggle-demo.scss',
})
export class UiToggleDemo {
  public commonService = inject(CommonService);
  bold = false;
  italic = false;

  basicCode = `<nx-toggle [(pressed)]="bold">Bold</nx-toggle>
<nx-toggle [(pressed)]="italic">Italic</nx-toggle>`;

  basicTs = `bold = false;
italic = false;`;
}
