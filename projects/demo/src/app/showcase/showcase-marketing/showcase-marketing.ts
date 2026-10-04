import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NxNavbar, NxButton, NxIcon, NxStatistic, NxAvatar, NxBadge, NxCookieBanner } from 'components';
import { ShowcaseSourceView } from '../shared/showcase-source-view/showcase-source-view';
import { MARKETING_TS_SOURCE, MARKETING_HTML_SOURCE } from './showcase-marketing.source';

interface NxShowcaseFeature {
  icon: string;
  title: string;
  description: string;
}

interface NxShowcaseTestimonial {
  quote: string;
  name: string;
  role: string;
}

interface NxShowcasePlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
}

/**
 * A second full showcase family - a marketing/landing page (not another admin-dashboard route),
 * proving NexiumUI builds product sites just as well as internal tools. Standalone top-level
 * route (not nested under ShowcaseLayout's dashboard shell) with its own nav + footer.
 */
@Component({
  selector: 'app-showcase-marketing',
  standalone: true,
  imports: [RouterLink, NxNavbar, NxButton, NxIcon, NxStatistic, NxAvatar, NxBadge, NxCookieBanner, ShowcaseSourceView],
  templateUrl: './showcase-marketing.html',
  styleUrl: './showcase-marketing.scss',
})
export class ShowcaseMarketing {
  tsSource = MARKETING_TS_SOURCE;
  htmlSource = MARKETING_HTML_SOURCE;

  features: NxShowcaseFeature[] = [
    { icon: 'nx-chart-bar', title: 'Real-time Dashboards', description: 'See revenue, usage, and churn update live - no refresh needed.' },
    { icon: 'nx-users', title: 'Team Collaboration', description: 'Assign owners, leave comments, and keep everyone in sync.' },
    { icon: 'nx-globe', title: 'Open API', description: 'Pull any metric into your own tools with a simple REST API.' },
    { icon: 'nx-lock', title: 'Enterprise Security', description: 'SSO, audit logs, and role-based access built in.' },
    { icon: 'nx-clock', title: '24/7 Support', description: 'Real humans, real fast - average response time under 10 minutes.' },
    { icon: 'nx-message', title: 'In-app Messaging', description: 'Talk to your team without leaving the dashboard.' },
  ];

  testimonials: NxShowcaseTestimonial[] = [
    { quote: 'Nova cut our reporting time from two days to two minutes.', name: 'Priya Nair', role: 'Head of Ops, Bluewave Inc.' },
    { quote: 'The best analytics tool we have used, and we have tried them all.', name: 'Marcus Webb', role: 'CEO, Orbit Labs' },
    { quote: 'Setup took an afternoon. We were live the same day.', name: 'Elena Ruiz', role: 'CTO, Harbor Systems' },
  ];

  plans: NxShowcasePlan[] = [
    {
      name: 'Starter',
      price: '$0',
      period: 'forever',
      description: 'For solo founders getting started.',
      features: ['1 dashboard', 'Up to 3 team members', '7-day data history'],
      highlighted: false,
    },
    {
      name: 'Growth',
      price: '$49',
      period: '/month',
      description: 'For growing teams that need more.',
      features: ['Unlimited dashboards', 'Up to 25 team members', '1-year data history', 'API access'],
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For companies with real scale.',
      features: ['Everything in Growth', 'SSO & audit logs', 'Dedicated support', 'Custom contracts'],
      highlighted: false,
    },
  ];
}
