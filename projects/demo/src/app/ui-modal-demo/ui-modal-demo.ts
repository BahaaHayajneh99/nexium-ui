import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxModal } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-modal-demo',
  imports: [NxModal, DemoSection],
  templateUrl: './ui-modal-demo.html',
  styleUrl: './ui-modal-demo.scss',
})
export class UiModalDemo {
  importCode = `import { NxModal } from 'nexium-ui';`;

  public commonService = inject(CommonService);
  basicOpen = false;
  footerOpen = false;

  basicCode = `<button (click)="open = true">Open Modal</button>

<nx-modal [(open)]="open" header="Modal Title">
    This is the modal body content.
</nx-modal>`;

  basicTs = `basicOpen = false;`;

  footerCode = `<nx-modal [(open)]="open" header="Confirm Action"> 
    <ng-container nx-modal-body>
         Are you sure you want to delete this item? This action cannot be undone. 
    </ng-container>
    <ng-container nx-modal-footer>
        <button (click)="open = false">Cancel</button>
        <button (click)="open = false">Confirm</button>
    </ng-container>
</nx-modal>`;

  footerTs = `footerOpen = false;`;
}
