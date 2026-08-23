import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxAccordionComponent, NxAccordionContentComponent, NxAccordionHeaderComponent, NxAccordionItemComponent, NxIcon } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-accordion-demo',
  imports: [NxAccordionComponent, NxAccordionItemComponent, NxAccordionContentComponent, NxAccordionHeaderComponent, NxIcon, DemoSection],
  templateUrl: './ui-accordion-demo.html',
  styleUrl: './ui-accordion-demo.scss',
})
export class UiAccordionDemo {
  importCode = `import {
  NxAccordionComponent,
  NxAccordionContentComponent,
  NxAccordionHeaderComponent,
  NxAccordionItemComponent,
  NxIcon,
} from 'nexium-ui';`;

  public commonService = inject(CommonService);
  basicCode = `<nx-accordion>
    <nx-accordion-item>
        <nx-accordion-header>Personal Information</nx-accordion-header>
        <nx-accordion-content>
            User profile details and information.
        </nx-accordion-content>
    </nx-accordion-item>
</nx-accordion>`;

  variantsCode = `<nx-accordion variant="default"></nx-accordion>

<nx-accordion variant="flat"></nx-accordion>`;

  multipleCode = `<nx-accordion multiple>
    <nx-accordion-item>...</nx-accordion-item>
</nx-accordion>`;

  expandedCode = `<nx-accordion-item expanded>
</nx-accordion-item>`;

  disabledCode = `<nx-accordion-item disabled>
</nx-accordion-item>`;

  iconCode = `<nx-accordion-header> 
  <nx-icon icon="nx-settings" variant="svg" [size]="16"></nx-icon>
 Settings
</nx-accordion-header>`;
}
