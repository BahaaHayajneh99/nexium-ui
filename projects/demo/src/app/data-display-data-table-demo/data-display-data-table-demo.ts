import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-data-display-data-table-demo',
  standalone: true,
  imports: [CommonModule, DemoSection],
  templateUrl: './data-display-data-table-demo.html',
  styleUrl: './data-display-data-table-demo.scss',
})
export class DataDisplayDataTableDemo {
  commonService = inject(CommonService);

  basicUsageCode = `<nx-table>
  <nx-table-head>
    <nx-table-row>
      <nx-table-cell>Name</nx-table-cell>
      <nx-table-cell>Email</nx-table-cell>
      <nx-table-cell>Role</nx-table-cell>
    </nx-table-row>
  </nx-table-head>
  <nx-table-body>
    <nx-table-row *ngFor="let user of users">
      <nx-table-cell>{{ user.name }}</nx-table-cell>
      <nx-table-cell>{{ user.email }}</nx-table-cell>
      <nx-table-cell>{{ user.role }}</nx-table-cell>
    </nx-table-row>
  </nx-table-body>
</nx-table>`;

  features = [
    { name: 'Simple Structure', description: 'Easy-to-use table components' },
    { name: 'Striped Rows', description: 'Alternate row coloring for readability' },
    { name: 'Borders & Hover', description: 'Visual feedback on row hover' },
    { name: 'Responsive', description: 'Mobile-friendly table layout' },
    { name: 'Sortable Headers', description: 'Click headers to sort' },
    { name: 'Action Columns', description: 'Include edit/delete buttons' },
  ];

  tableVariants = [
    { name: 'Default', description: 'Standard table with basic borders' },
    { name: 'Striped', description: 'Alternating row colors' },
    { name: 'Hoverable', description: 'Highlight row on hover' },
    { name: 'Compact', description: 'Reduced padding for dense data' },
    { name: 'Responsive', description: 'Stacks columns on small screens' },
  ];

  useCases = [
    { title: 'Contact Lists', description: 'Display contact information' },
    { title: 'Order History', description: 'Show customer transactions' },
    { title: 'Employee Directory', description: 'List team members' },
    { title: 'Price Lists', description: 'Display product pricing' },
    { title: 'Schedule View', description: 'Show timetables or schedules' },
    { title: 'Comparison', description: 'Compare features or prices' },
  ];
}
