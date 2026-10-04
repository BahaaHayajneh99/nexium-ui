import { Component, Input, signal } from '@angular/core';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export type NxLogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface NxLogEntry {
  id: string | number;
  level: NxLogLevel;
  message: string;
  timestamp?: string;
}

/** A scrollable, filterable log stream with level-based coloring and a text search box. */
@Component({
  selector: 'nx-log-viewer',
  standalone: true,
  imports: [NxProLocked],
  templateUrl: './ui-log-viewer.html',
  styleUrl: './ui-log-viewer.scss',
})
export class NxLogViewer {
  protected readonly licensed = nxProLicenseGranted();

  @Input() entries: NxLogEntry[] = [];

  searchText = signal('');
  levelFilter = signal<NxLogLevel | 'all'>('all');

  get filteredEntries(): NxLogEntry[] {
    const search = this.searchText().trim().toLowerCase();
    const level = this.levelFilter();
    return this.entries.filter((entry) => {
      if (level !== 'all' && entry.level !== level) {
        return false;
      }
      return !search || entry.message.toLowerCase().includes(search);
    });
  }
}
