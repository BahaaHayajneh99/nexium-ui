import { Component } from '@angular/core';
import {
  NxCard,
  NxCardHeader,
  NxCardTitle,
  NxCardContent,
  NxCardFooter,
  NxBadge,
  NxButton,
  NxIcon,
  NxAccordionComponent,
  NxAccordionItemComponent,
  NxAccordionHeaderComponent,
  NxAccordionContentComponent,
} from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

interface PricingTier {
  name: string;
  price: string;
  period: string;
  cta: string;
  ctaVariant: 'outline' | 'primary';
  highlighted: boolean;
  features: string[];
}

@Component({
  selector: 'app-templates-pricing-page-demo',
  imports: [
    NxCard,
    NxCardHeader,
    NxCardTitle,
    NxCardContent,
    NxCardFooter,
    NxBadge,
    NxButton,
    NxIcon,
    NxAccordionComponent,
    NxAccordionItemComponent,
    NxAccordionHeaderComponent,
    NxAccordionContentComponent,
    DemoSection,
  ],
  templateUrl: './templates-pricing-page-demo.html',
})
export class TemplatesPricingPageDemo {
  tiers: PricingTier[] = [
    {
      name: 'Free',
      price: '$0',
      period: '/ month',
      cta: 'Get started',
      ctaVariant: 'outline',
      highlighted: false,
      features: ['1 project', 'Community support', 'Basic analytics'],
    },
    {
      name: 'Pro',
      price: '$29',
      period: '/ month',
      cta: 'Upgrade',
      ctaVariant: 'primary',
      highlighted: true,
      features: ['Unlimited projects', 'Priority support', 'Advanced analytics', 'Team collaboration'],
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: '/ month',
      cta: 'Contact sales',
      ctaVariant: 'outline',
      highlighted: false,
      features: ['Everything in Pro', 'Dedicated account manager', 'SSO & audit logs', 'Custom SLA'],
    },
  ];

  faqs = [
    { q: 'Can I change plans later?', a: 'Yes - upgrade or downgrade at any time from your billing settings. Changes are prorated automatically.' },
    { q: 'Do you offer a free trial?', a: 'The Pro plan includes a 14-day free trial, no credit card required to start.' },
    { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, as well as invoiced ACH/wire transfers on Enterprise plans.' },
    { q: 'Is there a discount for annual billing?', a: 'Yes - paying annually saves roughly two months compared to the monthly price.' },
    { q: 'Can I cancel at any time?', a: 'There are no long-term contracts. Cancel whenever you like and keep access until the end of your billing period.' },
  ];

  tiersCode = `<div class="nx-auto-fit-grid" style="--nx-grid-min-width: 260px;">
    @for (tier of tiers; track tier.name) {
        <nx-card [variant]="tier.highlighted ? 'elevated' : 'outlined'">
            <nx-card-header>
                @if (tier.highlighted) {
                    <nx-badge variant="primary" size="small">Most popular</nx-badge>
                }
                <nx-card-title>{{ tier.name }}</nx-card-title>
                <strong>{{ tier.price }}</strong> <span>{{ tier.period }}</span>
            </nx-card-header>
            <nx-card-content>
                @for (feature of tier.features; track feature) {
                    <div>
                        <nx-icon icon="nx-check" [size]="16"></nx-icon>
                        <span>{{ feature }}</span>
                    </div>
                }
            </nx-card-content>
            <nx-card-footer>
                <nx-button [variant]="tier.ctaVariant" fullWidth>{{ tier.cta }}</nx-button>
            </nx-card-footer>
        </nx-card>
    }
</div>`;

  faqCode = `<nx-accordion>
    @for (item of faqs; track item.q) {
        <nx-accordion-item>
            <nx-accordion-header>{{ item.q }}</nx-accordion-header>
            <nx-accordion-content>{{ item.a }}</nx-accordion-content>
        </nx-accordion-item>
    }
</nx-accordion>`;
}
