import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { NxCombobox, NxComboboxOption } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-combobox-demo',
  imports: [NxCombobox, DemoSection, FormsModule, ReactiveFormsModule],
  templateUrl: './ui-combobox-demo.html',
  styleUrl: './ui-combobox-demo.scss',
})
export class UiComboboxDemo {
  importCode = `import { NxCombobox } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  countryOptions: NxComboboxOption[] = [
    { label: 'United States', value: 'us' },
    { label: 'United Kingdom', value: 'uk' },
    { label: 'Germany', value: 'de' },
    { label: 'France', value: 'fr' },
    { label: 'Japan', value: 'jp' },
    { label: 'Australia', value: 'au' },
  ];

  country = 'us';

  basicCode = `<nx-combobox
    label="Country"
    placeholder="Search countries..."
    [options]="countryOptions"
    [(value)]="country">
</nx-combobox>`;

  basicTs = `countryOptions: NxComboboxOption[] = [
  { label: 'United States', value: 'us' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Germany', value: 'de' },
  { label: 'France', value: 'fr' },
  { label: 'Japan', value: 'jp' },
  { label: 'Australia', value: 'au' },
];

country = 'us';`;

  private fb = new FormBuilder();
  countryForm = this.fb.group({ country: ['de'] });

  reactiveCode = `<div [formGroup]="countryForm">
    <nx-combobox
        label="Country"
        [options]="countryOptions"
        formControlName="country">
    </nx-combobox>
</div>`;

  reactiveTs = `countryForm = this.fb.group({ country: ['de'] });`;

  templateCode = `<nx-combobox
    label="Country"
    [options]="countryOptions"
    [(ngModel)]="country">
</nx-combobox>`;

  templateTs = `country = 'us';`;

  clearable = 'uk';

  clearCode = `<nx-combobox
    label="Country"
    [options]="countryOptions"
    [showClear]="true"
    [(value)]="clearable">
</nx-combobox>`;

  clearTs = `clearable = 'uk';`;

  required = '';

  requiredCode = `<nx-combobox
    label="Country"
    placeholder="Select a country"
    [options]="countryOptions"
    [isRequired]="true"
    [(ngModel)]="required">
</nx-combobox>`;

  requiredTs = `required = '';`;
}
