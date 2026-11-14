import { Component, computed } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  NxButton,
  NxIcon,
  NxBreadcrumb,
  NxBreadcrumbItem,
  NxTabsComponent,
  NxTabComponent,
  NxKanban,
  NxKanbanColumn,
  nxProLicenseGranted,
} from 'components';
import { NX_SAAS_FEATURES, NxSaasFeature } from '../saas-website-data';

/**
 * Features page of the "SaaS Website" PRO template - every feature in full detail, grouped
 * into tabs by category (Analytics / Collaboration / Security) for an easier skim.
 */
@Component({
  selector: 'app-saas-website-features',
  imports: [NgTemplateOutlet, RouterLink, NxButton, NxIcon, NxBreadcrumb, NxTabsComponent, NxTabComponent, NxKanban],
  templateUrl: './saas-website-features.html',
  styleUrl: './saas-website-features.scss',
})
export class SaasWebsiteFeaturesDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [
    { label: 'Home', link: '/saas-website/home' },
    { label: 'Features' },
  ];

  protected readonly allFeatures = NX_SAAS_FEATURES;

  private readonly byCategory = (category: NxSaasFeature['category']) =>
    computed(() => NX_SAAS_FEATURES.filter((feature) => feature.category === category));

  protected readonly analyticsFeatures = this.byCategory('Analytics');
  protected readonly collaborationFeatures = this.byCategory('Collaboration');
  protected readonly securityFeatures = this.byCategory('Security');

  /** Static display-only demo board for the "how teams organize work in Nimbus" section. */
  protected readonly workBoardMembers: Record<string, string> = {
    priya: 'Priya Shah',
    marcus: 'Marcus Webb',
    lena: 'Lena Ortiz',
    sam: 'Sam Patel',
  };

  protected readonly workBoardColumns: NxKanbanColumn[] = [
    {
      id: 'backlog',
      title: 'Backlog',
      cards: [
        {
          id: 'card-1',
          title: 'Redesign onboarding flow',
          description: 'Cut the first-dashboard setup down from 7 steps to 3.',
          assignees: ['lena'],
        },
        {
          id: 'card-2',
          title: 'Q3 analytics export',
          description: 'Scheduled PDF/CSV export for the board-report use case.',
          assignees: ['sam', 'marcus'],
        },
        {
          id: 'card-3',
          title: 'Evaluate Snowflake connector',
          description: 'Spike to see if we can ship a native warehouse integration.',
          assignees: ['priya'],
        },
      ],
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      cards: [
        {
          id: 'card-4',
          title: 'Custom alert thresholds v2',
          description: 'Add percentage-based thresholds alongside fixed values.',
          assignees: ['marcus'],
        },
        {
          id: 'card-5',
          title: 'SSO session timeout settings',
          description: 'Let admins configure idle-session expiry per workspace.',
          assignees: ['priya', 'sam'],
        },
      ],
    },
    {
      id: 'shipped',
      title: 'Shipped',
      cards: [
        {
          id: 'card-6',
          title: 'Dark mode for dashboards',
          description: 'Rolled out to 100% of workspaces last week.',
          assignees: ['lena'],
        },
        {
          id: 'card-7',
          title: 'Slack alert integration',
          description: 'Alerts now post directly to a chosen Slack channel.',
          assignees: ['sam'],
        },
      ],
    },
  ];
}
