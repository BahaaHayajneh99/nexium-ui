import { Component, EventEmitter, Input, Output, booleanAttribute } from '@angular/core';
import { NxIcon } from '../ui-icon';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export interface NxTreeTableColumn {
  field: string;
  header: string;
  width?: string;
}

export interface NxTreeTableNode {
  id: string | number;
  children?: NxTreeTableNode[];
  [field: string]: unknown;
}

interface NxTreeTableRow {
  node: NxTreeTableNode;
  level: number;
  hasChildren: boolean;
}

/**
 * A table with hierarchical, expandable rows - combines `nx-table`'s
 * columns with `nx-tree`'s nested navigation. Unlike the recursive
 * `<ng-container>`/`*ngFor` nesting a hand-rolled tree table usually ends
 * up with (which only goes as deep as however many levels you wrote by
 * hand), rows are flattened into a single list driven by each node's
 * expanded state, so any depth of nesting "just works".
 */
@Component({
  selector: 'nx-tree-table',
  standalone: true,
  imports: [NxIcon, NxProLocked],
  templateUrl: './ui-tree-table.html',
  styleUrl: './ui-tree-table.scss',
})
export class NxTreeTable {
  protected readonly licensed = nxProLicenseGranted();

  @Input() columns: NxTreeTableColumn[] = [];
  @Input() data: NxTreeTableNode[] = [];
  @Input() expandedIds: Array<string | number> = [];
  @Input({ transform: booleanAttribute }) selectable = false;
  @Input() selectedId: string | number | null = null;
  @Input({ transform: booleanAttribute }) striped = false;
  @Input({ transform: booleanAttribute }) hoverable = true;
  @Input() indentSize = 20;

  @Output() expandedIdsChange = new EventEmitter<Array<string | number>>();
  @Output() selectedIdChange = new EventEmitter<string | number | null>();
  @Output() nodeExpand = new EventEmitter<NxTreeTableNode>();
  @Output() nodeCollapse = new EventEmitter<NxTreeTableNode>();
  @Output() nodeSelect = new EventEmitter<NxTreeTableNode>();

  get rows(): NxTreeTableRow[] {
    const result: NxTreeTableRow[] = [];

    const walk = (nodes: NxTreeTableNode[], level: number): void => {
      for (const node of nodes) {
        const hasChildren = !!node.children && node.children.length > 0;
        result.push({ node, level, hasChildren });
        if (hasChildren && this.isExpanded(node.id)) {
          walk(node.children!, level + 1);
        }
      }
    };

    walk(this.data, 0);
    return result;
  }

  isExpanded(id: string | number): boolean {
    return this.expandedIds.includes(id);
  }

  toggleNode(node: NxTreeTableNode): void {
    const wasExpanded = this.isExpanded(node.id);
    this.expandedIds = wasExpanded
      ? this.expandedIds.filter((id) => id !== node.id)
      : [...this.expandedIds, node.id];
    this.expandedIdsChange.emit(this.expandedIds);
    (wasExpanded ? this.nodeCollapse : this.nodeExpand).emit(node);
  }

  selectNode(node: NxTreeTableNode): void {
    if (!this.selectable) {
      return;
    }
    this.selectedId = node.id;
    this.selectedIdChange.emit(this.selectedId);
    this.nodeSelect.emit(node);
  }

  isSelected(node: NxTreeTableNode): boolean {
    return this.selectable && this.selectedId === node.id;
  }

  valueFor(node: NxTreeTableNode, field: string): unknown {
    return node[field];
  }
}
