import { Component, inject } from '@angular/core';
import { NxVirtualScroll } from 'components';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

interface DemoRow {
  id: number;
  name: string;
  value: number;
}

@Component({
  selector: 'app-ui-virtual-scroll-demo',
  imports: [NxVirtualScroll, DemoSection],
  templateUrl: './ui-virtual-scroll-demo.html',
  styleUrl: './ui-virtual-scroll-demo.scss',
})
export class UiVirtualScrollDemo {
  importCode = `import { NxVirtualScroll } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  rows: DemoRow[] = Array.from({ length: 5000 }, (_, i) => ({
    id: i,
    name: `Item ${i + 1}`,
    value: Math.round(Math.random() * 1000),
  }));

  basicCode = `<nx-virtual-scroll [items]="rows" [itemHeight]="40" [height]="400">
    <ng-template let-item let-index="index">
        <div class="vs-row">
            <span class="vs-index">#{{ index }}</span>
            <span class="vs-name">{{ item.name }}</span>
            <span class="vs-value">{{ item.value }}</span>
        </div>
    </ng-template>
</nx-virtual-scroll>`;

  basicTs = `// Generate a large dataset - only the rows visible in the 400px viewport
// (plus a small buffer) are ever rendered to the DOM, so scrolling through
// 5,000 rows stays smooth.
rows = Array.from({ length: 5000 }, (_, i) => ({
  id: i,
  name: \`Item \${i + 1}\`,
  value: Math.round(Math.random() * 1000),
}));

// Row content comes from a projected <ng-template>, not an input - it is
// picked up via ContentChild(TemplateRef) so any markup can be used per row.`;
}
