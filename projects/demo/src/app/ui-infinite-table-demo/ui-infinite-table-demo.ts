import { Component, inject, signal } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxInfiniteTable, NxInfiniteTableColumn } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

const FIRST_NAMES = ['Ava', 'Liam', 'Mia', 'Noah', 'Zoe', 'Ethan', 'Luna', 'Mason', 'Isla', 'Leo'];
const LAST_NAMES = ['Carter', 'Nguyen', 'Patel', 'Müller', 'Rossi', 'Kowalski', 'Haddad', 'Silva', 'Kim', 'Dubois'];
const ROLES = ['Engineer', 'Designer', 'Product Manager', 'QA Analyst', 'Support Agent', 'Data Analyst'];
const TOTAL_ROWS = 100;

@Component({
  selector: 'app-ui-infinite-table-demo',
  imports: [NxInfiniteTable, DemoSection],
  templateUrl: './ui-infinite-table-demo.html',
  styleUrl: './ui-infinite-table-demo.scss',
})
export class UiInfiniteTableDemo {
  importCode = `import { NxInfiniteTable, NxInfiniteTableColumn } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  columns: NxInfiniteTableColumn[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
  ];

  // Signals rather than plain properties: onLoadMore below mutates all three after the simulated
  // network delay, and in this zoneless demo app a plain property write wouldn't be picked up
  // until some unrelated click happened to trigger a re-render.
  rows = signal<Record<string, unknown>[]>(this.generateRows(0, 20));
  loading = signal(false);
  hasMore = signal(true);

  private generateRows(start: number, count: number): Record<string, unknown>[] {
    return Array.from({ length: count }, (_, i) => {
      const index = start + i;
      const first = FIRST_NAMES[index % FIRST_NAMES.length];
      const last = LAST_NAMES[(index * 3 + 1) % LAST_NAMES.length];
      const role = ROLES[index % ROLES.length];
      return {
        id: index + 1,
        name: `${first} ${last}`,
        email: `${first.toLowerCase()}.${last.toLowerCase()}@acme.dev`,
        role,
      };
    });
  }

  onLoadMore(): void {
    if (this.loading() || !this.hasMore()) {
      return;
    }
    this.loading.set(true);
    // Simulated network round-trip - a real app would fetch the next page here instead.
    setTimeout(() => {
      const current = this.rows();
      const next = this.generateRows(current.length, 20);
      const updated = [...current, ...next];
      this.rows.set(updated);
      this.loading.set(false);
      this.hasMore.set(updated.length < TOTAL_ROWS);
    }, 700);
  }

  basicCode = `<nx-infinite-table
    [columns]="columns"
    [rows]="rows()"
    [hasMore]="hasMore()"
    [loading]="loading()"
    [maxHeight]="420"
    (loadMore)="onLoadMore()">
</nx-infinite-table>`;

  basicTs = `columns: NxInfiniteTableColumn[] = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
];

rows = signal<Record<string, unknown>[]>(generateRows(0, 20));
loading = signal(false);
hasMore = signal(true);

onLoadMore(): void {
  if (this.loading() || !this.hasMore()) return;
  this.loading.set(true);
  fetchNextPage().then((nextRows) => {
    this.rows.update((current) => [...current, ...nextRows]);
    this.loading.set(false);
    this.hasMore.set(this.rows().length < TOTAL_ROWS);
  });
}`;
}
