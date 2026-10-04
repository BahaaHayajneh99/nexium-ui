import { Component } from '@angular/core';
import { NxScrollLock, NxButton } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-directive-scroll-lock-demo',
  imports: [NxScrollLock, NxButton, DemoSection],
  templateUrl: './directive-scroll-lock-demo.html',
})
export class DirectiveScrollLockDemo {
  importCode = `import { NxScrollLock } from 'nexium-ui';`;

  locked = false;

  code = `<div [nxScrollLock]="locked">
    <nx-button (click)="locked = !locked">
        {{ locked ? 'Unlock' : 'Lock' }} page scroll
    </nx-button>
</div>`;

  filler = Array.from({ length: 10 }, (_, i) => i + 1);

  toggle(): void {
    this.locked = !this.locked;
  }
}
