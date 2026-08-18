import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { UiChip } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-chip-demo',
  imports: [UiChip, DemoSection],
  templateUrl: './ui-chip-demo.html',
  styleUrl: './ui-chip-demo.scss',
})
export class UiChipDemo {
  public commonService = inject(CommonService);
  basicCode = `<nx-chip>
    Angular
</nx-chip>`;

  variantsCode = `<nx-chip variant="primary">Primary</nx-chip>
<nx-chip variant="secondary">Secondary</nx-chip>
<nx-chip variant="success">Success</nx-chip>
<nx-chip variant="danger">Danger</nx-chip>
<nx-chip variant="warning">Warning</nx-chip>
<nx-chip variant="info">Info</nx-chip>`;

  roundedCode = `<nx-chip rounded>
    Rounded Chip
</nx-chip>`;

  outlinedCode = `<nx-chip variant="primary" outlined>
    Outlined Chip
</nx-chip>`;

  removableCode = `<nx-chip removable>
    Angular
</nx-chip>`;

  selectedCode = `<nx-chip selected>
    Selected
</nx-chip>`;

  disabledCode = `<nx-chip disabled>
    Disabled
</nx-chip>`;

  iconCode = `<nx-chip variant="primary">
    Angular
</nx-chip>`;
}
