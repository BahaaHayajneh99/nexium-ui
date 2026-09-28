import { Component, ElementRef, EventEmitter, HostListener, Input, Output, signal } from '@angular/core';
import { NxIcon } from '../../data-display/ui-icon';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export interface NxColumnSelectorColumn {
  id: string;
  label: string;
  visible: boolean;
}

/** A "Columns" dropdown for toggling table/grid column visibility. */
@Component({
  selector: 'nx-column-selector',
  standalone: true,
  imports: [NxIcon, NxProLocked],
  templateUrl: './ui-column-selector.html',
  styleUrl: './ui-column-selector.scss',
})
export class NxColumnSelector {
  protected readonly licensed = nxProLicenseGranted();

  @Input() columns: NxColumnSelectorColumn[] = [];

  @Output() columnsChange = new EventEmitter<NxColumnSelectorColumn[]>();

  open = signal(false);

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  toggleOpen(): void {
    this.open.update((value) => !value);
  }

  toggleColumn(column: NxColumnSelectorColumn): void {
    const next = this.columns.map((c) => (c.id === column.id ? { ...c, visible: !c.visible } : c));
    this.columns = next;
    this.columnsChange.emit(next);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.open.set(false);
    }
  }
}
