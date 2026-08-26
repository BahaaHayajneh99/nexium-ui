import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NxInput, NxSelect, NxSelectOption, NxCheckbox, NxSwitch, NxButton } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-guide-forms-demo',
  imports: [NxInput, NxSelect, NxCheckbox, NxSwitch, NxButton, FormsModule, ReactiveFormsModule, JsonPipe, DemoSection],
  templateUrl: './guide-forms-demo.html',
})
export class GuideFormsDemo {
  planOptions: NxSelectOption[] = [
    { label: 'Starter', value: 'starter' },
    { label: 'Pro', value: 'pro' },
    { label: 'Team', value: 'team' },
  ];

  private fb = new FormBuilder();

  reactiveForm = this.fb.group({
    name: ['', Validators.required],
    plan: ['pro', Validators.required],
    agree: [false, Validators.requiredTrue],
  });

  reactiveSubmitted: unknown = null;

  templateModel = {
    name: '',
    plan: 'starter',
    notifications: true,
  };

  templateSubmitted: unknown = null;

  reactiveCode = `<form [formGroup]="reactiveForm" (ngSubmit)="onReactiveSubmit()">
    <nx-input label="Name" formControlName="name"></nx-input>
    <nx-select label="Plan" [options]="planOptions" formControlName="plan"></nx-select>
    <nx-checkbox label="I agree to the Terms" formControlName="agree"></nx-checkbox>
    <nx-button type="submit" [disabled]="reactiveForm.invalid">Submit</nx-button>
</form>`;

  reactiveTs = `reactiveForm = this.fb.group({
  name: ['', Validators.required],
  plan: ['pro', Validators.required],
  agree: [false, Validators.requiredTrue],
});

onReactiveSubmit(): void {
  this.reactiveSubmitted = this.reactiveForm.value;
}`;

  templateCode = `<form #f="ngForm" (ngSubmit)="onTemplateSubmit()">
    <nx-input label="Name" [(ngModel)]="templateModel.name" name="name" required></nx-input>
    <nx-select label="Plan" [options]="planOptions" [(ngModel)]="templateModel.plan" name="plan"></nx-select>
    <nx-switch label="Email notifications" [(ngModel)]="templateModel.notifications" name="notifications"></nx-switch>
    <nx-button type="submit">Submit</nx-button>
</form>`;

  templateTs = `templateModel = {
  name: '',
  plan: 'starter',
  notifications: true,
};

onTemplateSubmit(): void {
  this.templateSubmitted = { ...this.templateModel };
}`;

  onReactiveSubmit(): void {
    this.reactiveSubmitted = this.reactiveForm.value;
  }

  onTemplateSubmit(): void {
    this.templateSubmitted = { ...this.templateModel };
  }
}
