export const MARKETING_TS_SOURCE = `import { Component } from '@angular/core';
import { NxNavbar, NxButton, NxIcon, NxStatistic, NxAvatar, NxBadge, NxCookieBanner } from 'nexium-ui';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [NxNavbar, NxButton, NxIcon, NxStatistic, NxAvatar, NxBadge, NxCookieBanner],
  templateUrl: './landing.html',
})
export class Landing {
  features = [
    { icon: 'nx-chart-bar', title: 'Real-time Dashboards', description: 'See revenue update live.' },
    // ...more features
  ];

  testimonials = [
    { quote: 'Nova cut our reporting time from two days to two minutes.', name: 'Priya Nair', role: 'Head of Ops' },
    // ...more testimonials
  ];

  plans = [
    { name: 'Starter', price: '$0', period: 'forever', features: ['1 dashboard'], highlighted: false },
    { name: 'Growth', price: '$49', period: '/month', features: ['Unlimited dashboards'], highlighted: true },
    // ...more plans
  ];
}
`;

export const MARKETING_HTML_SOURCE = `<nx-navbar [sticky]="true">
    <div nx-navbar-brand>Nova</div>
    <div nx-navbar-links>
        <a href="#features">Features</a>
        <a href="#pricing">Pricing</a>
    </div>
    <div nx-navbar-actions>
        <nx-button variant="primary" size="small">Start free trial</nx-button>
    </div>
</nx-navbar>

<section class="hero">
    <nx-badge variant="info" rounded>Built entirely with NexiumUI</nx-badge>
    <h1>Analytics that actually help you grow</h1>
    <p>Nova turns raw product data into decisions your whole team can act on.</p>
    <nx-button variant="primary" size="large">Start free trial</nx-button>
    <nx-button variant="secondary" size="large">View live demo</nx-button>

    <div class="hero-stats">
        <nx-statistic label="Teams" [value]="10000" suffix="+"></nx-statistic>
        <nx-statistic label="Uptime" [value]="99.9" suffix="%"></nx-statistic>
    </div>
</section>

<section id="features">
    @for (feature of features; track feature.title) {
        <div class="feature-card">
            <nx-icon [icon]="feature.icon" variant="svg" [size]="22"></nx-icon>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
        </div>
    }
</section>

<section id="pricing">
    @for (plan of plans; track plan.name) {
        <div class="plan-card" [class.highlighted]="plan.highlighted">
            <h3>{{ plan.name }}</h3>
            <div class="price">{{ plan.price }}<span>{{ plan.period }}</span></div>
            <nx-button [variant]="plan.highlighted ? 'primary' : 'secondary'" [fullWidth]="true">
                Choose {{ plan.name }}
            </nx-button>
        </div>
    }
</section>

<nx-cookie-banner message="We use cookies to analyze traffic and improve your experience." storageKey="nova-marketing-consent"></nx-cookie-banner>
`;
