import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { UiTree, NxTreeNodeData } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-tree-demo',
  imports: [UiTree, DemoSection],
  templateUrl: './ui-tree-demo.html',
  styleUrl: './ui-tree-demo.scss',
})
export class UiTreeDemo {
  public commonService = inject(CommonService);
  nodes: NxTreeNodeData[] = [
    {
      label: 'Components',
      expanded: true,
      children: [
        { label: 'Data Display', children: [{ label: 'Table' }, { label: 'List' }] },
        { label: 'Forms', children: [{ label: 'Input' }, { label: 'Select' }] },
      ],
    },
    { label: 'Assets', children: [{ label: 'Images' }, { label: 'Icons' }] },
  ];

  basicCode = `<nx-tree [nodes]="nodes">
</nx-tree>`;

  basicTs = `nodes: NxTreeNodeData[] = [
    {
      label: 'Components',
      expanded: true,
      children: [
        { label: 'Data Display', children: [{ label: 'Table' }, { label: 'List' }] },
        { label: 'Forms', children: [{ label: 'Input' }, { label: 'Select' }] },
      ],
    },
    { label: 'Assets', children: [{ label: 'Images' }, { label: 'Icons' }] },
];`;

  expandCollapseCode = `<nx-tree
    [nodes]="nodes"
    [showExpandCollapseAll]="true"
    expandAllLabel="Expand All"
    collapseAllLabel="Collapse All">
</nx-tree>`;

  customActionsCode = `<nx-tree #tree="nxTree" [nodes]="nodes">
    <div nx-tree-actions class="custom-tree-actions">
        <button type="button" (click)="tree.expandAll()">Open all</button>
        <button type="button" (click)="tree.collapseAll()">Close all</button>
    </div>
</nx-tree>`;
}
