import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { nxProLicenseGranted, NxButton, NxIcon, NxStatistic, NxTimeline, NxTimelineItem, NxBreadcrumb, NxBreadcrumbItem } from 'components';

interface NxRealEstateAboutStat {
  label: string;
  value: string | number;
  suffix?: string;
}

/**
 * About page of the "Real Estate Website" PRO template - brand story hero, key stats,
 * a company timeline, and a closing CTA back to Listings.
 */
@Component({
  selector: 'app-real-estate-website-about',
  standalone: true,
  imports: [NgTemplateOutlet, RouterLink, NxButton, NxIcon, NxStatistic, NxTimeline, NxBreadcrumb],
  templateUrl: './real-estate-website-about.html',
  styleUrl: './real-estate-website-about.scss',
})
export class RealEstateWebsiteAboutDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [{ label: 'Home', link: '/real-estate-website/home' }, { label: 'About' }];

  protected readonly stats: NxRealEstateAboutStat[] = [
    { label: 'Homes Sold', value: '500', suffix: '+' },
    { label: 'Markets Served', value: '4' },
    { label: 'Avg. Client Rating', value: '4.9', suffix: '/5' },
    { label: 'Years in Business', value: '15' },
  ];

  protected readonly timelineItems: NxTimelineItem[] = [
    {
      title: 'Haven Realty founded',
      time: '2011',
      description: 'Opened our first office in Austin with a three-person team and a simple promise: no pressure, just honest guidance.',
    },
    {
      title: 'Expanded to Denver',
      time: '2015',
      description: 'Opened a second office to serve the growing Front Range market, led by our first senior broker hire.',
    },
    {
      title: '1,000th closing',
      time: '2019',
      description: 'Celebrated our 1,000th closed transaction, a milestone reached years ahead of our original projection.',
    },
    {
      title: 'Seattle and Miami offices opened',
      time: '2022',
      description: 'Rounded out our four-market footprint, adding dedicated teams for waterfront and relocation clients.',
    },
    {
      title: 'Launched client portal',
      time: '2025',
      description: 'Rolled out a digital portal so buyers and sellers can track offers, documents, and showings in one place.',
    },
  ];
}
