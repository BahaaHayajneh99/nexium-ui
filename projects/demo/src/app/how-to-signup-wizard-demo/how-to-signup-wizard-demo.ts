import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxStepper, NxStep, NxInput, NxButton, NxCard, NxCardContent } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-how-to-signup-wizard-demo',
  imports: [NxStepper, NxInput, NxButton, NxCard, NxCardContent, FormsModule, DemoSection],
  templateUrl: './how-to-signup-wizard-demo.html',
})
export class HowToSignupWizardDemo {
  steps: NxStep[] = [{ label: 'Account' }, { label: 'Profile' }, { label: 'Confirm' }];
  activeIndex = 0;

  email = '';
  password = '';
  fullName = '';
  company = '';

  next(): void {
    if (this.activeIndex < this.steps.length - 1) this.activeIndex += 1;
  }

  back(): void {
    if (this.activeIndex > 0) this.activeIndex -= 1;
  }

  code = `<nx-stepper [steps]="steps" [(activeIndex)]="activeIndex"></nx-stepper>

@if (activeIndex === 0) {
    <nx-input label="Email" [(ngModel)]="email"></nx-input>
    <nx-input label="Password" type="password" [(ngModel)]="password"></nx-input>
} @else if (activeIndex === 1) {
    <nx-input label="Full Name" [(ngModel)]="fullName"></nx-input>
    <nx-input label="Company" [(ngModel)]="company"></nx-input>
} @else {
    <p>Email: {{ email }}</p>
    <p>Name: {{ fullName }}</p>
}

<nx-button variant="secondary" [disabled]="activeIndex === 0" (click)="back()">Back</nx-button>
<nx-button variant="primary" (click)="next()">{{ activeIndex === steps.length - 1 ? 'Finish' : 'Next' }}</nx-button>`;

  tsCode = `steps: NxStep[] = [{ label: 'Account' }, { label: 'Profile' }, { label: 'Confirm' }];
activeIndex = 0;

email = '';
password = '';
fullName = '';
company = '';

next(): void {
  if (this.activeIndex < this.steps.length - 1) this.activeIndex += 1;
}

back(): void {
  if (this.activeIndex > 0) this.activeIndex -= 1;
}`;
}
