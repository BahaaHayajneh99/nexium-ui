import { Component, inject } from '@angular/core';
import { NxSplitButton, NxSplitButtonAction } from 'components';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-split-button-demo',
  imports: [NxSplitButton, DemoSection],
  templateUrl: './ui-split-button-demo.html',
  styleUrl: './ui-split-button-demo.scss',
})
export class UiSplitButtonDemo {
  importCode = `import { NxSplitButton } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  actions: NxSplitButtonAction[] = [
    { label: 'Save as draft', value: 'draft' },
    { label: 'Save and publish', value: 'publish' },
    { label: 'Save as template', value: 'template' },
  ];

  status = '';

  basicCode = `<nx-split-button
  label="Save"
  [actions]="actions"
  (primaryClick)="onPrimaryClick()"
  (actionSelected)="onActionSelected($event)">
</nx-split-button>`;

  basicTs = `actions: NxSplitButtonAction[] = [
  { label: 'Save as draft', value: 'draft' },
  { label: 'Save and publish', value: 'publish' },
  { label: 'Save as template', value: 'template' },
];

onPrimaryClick(): void {
  this.status = 'Saved';
}

onActionSelected(value: string): void {
  this.status = value;
}`;

  onPrimaryClick(): void {
    this.status = 'Saved';
  }

  onActionSelected(value: string): void {
    this.status = value;
  }
}
