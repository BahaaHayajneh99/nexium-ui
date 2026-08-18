import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { UiRadioGroup, NxRadioOption } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-radio-demo',
  imports: [UiRadioGroup, DemoSection],
  templateUrl: './ui-radio-demo.html',
  styleUrl: './ui-radio-demo.scss',
})
export class UiRadioDemo {
  public commonService = inject(CommonService);
  plan = 'basic';

  options: NxRadioOption[] = [
    { label: 'Basic Plan', value: 'basic' },
    { label: 'Pro Plan', value: 'pro' },
    { label: 'Enterprise Plan', value: 'enterprise' },
  ];

  basicCode = `<nx-radio-group name="plan" [options]="options" [(value)]="plan">
</nx-radio-group>`;

  basicTs = `plan = 'basic';

options: NxRadioOption[] = [
  { label: 'Basic Plan', value: 'basic' },
  { label: 'Pro Plan', value: 'pro' },
  { label: 'Enterprise Plan', value: 'enterprise' },
];`;

  inlinePlan = 'basic';

  inlineCode = `<nx-radio-group name="plan" [options]="options" [inline]="true" [(value)]="plan">
</nx-radio-group>`;
}
