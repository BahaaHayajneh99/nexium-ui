import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { NxRadioGroup, NxRadioOption } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-radio-demo',
  imports: [NxRadioGroup, FormsModule, ReactiveFormsModule, DemoSection],
  templateUrl: './ui-radio-demo.html',
  styleUrl: './ui-radio-demo.scss',
})
export class UiRadioDemo {
  importCode = `import { NxRadioGroup, NxRadioOption } from 'nexium-ui';`;

  public commonService = inject(CommonService);
  plan = 'basic';

  options: NxRadioOption[] = [
    { label: 'Basic Plan', value: 'basic' },
    { label: 'Pro Plan', value: 'pro' },
    { label: 'Enterprise Plan', value: 'enterprise' },
  ];

  private fb = new FormBuilder();

  planForm = this.fb.group({ plan: ['basic'] });

  reactiveCode = `<div [formGroup]="planForm">
    <nx-radio-group name="plan" [options]="options" formControlName="plan"></nx-radio-group>
</div>`;

  reactiveTs = `planForm = this.fb.group({ plan: ['basic'] });

options: NxRadioOption[] = [
  { label: 'Basic Plan', value: 'basic' },
  { label: 'Pro Plan', value: 'pro' },
  { label: 'Enterprise Plan', value: 'enterprise' },
];`;

  templateCode = `<nx-radio-group name="plan" [options]="options" [(ngModel)]="plan"></nx-radio-group>`;

  templateTs = `plan = 'basic';

options: NxRadioOption[] = [
  { label: 'Basic Plan', value: 'basic' },
  { label: 'Pro Plan', value: 'pro' },
  { label: 'Enterprise Plan', value: 'enterprise' },
];`;

  inlinePlan = 'basic';

  inlineCode = `<nx-radio-group name="inline-plan" [options]="options" [inline]="true" [(ngModel)]="inlinePlan"></nx-radio-group>`;
}
