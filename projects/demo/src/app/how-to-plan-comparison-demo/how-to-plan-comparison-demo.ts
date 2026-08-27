import { Component } from '@angular/core';
import { NxCard, NxCardContent, NxCardFooter, NxButton, NxIcon, NxBadge } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

interface Plan {
  name: string;
  price: string;
  features: string[];
  highlighted?: boolean;
}

@Component({
  selector: 'app-how-to-plan-comparison-demo',
  imports: [NxCard, NxCardContent, NxCardFooter, NxButton, NxIcon, NxBadge, DemoSection],
  templateUrl: './how-to-plan-comparison-demo.html',
  styleUrl: './how-to-plan-comparison-demo.scss',
})
export class HowToPlanComparisonDemo {
  plans: Plan[] = [
    { name: 'Basic', price: '$9/mo', features: ['1 project', 'Community support', 'Basic analytics'] },
    {
      name: 'Pro',
      price: '$29/mo',
      features: ['Unlimited projects', 'Priority support', 'Advanced analytics', 'Team roles'],
      highlighted: true,
    },
    { name: 'Enterprise', price: 'Contact us', features: ['Everything in Pro', 'SSO & audit logs', 'Dedicated support'] },
  ];

  selected = 'Pro';

  choose(plan: Plan): void {
    this.selected = plan.name;
  }

  code = `@for (plan of plans; track plan.name) {
    <nx-card [variant]="plan.highlighted ? 'elevated' : 'outlined'">
        <nx-card-content>
            @if (plan.highlighted) {
                <nx-badge variant="primary" size="small">Most Popular</nx-badge>
            }
            <h3>{{ plan.name }}</h3>
            <strong>{{ plan.price }}</strong>
            @for (feature of plan.features; track feature) {
                <div><nx-icon icon="nx-check" variant="svg" [size]="14"></nx-icon> {{ feature }}</div>
            }
        </nx-card-content>
        <nx-card-footer>
            <nx-button [variant]="selected === plan.name ? 'primary' : 'secondary'" (click)="choose(plan)">
                {{ selected === plan.name ? 'Selected' : 'Choose Plan' }}
            </nx-button>
        </nx-card-footer>
    </nx-card>
}`;

  tsCode = `plans: Plan[] = [
  { name: 'Basic', price: '$9/mo', features: ['1 project', 'Community support', 'Basic analytics'] },
  {
    name: 'Pro',
    price: '$29/mo',
    features: ['Unlimited projects', 'Priority support', 'Advanced analytics', 'Team roles'],
    highlighted: true,
  },
  { name: 'Enterprise', price: 'Contact us', features: ['Everything in Pro', 'SSO & audit logs', 'Dedicated support'] },
];

selected = 'Pro';

choose(plan: Plan): void {
  this.selected = plan.name;
}`;
}
