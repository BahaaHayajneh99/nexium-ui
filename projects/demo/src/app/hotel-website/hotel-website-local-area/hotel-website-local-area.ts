import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NxButton, NxIcon, NxBreadcrumb, NxBreadcrumbItem, nxProLicenseGranted } from 'components';
import { HOTEL_LOCAL_ATTRACTIONS } from '../hotel-website-data';

/**
 * Local Area page of the "Hotel / Travel Booking Website" PRO template - a simple list of
 * nearby attractions with distance from the hotel.
 */
@Component({
  selector: 'app-hotel-website-local-area',
  imports: [NgTemplateOutlet, RouterLink, NxButton, NxIcon, NxBreadcrumb],
  templateUrl: './hotel-website-local-area.html',
  styleUrl: './hotel-website-local-area.scss',
})
export class HotelWebsiteLocalAreaDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [
    { label: 'Home', link: '/hotel-website/home' },
    { label: 'Local Area' },
  ];

  protected readonly attractions = HOTEL_LOCAL_ATTRACTIONS;
}
