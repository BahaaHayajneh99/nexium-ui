import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxInlineEdit, NxSelectOption } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-inline-edit-demo',
  imports: [NxInlineEdit, DemoSection],
  templateUrl: './ui-inline-edit-demo.html',
  styleUrl: './ui-inline-edit-demo.scss',
})
export class UiInlineEditDemo {
  importCode = `import { NxInlineEdit } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  profileName = 'Bahaa Hayajneh';
  bio = 'Loving the new dashboard redesign - the cache invalidation work really paid off.';
  price: number | null = 42;
  status = 'active';

  statusOptions: NxSelectOption[] = [
    { label: 'Active', value: 'active' },
    { label: 'Paused', value: 'paused' },
    { label: 'Archived', value: 'archived' },
  ];

  lastEvent = '';

  onSave(field: string, value: unknown): void {
    this.lastEvent = `saved ${field}: ${JSON.stringify(value)}`;
  }

  onCancel(field: string): void {
    this.lastEvent = `canceled editing ${field}`;
  }

  textCode = `<nx-inline-edit
    [(value)]="profileName"
    placeholder="Enter a name"
    (save)="onSave('name', $event)"
    (cancel)="onCancel('name')">
</nx-inline-edit>

<nx-inline-edit
    type="textarea"
    [(value)]="bio"
    placeholder="Add a short bio"
    (save)="onSave('bio', $event)">
</nx-inline-edit>`;

  textTs = `profileName = 'Bahaa Hayajneh';
bio = 'Loving the new dashboard redesign...';

onSave(field: string, value: unknown): void {
  // persist the new value - nx-inline-edit already updated its own display via [(value)]
}`;

  numberCode = `<nx-inline-edit
    type="number"
    [(value)]="price"
    placeholder="0.00"
    (save)="onSave('price', $event)">
</nx-inline-edit>`;

  numberTs = `price: number | null = 42;

// type="number" renders nx-number while editing, so min/max/step behavior
// stays consistent with every other numeric field in the library.`;

  selectCode = `<nx-inline-edit
    type="select"
    [(value)]="status"
    [options]="statusOptions"
    (save)="onSave('status', $event)">
</nx-inline-edit>`;

  selectTs = `statusOptions: NxSelectOption[] = [
  { label: 'Active', value: 'active' },
  { label: 'Paused', value: 'paused' },
  { label: 'Archived', value: 'archived' },
];

status = 'active';

// type="select" renders nx-select while editing and shows the matching
// option's label (not its raw value) in display mode.`;
}
