import { Component, inject, signal } from '@angular/core';
import { NxInfiniteScroll } from 'components';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

interface DemoRow {
  id: number;
  label: string;
}

function makeRows(start: number, count: number): DemoRow[] {
  return Array.from({ length: count }, (_, i) => ({ id: start + i, label: `Row ${start + i + 1}` }));
}

@Component({
  selector: 'app-directive-infinite-scroll-demo',
  imports: [NxInfiniteScroll, DemoSection],
  templateUrl: './directive-infinite-scroll-demo.html',
  styleUrl: './directive-infinite-scroll-demo.scss',
})
export class DirectiveInfiniteScrollDemo {
  importCode = `import { NxInfiniteScroll } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  rows = signal<DemoRow[]>(makeRows(0, 30));
  loading = signal(false);

  code = `<div class="scroll-container" nxInfiniteScroll [threshold]="150" (nxInfiniteScroll)="loadMore()">
    @for (row of rows(); track row.id) {
        <div class="row">{{ row.label }}</div>
    }
</div>`;

  ts = `rows = signal<DemoRow[]>(makeRows(0, 30));
loading = signal(false);

loadMore(): void {
  if (this.loading()) {
    return;
  }
  this.loading.set(true);
  // simulate a network request for the next page
  setTimeout(() => {
    this.rows.update((current) => [...current, ...makeRows(current.length, 20)]);
    this.loading.set(false);
  }, 400);
}`;

  loadMore(): void {
    if (this.loading()) {
      return;
    }
    this.loading.set(true);
    setTimeout(() => {
      this.rows.update((current) => [...current, ...makeRows(current.length, 20)]);
      this.loading.set(false);
    }, 400);
  }
}
