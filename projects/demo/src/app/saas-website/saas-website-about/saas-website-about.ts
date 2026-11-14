import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { nxProLicenseGranted, NxButton, NxIcon, NxStatistic, NxTimeline, NxTimelineItem, NxBreadcrumb, NxBreadcrumbItem } from 'components';
import { NX_SAAS_MILESTONES, NX_SAAS_TEAM, NxSaasTeamMember } from '../saas-website-data';

interface NxSaasAboutStat {
  label: string;
  value: string | number;
  suffix?: string;
}

/**
 * About page of the "SaaS Website" PRO template - brand story hero, key stats, a company
 * timeline built from NX_SAAS_MILESTONES, and a team grid built from NX_SAAS_TEAM.
 */
@Component({
  selector: 'app-saas-website-about',
  imports: [NgTemplateOutlet, RouterLink, NxButton, NxIcon, NxStatistic, NxTimeline, NxBreadcrumb],
  templateUrl: './saas-website-about.html',
  styleUrl: './saas-website-about.scss',
})
export class SaasWebsiteAboutDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [
    { label: 'Home', link: '/saas-website/home' },
    { label: 'About' },
  ];

  protected readonly stats: NxSaasAboutStat[] = [
    { label: 'Founded', value: '2021' },
    { label: 'Teams on Nimbus', value: '50K', suffix: '+' },
    { label: 'Countries served', value: '40', suffix: '+' },
    { label: 'Platform uptime', value: '99.9', suffix: '%' },
  ];

  protected readonly team: NxSaasTeamMember[] = NX_SAAS_TEAM;

  protected readonly timelineItems: NxTimelineItem[] = NX_SAAS_MILESTONES.map((milestone) => ({
    title: milestone.title,
    time: milestone.time,
    description: milestone.description,
  }));
}
