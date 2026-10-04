import { Component } from '@angular/core';
import { NxFocusTrap, NxButton } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-directive-focus-trap-demo',
  imports: [NxFocusTrap, NxButton, DemoSection],
  templateUrl: './directive-focus-trap-demo.html',
})
export class DirectiveFocusTrapDemo {
  importCode = `import { NxFocusTrap } from 'nexium-ui';`;

  trapActive = false;

  code = `<div class="fake-modal" [nxFocusTrap]="trapActive">
    <input placeholder="First name" />
    <input placeholder="Last name" />
    <nx-button>Cancel</nx-button>
    <nx-button>Save</nx-button>
</div>`;

  toggle(): void {
    this.trapActive = !this.trapActive;
  }
}
