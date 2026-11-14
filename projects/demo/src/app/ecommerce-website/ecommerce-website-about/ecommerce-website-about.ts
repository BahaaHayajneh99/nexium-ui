import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { nxProLicenseGranted, NxButton, NxIcon, NxStatistic, NxTimeline, NxTimelineItem, NxBreadcrumb, NxBreadcrumbItem } from 'components';
import { ECOM_MILESTONES, ECOM_TEAM, NxEcomTeamMember } from '../ecommerce-website-data';

interface NxEcomAboutStat {
  label: string;
  value: string | number;
  suffix?: string;
}

/**
 * About Us page of the "E-Commerce Website" PRO template - brand story hero, key stats,
 * a company timeline built from ECOM_MILESTONES, and a team grid built from ECOM_TEAM.
 */
@Component({
  selector: 'app-ecommerce-website-about',
  imports: [NgTemplateOutlet, RouterLink, NxButton, NxIcon, NxStatistic, NxTimeline, NxBreadcrumb],
  templateUrl: './ecommerce-website-about.html',
  styleUrl: './ecommerce-website-about.scss',
})
export class EcommerceWebsiteAboutDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [
    { label: 'Home', link: '/ecommerce-website/home' },
    { label: 'About' },
  ];

  protected readonly stats: NxEcomAboutStat[] = [
    { label: 'Orders shipped', value: '100K', suffix: '+' },
    { label: 'Countries served', value: '40', suffix: '+' },
    { label: 'Avg. rating', value: '4.8', suffix: '/5' },
    { label: 'Years in business', value: '7' },
  ];

  protected readonly team: NxEcomTeamMember[] = ECOM_TEAM;

  protected readonly timelineItems: NxTimelineItem[] = ECOM_MILESTONES.map((milestone) => ({
    title: milestone.title,
    time: milestone.year,
    description: milestone.description,
  }));
}
