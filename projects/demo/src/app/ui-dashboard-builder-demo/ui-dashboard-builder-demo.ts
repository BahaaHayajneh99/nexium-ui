import { Component, inject } from '@angular/core';
import { NxDashboardBuilder, NxDashboardLayout } from '../../../../../dist/components';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-dashboard-builder-demo',
  imports: [NxDashboardBuilder, DemoSection],
  templateUrl: './ui-dashboard-builder-demo.html',
  styleUrl: './ui-dashboard-builder-demo.scss',
})
export class UiDashboardBuilderDemo {
  importCode = `import { NxDashboardBuilder } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  layouts: NxDashboardLayout[] = [
    {
      name: 'Sales overview',
      theme: 'light',
      widgets: [
        { id: 'w1', type: 'metric', title: 'Metric 1' },
        { id: 'w2', type: 'chart', title: 'Chart 1' },
      ],
      layoutItems: [
        { id: 'w1', x: 0, y: 0, w: 4, h: 2 },
        { id: 'w2', x: 4, y: 0, w: 8, h: 3 },
      ],
    },
    {
      name: 'Ops health',
      theme: 'dark',
      widgets: [{ id: 'w3', type: 'text', title: 'Text 1' }],
      layoutItems: [{ id: 'w3', x: 0, y: 0, w: 6, h: 2 }],
    },
  ];

  savedLayouts: NxDashboardLayout[] = [];

  onLayoutSaved(layout: NxDashboardLayout): void {
    this.savedLayouts = [...this.savedLayouts, { ...layout }];
  }

  basicCode = `<nx-dashboard-builder [layouts]="layouts" (layoutSaved)="onLayoutSaved($event)"></nx-dashboard-builder>`;

  basicTs = `layouts: NxDashboardLayout[] = [
  { name: 'Sales overview', theme: 'light', widgets: [ /* ... */ ], layoutItems: [ /* ... */ ] },
  { name: 'Ops health', theme: 'dark', widgets: [ /* ... */ ], layoutItems: [ /* ... */ ] },
];

onLayoutSaved(layout: NxDashboardLayout): void {
  // Save button emits the whole current NxDashboardLayout (name, widgets, layoutItems, theme).
  this.savedLayouts.push(layout);
}`;
}
