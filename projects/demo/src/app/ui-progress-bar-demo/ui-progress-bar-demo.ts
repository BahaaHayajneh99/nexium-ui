import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { UiProgressBarComponent } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-progress-bar-demo',
  imports: [UiProgressBarComponent, DemoSection],
  templateUrl: './ui-progress-bar-demo.html',
  styleUrl: './ui-progress-bar-demo.scss',
})
export class UiProgressBarDemo {
  public commonService = inject(CommonService);
  basicCode = `<nx-progress-bar [value]="60">
</nx-progress-bar>`;

  variantsCode = `<nx-progress-bar variant="primary" [value]="70">
</nx-progress-bar>

<nx-progress-bar variant="secondary" [value]="80">
</nx-progress-bar>

<nx-progress-bar variant="success" [value]="90">
</nx-progress-bar>

<nx-progress-bar variant="danger" [value]="40">
</nx-progress-bar>

<nx-progress-bar variant="warning" [value]="60">
</nx-progress-bar>

<nx-progress-bar variant="info" [value]="70">
</nx-progress-bar>

<nx-progress-bar variant="dark" [value]="50">
</nx-progress-bar>

<nx-progress-bar variant="light" [value]="30">
</nx-progress-bar>`;

  roundedCode = `<nx-progress-bar rounded [value]="75">
</nx-progress-bar>`;

  sizesCode = `<nx-progress-bar size="small" [value]="40">
</nx-progress-bar>

<nx-progress-bar size="medium" [value]="60">
</nx-progress-bar>

<nx-progress-bar size="large" [value]="80">
</nx-progress-bar>`;

  labelCode = `<nx-progress-bar showLabel [value]="65">
</nx-progress-bar>`;

  stripedCode = `<nx-progress-bar striped [value]="70">
</nx-progress-bar>`;

  animatedCode = `<nx-progress-bar striped animated [value]="80">
</nx-progress-bar>`;

  indeterminateCode = `<nx-progress-bar indeterminate>
</nx-progress-bar>`;
}
