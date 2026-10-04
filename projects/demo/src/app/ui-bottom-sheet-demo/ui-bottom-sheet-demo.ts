import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxBottomSheet, NxButton } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-bottom-sheet-demo',
  imports: [NxBottomSheet, NxButton, DemoSection],
  templateUrl: './ui-bottom-sheet-demo.html',
  styleUrl: './ui-bottom-sheet-demo.scss',
})
export class UiBottomSheetDemo {
  importCode = `import { NxBottomSheet } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  basicOpen = false;
  tallOpen = false;

  basicCode = `<nx-button (click)="basicOpen = true">Share</nx-button>

<nx-bottom-sheet [(open)]="basicOpen">
    <h4>Share via</h4>
    <ul class="sheet-options">
        <li>Copy link</li>
        <li>Send in Messages</li>
        <li>Send via Email</li>
        <li>More options...</li>
    </ul>
</nx-bottom-sheet>`;

  basicTs = `basicOpen = false;`;

  tallCode = `<nx-button (click)="tallOpen = true">Open Filters</nx-button>

<nx-bottom-sheet [(open)]="tallOpen" maxHeight="85vh">
    <h4>Filters</h4>
    <p>A taller sheet via maxHeight - useful for longer forms or lists.</p>
</nx-bottom-sheet>`;

  tallTs = `tallOpen = false;`;
}
