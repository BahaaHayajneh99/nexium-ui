import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxDialog } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-dialog-demo',
  imports: [NxDialog, DemoSection],
  templateUrl: './ui-dialog-demo.html',
  styleUrl: './ui-dialog-demo.scss',
})
export class UiDialogDemo {
  importCode = `import { NxDialog } from 'nexium-ui';`;

  public commonService = inject(CommonService);
  open = false;

  basicCode = `<button (click)="open = true">Delete item</button>

<nx-dialog
    [open]="open"
    title="Delete item"
    message="Are you sure you want to delete this item? This action cannot be undone."
    confirmText="Delete"
    (confirm)="onConfirm()"
    (cancel)="open = false">
</nx-dialog>`;

  basicTs = `open = false;

onConfirm(): void {
  this.open = false;
}`;

  onConfirm(): void {
    this.open = false;
  }
}
