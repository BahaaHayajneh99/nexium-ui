import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxTreeTable, NxTreeTableColumn, NxTreeTableNode } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-data-display-tree-table-demo',
  standalone: true,
  imports: [NxTreeTable, DemoSection],
  templateUrl: './data-display-tree-table-demo.html',
  styleUrl: './data-display-tree-table-demo.scss',
})
export class DataDisplayTreeTableDemo {
  commonService = inject(CommonService);

  importCode = `import { NxTreeTable } from 'nexium-ui';`;

  columns: NxTreeTableColumn[] = [
    { field: 'name', header: 'Name' },
    { field: 'size', header: 'Size', width: '120px' },
  ];

  fileData: NxTreeTableNode[] = [
    {
      id: '1',
      name: 'Project Folder',
      size: '2.5 GB',
      children: [
        {
          id: '1.1',
          name: 'src',
          size: '1.2 GB',
          children: [
            { id: '1.1.1', name: 'app.ts', size: '45 KB' },
            { id: '1.1.2', name: 'styles.scss', size: '28 KB' },
            {
              id: '1.1.3',
              name: 'components',
              size: '980 MB',
              children: [
                { id: '1.1.3.1', name: 'button.ts', size: '12 KB' },
                { id: '1.1.3.2', name: 'input.ts', size: '18 KB' },
              ],
            },
          ],
        },
        { id: '1.2', name: 'node_modules', size: '1.2 GB' },
        { id: '1.3', name: 'package.json', size: '3.2 KB' },
      ],
    },
  ];

  expandedIds: Array<string | number> = ['1', '1.1'];

  basicCode = `<nx-tree-table
    [columns]="columns"
    [data]="fileData"
    [(expandedIds)]="expandedIds">
</nx-tree-table>`;

  basicTs = `columns: NxTreeTableColumn[] = [
  { field: 'name', header: 'Name' },
  { field: 'size', header: 'Size', width: '120px' },
];

fileData: NxTreeTableNode[] = [
  {
    id: '1',
    name: 'Project Folder',
    size: '2.5 GB',
    children: [
      {
        id: '1.1',
        name: 'src',
        size: '1.2 GB',
        children: [
          { id: '1.1.1', name: 'app.ts', size: '45 KB' },
          { id: '1.1.2', name: 'styles.scss', size: '28 KB' },
          {
            id: '1.1.3',
            name: 'components',
            size: '980 MB',
            children: [
              { id: '1.1.3.1', name: 'button.ts', size: '12 KB' },
              { id: '1.1.3.2', name: 'input.ts', size: '18 KB' },
            ],
          },
        ],
      },
      { id: '1.2', name: 'node_modules', size: '1.2 GB' },
      { id: '1.3', name: 'package.json', size: '3.2 KB' },
    ],
  },
];

// Nesting is arbitrarily deep - rows are flattened from expandedIds,
// not hand-written per level.
expandedIds: Array<string | number> = ['1', '1.1'];`;

  orgData: NxTreeTableNode[] = [
    {
      id: 'ceo',
      name: 'Ava Whitfield',
      role: 'CEO',
      children: [
        {
          id: 'cto',
          name: 'Marcus Lee',
          role: 'CTO',
          children: [
            { id: 'eng1', name: 'Priya Nair', role: 'Engineering Manager' },
            { id: 'eng2', name: 'Sam Okafor', role: 'Staff Engineer' },
          ],
        },
        { id: 'cfo', name: 'Elena Ruiz', role: 'CFO' },
      ],
    },
  ];

  orgColumns: NxTreeTableColumn[] = [
    { field: 'name', header: 'Name' },
    { field: 'role', header: 'Role' },
  ];

  orgExpandedIds: Array<string | number> = ['ceo'];
  selectedPersonId: string | number | null = null;

  selectableCode = `<nx-tree-table
    [columns]="orgColumns"
    [data]="orgData"
    [(expandedIds)]="orgExpandedIds"
    [selectable]="true"
    [(selectedId)]="selectedPersonId">
</nx-tree-table>`;

  selectableTs = `orgColumns: NxTreeTableColumn[] = [
  { field: 'name', header: 'Name' },
  { field: 'role', header: 'Role' },
];

orgExpandedIds: Array<string | number> = ['ceo'];
selectedPersonId: string | number | null = null;`;

  features = [
    { name: 'Hierarchical Display', description: 'Any depth of nesting via a plain children array - no hand-written levels' },
    { name: 'Expand/Collapse', description: 'Two-way expandedIds, or drive it yourself with nodeExpand/nodeCollapse' },
    { name: 'Row Selection', description: 'Optional single-row selection with selectedId' },
    { name: 'Custom Columns', description: 'Any field on your data, with an optional fixed width' },
    { name: 'Custom Indent', description: 'indentSize controls the per-level indent in pixels' },
    { name: 'Keyboard Accessible', description: 'The expand toggle is a real <button> with aria-expanded' },
  ];

  useCases = [
    { title: 'File Systems', description: 'Directory tree navigation' },
    { title: 'Organizational Charts', description: 'Company hierarchy' },
    { title: 'Category Trees', description: 'Product categories' },
    { title: 'Project Structure', description: 'Source code structure' },
    { title: 'Menu Navigation', description: 'Nested menus' },
    { title: 'Comments & Replies', description: 'Threaded discussions' },
  ];
}
