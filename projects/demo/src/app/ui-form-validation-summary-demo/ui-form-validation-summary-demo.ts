import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxFormValidationSummary, NxInput, NxValidationError } from 'components';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-form-validation-summary-demo',
  imports: [NxFormValidationSummary, NxInput, DemoSection, FormsModule],
  templateUrl: './ui-form-validation-summary-demo.html',
  styleUrl: './ui-form-validation-summary-demo.scss',
})
export class UiFormValidationSummaryDemo {
  importCode = `import { NxFormValidationSummary } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  email = '';
  password = '';

  errors: NxValidationError[] = [];
  lastClicked = '';

  basicCode = `<nx-input label="Email" [(ngModel)]="email"></nx-input>
<nx-input type="password" label="Password" [(ngModel)]="password"></nx-input>
<button (click)="onSubmit()">Submit</button>

<nx-form-validation-summary [errors]="errors" (errorClick)="onErrorClick($event)">
</nx-form-validation-summary>`;

  basicTs = `email = '';
password = '';
errors: NxValidationError[] = [];

onSubmit(): void {
  const errors: NxValidationError[] = [];
  if (!this.email) {
    errors.push({ field: 'email', label: 'Email', message: 'Email is required' });
  }
  if (this.password.length < 8) {
    errors.push({ field: 'password', label: 'Password', message: 'Password must be at least 8 characters' });
  }
  this.errors = errors;
}

onErrorClick(error: NxValidationError): void {
  // Consumer is responsible for focusing the real field using error.field.
}`;

  onSubmit(): void {
    const errors: NxValidationError[] = [];
    if (!this.email) {
      errors.push({ field: 'email', label: 'Email', message: 'Email is required' });
    }
    if (this.password.length < 8) {
      errors.push({ field: 'password', label: 'Password', message: 'Password must be at least 8 characters' });
    }
    this.errors = errors;
  }

  onErrorClick(error: NxValidationError): void {
    this.lastClicked = `last clicked: ${error.label} (field: "${error.field}")`;
  }
}
