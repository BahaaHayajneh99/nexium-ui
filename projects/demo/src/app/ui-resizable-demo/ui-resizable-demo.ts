import { Component } from '@angular/core';
import { NxResizable, NxResizeEvent } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-resizable-demo',
  imports: [NxResizable, DemoSection],
  templateUrl: './ui-resizable-demo.html',
  styleUrl: './ui-resizable-demo.scss',
})
export class UiResizableDemo {
  importCode = `import { NxResizable } from 'nexium-ui';`;

  basicCode = `<nx-resizable [width]="320" [height]="200">
  <div class="resizable-placeholder">Resize me from the edges or corner</div>
</nx-resizable>`;

  constraintsCode = `<nx-resizable
  [width]="320"
  [height]="200"
  [minWidth]="150"
  [maxWidth]="500"
  [minHeight]="100"
  [maxHeight]="350">
  <div class="resizable-placeholder">Bounded between 150-500 wide and 100-350 tall</div>
</nx-resizable>`;

  singleHandleCode = `<nx-resizable [width]="320" [height]="200" [handles]="cornerOnly">
  <div class="resizable-placeholder">Only the corner handle is draggable</div>
</nx-resizable>`;
  singleHandleTs = `cornerOnly: ('right' | 'bottom' | 'corner')[] = ['corner'];`;

  reactingCode = `<nx-resizable [width]="320" [height]="200" (resized)="onResized($event)">
  <div class="resizable-placeholder">Drag to see the live size below</div>
</nx-resizable>
<p>{{ liveWidth }} x {{ liveHeight }}px</p>`;
  reactingTs = `liveWidth = 320;
liveHeight = 200;

onResized(event: NxResizeEvent): void {
  this.liveWidth = event.width;
  this.liveHeight = event.height;
}`;

  disabledCode = `<nx-resizable [width]="320" [height]="200" [disabled]="true">
  <div class="resizable-placeholder">Handles are hidden, dragging is inert</div>
</nx-resizable>`;

  cornerOnly: ('right' | 'bottom' | 'corner')[] = ['corner'];

  liveWidth = 320;
  liveHeight = 200;

  onResized(event: NxResizeEvent): void {
    this.liveWidth = event.width;
    this.liveHeight = event.height;
  }
}
