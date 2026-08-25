import { Component } from '@angular/core';
import { NxAutofocus, NxButton } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-directive-autofocus-demo',
  imports: [NxAutofocus, NxButton, DemoSection],
  templateUrl: './directive-autofocus-demo.html',
})
export class DirectiveAutofocusDemo {
  importCode = `import { NxAutofocus } from 'nexium-ui';`;

  formOpen = false;

  code = `<nx-button (click)="formOpen = true">Add item</nx-button>

@if (formOpen) {
    <input placeholder="Name" nxAutofocus />
}`;

  toggleForm(): void {
    this.formOpen = !this.formOpen;
  }
}
