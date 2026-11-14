import { Component } from '@angular/core';
import { DecimalPipe, NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NxButton, NxIcon, NxBreadcrumb, NxBreadcrumbItem, nxProLicenseGranted } from 'components';
import { REAL_ESTATE_FEATURED_CITIES } from '../real-estate-website-data';

/**
 * Neighborhoods page of the "Real Estate Website" PRO template - a static grid of the four
 * featured markets, each linking to its own Neighborhood Detail route by slug.
 */
@Component({
  selector: 'app-real-estate-website-neighborhoods',
  standalone: true,
  imports: [NgTemplateOutlet, DecimalPipe, RouterLink, NxButton, NxIcon, NxBreadcrumb],
  templateUrl: './real-estate-website-neighborhoods.html',
  styleUrl: './real-estate-website-neighborhoods.scss',
})
export class RealEstateWebsiteNeighborhoodsDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [
    { label: 'Home', link: '/real-estate-website/home' },
    { label: 'Neighborhoods' },
  ];

  protected readonly cities = REAL_ESTATE_FEATURED_CITIES;
}
