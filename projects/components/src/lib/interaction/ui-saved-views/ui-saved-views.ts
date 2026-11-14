import { Component, ElementRef, EventEmitter, HostListener, Input, Output, signal } from '@angular/core';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';
import { NxInput } from '../../forms/ui-input/ui-input';

export interface NxSavedView<T = unknown> {
  id: string;
  name: string;
  state: T;
  isDefault?: boolean;
}

/**
 * A toolbar dropdown for saving, switching between, renaming and deleting named snapshots of
 * some other UI's state (e.g. a data table's filters/sort/columns). The `state` being saved is
 * opaque to this component - it only manages the list of named views and emits events, the
 * consumer owns capturing/applying the actual state.
 */
@Component({
  selector: 'nx-saved-views',
  standalone: true,
  imports: [NxProLocked, NxInput],
  templateUrl: './ui-saved-views.html',
  styleUrl: './ui-saved-views.scss',
})
export class NxSavedViews<T = unknown> {
  protected readonly licensed = nxProLicenseGranted();

  @Input() views: NxSavedView<T>[] = [];
  @Input() activeViewId: string | null = null;
  /** Whatever the consumer wants captured when "Save as new view" is clicked. */
  @Input() currentState: T | null = null;

  /** User picked a view from the list - the consumer applies `view.state` to their own UI. */
  @Output() viewSelected = new EventEmitter<NxSavedView<T>>();
  /** User named and saved the current state - the consumer creates the actual `NxSavedView` (with an id) and adds it to `views`. */
  @Output() viewSaved = new EventEmitter<{ name: string; state: T | null }>();
  @Output() viewDeleted = new EventEmitter<string>();
  @Output() viewRenamed = new EventEmitter<{ id: string; name: string }>();

  protected readonly open = signal(false);
  protected readonly renamingId = signal<string | null>(null);
  protected renameValue = '';
  protected newViewName = '';

  constructor(private readonly elementRef: ElementRef<HTMLElement>) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.open.set(false);
      this.renamingId.set(null);
    }
  }

  togglePanel(): void {
    this.open.update((value) => !value);
  }

  selectView(view: NxSavedView<T>): void {
    this.viewSelected.emit(view);
    this.open.set(false);
  }

  startRename(view: NxSavedView<T>, event: Event): void {
    event.stopPropagation();
    this.renamingId.set(view.id);
    this.renameValue = view.name;
  }

  onRenameInput(event: Event): void {
    this.renameValue = (event.target as HTMLInputElement).value;
  }

  confirmRename(id: string): void {
    const name = this.renameValue.trim();
    if (name) {
      this.viewRenamed.emit({ id, name });
    }
    this.renamingId.set(null);
  }

  deleteView(id: string, event: Event): void {
    event.stopPropagation();
    this.viewDeleted.emit(id);
  }

  saveCurrent(): void {
    const name = this.newViewName.trim();
    if (!name) {
      return;
    }
    this.viewSaved.emit({ name, state: this.currentState });
    this.newViewName = '';
  }

  activeViewName(): string {
    return this.views.find((view) => view.id === this.activeViewId)?.name ?? 'Select a view';
  }
}
