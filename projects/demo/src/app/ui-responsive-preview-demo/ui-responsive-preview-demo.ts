import { Component } from '@angular/core';
import { NxResponsivePreview, NxResponsiveBreakpoint } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-responsive-preview-demo',
  imports: [NxResponsivePreview, DemoSection],
  templateUrl: './ui-responsive-preview-demo.html',
  styleUrl: './ui-responsive-preview-demo.scss',
})
export class UiResponsivePreviewDemo {
  importCode = `import { NxResponsivePreview } from 'nexium-ui';`;

  basicCode = `<nx-responsive-preview>
    <div class="card">
        <h4>Card title</h4>
        <p>Some sample content that reflows as the viewport width changes.</p>
    </div>
</nx-responsive-preview>`;

  customBreakpoints: NxResponsiveBreakpoint[] = [
    { id: 'small', label: 'Small', width: 320 },
    { id: 'medium', label: 'Medium', width: 600 },
    { id: 'large', label: 'Large', width: 960 },
  ];

  customCode = `<nx-responsive-preview [breakpoints]="customBreakpoints" activeId="medium">
    <div class="card">Custom set of breakpoints</div>
</nx-responsive-preview>`;

  customTs = `customBreakpoints = [
  { id: 'small', label: 'Small', width: 320 },
  { id: 'medium', label: 'Medium', width: 600 },
  { id: 'large', label: 'Large', width: 960 },
];`;

  eventCode = `<nx-responsive-preview (activeIdChange)="onActiveIdChange($event)">
    <div class="card">Watch the console for the emitted id</div>
</nx-responsive-preview>`;

  eventTs = `onActiveIdChange(id: string): void {
  console.log('active breakpoint id', id);
}`;

  onActiveIdChange(id: string): void {
    console.log('active breakpoint id', id);
  }
}
