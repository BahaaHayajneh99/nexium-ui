import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from '../services/common.service';
import { FormsModule } from '@angular/forms';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-pattern-pagination-demo',
  standalone: true,
  imports: [FormsModule,CommonModule,DemoSection],
  templateUrl: './pattern-pagination-demo.html',
  styleUrls: ['./pattern-pagination-demo.scss'],
})
export class PatternPaginationDemo {
  commonService = inject(CommonService);

  currentPage = 1;
  pageSize = 10;
  totalItems = 245;

  features = [
    { name: 'Page Navigation', description: 'Previous/Next buttons' },
    { name: 'Direct Jump', description: 'Go to specific page' },
    { name: 'Page Size Control', description: 'Items per page' },
    { name: 'Total Count', description: 'Show result count' },
    { name: 'Current Position', description: 'Show current range' },
    { name: 'Disabled States', description: 'Handle boundaries' },
  ];

  useCases = [
    { title: 'Search Results', description: 'Navigate result pages' },
    { title: 'Data Tables', description: 'Large dataset browsing' },
    { title: 'Comment Threads', description: 'Comment pagination' },
    { title: 'Product Lists', description: 'Product catalog' },
    { title: 'Infinite Scroll', description: 'Load more pattern' },
    { title: 'API Results', description: 'API response handling' },
  ];

  paginationTypes = [
    { type: 'Offset-based', description: 'Start index + limit (REST API standard)' },
    { type: 'Cursor-based', description: 'Cursor pointer (better for real-time)' },
    { type: 'Keyset', description: 'Last value + limit (scalable)' },
    { type: 'Infinite Scroll', description: 'Auto-load on scroll' },
  ];

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get endIndex(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalItems);
  }
}
