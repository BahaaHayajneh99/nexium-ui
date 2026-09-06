import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-pattern-data-management-demo',
  standalone: true,
  imports: [CommonModule, DemoSection],
  templateUrl: './pattern-data-management-demo.html',
  styleUrls: ['./pattern-data-management-demo.scss'],
})
export class PatternDataManagementDemo {
  commonService = inject(CommonService);

  features = [
    { name: 'Data Import', description: 'CSV/Excel upload' },
    { name: 'Data Export', description: 'Download data formats' },
    { name: 'Data Validation', description: 'Type checking' },
    { name: 'Duplicate Detection', description: 'Find duplicates' },
    { name: 'Batch Processing', description: 'Multi-record updates' },
    { name: 'Data Mapping', description: 'Field transformation' },
  ];

  useCases = [
    { title: 'Bulk Import', description: 'Large dataset uploads' },
    { title: 'Data Migration', description: 'System to system transfer' },
    { title: 'Analytics Export', description: 'Report generation' },
    { title: 'Backup/Restore', description: 'Data preservation' },
    { title: 'Sync Operations', description: 'Multi-source sync' },
    { title: 'Data Cleaning', description: 'Deduplication and normalization' },
  ];

  dataFlows = [
    { stage: 'Import', tasks: 'Upload file → Validate → Preview' },
    { stage: 'Mapping', tasks: 'Field matching → Transform → Deduplicate' },
    { stage: 'Processing', tasks: 'Batch validation → Conflict resolution' },
    { stage: 'Export', tasks: 'Format selection → Generate → Download' },
  ];
}
