import { Component } from '@angular/core';
import { NxLayoutPreview } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-layout-preview-demo',
  imports: [NxLayoutPreview, DemoSection],
  templateUrl: './ui-layout-preview-demo.html',
  styleUrl: './ui-layout-preview-demo.scss',
})
export class UiLayoutPreviewDemo {
  importCode = `import { NxLayoutPreview } from 'nexium-ui';`;

  templatesCode = `<nx-layout-preview template="sidebar-left" label="Sidebar Left"></nx-layout-preview>
<nx-layout-preview template="sidebar-right" label="Sidebar Right"></nx-layout-preview>
<nx-layout-preview template="header-content" label="Header + Content"></nx-layout-preview>
<nx-layout-preview template="holy-grail" label="Holy Grail"></nx-layout-preview>`;

  templatesTs = `// template accepts 'sidebar-left' | 'sidebar-right' | 'header-content' | 'holy-grail' | 'blank' (default).`;

  selectedCode = `<nx-layout-preview template="sidebar-left" label="Sidebar Left" [selected]="true"></nx-layout-preview>
<nx-layout-preview template="holy-grail" label="Holy Grail"></nx-layout-preview>`;

  pickerCode = `<div class="picker" *ngFor="let option of layouts">
    <nx-layout-preview
        [template]="option.template"
        [label]="option.label"
        [selected]="option.template === selectedTemplate"
        (click)="selectedTemplate = option.template">
    </nx-layout-preview>
</div>`;

  pickerTs = `layouts = [
  { template: 'sidebar-left', label: 'Sidebar Left' },
  { template: 'sidebar-right', label: 'Sidebar Right' },
  { template: 'header-content', label: 'Header + Content' },
  { template: 'holy-grail', label: 'Holy Grail' },
];

selectedTemplate: string = 'sidebar-left';`;

  layouts: { template: 'sidebar-left' | 'sidebar-right' | 'header-content' | 'holy-grail'; label: string }[] = [
    { template: 'sidebar-left', label: 'Sidebar Left' },
    { template: 'sidebar-right', label: 'Sidebar Right' },
    { template: 'header-content', label: 'Header + Content' },
    { template: 'holy-grail', label: 'Holy Grail' },
  ];

  selectedTemplate = 'sidebar-left';
}
