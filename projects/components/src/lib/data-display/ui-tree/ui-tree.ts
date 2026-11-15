import { booleanAttribute, Component, Input } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';

export interface NxTreeNodeData {
  label: string;
  children?: NxTreeNodeData[];
  expanded?: boolean;
}

@Component({
  selector: 'nx-tree-node',
  standalone: true,
  imports: [NgIf, NgFor, NxTreeNode],
  templateUrl: './nx-tree-node.html',
  styleUrl: './ui-tree.scss',
})
export class NxTreeNode {
  @Input({ required: true }) node!: NxTreeNodeData;

  toggle(): void {
    if (this.hasChildren) {
      this.node.expanded = !this.node.expanded;
    }
  }

  get hasChildren(): boolean {
    return !!this.node.children?.length;
  }

  trackByLabel(_index: number, node: NxTreeNodeData): string {
    return node.label;
  }
}

@Component({
  selector: 'nx-tree',
  standalone: true,
  imports: [NgIf, NgFor, NxTreeNode],
  exportAs: 'nxTree',
  templateUrl: './ui-tree.html',
  styleUrl: './ui-tree.scss',
})
export class NxTree {
  @Input() nodes: NxTreeNodeData[] = [];
  @Input({ transform: booleanAttribute }) showExpandCollapseAll = false;
  @Input() expandAllLabel = 'Expand All';
  @Input() collapseAllLabel = 'Collapse All';

  trackByLabel(_index: number, node: NxTreeNodeData): string {
    return node.label;
  }

  expandAll(): void {
    this.setExpandedState(this.nodes, true);
  }

  collapseAll(): void {
    this.setExpandedState(this.nodes, false);
  }

  private setExpandedState(nodes: NxTreeNodeData[], expanded: boolean): void {
    for (const node of nodes) {
      if (node.children?.length) {
        node.expanded = expanded;
        this.setExpandedState(node.children, expanded);
      }
    }
  }
}
