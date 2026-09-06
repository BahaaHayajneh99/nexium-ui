import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from '../services/common.service';
import { highlightTs } from '../shared/demo-section/ts-highlight';

interface TreeNode {
  id: string;
  name: string;
  size?: string;
  children?: TreeNode[];
  expanded?: boolean;
}

@Component({
  selector: 'app-data-display-tree-table-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-display-tree-table-demo.html',
  styleUrls: ['./data-display-tree-table-demo.scss'],
})
export class DataDisplayTreeTableDemo {
  commonService = inject(CommonService);

  treeData: TreeNode[] = [
    {
      id: '1',
      name: 'Project Folder',
      size: '2.5 GB',
      expanded: true,
      children: [
        {
          id: '1.1',
          name: 'src',
          size: '1.2 GB',
          expanded: true,
          children: [
            { id: '1.1.1', name: 'app.ts', size: '45 KB' },
            { id: '1.1.2', name: 'styles.scss', size: '28 KB' },
            { id: '1.1.3', name: 'main.ts', size: '12 KB' },
          ],
        },
        {
          id: '1.2',
          name: 'node_modules',
          size: '1.2 GB',
          expanded: false,
        },
        { id: '1.3', name: 'package.json', size: '3.2 KB' },
      ],
    },
  ];

  basicCode = highlightTs(`
<table class="tree-table">
  <tbody *ngFor="let node of treeData">
    <tr [ngClass]="{ 'level-' + getLevel(node) }">
      <td>
        <button (click)="toggleNode(node)">
          {{ node.expanded ? '▼' : '▶' }}
        </button>
        {{ node.name }}
      </td>
      <td>{{ node.size }}</td>
    </tr>
  </tbody>
</table>
  `);

  features = [
    { name: 'Hierarchical Display', description: 'Show nested data structures' },
    { name: 'Expand/Collapse', description: 'Toggle node visibility' },
    { name: 'Sorting', description: 'Sort by columns' },
    { name: 'Selection', description: 'Select rows and branches' },
    { name: 'Lazy Loading', description: 'Load children on demand' },
    { name: 'Keyboard Navigation', description: 'Navigate with arrow keys' },
  ];

  useCases = [
    { title: 'File Systems', description: 'Directory tree navigation' },
    { title: 'Organizational Charts', description: 'Company hierarchy' },
    { title: 'Category Trees', description: 'Product categories' },
    { title: 'Project Structure', description: 'Source code structure' },
    { title: 'Menu Navigation', description: 'Nested menus' },
    { title: 'Comments & Replies', description: 'Threaded discussions' },
  ];

  toggleNode(node: TreeNode) {
    node.expanded = !node.expanded;
  }

  getLevel(node: TreeNode): number {
    return 0;
  }
}
