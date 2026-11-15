import { Component, Input } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';

export type NxChangelogEntryType = 'feature' | 'improvement' | 'fix';

export interface NxChangelogChange {
  type: NxChangelogEntryType;
  description: string;
}

export interface NxChangelogEntry {
  version: string;
  date: string;
  changes: NxChangelogChange[];
}

/** A compact, embeddable "what's new" list - e.g. inside a popover behind a version badge, rather than a full changelog page. */
@Component({
  selector: 'nx-changelog-widget',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './ui-changelog-widget.html',
  styleUrl: './ui-changelog-widget.scss',
})
export class NxChangelogWidget {
  @Input() entries: NxChangelogEntry[] = [];
  @Input() maxVersions = 3;

  get visibleEntries(): NxChangelogEntry[] {
    return this.entries.slice(0, this.maxVersions);
  }

  trackByVersion(index: number, entry: NxChangelogEntry): string {
    return entry.version;
  }

  trackByChangeDescription(index: number, change: NxChangelogChange): string {
    return change.description;
  }
}
