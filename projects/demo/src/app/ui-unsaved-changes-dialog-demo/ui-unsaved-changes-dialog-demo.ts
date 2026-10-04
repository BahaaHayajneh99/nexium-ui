import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxUnsavedChangesDialog } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-unsaved-changes-dialog-demo',
  imports: [NxUnsavedChangesDialog, DemoSection],
  templateUrl: './ui-unsaved-changes-dialog-demo.html',
  styleUrl: './ui-unsaved-changes-dialog-demo.scss',
})
export class UiUnsavedChangesDialogDemo {
  importCode = `import { NxUnsavedChangesDialog } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  open = false;
  lastAction = '';

  onSave(): void {
    this.lastAction = 'Saved';
  }

  onDiscard(): void {
    this.lastAction = 'Discarded';
  }

  onCancel(): void {
    this.lastAction = 'Cancelled - dialog closed, nothing changed';
  }

  basicCode = `<button (click)="open = true">Leave page</button>

<nx-unsaved-changes-dialog
    [(open)]="open"
    (save)="onSave()"
    (discard)="onDiscard()"
    (cancel)="onCancel()">
</nx-unsaved-changes-dialog>`;

  basicTs = `open = false;

onSave(): void { /* persist changes, then navigate away */ }
onDiscard(): void { /* navigate away without saving */ }
onCancel(): void { /* stay on the page */ }`;
}
