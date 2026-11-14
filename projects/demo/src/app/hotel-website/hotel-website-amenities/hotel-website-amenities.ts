import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NxButton, NxIcon, NxBreadcrumb, NxBreadcrumbItem, nxProLicenseGranted } from 'components';
import { HOTEL_AMENITIES } from '../hotel-website-data';

@Component({
  selector: 'app-hotel-website-amenities',
  standalone: true,
  imports: [NgTemplateOutlet, RouterLink, NxButton, NxIcon, NxBreadcrumb],
  templateUrl: './hotel-website-amenities.html',
  styleUrl: './hotel-website-amenities.scss',
})
export class HotelWebsiteAmenitiesDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [
    { label: 'Home', link: '/hotel-website/home' },
    { label: 'Amenities' },
  ];

  protected readonly amenities = HOTEL_AMENITIES;
}
