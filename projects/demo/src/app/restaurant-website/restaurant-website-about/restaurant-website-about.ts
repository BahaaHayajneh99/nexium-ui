import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { nxProLicenseGranted, NxButton, NxIcon, NxStatistic, NxTimeline, NxTimelineItem, NxBreadcrumb, NxBreadcrumbItem } from 'components';
import { RESTAURANT_MILESTONES, RESTAURANT_TEAM, NxRestaurantChef, RESTAURANT_ADDRESS } from '../restaurant-website-data';

interface NxRestaurantAboutStat {
  label: string;
  value: string | number;
  suffix?: string;
}

/**
 * About page of the "Restaurant Website" PRO template - brand story hero, key stats, a
 * restaurant timeline built from RESTAURANT_MILESTONES, and the chef/team grid reused
 * from RESTAURANT_TEAM.
 */
@Component({
  selector: 'app-restaurant-website-about',
  imports: [NgTemplateOutlet, RouterLink, NxButton, NxIcon, NxStatistic, NxTimeline, NxBreadcrumb],
  templateUrl: './restaurant-website-about.html',
  styleUrl: './restaurant-website-about.scss',
})
export class RestaurantWebsiteAboutDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [
    { label: 'Home', link: '/restaurant-website/home' },
    { label: 'About' },
  ];

  protected readonly address = RESTAURANT_ADDRESS;

  protected readonly stats: NxRestaurantAboutStat[] = [
    { label: 'Years open', value: 14 },
    { label: 'Dishes on the seasonal menu', value: 14 },
    { label: 'Average guest rating', value: 4.9, suffix: ' / 5' },
    { label: 'Covers served nightly', value: 120, suffix: '+' },
  ];

  protected readonly team: NxRestaurantChef[] = RESTAURANT_TEAM;

  protected readonly timelineItems: NxTimelineItem[] = RESTAURANT_MILESTONES.map((milestone) => ({
    title: milestone.title,
    time: milestone.time,
    description: milestone.description,
  }));
}
