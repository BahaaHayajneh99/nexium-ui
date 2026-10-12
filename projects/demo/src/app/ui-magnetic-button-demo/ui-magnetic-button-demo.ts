import { Component } from '@angular/core';
import { NxMagneticButton } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-magnetic-button-demo',
  imports: [NxMagneticButton, DemoSection],
  templateUrl: './ui-magnetic-button-demo.html',
  styleUrl: './ui-magnetic-button-demo.scss',
})
export class UiMagneticButtonDemo {
  importCode = `import { NxMagneticButton } from 'nexium-ui';`;

  basicCode = `<nx-magnetic-button>Hover me</nx-magnetic-button>`;

  strengthCode = `<nx-magnetic-button [strength]="0.15">Subtle pull</nx-magnetic-button>
<nx-magnetic-button [strength]="0.5">Strong pull</nx-magnetic-button>`;

  radiusCode = `<!-- radius pads the hit area so the pull starts before the cursor reaches the button -->
<nx-magnetic-button [strength]="0.3" [radius]="40">Magnetic zone</nx-magnetic-button>

<nx-magnetic-button [disabled]="true">Disabled</nx-magnetic-button>`;
}
