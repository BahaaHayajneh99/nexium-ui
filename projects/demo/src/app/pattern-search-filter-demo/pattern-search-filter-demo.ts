import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-pattern-search-filter-demo',
  standalone: true,
  imports: [CommonModule, DemoSection],
  templateUrl: './pattern-search-filter-demo.html',
  styleUrls: ['./pattern-search-filter-demo.scss'],
})
export class PatternSearchFilterDemo {
  commonService = inject(CommonService);

  features = [
    { name: 'Full-Text Search', description: 'Query across all fields' },
    { name: 'Faceted Filtering', description: 'Multi-dimensional filters' },
    { name: 'Search Suggestions', description: 'Auto-complete and hints' },
    { name: 'Filter Combinations', description: 'AND/OR logic' },
    { name: 'Result Sorting', description: 'Relevance, date, price' },
    { name: 'Result Highlighting', description: 'Highlight matching text' },
  ];

  useCases = [
    { title: 'E-commerce', description: 'Product search and filtering' },
    { title: 'Job Boards', description: 'Job search with filters' },
    { title: 'Directory', description: 'Contact or listing search' },
    { title: 'Knowledge Base', description: 'Documentation search' },
    { title: 'Analytics', description: 'Data filtering' },
    { title: 'Marketplace', description: 'Inventory search' },
  ];

  implementationSteps = [
    'Set up search input with debouncing',
    'Create filter UI components',
    'Connect to backend search API',
    'Display results with pagination',
    'Show faceted filter counts',
    'Enable filter persistence',
    'Add search result analytics',
  ];
}
