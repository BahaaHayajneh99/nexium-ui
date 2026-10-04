import { Component } from '@angular/core';
import { NxHotkey } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-directive-hotkey-demo',
  imports: [NxHotkey, DemoSection],
  templateUrl: './directive-hotkey-demo.html',
})
export class DirectiveHotkeyDemo {
  importCode = `import { NxHotkey } from 'nexium-ui';`;

  panelOpen = false;
  triggeredCount = 0;

  code = `<div [nxHotkey]="'ctrl+k'" (nxHotkeyTriggered)="openPanel()"></div>

@if (panelOpen) {
    <div class="panel" [nxHotkey]="'escape'" (nxHotkeyTriggered)="panelOpen = false">
        Panel opened via Ctrl+K - press Escape to close it.
    </div>
}`;

  openPanel(): void {
    this.triggeredCount++;
    this.panelOpen = true;
  }

  closePanel(): void {
    this.panelOpen = false;
  }
}
