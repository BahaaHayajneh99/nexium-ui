import { Component, EventEmitter, Input, Output, computed, signal } from '@angular/core';

export interface NxTransferItem {
  id: string;
  label: string;
}

/**
 * A dual-listbox transfer control: an "Available" panel and a "Selected" panel, each with its own
 * search filter and per-item checkboxes, plus move-right/move-all-right/move-left/move-all-left
 * buttons between them. `selectedIds` (and its order) is the single source of truth for which
 * `items` are "selected" - `items` and `selectedIds` are both backed by signals (not plain fields)
 * so the `computed()`s deriving each panel's contents actually re-run when a parent rebinds either.
 */
@Component({
  selector: 'nx-transfer-box',
  standalone: true,
  imports: [],
  templateUrl: './ui-transfer-box.html',
  styleUrl: './ui-transfer-box.scss',
})
export class NxTransferBox {
  private readonly itemsSignal = signal<NxTransferItem[]>([]);
  @Input()
  get items(): NxTransferItem[] {
    return this.itemsSignal();
  }
  set items(value: NxTransferItem[]) {
    this.itemsSignal.set(value ?? []);
  }

  private readonly selectedIdsSignal = signal<string[]>([]);
  @Input()
  get selectedIds(): string[] {
    return this.selectedIdsSignal();
  }
  set selectedIds(value: string[]) {
    this.selectedIdsSignal.set(value ?? []);
  }

  @Output() selectedIdsChange = new EventEmitter<string[]>();

  readonly availableSearch = signal('');
  readonly selectedSearch = signal('');
  readonly availableChecked = signal<ReadonlySet<string>>(new Set());
  readonly selectedChecked = signal<ReadonlySet<string>>(new Set());

  readonly availableItems = computed(() => {
    const selected = new Set(this.selectedIdsSignal());
    return this.itemsSignal().filter((item) => !selected.has(item.id));
  });

  readonly selectedItems = computed(() => {
    const byId = new Map(this.itemsSignal().map((item) => [item.id, item]));
    return this.selectedIdsSignal()
      .map((id) => byId.get(id))
      .filter((item): item is NxTransferItem => !!item);
  });

  readonly filteredAvailable = computed(() => filterByLabel(this.availableItems(), this.availableSearch()));
  readonly filteredSelected = computed(() => filterByLabel(this.selectedItems(), this.selectedSearch()));

  readonly availableCheckedCount = computed(() => this.availableChecked().size);
  readonly selectedCheckedCount = computed(() => this.selectedChecked().size);

  onAvailableSearch(event: Event): void {
    this.availableSearch.set((event.target as HTMLInputElement).value);
  }

  onSelectedSearch(event: Event): void {
    this.selectedSearch.set((event.target as HTMLInputElement).value);
  }

  isAvailableChecked(id: string): boolean {
    return this.availableChecked().has(id);
  }

  isSelectedChecked(id: string): boolean {
    return this.selectedChecked().has(id);
  }

  toggleAvailableCheck(id: string): void {
    this.availableChecked.update((set) => toggleInSet(set, id));
  }

  toggleSelectedCheck(id: string): void {
    this.selectedChecked.update((set) => toggleInSet(set, id));
  }

  moveCheckedRight(): void {
    const checked = this.availableChecked();
    if (checked.size === 0) {
      return;
    }
    const toMove = this.availableItems()
      .filter((item) => checked.has(item.id))
      .map((item) => item.id);
    this.commitSelectedIds([...this.selectedIdsSignal(), ...toMove]);
    this.availableChecked.set(new Set());
  }

  moveAllRight(): void {
    const toMove = this.availableItems().map((item) => item.id);
    if (toMove.length === 0) {
      return;
    }
    this.commitSelectedIds([...this.selectedIdsSignal(), ...toMove]);
    this.availableChecked.set(new Set());
  }

  moveCheckedLeft(): void {
    const checked = this.selectedChecked();
    if (checked.size === 0) {
      return;
    }
    this.commitSelectedIds(this.selectedIdsSignal().filter((id) => !checked.has(id)));
    this.selectedChecked.set(new Set());
  }

  moveAllLeft(): void {
    if (this.selectedIdsSignal().length === 0) {
      return;
    }
    this.commitSelectedIds([]);
    this.selectedChecked.set(new Set());
  }

  private commitSelectedIds(next: string[]): void {
    this.selectedIdsSignal.set(next);
    this.selectedIdsChange.emit(next);
  }
}

function toggleInSet(set: ReadonlySet<string>, id: string): ReadonlySet<string> {
  const next = new Set(set);
  if (next.has(id)) {
    next.delete(id);
  } else {
    next.add(id);
  }
  return next;
}

function filterByLabel(items: NxTransferItem[], query: string): NxTransferItem[] {
  const q = query.trim().toLowerCase();
  return q ? items.filter((item) => item.label.toLowerCase().includes(q)) : items;
}
