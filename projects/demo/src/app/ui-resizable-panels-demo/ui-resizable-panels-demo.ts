import { Component, inject } from '@angular/core';
import { NxResizablePanel, NxResizablePanels } from 'components';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-resizable-panels-demo',
  imports: [NxResizablePanels, NxResizablePanel, DemoSection],
  templateUrl: './ui-resizable-panels-demo.html',
  styleUrl: './ui-resizable-panels-demo.scss',
})
export class UiResizablePanelsDemo {
  importCode = `import { NxResizablePanels, NxResizablePanel } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  basicCode = `<nx-resizable-panels style="height: 320px;">
    <nx-resizable-panel [size]="25" [minSize]="15">Sidebar</nx-resizable-panel>
    <nx-resizable-panel [size]="50" [minSize]="20">Main content</nx-resizable-panel>
    <nx-resizable-panel [size]="25" [minSize]="15">Details</nx-resizable-panel>
</nx-resizable-panels>`;

  basicTs = `// Panels are declared directly in the template as literal <nx-resizable-panel>
// children - there is no data-driven "items" input, the parent discovers its
// panels via @ContentChildren. size/minSize are percentages of the container
// along the panels' orientation, and gutters between panels are draggable.`;

  verticalCode = `<nx-resizable-panels orientation="vertical" style="height: 320px;">
    <nx-resizable-panel [size]="60" [minSize]="20">Top</nx-resizable-panel>
    <nx-resizable-panel [size]="40" [minSize]="20">Bottom</nx-resizable-panel>
</nx-resizable-panels>`;

  verticalTs = `// orientation="vertical" stacks panels top-to-bottom instead of side by side,
// and gutters become horizontal drag handles.`;
}
