import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NxButton, NxIcon, NxBreadcrumb, NxBreadcrumbItem, NxTimeline, NxTimelineItem, nxProLicenseGranted } from 'components';
import { PORTFOLIO_PROCESS_STEPS } from '../portfolio-website-data';

/** Extra detail shown per step beyond the short description used elsewhere on the site. */
const STEP_DETAILS: Record<string, string> = {
  Discover: 'Typical duration: 1 week. Deliverable: a positioning document and success criteria your team signs off on.',
  Design: 'Typical duration: 2-4 weeks. Deliverable: weekly concept reviews ending in one approved direction.',
  Build: 'Typical duration: 2-6 weeks, scoped to the project. Deliverable: a staging environment you can click through.',
  Launch: 'Typical duration: 1 week soft-launch window. Deliverable: real usage data before the full rollout.',
  Support: 'Typical duration: 30 days included. Deliverable: fixes and small iterations with no separate contract.',
};

@Component({
  selector: 'app-portfolio-website-process',
  standalone: true,
  imports: [NgTemplateOutlet, RouterLink, NxButton, NxIcon, NxBreadcrumb, NxTimeline],
  templateUrl: './portfolio-website-process.html',
  styleUrl: './portfolio-website-process.scss',
})
export class PortfolioWebsiteProcessDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [
    { label: 'Home', link: '/portfolio-website/home' },
    { label: 'Process' },
  ];

  protected readonly timelineItems: NxTimelineItem[] = PORTFOLIO_PROCESS_STEPS.map((step, index) => ({
    title: `${index + 1}. ${step.title}`,
    description: `${step.description} ${STEP_DETAILS[step.title] ?? ''}`.trim(),
    variant: 'primary',
  }));
}
