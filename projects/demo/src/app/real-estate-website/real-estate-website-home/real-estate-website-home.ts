import { Component } from '@angular/core';
import { DecimalPipe, NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NxButton, NxIcon, NxInput, NxBadge, NxStatistic, nxProLicenseGranted } from 'components';
import {
  REAL_ESTATE_LISTINGS,
  REAL_ESTATE_TESTIMONIALS,
  REAL_ESTATE_FEATURED_CITIES,
  NxPropertyListing,
  NxPropertyStatus,
} from '../real-estate-website-data';

interface NxRealEstateStat {
  label: string;
  value: string | number;
  suffix?: string;
}

@Component({
  selector: 'app-real-estate-website-home',
  standalone: true,
  imports: [NgTemplateOutlet, DecimalPipe, RouterLink, NxButton, NxIcon, NxInput, NxBadge, NxStatistic],
  templateUrl: './real-estate-website-home.html',
  styleUrl: './real-estate-website-home.scss',
})
export class RealEstateWebsiteHomeDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly featuredCities = REAL_ESTATE_FEATURED_CITIES;

  protected readonly featuredListings: NxPropertyListing[] = REAL_ESTATE_LISTINGS.slice(0, 6);

  protected readonly testimonials = REAL_ESTATE_TESTIMONIALS;

  protected readonly trustStats: NxRealEstateStat[] = [
    { label: 'Homes Sold', value: '500', suffix: '+' },
    { label: 'Average Rating', value: '4.9' },
    { label: 'Years Experience', value: '15' },
    { label: 'Client Satisfaction', value: '98', suffix: '%' },
  ];

  protected badgeVariant(status: NxPropertyStatus): 'success' | 'info' | 'warning' {
    if (status === 'For Rent') {
      return 'info';
    }
    if (status === 'Pending') {
      return 'warning';
    }
    return 'success';
  }
}
