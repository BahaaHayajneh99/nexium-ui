import { Component, EventEmitter, Input, Output, numberAttribute } from '@angular/core';
import { NxIcon } from '../ui-icon';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export interface NxCommandHistoryEntry {
  id: string | number;
  label: string;
  timestamp?: Date | string;
}

/** An undo/redo toolbar plus a clickable list of past actions to jump straight back to. */
@Component({
  selector: 'nx-command-history',
  standalone: true,
  imports: [NxIcon, NxProLocked],
  templateUrl: './ui-command-history.html',
  styleUrl: './ui-command-history.scss',
})
export class NxCommandHistory {
  protected readonly licensed = nxProLicenseGranted();

  @Input() entries: NxCommandHistoryEntry[] = [];
  @Input({ transform: numberAttribute }) currentIndex = 0;

  @Output() undo = new EventEmitter<void>();
  @Output() redo = new EventEmitter<void>();
  @Output() restore = new EventEmitter<NxCommandHistoryEntry>();

  get canUndo(): boolean {
    return this.currentIndex > 0;
  }

  get canRedo(): boolean {
    return this.currentIndex < this.entries.length - 1;
  }

  select(entry: NxCommandHistoryEntry, index: number): void {
    if (index === this.currentIndex) {
      return;
    }
    this.restore.emit(entry);
  }
}
