import { Component } from '@angular/core';
import { NxCard, NxCardContent, NxAvatar, NxIcon, NxButton } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

interface LandingFeature {
  icon: string;
  title: string;
  desc: string;
}

interface LandingTestimonial {
  quote: string;
  name: string;
  role: string;
}

@Component({
  selector: 'app-templates-landing-page-demo',
  imports: [NxCard, NxCardContent, NxAvatar, NxIcon, NxButton, DemoSection],
  templateUrl: './templates-landing-page-demo.html',
})
export class TemplatesLandingPageDemo {
  features: LandingFeature[] = [
    { icon: 'nx-check', title: 'Launch in days', desc: 'Drop in ready-made sections instead of building a landing page from scratch.' },
    { icon: 'nx-sun', title: 'Themeable by default', desc: 'Every section follows your brand colors and typography automatically.' },
    { icon: 'nx-globe', title: 'Responsive everywhere', desc: 'Looks right on phones, tablets, and widescreen monitors out of the box.' },
  ];

  testimonials: LandingTestimonial[] = [
    { quote: 'We replaced three internal tools with Lumen and cut onboarding time in half.', name: 'Priya Nair', role: 'Head of Ops, Bluewave Inc.' },
    { quote: 'Setup took an afternoon. We were live with a real landing page the same day.', name: 'Marcus Webb', role: 'Founder, Orbit Labs' },
    { quote: 'The cleanest component library we have evaluated, and we tried most of them.', name: 'Elena Ruiz', role: 'CTO, Harbor Systems' },
  ];

  heroCode = `<div class="block-hero block-preview">
    <span class="block-eyebrow">Introducing Lumen</span>
    <h2 class="block-heading">Launch a landing page your whole team is proud of</h2>
    <p class="block-subheading">
        Compose hero sections, feature grids and testimonials from the same free component set -
        no design hand-off required.
    </p>
    <div class="block-actions">
        <nx-button variant="primary" size="large">Get Started</nx-button>
        <nx-button variant="secondary" size="large">View Demo</nx-button>
    </div>
</div>

<div class="nx-auto-fit-grid">
    @for (feature of features; track feature.title) {
        <nx-card variant="outlined">
            <nx-card-content>
                <div class="block-feature-icon">
                    <nx-icon [icon]="feature.icon" variant="svg" [size]="20"></nx-icon>
                </div>
                <div class="block-feature-title">{{ feature.title }}</div>
                <p class="block-feature-text">{{ feature.desc }}</p>
            </nx-card-content>
        </nx-card>
    }
</div>`;

  featuresTsCode = `features: LandingFeature[] = [
  { icon: 'nx-check', title: 'Launch in days', desc: 'Drop in ready-made sections instead of building a landing page from scratch.' },
  { icon: 'nx-sun', title: 'Themeable by default', desc: 'Every section follows your brand colors and typography automatically.' },
  { icon: 'nx-globe', title: 'Responsive everywhere', desc: 'Looks right on phones, tablets, and widescreen monitors out of the box.' },
];`;

  testimonialsCode = `<div class="nx-auto-fit-grid">
    @for (testimonial of testimonials; track testimonial.name) {
        <nx-card variant="outlined">
            <nx-card-content>
                <p>"{{ testimonial.quote }}"</p>
                <div class="content-flex">
                    <nx-avatar [name]="testimonial.name" size="small"></nx-avatar>
                    <div>
                        <div class="template-profile-name">{{ testimonial.name }}</div>
                        <span class="template-stat-label">{{ testimonial.role }}</span>
                    </div>
                </div>
            </nx-card-content>
        </nx-card>
    }
</div>

<div class="block-cta-colored block-preview">
    <h2 class="block-heading">Ready to launch your own page?</h2>
    <nx-button variant="light" size="large">Start Building</nx-button>
</div>`;
}
