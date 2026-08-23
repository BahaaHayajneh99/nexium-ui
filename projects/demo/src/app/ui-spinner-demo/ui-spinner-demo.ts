import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxSpinnerComponent } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-spinner-demo',
  imports: [NxSpinnerComponent, DemoSection],
  templateUrl: './ui-spinner-demo.html',
  styleUrl: './ui-spinner-demo.scss',
})
export class UiSpinnerDemo {
  importCode = `import { NxSpinnerComponent } from 'nexium-ui';`;

  public commonService = inject(CommonService);
  basicCode = `<nx-spinner>
</nx-spinner>`;

  variantsCode = `<nx-spinner variant="primary"></nx-spinner>
<nx-spinner variant="secondary"></nx-spinner>
<nx-spinner variant="success"></nx-spinner>
<nx-spinner variant="danger"></nx-spinner>
<nx-spinner variant="warning"></nx-spinner>
<nx-spinner variant="info"></nx-spinner>
<nx-spinner variant="dark"></nx-spinner>
<nx-spinner variant="light"></nx-spinner>`;

  sizesCode = `<nx-spinner size="small"></nx-spinner>
<nx-spinner size="medium"></nx-spinner>
<nx-spinner size="large"></nx-spinner>`;
}
