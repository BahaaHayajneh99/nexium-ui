import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxInput, NxSelect, NxCheckbox, NxSelectOption } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-form-builder-demo',
  imports: [NxInput, NxSelect, NxCheckbox, DemoSection],
  templateUrl: './form-builder-demo.html',
  styleUrl: './form-builder-demo.scss',
})
export class FormBuilderDemo {
  public commonService = inject(CommonService);
  name = '';
  email = '';
  country = '';
  agree = false;
  submitted = false;

  countries: NxSelectOption[] = [
    { label: 'United States', value: 'us' },
    { label: 'United Kingdom', value: 'uk' },
    { label: 'Germany', value: 'de' },
  ];

  basicCode = `<nx-input label="Full Name" [(value)]="name"></nx-input>
<nx-input label="Email" [(value)]="email"></nx-input>
<nx-select label="Country" [options]="countries" [(value)]="country"></nx-select>
<nx-checkbox label="I agree to the terms" [(checked)]="agree"></nx-checkbox>
<button (click)="submit()">Submit</button>`;

  basicTs = `name = '';
email = '';
country = '';
agree = false;
submitted = false;

countries: NxSelectOption[] = [
  { label: 'United States', value: 'us' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Germany', value: 'de' },
];

submit(): void {
  this.submitted = true;
}`;

  submit(): void {
    this.submitted = true;
  }
}
