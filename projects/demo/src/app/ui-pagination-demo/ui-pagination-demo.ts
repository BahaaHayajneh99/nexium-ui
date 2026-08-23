import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxPagination } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-pagination-demo',
  imports: [NxPagination, DemoSection],
  templateUrl: './ui-pagination-demo.html',
  styleUrl: './ui-pagination-demo.scss',
})
export class UiPaginationDemo {
  importCode = `import { NxPagination } from 'nexium-ui';`;

  public commonService = inject(CommonService);
  currentPage = 1;

  basicCode = `<nx-pagination [totalPages]="10" [(currentPage)]="currentPage">
</nx-pagination>`;

  basicTs = `currentPage = 1;`;

  eventsPage = 1;
  lastChangedPage: number | null = null;

  eventsCode = `<nx-pagination
    [totalPages]="10"
    [currentPage]="eventsPage"
    (currentPageChange)="onPageChange($event)">
</nx-pagination>`;

  eventsTs = `eventsPage = 1;
lastChangedPage: number | null = null;

onPageChange(page: number): void {
  this.eventsPage = page;
  this.lastChangedPage = page;
}`;

  onPageChange(page: number): void {
    this.eventsPage = page;
    this.lastChangedPage = page;
  }
}
