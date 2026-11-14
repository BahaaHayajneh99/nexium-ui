import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NxButton, NxIcon, NxStatistic, NxTimeline, NxTimelineItem, NxBreadcrumb, NxBreadcrumbItem, nxProLicenseGranted } from 'components';
import { REAL_ESTATE_SELLING_STEPS } from '../real-estate-website-data';

interface NxRealEstateSellStat {
  label: string;
  value: string | number;
  suffix?: string;
}

/**
 * Sell With Us page of the "Real Estate Website" PRO template - hero, a 5-step selling
 * process rendered via nx-timeline (same component used on About), a stats row, and a CTA.
 */
@Component({
  selector: 'app-real-estate-website-sell',
  standalone: true,
  imports: [NgTemplateOutlet, RouterLink, NxButton, NxIcon, NxStatistic, NxTimeline, NxBreadcrumb],
  templateUrl: './real-estate-website-sell.html',
  styleUrl: './real-estate-website-sell.scss',
})
export class RealEstateWebsiteSellDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [
    { label: 'Home', link: '/real-estate-website/home' },
    { label: 'Sell With Us' },
  ];

  protected readonly stats: NxRealEstateSellStat[] = [
    { label: 'Homes Sold', value: '500', suffix: '+' },
    { label: 'Avg. Days on Market', value: '21' },
    { label: 'Avg. List-to-Sale Ratio', value: '99.2', suffix: '%' },
  ];

  protected readonly timelineItems: NxTimelineItem[] = REAL_ESTATE_SELLING_STEPS.map((step, index) => ({
    title: step.title,
    time: `Step ${index + 1}`,
    description: step.description,
  }));
}
