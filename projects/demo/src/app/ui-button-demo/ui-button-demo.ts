import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxButton } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';
import { NxIcon } from '../../../../../dist/components';

@Component({
  selector: 'app-ui-button-demo',
  imports: [NxIcon,NxButton, DemoSection],
  templateUrl: './ui-button-demo.html',
  styleUrl: './ui-button-demo.scss',
})
export class UiButtonDemo {
  importCode = `import { NxButton, NxIcon } from 'nexium-ui';`;

  public commonService = inject(CommonService);
  basicCode = `<nx-button variant="primary">
    Primary Button
</nx-button>`;

  variantsCode = `<nx-button variant="primary">Primary</nx-button>
<nx-button variant="secondary">Secondary</nx-button>
<nx-button variant="success">Success</nx-button>
<nx-button variant="danger">Danger</nx-button>
<nx-button variant="warning">Warning</nx-button>
<nx-button variant="info">Info</nx-button>
<nx-button variant="dark">Dark</nx-button>
<nx-button variant="light">Light</nx-button>`;

  outlineCode = `<nx-button variant="outline">
    Outline Button
</nx-button>`;

  flatCode = `<nx-button variant="flat">
    Flat Button
</nx-button>`;

  ghostCode = `<nx-button variant="ghost">
    Ghost Button
</nx-button>`;

  disabledCode = `<nx-button variant="primary" [disabled]="true">
    Disabled Button
</nx-button>`;

  raisedCode = `<nx-button variant="primary" [raised]="true">
    Raised Button
</nx-button>`;

  iconCode = `<nx-button variant="ghost" [icon]="true"> 
  <nx-icon icon="nx-settings" size="32" variant="svg"></nx-icon> 
</nx-button>`;

  fabCode = `<nx-button variant="primary" [fab]="true"> 
  <nx-icon icon="nx-plus" variant="svg"></nx-icon> 
</nx-button>`;

  sizesCode = `<nx-button size="small">Small</nx-button>
<nx-button size="medium">Medium</nx-button>
<nx-button size="large">Large</nx-button>`;

  fullWidthCode = `<nx-button variant="primary" [fullWidth]="true">
    Full Width Button
</nx-button>`;

  roundedCode = `<nx-button variant="primary" rounded>
    Rounded Button
</nx-button>`;
}
