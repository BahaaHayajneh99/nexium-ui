import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { NxSegmentedControl, NxSegmentedOption } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-segmented-control-demo',
  imports: [NxSegmentedControl, DemoSection, FormsModule, ReactiveFormsModule],
  templateUrl: './ui-segmented-control-demo.html',
  styleUrl: './ui-segmented-control-demo.scss',
})
export class UiSegmentedControlDemo {
  importCode = `import { NxSegmentedControl } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  viewOptions: NxSegmentedOption[] = [
    { label: 'List', value: 'list' },
    { label: 'Board', value: 'board' },
    { label: 'Calendar', value: 'calendar' },
  ];

  view = 'list';

  basicCode = `<nx-segmented-control
    [options]="viewOptions"
    [(value)]="view">
</nx-segmented-control>`;

  basicTs = `viewOptions: NxSegmentedOption[] = [
  { label: 'List', value: 'list' },
  { label: 'Board', value: 'board' },
  { label: 'Calendar', value: 'calendar' },
];

view = 'list';`;

  iconOptions: NxSegmentedOption[] = [
    { label: 'Grid', value: 'grid', icon: 'nx-grid' },
    { label: 'List', value: 'list', icon: 'nx-list' },
  ];

  layout = 'grid';

  iconCode = `<nx-segmented-control
    [options]="iconOptions"
    [(value)]="layout">
</nx-segmented-control>`;

  iconTs = `iconOptions: NxSegmentedOption[] = [
  { label: 'Grid', value: 'grid', icon: 'nx-grid' },
  { label: 'List', value: 'list', icon: 'nx-list' },
];

layout = 'grid';`;

  sizeCode = `<nx-segmented-control size="small" [options]="viewOptions" [(value)]="view"></nx-segmented-control>
<nx-segmented-control size="medium" [options]="viewOptions" [(value)]="view"></nx-segmented-control>
<nx-segmented-control size="large" [options]="viewOptions" [(value)]="view"></nx-segmented-control>`;

  sizeTs = `view = 'list';`;

  fullWidthCode = `<nx-segmented-control
    [options]="viewOptions"
    [fullWidth]="true"
    [(value)]="view">
</nx-segmented-control>`;

  fullWidthTs = `view = 'list';`;

  private fb = new FormBuilder();
  viewForm = this.fb.group({ view: ['board'] });

  reactiveCode = `<div [formGroup]="viewForm">
    <nx-segmented-control [options]="viewOptions" formControlName="view"></nx-segmented-control>
</div>`;

  reactiveTs = `viewForm = this.fb.group({ view: ['board'] });`;

  templateCode = `<nx-segmented-control
    [options]="viewOptions"
    [(ngModel)]="view">
</nx-segmented-control>`;

  templateTs = `view = 'list';`;

  required = '';

  requiredCode = `<nx-segmented-control
    [options]="viewOptions"
    [isRequired]="true"
    [(ngModel)]="required">
</nx-segmented-control>`;

  requiredTs = `required = '';`;
}
