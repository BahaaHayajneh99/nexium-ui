import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  booleanAttribute,
  computed,
  signal,
} from '@angular/core';
import { NxIcon } from '../ui-icon';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export interface NxTreeSelectNode {
  id: string;
  label: string;
  children?: NxTreeSelectNode[];
}

interface NxTreeSelectFlatNode {
  node: NxTreeSelectNode;
  depth: number;
  hasChildren: boolean;
}

/**
 * A dropdown trigger - like `nx-select`/`nx-combobox` - whose panel contains a tree picker instead
 * of a flat option list, for hierarchical data (org charts, category trees, file trees). In single
 * mode, clicking a node selects it and closes the panel; in multiple mode, each node gets a
 * checkbox and the panel stays open across picks. Expand/collapse is independent of selection in
 * both modes. Clicking outside the open panel closes it.
 */
@Component({
  selector: 'nx-tree-select',
  standalone: true,
  imports: [NxIcon, NxProLocked],
  templateUrl: './ui-tree-select.html',
  styleUrl: './ui-tree-select.scss',
})
export class NxTreeSelect {
  protected readonly licensed = nxProLicenseGranted();

  // Backed by signals (not plain fields) so the `computed()`s below - which read nodes/
  // selectedIds/placeholder - actually re-run when the parent rebinds new values, instead of
  // permanently caching whatever they first saw on initial render.
  private readonly nodesSignal = signal<NxTreeSelectNode[]>([]);
  @Input()
  get nodes(): NxTreeSelectNode[] {
    return this.nodesSignal();
  }
  set nodes(value: NxTreeSelectNode[]) {
    this.nodesSignal.set(value ?? []);
  }

  @Input({ transform: booleanAttribute }) multiple = false;

  private readonly selectedIdsSignal = signal<string[]>([]);
  @Input()
  get selectedIds(): string[] {
    return this.selectedIdsSignal();
  }
  set selectedIds(value: string[]) {
    this.selectedIdsSignal.set(value ?? []);
  }
  @Output() selectedIdsChange = new EventEmitter<string[]>();

  private readonly placeholderSignal = signal('Select...');
  @Input()
  get placeholder(): string {
    return this.placeholderSignal();
  }
  set placeholder(value: string) {
    this.placeholderSignal.set(value ?? 'Select...');
  }

  readonly open = signal(false);
  private readonly expandedIds = signal<Set<string>>(new Set());

  private readonly nodeById = computed(() => {
    const map = new Map<string, NxTreeSelectNode>();
    const walk = (list: NxTreeSelectNode[]): void => {
      for (const node of list) {
        map.set(node.id, node);
        if (node.children?.length) {
          walk(node.children);
        }
      }
    };
    walk(this.nodesSignal());
    return map;
  });

  readonly flatNodes = computed<NxTreeSelectFlatNode[]>(() => {
    const expanded = this.expandedIds();
    const result: NxTreeSelectFlatNode[] = [];
    const walk = (list: NxTreeSelectNode[], depth: number): void => {
      for (const node of list) {
        const hasChildren = !!node.children?.length;
        result.push({ node, depth, hasChildren });
        if (hasChildren && expanded.has(node.id)) {
          walk(node.children!, depth + 1);
        }
      }
    };
    walk(this.nodesSignal(), 0);
    return result;
  });

  readonly selectedLabels = computed(() => {
    const byId = this.nodeById();
    return this.selectedIdsSignal()
      .map((id) => byId.get(id)?.label)
      .filter((label): label is string => !!label);
  });

  readonly triggerText = computed(() => {
    const labels = this.selectedLabels();
    if (labels.length === 0) {
      return this.placeholderSignal();
    }
    if (labels.length === 1) {
      return labels[0];
    }
    return `${labels[0]} +${labels.length - 1} more`;
  });

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.open() && !this.elementRef.nativeElement.contains(event.target as Node)) {
      this.open.set(false);
    }
  }

  toggleOpen(): void {
    this.open.update((value) => !value);
  }

  isExpanded(nodeId: string): boolean {
    return this.expandedIds().has(nodeId);
  }

  toggleExpand(nodeId: string, event: Event): void {
    event.stopPropagation();
    this.expandedIds.update((set) => {
      const next = new Set(set);
      if (next.has(nodeId)) {
        next.delete(nodeId);
      } else {
        next.add(nodeId);
      }
      return next;
    });
  }

  isSelected(nodeId: string): boolean {
    return this.selectedIdsSignal().includes(nodeId);
  }

  selectSingle(nodeId: string): void {
    this.selectedIdsSignal.set([nodeId]);
    this.selectedIdsChange.emit([nodeId]);
    this.open.set(false);
  }

  toggleMultiple(nodeId: string): void {
    const current = this.selectedIdsSignal();
    const next = current.includes(nodeId) ? current.filter((id) => id !== nodeId) : [...current, nodeId];
    this.selectedIdsSignal.set(next);
    this.selectedIdsChange.emit(next);
  }
}
