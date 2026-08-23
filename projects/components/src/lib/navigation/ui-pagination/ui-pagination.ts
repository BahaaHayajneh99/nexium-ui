import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'nx-pagination',
  standalone: true,
  imports: [NgClass],
  templateUrl: './ui-pagination.html',
  styleUrl: './ui-pagination.scss',
})
export class NxPagination {
  @Input() totalPages = 1;
  @Input() currentPage = 1;

  @Output() currentPageChange = new EventEmitter<number>();

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.currentPage) {
      return;
    }
    this.currentPage = page;
    this.currentPageChange.emit(page);
  }
}
