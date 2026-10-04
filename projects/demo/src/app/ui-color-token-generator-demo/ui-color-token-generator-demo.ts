import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxColorTokenGenerator } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-color-token-generator-demo',
  imports: [NxColorTokenGenerator, DemoSection],
  templateUrl: './ui-color-token-generator-demo.html',
  styleUrl: './ui-color-token-generator-demo.scss',
})
export class UiColorTokenGeneratorDemo {
  importCode = `import { NxColorTokenGenerator } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  baseColor = '#3498db';

  onBaseColorChange(value: string): void {
    this.baseColor = value;
  }

  basicCode = `<nx-color-token-generator [baseColor]="baseColor" (baseColorChange)="onBaseColorChange($event)" tokenPrefix="brand"></nx-color-token-generator>`;

  basicTs = `baseColor = '#3498db';

onBaseColorChange(value: string): void {
  this.baseColor = value;
}`;

  successColor = '#16a085';

  onSuccessColorChange(value: string): void {
    this.successColor = value;
  }

  successCode = `<nx-color-token-generator [baseColor]="successColor" (baseColorChange)="onSuccessColorChange($event)" tokenPrefix="success"></nx-color-token-generator>`;

  successTs = `// Any base color generates its own full 50-950 scale, held to the same
// fixed lightness steps - swap the color, the token prefix, or both.
successColor = '#16a085';`;
}
