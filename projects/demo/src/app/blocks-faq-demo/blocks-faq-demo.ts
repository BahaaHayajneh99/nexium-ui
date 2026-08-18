import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxAccordionComponent, NxAccordionItemComponent, NxAccordionHeaderComponent, NxAccordionContentComponent } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-blocks-faq-demo',
  imports: [NxAccordionComponent, NxAccordionItemComponent, NxAccordionHeaderComponent, NxAccordionContentComponent, DemoSection],
  templateUrl: './blocks-faq-demo.html',
})
export class BlocksFaqDemo {
  public commonService = inject(CommonService);
  faqs = [
    { q: `Is ${this.commonService.appName} free to use?`, a: 'Yes - it ships under the MIT license, for personal and commercial projects alike.' },
    { q: 'Does it depend on Angular CDK?', a: 'No - every behaviour (overlays, positioning, focus) is hand-rolled with no external UI dependency.' },
    { q: 'Can I use my own color palette?', a: `Yes - override the SCSS token variables before importing ${this.commonService.appName}'s styles. See Guide > Theming.` },
    { q: 'Is it accessible?', a: 'AA is the target for every component - see the Accessibility section for specifics and known gaps.' },
  ];

  code = `<nx-accordion>
    @for (item of faqs; track item.q) {
        <nx-accordion-item>
            <nx-accordion-header>{{ item.q }}</nx-accordion-header>
            <nx-accordion-content>{{ item.a }}</nx-accordion-content>
        </nx-accordion-item>
    }
</nx-accordion>`;

  tsCode = `faqs = [
  { q: 'Is ${this.commonService.appName} free to use?', a: 'Yes - it ships under the MIT license, for personal and commercial projects alike.' },
  { q: 'Does it depend on Angular CDK?', a: 'No - every behaviour (overlays, positioning, focus) is hand-rolled with no external UI dependency.' },
  { q: 'Can I use my own color palette?', a: 'Yes - override the SCSS token variables before importing ${this.commonService.appName}'s styles. See Guide > Theming.' },
  { q: 'Is it accessible?', a: 'AA is the target for every component - see the Accessibility section for specifics and known gaps.' },
];`;
}
