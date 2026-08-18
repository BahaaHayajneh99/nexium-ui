import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { UiSelect, NxSelectOption } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-select-demo',
  imports: [UiSelect, DemoSection],
  templateUrl: './ui-select-demo.html',
  styleUrl: './ui-select-demo.scss',
})
export class UiSelectDemo {
  public commonService = inject(CommonService);
  country = '';

  options: NxSelectOption[] = [
    { label: 'United States', value: 'us' },
    { label: 'United Kingdom', value: 'uk' },
    { label: 'Germany', value: 'de' },
    { label: 'Egypt', value: 'eg' },
  ];

  basicCode = `<nx-select
    label="Country"
    placeholder="Select a country"
    [options]="options"
    [(value)]="country">
</nx-select>`;

  basicTs = `country = '';

options: NxSelectOption[] = [
  { label: 'United States', value: 'us' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Germany', value: 'de' },
  { label: 'Egypt', value: 'eg' },
];`;
}
