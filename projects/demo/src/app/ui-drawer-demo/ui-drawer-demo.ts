import { Component } from '@angular/core';
import { UiDrawer, UiButton } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-drawer-demo',
  imports: [UiDrawer, UiButton, DemoSection],
  templateUrl: './ui-drawer-demo.html',
})
export class UiDrawerDemo {
  rightOpen = false;
  leftOpen = false;
  sheetOpen = false;

  basicCode = `<nx-button (click)="rightOpen = true">Open Drawer</nx-button>

<nx-drawer [(open)]="rightOpen" side="right" size="360px">
    <h4>Filters</h4>
    <p>Drawer content goes here.</p>
</nx-drawer>`;

  sheetCode = `<nx-drawer [(open)]="sheetOpen" side="bottom" size="40vh">
    <h4>Share</h4>
    <p>A bottom-anchored drawer reads as a mobile "sheet" - same component, just side="bottom".</p>
</nx-drawer>`;
}
