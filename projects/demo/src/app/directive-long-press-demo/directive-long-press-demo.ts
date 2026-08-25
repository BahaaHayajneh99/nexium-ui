import { Component } from '@angular/core';
import { NxLongPress, NxButton } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-directive-long-press-demo',
  imports: [NxLongPress, NxButton, DemoSection],
  templateUrl: './directive-long-press-demo.html',
})
export class DirectiveLongPressDemo {
  importCode = `import { NxLongPress } from 'nexium-ui';`;

  triggeredCount = 0;

  code = `<nx-button [nxLongPressDuration]="600" (nxLongPress)="onLongPress()">
    Hold me
</nx-button>`;

  onLongPress(): void {
    this.triggeredCount++;
  }
}
