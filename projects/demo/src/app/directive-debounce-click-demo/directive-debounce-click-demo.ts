import { Component } from '@angular/core';
import { NxDebounceClick, NxButton } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-directive-debounce-click-demo',
  imports: [NxDebounceClick, NxButton, DemoSection],
  templateUrl: './directive-debounce-click-demo.html',
})
export class DirectiveDebounceClickDemo {
  importCode = `import { NxDebounceClick } from 'nexium-ui';`;

  rawClicks = 0;
  submitCount = 0;

  code = `<nx-button [nxDebounceTime]="1000" (nxDebounceClick)="onSubmit()">
    Submit
</nx-button>`;

  onRawClick(): void {
    this.rawClicks++;
  }

  onSubmit(): void {
    this.submitCount++;
  }
}
