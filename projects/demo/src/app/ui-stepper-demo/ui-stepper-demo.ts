import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { UiStepper, NxStep } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-stepper-demo',
  imports: [UiStepper, DemoSection],
  templateUrl: './ui-stepper-demo.html',
  styleUrl: './ui-stepper-demo.scss',
})
export class UiStepperDemo {
  public commonService = inject(CommonService);
  activeIndex = 1;

  steps: NxStep[] = [
    { label: 'Account' },
    { label: 'Profile' },
    { label: 'Confirmation' },
  ];

  basicCode = `<nx-stepper [steps]="steps" [(activeIndex)]="activeIndex">
</nx-stepper>`;

  basicTs = `activeIndex = 1;

steps: NxStep[] = [
  { label: 'Account' },
  { label: 'Profile' },
  { label: 'Confirmation' },
];`;
}
