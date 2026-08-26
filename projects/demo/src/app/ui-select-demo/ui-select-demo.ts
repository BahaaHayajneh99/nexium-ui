import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { NxSelect, NxSelectOption } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-select-demo',
  imports: [NxSelect, DemoSection, FormsModule, ReactiveFormsModule],
  templateUrl: './ui-select-demo.html',
  styleUrl: './ui-select-demo.scss',
})
export class UiSelectDemo {
  importCode = `import { NxSelect, NxSelectOption } from 'nexium-ui';`;

  public commonService = inject(CommonService);
  country = '';

  private fb = new FormBuilder();

  countryForm = this.fb.group({ country: [''] });

  options: NxSelectOption[] = [
    { label: 'United States', value: 'us' },
    { label: 'United Kingdom', value: 'uk' },
    { label: 'Germany', value: 'de' },
    { label: 'Egypt', value: 'eg' },
  ];

  reactiveCode = `<div [formGroup]="countryForm">
    <nx-select
        label="Country"
        placeholder="Select a country"
        [options]="options"
        formControlName="country">
    </nx-select>
</div>`;

  reactiveTs = `private fb = new FormBuilder();

countryForm = this.fb.group({ country: [''] });

options: NxSelectOption[] = [
  { label: 'United States', value: 'us' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Germany', value: 'de' },
  { label: 'Egypt', value: 'eg' },
];`;

  templateCode = `<nx-select
    label="Country"
    placeholder="Select a country"
    [options]="options"
    [(ngModel)]="country">
</nx-select>`;

  templateTs = `country = '';

options: NxSelectOption[] = [
  { label: 'United States', value: 'us' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Germany', value: 'de' },
  { label: 'Egypt', value: 'eg' },
];`;
}
