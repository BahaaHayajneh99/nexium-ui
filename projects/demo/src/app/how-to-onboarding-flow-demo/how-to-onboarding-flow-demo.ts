import { Component } from '@angular/core';
import { NxCard, NxCardContent, NxButton, NxIcon, NxProgressBarComponent } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

interface OnboardingStep {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-how-to-onboarding-flow-demo',
  imports: [NxCard, NxCardContent, NxButton, NxIcon, NxProgressBarComponent, DemoSection],
  templateUrl: './how-to-onboarding-flow-demo.html',
})
export class HowToOnboardingFlowDemo {
  steps: OnboardingStep[] = [
    { icon: 'nx-rocket', title: 'Welcome aboard', description: "Let's get your workspace set up in a few quick steps." },
    { icon: 'nx-user', title: 'Complete your profile', description: 'Add a name and avatar so your team can recognize you.' },
    { icon: 'nx-bell', title: 'Choose notifications', description: 'Pick how you want to hear about updates.' },
    { icon: 'nx-check-circle', title: "You're all set", description: 'Jump into your new dashboard.' },
  ];

  currentStep = 0;

  get progress(): number {
    return Math.round(((this.currentStep + 1) / this.steps.length) * 100);
  }

  next(): void {
    if (this.currentStep < this.steps.length - 1) this.currentStep += 1;
  }

  back(): void {
    if (this.currentStep > 0) this.currentStep -= 1;
  }

  code = `<nx-progress-bar [value]="progress" [showLabel]="true"></nx-progress-bar>

<nx-card variant="outlined">
    <nx-card-content style="text-align: center;">
        <nx-icon [icon]="steps[currentStep].icon" variant="svg" [size]="40"></nx-icon>
        <h3>{{ steps[currentStep].title }}</h3>
        <p>{{ steps[currentStep].description }}</p>
    </nx-card-content>
</nx-card>

<nx-button variant="secondary" [disabled]="currentStep === 0" (click)="back()">Back</nx-button>
<nx-button variant="primary" [disabled]="currentStep === steps.length - 1" (click)="next()">Next</nx-button>`;

  tsCode = `steps: OnboardingStep[] = [
  { icon: 'nx-rocket', title: 'Welcome aboard', description: '...' },
  { icon: 'nx-user', title: 'Complete your profile', description: '...' },
  { icon: 'nx-bell', title: 'Choose notifications', description: '...' },
  { icon: 'nx-check-circle', title: "You're all set", description: '...' },
];

currentStep = 0;

get progress(): number {
  return Math.round(((this.currentStep + 1) / this.steps.length) * 100);
}

next(): void {
  if (this.currentStep < this.steps.length - 1) this.currentStep += 1;
}

back(): void {
  if (this.currentStep > 0) this.currentStep -= 1;
}`;
}
