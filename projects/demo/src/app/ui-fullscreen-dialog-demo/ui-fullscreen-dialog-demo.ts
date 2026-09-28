import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxFullscreenDialog } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-fullscreen-dialog-demo',
  imports: [NxFullscreenDialog, DemoSection],
  templateUrl: './ui-fullscreen-dialog-demo.html',
  styleUrl: './ui-fullscreen-dialog-demo.scss',
})
export class UiFullscreenDialogDemo {
  importCode = `import { NxFullscreenDialog } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  open = false;

  basicCode = `<button (click)="open = true">Open editor</button>

<nx-fullscreen-dialog header="Edit Profile" [(open)]="open">
    <div nx-fullscreen-dialog-body>
        Full-viewport content goes here - a form, a wizard, anything
        that needs real room instead of a small centered box.
    </div>
    <div nx-fullscreen-dialog-footer>
        <button (click)="open = false">Cancel</button>
        <button (click)="open = false">Save</button>
    </div>
</nx-fullscreen-dialog>`;

  basicTs = `open = false;`;
}
