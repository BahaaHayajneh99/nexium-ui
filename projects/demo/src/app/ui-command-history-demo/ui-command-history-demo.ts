import { Component, inject, signal } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxCommandHistory, NxCommandHistoryEntry } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-command-history-demo',
  imports: [NxCommandHistory, DemoSection],
  templateUrl: './ui-command-history-demo.html',
  styleUrl: './ui-command-history-demo.scss',
})
export class UiCommandHistoryDemo {
  importCode = `import { NxCommandHistory } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  // Signals rather than plain properties: currentIndex changes happen from
  // click handlers here, which is fine either way, but keeping both entries
  // and currentIndex as signals keeps the whole demo consistent in this
  // zoneless app.
  entries = signal<NxCommandHistoryEntry[]>([
    { id: 1, label: 'Created document' },
    { id: 2, label: 'Added heading' },
    { id: 3, label: 'Inserted image' },
    { id: 4, label: 'Changed font to Inter' },
    { id: 5, label: 'Added table' },
  ]);

  currentIndex = signal(2);

  undo(): void {
    this.currentIndex.update((index) => Math.max(0, index - 1));
  }

  redo(): void {
    this.currentIndex.update((index) => Math.min(this.entries().length - 1, index + 1));
  }

  onRestore(entry: NxCommandHistoryEntry): void {
    const index = this.entries().findIndex((candidate) => candidate.id === entry.id);
    if (index !== -1) {
      this.currentIndex.set(index);
    }
  }

  basicCode = `<nx-command-history
    [entries]="entries"
    [currentIndex]="currentIndex"
    (undo)="undo()"
    (redo)="redo()"
    (restore)="onRestore($event)">
</nx-command-history>`;

  basicTs = `entries: NxCommandHistoryEntry[] = [
  { id: 1, label: 'Created document' },
  { id: 2, label: 'Added heading' },
  { id: 3, label: 'Inserted image' },
  { id: 4, label: 'Changed font to Inter' },
  { id: 5, label: 'Added table' },
];

currentIndex = 2;

undo(): void {
  this.currentIndex = Math.max(0, this.currentIndex - 1);
}

redo(): void {
  this.currentIndex = Math.min(this.entries.length - 1, this.currentIndex + 1);
}

onRestore(entry: NxCommandHistoryEntry): void {
  // Jump straight back to whichever step in history was clicked.
  this.currentIndex = this.entries.findIndex((e) => e.id === entry.id);
}`;

  contextCode = `<div class="editor-toolbar">
    <span>Step {{ currentIndex + 1 }} of {{ entries.length }}</span>
    <nx-command-history
        [entries]="entries"
        [currentIndex]="currentIndex"
        (undo)="undo()"
        (redo)="redo()"
        (restore)="onRestore($event)">
    </nx-command-history>
</div>`;

  contextTs = `// canUndo / canRedo are derived from currentIndex automatically -
// the undo/redo buttons disable themselves at either end of the list.`;
}
