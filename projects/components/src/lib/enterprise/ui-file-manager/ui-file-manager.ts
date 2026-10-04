import { Component, EventEmitter, Input, Output, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SlicePipe } from '@angular/common';
import { NxIcon } from '../../data-display/ui-icon';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export interface NxFileNode {
  id: string;
  name: string;
  type: 'folder' | 'file';
  children?: NxFileNode[];
  size?: number;
  modified?: string;
  previewUrl?: string;
}

export type NxFileManagerView = 'grid' | 'list';
type NxSortField = 'name' | 'size' | 'modified';

interface NxClipboardEntry {
  mode: 'copy' | 'cut';
  nodeId: string;
  sourceFolderId: string;
}

let idCounter = 0;
function nextId(): string {
  idCounter += 1;
  return `node-${Date.now()}-${idCounter}`;
}

function formatBytes(bytes?: number): string {
  if (!bytes) return '—';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * A full folder-tree file browser over an in-memory `NxFileNode` tree: grid/list views,
 * breadcrumb navigation, drag-and-drop moving, upload (adds nodes from real `File` picks, no
 * network calls), rename, copy/cut/paste, delete, multi-select, search, sorting, and a context
 * menu. Entirely client-side - wire `rootChange` to your own backend to persist operations.
 */
@Component({
  selector: 'nx-file-manager',
  standalone: true,
  imports: [FormsModule, SlicePipe, NxIcon, NxProLocked],
  templateUrl: './ui-file-manager.html',
  styleUrl: './ui-file-manager.scss',
})
export class NxFileManager {
  protected readonly licensed = nxProLicenseGranted();

  // Backed by a signal (not a plain field) so `breadcrumb` below - a `computed()` reading
  // `this.root` - actually re-runs whenever mutateNode() reassigns it (createFolder/rename/
  // delete/copy/paste/drag-drop/upload all go through it). Previously it only "looked" like it
  // worked when `currentPath` also happened to change in the same gesture (navigating folders is
  // a tracked signal dependency too) - e.g. create/delete at the root level, where currentPath
  // never changes, silently never reflected the new tree until the user navigated away and back.
  private readonly rootSignal = signal<NxFileNode | null>(null);
  @Input({ required: true })
  get root(): NxFileNode {
    return this.rootSignal()!;
  }
  set root(value: NxFileNode) {
    this.rootSignal.set(value);
  }
  @Output() rootChange = new EventEmitter<NxFileNode>();

  // Backed by a signal (not a plain field) so `storagePercent` below - a `computed()` reading
  // `this.storageQuotaBytes` - actually re-runs when the parent rebinds a different quota, instead
  // of permanently caching whatever it first saw on initial render.
  private readonly storageQuotaSignal = signal<number | undefined>(undefined);
  @Input()
  get storageQuotaBytes(): number | undefined {
    return this.storageQuotaSignal();
  }
  set storageQuotaBytes(value: number | undefined) {
    this.storageQuotaSignal.set(value);
  }

  view = signal<NxFileManagerView>('grid');
  currentPath = signal<string[]>([]);
  selectedIds = signal<Set<string>>(new Set());
  searchText = signal('');
  sortField = signal<NxSortField>('name');
  sortDir = signal<1 | -1>(1);
  renamingId = signal<string | null>(null);
  renameDraft = '';
  clipboard = signal<NxClipboardEntry | null>(null);
  contextMenu = signal<{ x: number; y: number; nodeId: string } | null>(null);
  dragOverId = signal<string | null>(null);
  previewingId = signal<string | null>(null);

  readonly breadcrumb = computed<NxFileNode[]>(() => {
    const trail: NxFileNode[] = [this.root];
    let node = this.root;
    for (const id of this.currentPath()) {
      const next = node.children?.find((c) => c.id === id);
      if (!next) break;
      trail.push(next);
      node = next;
    }
    return trail;
  });

  readonly currentFolder = computed<NxFileNode>(() => this.breadcrumb().at(-1)!);

  readonly visibleChildren = computed<NxFileNode[]>(() => {
    const children = this.currentFolder().children ?? [];
    const term = this.searchText().trim().toLowerCase();
    const filtered = term ? children.filter((c) => c.name.toLowerCase().includes(term)) : children;
    const field = this.sortField();
    const dir = this.sortDir();
    return [...filtered].sort((a, b) => {
      if (a.type !== b.type) return a.type === 'folder' ? -1 : 1;
      let cmp = 0;
      if (field === 'name') cmp = a.name.localeCompare(b.name);
      else if (field === 'size') cmp = (a.size ?? 0) - (b.size ?? 0);
      else cmp = (a.modified ?? '').localeCompare(b.modified ?? '');
      return cmp * dir;
    });
  });

  formatSize = formatBytes;

  /** Every file in the current folder, in display order - what Prev/Next cycle through (folders are skipped). */
  readonly previewableFiles = computed<NxFileNode[]>(() => this.visibleChildren().filter((n) => n.type === 'file'));

  readonly previewingNode = computed<NxFileNode | null>(() => {
    const id = this.previewingId();
    return id ? this.findNode(this.root, id) : null;
  });

  /** Total bytes used across the entire tree (every file node, at any depth), regardless of the current folder. */
  readonly storageUsedBytes = computed<number>(() => this.sumFileSizes(this.root));

  readonly storagePercent = computed<number | null>(() => {
    const quota = this.storageQuotaBytes;
    if (!quota) return null;
    return Math.min(100, Math.round((this.storageUsedBytes() / quota) * 100));
  });

  navigateInto(node: NxFileNode): void {
    if (node.type !== 'folder') return;
    this.currentPath.update((path) => [...path, node.id]);
    this.selectedIds.set(new Set());
    this.previewingId.set(null);
  }

  navigateToBreadcrumb(index: number): void {
    this.currentPath.update((path) => path.slice(0, index));
    this.selectedIds.set(new Set());
    this.previewingId.set(null);
  }

  /** Selects the node as `select()` already does, and additionally opens the preview modal for a
   *  plain (non-modifier) click on a file - double-click is reserved for navigating into folders. */
  handleItemClick(node: NxFileNode, event: MouseEvent): void {
    this.select(node, event);
    if (node.type === 'file' && !event.ctrlKey && !event.metaKey) {
      this.openPreview(node.id);
    }
  }

  openPreview(id: string): void {
    this.previewingId.set(id);
  }

  closePreview(): void {
    this.previewingId.set(null);
  }

  previewNext(): void {
    this.stepPreview(1);
  }

  previewPrev(): void {
    this.stepPreview(-1);
  }

  private stepPreview(direction: 1 | -1): void {
    const files = this.previewableFiles();
    const currentId = this.previewingId();
    if (!files.length || !currentId) return;
    const index = files.findIndex((f) => f.id === currentId);
    if (index < 0) return;
    const nextIndex = (index + direction + files.length) % files.length;
    this.previewingId.set(files[nextIndex].id);
  }

  private sumFileSizes(node: NxFileNode): number {
    if (node.type === 'file') return node.size ?? 0;
    return (node.children ?? []).reduce((sum, child) => sum + this.sumFileSizes(child), 0);
  }

  toggleSort(field: NxSortField): void {
    if (this.sortField() === field) {
      this.sortDir.update((d) => (d === 1 ? -1 : 1));
    } else {
      this.sortField.set(field);
      this.sortDir.set(1);
    }
  }

  isSelected(id: string): boolean {
    return this.selectedIds().has(id);
  }

  select(node: NxFileNode, event: MouseEvent): void {
    this.closeContextMenu();
    this.selectedIds.update((set) => {
      if (event.ctrlKey || event.metaKey) {
        const next = new Set(set);
        next.has(node.id) ? next.delete(node.id) : next.add(node.id);
        return next;
      }
      return new Set([node.id]);
    });
  }

  openContextMenu(event: MouseEvent, node: NxFileNode): void {
    event.preventDefault();
    if (!this.isSelected(node.id)) {
      this.selectedIds.set(new Set([node.id]));
    }
    this.contextMenu.set({ x: event.clientX, y: event.clientY, nodeId: node.id });
  }

  closeContextMenu(): void {
    this.contextMenu.set(null);
  }

  createFolder(): void {
    const folder: NxFileNode = { id: nextId(), name: 'New Folder', type: 'folder', children: [] };
    this.mutateCurrentChildren((children) => [...children, folder]);
    this.startRename(folder.id);
  }

  startRename(id: string): void {
    const node = this.findNode(this.root, id);
    this.renameDraft = node?.name ?? '';
    this.renamingId.set(id);
    this.closeContextMenu();
  }

  commitRename(): void {
    const id = this.renamingId();
    const name = this.renameDraft.trim();
    if (id && name) {
      this.mutateNode(id, (node) => ({ ...node, name }));
    }
    this.renamingId.set(null);
  }

  cancelRename(): void {
    this.renamingId.set(null);
  }

  deleteSelected(): void {
    const ids = this.selectedIds();
    this.mutateCurrentChildren((children) => children.filter((c) => !ids.has(c.id)));
    this.selectedIds.set(new Set());
    this.closeContextMenu();
  }

  copy(nodeId: string): void {
    this.clipboard.set({ mode: 'copy', nodeId, sourceFolderId: this.currentFolder().id });
    this.closeContextMenu();
  }

  cut(nodeId: string): void {
    this.clipboard.set({ mode: 'cut', nodeId, sourceFolderId: this.currentFolder().id });
    this.closeContextMenu();
  }

  paste(): void {
    const entry = this.clipboard();
    if (!entry) return;
    const source = this.findNode(this.root, entry.nodeId);
    if (!source) return;

    if (entry.mode === 'copy') {
      const clone = this.cloneWithNewIds(source);
      this.mutateCurrentChildren((children) => [...children, clone]);
    } else {
      this.removeNode(entry.sourceFolderId, entry.nodeId);
      this.mutateCurrentChildren((children) => [...children, source]);
      this.clipboard.set(null);
    }
    this.closeContextMenu();
  }

  onDragStart(event: DragEvent, node: NxFileNode): void {
    event.dataTransfer?.setData('text/plain', node.id);
  }

  onDragOver(event: DragEvent, node: NxFileNode): void {
    if (node.type !== 'folder') return;
    event.preventDefault();
    this.dragOverId.set(node.id);
  }

  onDragLeave(): void {
    this.dragOverId.set(null);
  }

  onDrop(event: DragEvent, target: NxFileNode): void {
    event.preventDefault();
    this.dragOverId.set(null);
    if (target.type !== 'folder') return;
    const draggedId = event.dataTransfer?.getData('text/plain');
    if (!draggedId || draggedId === target.id) return;
    const node = this.findNode(this.root, draggedId);
    if (!node) return;
    this.removeNode(this.currentFolder().id, draggedId);
    this.mutateNode(target.id, (folder) => ({ ...folder, children: [...(folder.children ?? []), node] }));
  }

  uploadFiles(fileList: FileList | null): void {
    if (!fileList) return;
    const nodes: NxFileNode[] = Array.from(fileList).map((file) => ({
      id: nextId(),
      name: file.name,
      type: 'file',
      size: file.size,
      modified: new Date().toISOString(),
      previewUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
    }));
    this.mutateCurrentChildren((children) => [...children, ...nodes]);
  }

  private mutateCurrentChildren(fn: (children: NxFileNode[]) => NxFileNode[]): void {
    this.mutateNode(this.currentFolder().id, (node) => ({ ...node, children: fn(node.children ?? []) }));
  }

  private mutateNode(id: string, fn: (node: NxFileNode) => NxFileNode): void {
    const apply = (node: NxFileNode): NxFileNode => {
      if (node.id === id) return fn(node);
      if (!node.children) return node;
      return { ...node, children: node.children.map(apply) };
    };
    this.root = apply(this.root);
    this.rootChange.emit(this.root);
  }

  private removeNode(parentId: string, childId: string): void {
    this.mutateNode(parentId, (node) => ({ ...node, children: (node.children ?? []).filter((c) => c.id !== childId) }));
  }

  private findNode(node: NxFileNode, id: string): NxFileNode | null {
    if (node.id === id) return node;
    for (const child of node.children ?? []) {
      const found = this.findNode(child, id);
      if (found) return found;
    }
    return null;
  }

  private cloneWithNewIds(node: NxFileNode): NxFileNode {
    return {
      ...node,
      id: nextId(),
      name: `${node.name} (copy)`,
      children: node.children?.map((c) => this.cloneWithNewIds(c)),
    };
  }
}
