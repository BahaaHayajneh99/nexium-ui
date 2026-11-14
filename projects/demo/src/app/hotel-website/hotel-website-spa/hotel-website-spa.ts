import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NxButton, NxIcon, NxBreadcrumb, NxBreadcrumbItem, NxTable, NxTableColumn, nxProLicenseGranted } from 'components';
import { HOTEL_SPA_TREATMENTS, hotelImage } from '../hotel-website-data';

/**
 * Spa & Wellness page of the "Hotel / Travel Booking Website" PRO template - a hero for
 * the spa plus its treatment menu rendered in a simple table.
 */
@Component({
  selector: 'app-hotel-website-spa',
  imports: [NgTemplateOutlet, RouterLink, NxButton, NxIcon, NxBreadcrumb, NxTable],
  templateUrl: './hotel-website-spa.html',
  styleUrl: './hotel-website-spa.scss',
})
export class HotelWebsiteSpaDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [
    { label: 'Home', link: '/hotel-website/home' },
    { label: 'Spa & Wellness' },
  ];

  protected readonly heroImage = hotelImage('nx-marlow-spa', 1100, 620);

  protected readonly columns: NxTableColumn[] = [
    { field: 'name', header: 'Treatment' },
    { field: 'duration', header: 'Duration' },
    { field: 'price', header: 'Price', align: 'right' },
  ];

  protected readonly rows = HOTEL_SPA_TREATMENTS.map((treatment) => ({
    name: treatment.name,
    duration: treatment.duration,
    price: `$${treatment.price}`,
    description: treatment.description,
  }));

  protected readonly treatments = HOTEL_SPA_TREATMENTS;
}
