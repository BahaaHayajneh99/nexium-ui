import { Component, inject } from '@angular/core';
import { NxWidgetGrid, NxWidgetLayoutItem } from '../../../../../dist/components';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

interface DemoWidget {
  id: string;
  title: string;
  kind: string;
}

@Component({
  selector: 'app-ui-widget-grid-demo',
  imports: [NxWidgetGrid, DemoSection],
  templateUrl: './ui-widget-grid-demo.html',
  styleUrl: './ui-widget-grid-demo.scss',
})
export class UiWidgetGridDemo {
  importCode = `import { NxWidgetGrid } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  widgets: DemoWidget[] = [
    { id: 'revenue', title: 'Revenue', kind: 'metric' },
    { id: 'signups', title: 'New signups', kind: 'metric' },
    { id: 'traffic', title: 'Traffic sources', kind: 'chart' },
    { id: 'notes', title: 'Release notes', kind: 'text' },
    { id: 'latency', title: 'API latency', kind: 'chart' },
  ];

  layout: NxWidgetLayoutItem[] = [
    { id: 'revenue', x: 0, y: 0, w: 3, h: 2 },
    { id: 'signups', x: 3, y: 0, w: 3, h: 2 },
    { id: 'traffic', x: 6, y: 0, w: 6, h: 3 },
    { id: 'notes', x: 0, y: 2, w: 6, h: 2 },
    { id: 'latency', x: 0, y: 4, w: 6, h: 3 },
  ];

  lastChange = '';

  widgetFor(id: string): DemoWidget | undefined {
    return this.widgets.find((w) => w.id === id);
  }

  onLayoutChange(items: NxWidgetLayoutItem[]): void {
    this.layout = items;
    this.lastChange = `layoutChange fired with ${items.length} widgets at ${new Date().toLocaleTimeString()}`;
  }

  basicCode = `<nx-widget-grid [layout]="layout" [columns]="12" [rowHeight]="80" [gap]="12" (layoutChange)="onLayoutChange($event)">
  <ng-template let-item>
    <!-- item: NxWidgetLayoutItem - look up your own widget data by item.id -->
    <div>{{ widgetFor(item.id)?.title }}</div>
  </ng-template>
</nx-widget-grid>`;

  basicTs = `layout: NxWidgetLayoutItem[] = [
  { id: 'revenue', x: 0, y: 0, w: 3, h: 2 },
  { id: 'signups', x: 3, y: 0, w: 3, h: 2 },
  { id: 'traffic', x: 6, y: 0, w: 6, h: 3 },
  // ...
];

onLayoutChange(items: NxWidgetLayoutItem[]): void {
  // Fires once a drag or resize gesture ends (mouseup), not on every intermediate
  // mousemove frame - items are already snapped to whole grid cells.
  this.layout = items;
}`;
}
