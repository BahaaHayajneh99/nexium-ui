import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-pattern-crud-demo',
  standalone: true,
  imports: [CommonModule, DemoSection],
  templateUrl: './pattern-crud-demo.html',
  styleUrls: ['./pattern-crud-demo.scss'],
})
export class PatternCrudDemo {
  commonService = inject(CommonService);

  features = [
    { name: 'Create Records', description: 'Add new items' },
    { name: 'Read Display', description: 'View item details' },
    { name: 'Update Edit', description: 'Modify existing data' },
    { name: 'Delete Remove', description: 'Remove items' },
    { name: 'Undo/Restore', description: 'Recover deleted items' },
    { name: 'Bulk Operations', description: 'Multi-item actions' },
  ];

  useCases = [
    { title: 'Admin Panels', description: 'Content management' },
    { title: 'Inventory', description: 'Stock management' },
    { title: 'Database Tools', description: 'Record management' },
    { title: 'Issue Tracking', description: 'Bug/task management' },
    { title: 'Blog CMS', description: 'Post management' },
    { title: 'User Management', description: 'Account administration' },
  ];

  crudOperations = [
    { operation: 'CREATE', endpoint: 'POST /api/items', action: 'Insert new record' },
    { operation: 'READ', endpoint: 'GET /api/items/:id', action: 'Retrieve record' },
    { operation: 'UPDATE', endpoint: 'PUT /api/items/:id', action: 'Modify record' },
    { operation: 'DELETE', endpoint: 'DELETE /api/items/:id', action: 'Remove record' },
  ];
}
