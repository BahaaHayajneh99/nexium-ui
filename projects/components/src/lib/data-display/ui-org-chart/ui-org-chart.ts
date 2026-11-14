import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';
import { NxAvatar } from '../ui-avatar';
import { NxIcon } from '../ui-icon';

export interface NxOrgChartNode {
  id: string | number;
  name: string;
  title?: string;
  avatarSrc?: string;
  children?: NxOrgChartNode[];
}

/**
 * Renders a company hierarchy as a tree of person-cards (avatar + name + title) connected by
 * simple CSS lines, with each node expandable/collapsible and a `searchTerm` that highlights
 * matching nodes and auto-expands their ancestor chain so a match is always visible.
 */
@Component({
  selector: 'nx-org-chart',
  standalone: true,
  imports: [NgTemplateOutlet, NxProLocked, NxAvatar, NxIcon],
  templateUrl: './ui-org-chart.html',
  styleUrl: './ui-org-chart.scss',
})
export class NxOrgChart {
  protected readonly licensed = nxProLicenseGranted();

  @Input() root: NxOrgChartNode | null = null;
  @Input() searchTerm = '';

  @Output() nodeClick = new EventEmitter<NxOrgChartNode>();

  /** Ids the user has explicitly collapsed - everything else with children starts expanded. */
  private readonly manuallyCollapsed = signal<Set<string | number>>(new Set());

  hasChildren(node: NxOrgChartNode): boolean {
    return !!node.children?.length;
  }

  isMatch(node: NxOrgChartNode): boolean {
    const term = this.normalizedTerm;
    return !!term && node.name.toLowerCase().includes(term);
  }

  /** True when `node` isn't itself a match, but has a matching descendant - it must stay expanded to reveal it. */
  isAncestorOfMatch(node: NxOrgChartNode): boolean {
    const term = this.normalizedTerm;
    return !!term && !this.isMatch(node) && this.subtreeHasMatch(node, term);
  }

  isExpanded(node: NxOrgChartNode): boolean {
    if (!this.hasChildren(node)) {
      return false;
    }
    const term = this.normalizedTerm;
    if (term && this.subtreeHasMatch(node, term)) {
      return true;
    }
    return !this.manuallyCollapsed().has(node.id);
  }

  toggle(node: NxOrgChartNode, event: Event): void {
    event.stopPropagation();
    if (!this.hasChildren(node)) {
      return;
    }
    const next = new Set(this.manuallyCollapsed());
    if (next.has(node.id)) {
      next.delete(node.id);
    } else {
      next.add(node.id);
    }
    this.manuallyCollapsed.set(next);
  }

  onNodeClick(node: NxOrgChartNode): void {
    this.nodeClick.emit(node);
  }

  private get normalizedTerm(): string {
    return this.searchTerm.trim().toLowerCase();
  }

  /** Whether any descendant (not `node` itself) matches `term`. */
  private subtreeHasMatch(node: NxOrgChartNode, term: string): boolean {
    for (const child of node.children ?? []) {
      if (child.name.toLowerCase().includes(term) || this.subtreeHasMatch(child, term)) {
        return true;
      }
    }
    return false;
  }
}
