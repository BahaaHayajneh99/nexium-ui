import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { UiPagination } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-pagination-demo',
  imports: [UiPagination, DemoSection],
  templateUrl: './ui-pagination-demo.html',
  styleUrl: './ui-pagination-demo.scss',
})
export class UiPaginationDemo {
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
