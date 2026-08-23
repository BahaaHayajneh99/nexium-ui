import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxBadge } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-badge-demo',
  imports: [NxBadge, DemoSection],
  templateUrl: './ui-badge-demo.html',
  styleUrl: './ui-badge-demo.scss',
})
export class UiBadgeDemo {
  importCode = `import { NxBadge } from 'nexium-ui';`;

  public commonService = inject(CommonService);
  basicCode = `<nx-badge>
    New
</nx-badge>`;

  variantsCode = `<nx-badge variant="primary">Primary</nx-badge>
<nx-badge variant="secondary">Secondary</nx-badge>
<nx-badge variant="success">Success</nx-badge>
<nx-badge variant="danger">Danger</nx-badge>
<nx-badge variant="warning">Warning</nx-badge>
<nx-badge variant="info">Info</nx-badge>
<nx-badge variant="dark">Dark</nx-badge>
<nx-badge variant="light">Light</nx-badge>`;

  outlinedCode = `<nx-badge variant="primary" outlined>
    Outlined
</nx-badge>`;

  roundedCode = `<nx-badge variant="danger" rounded>
    8
</nx-badge>`;

  sizesCode = `<nx-badge size="small">Small</nx-badge>
<nx-badge size="medium">Medium</nx-badge>
<nx-badge size="large">Large</nx-badge>`;

  dotCode = `<nx-badge variant="success" dot>
</nx-badge>`;
}
