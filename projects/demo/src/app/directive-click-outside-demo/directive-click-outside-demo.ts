import { Component } from '@angular/core';
import { NxClickOutside, NxButton } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-directive-click-outside-demo',
  imports: [NxClickOutside, NxButton, DemoSection],
  templateUrl: './directive-click-outside-demo.html',
})
export class DirectiveClickOutsideDemo {
  importCode = `import { NxClickOutside } from 'nexium-ui';`;

  panelOpen = false;
  closedCount = 0;

  code = `<nx-button (click)="panelOpen = true">Open panel</nx-button>

@if (panelOpen) {
    <div class="panel" (nxClickOutside)="panelOpen = false">
        Click anywhere outside this box to close it.
    </div>
}`;

  togglePanel(): void {
    this.panelOpen = !this.panelOpen;
  }

  onClickOutside(): void {
    this.panelOpen = false;
    this.closedCount++;
  }
}
