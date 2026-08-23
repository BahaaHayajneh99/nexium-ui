import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxPopover } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-popover-demo',
  imports: [NxPopover, DemoSection],
  templateUrl: './ui-popover-demo.html',
  styleUrl: './ui-popover-demo.scss',
})
export class UiPopoverDemo {
  importCode = `import { NxPopover } from 'nexium-ui';`;

  public commonService = inject(CommonService);
  basicCode = `<nx-popover>
    <button nx-popover-trigger>Click me</button>
    <div>Popover content goes here.</div>
</nx-popover>`;

  positionCode = `<nx-popover position="right">
    <button nx-popover-trigger>Right aligned</button>
    <div>This popover opens to the right.</div>
</nx-popover>`;
}
