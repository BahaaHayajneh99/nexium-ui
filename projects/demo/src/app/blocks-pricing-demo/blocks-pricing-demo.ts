import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxCard, NxCardHeader, NxCardTitle, NxCardSubtitle, NxCardContent, NxCardFooter, NxIcon, NxBadge, NxButton } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  variant: 'primary' | 'secondary';
  highlighted: boolean;
}

@Component({
  selector: 'app-blocks-pricing-demo',
  imports: [NxCard, NxCardHeader, NxCardTitle, NxCardSubtitle, NxCardContent, NxCardFooter, NxIcon, NxBadge, NxButton, DemoSection],
  templateUrl: './blocks-pricing-demo.html',
})
export class BlocksPricingDemo {
  public commonService = inject(CommonService);
  tiers: PricingTier[] = [
    {
      name: 'Starter',
      price: '$0',
      period: '/month',
      description: `For side projects and evaluating ${this.commonService.appName}.`,
      features: ['All components', 'Community support', 'MIT license'],
      variant: 'secondary',
      highlighted: false,
    },
    {
      name: 'Pro',
      price: '$19',
      period: '/month',
      description: 'For freelancers and small teams shipping real products.',
      features: ['Everything in Starter', 'Priority issue triage', 'Early access to new components'],
      variant: 'primary',
      highlighted: true,
    },
    {
      name: 'Team',
      price: '$49',
      period: '/month',
      description: 'For teams that need a direct line to maintainers.',
      features: ['Everything in Pro', 'Shared Slack channel', 'Roadmap input'],
      variant: 'secondary',
      highlighted: false,
    },
  ];

  previewCode = `<nx-card variant="outlined" [hoverable]="true">
    <nx-card-header>
        <nx-card-title>Pro</nx-card-title>
        <nx-badge variant="primary" size="small">Most Popular</nx-badge>
        <nx-card-subtitle>For freelancers and small teams shipping real products.</nx-card-subtitle>
    </nx-card-header>

    <nx-card-content>
        <div class="price">
            <span class="price-value">$19</span>
            <span class="price-period">/month</span>
        </div>

        <ul class="feature-list">
            <li><nx-icon icon="nx-check-circle" variant="svg" [size]="16"></nx-icon> Everything in Starter</li>
            <li><nx-icon icon="nx-check-circle" variant="svg" [size]="16"></nx-icon> Priority issue triage</li>
            <li><nx-icon icon="nx-check-circle" variant="svg" [size]="16"></nx-icon> Early access to new components</li>
        </ul>
    </nx-card-content>

    <nx-card-footer>
        <nx-button variant="primary" [fullWidth]="true">Choose Pro</nx-button>
    </nx-card-footer>
</nx-card>`;
}
