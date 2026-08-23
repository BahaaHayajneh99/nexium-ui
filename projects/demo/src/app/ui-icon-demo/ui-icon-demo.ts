import { Component } from '@angular/core';
import { NxIcon } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-icon-demo',
  imports: [NxIcon, DemoSection],
  templateUrl: './ui-icon-demo.html',
  styleUrl: './ui-icon-demo.scss',
})
export class UiIconDemo {
  importCode = `import { NxIcon } from 'nexium-ui';`;

  basicSvgCode = `<nx-icon icon="nx-facebook" variant="svg"></nx-icon>`;

  basicIconCode = `<nx-icon icon="nx-facebook"></nx-icon>`;

  sizeCode = `<nx-icon icon="nx-star" variant="svg" [size]="16"></nx-icon>
<nx-icon icon="nx-star" variant="svg" [size]="24"></nx-icon>
<nx-icon icon="nx-star" variant="svg" [size]="32"></nx-icon>
<nx-icon icon="nx-star" variant="svg" [size]="48"></nx-icon>`;

  colorCode = `<nx-icon icon="nx-heart" variant="svg" color="#3498db"></nx-icon>
<nx-icon icon="nx-heart" variant="svg" color="#2ecc71"></nx-icon>
<nx-icon icon="nx-heart" variant="svg" color="#e67e22"></nx-icon>
<nx-icon icon="nx-heart" variant="svg" color="#e74c3c"></nx-icon>`;
}
