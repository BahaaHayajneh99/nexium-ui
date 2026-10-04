import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxFab, NxFabAction } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-fab-demo',
  imports: [NxFab, DemoSection],
  templateUrl: './ui-fab-demo.html',
  styleUrl: './ui-fab-demo.scss',
})
export class UiFabDemo {
  importCode = `import { NxFab } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  speedDialActions: NxFabAction[] = [
    { icon: 'nx-edit', label: 'Edit' },
    { icon: 'nx-share', label: 'Share' },
    { icon: 'nx-trash', label: 'Delete' },
  ];

  lastClicked = '';
  lastAction = '';

  onPlainClick(): void {
    this.lastClicked = new Date().toLocaleTimeString();
  }

  onActionSelected(action: NxFabAction): void {
    this.lastAction = action.label;
  }

  basicCode = `<nx-fab icon="nx-plus" position="bottom-right" (clicked)="onCreate()"></nx-fab>`;

  basicTs = `onCreate(): void {
  // handle the single-action click - nx-fab is position: fixed in a real page,
  // it's only wrapped in a bounded preview box here for the docs.
}`;

  speedDialCode = `<nx-fab
    icon="nx-plus"
    position="bottom-right"
    [actions]="actions"
    (actionSelected)="onActionSelected($event)">
</nx-fab>`;

  speedDialTs = `actions: NxFabAction[] = [
  { icon: 'nx-edit', label: 'Edit' },
  { icon: 'nx-share', label: 'Share' },
  { icon: 'nx-trash', label: 'Delete' },
];

onActionSelected(action: NxFabAction): void {
  // action.icon / action.label identify which secondary button was clicked
}`;
}
