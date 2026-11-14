import { Component, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  NxButton,
  NxIcon,
  NxBreadcrumb,
  NxBreadcrumbItem,
  NxInput,
  NxTextarea,
  NxAlert,
  nxProLicenseGranted,
} from 'components';
import { HOTEL_EVENT_SPACES } from '../hotel-website-data';

/**
 * Events & Weddings page of the "Hotel / Travel Booking Website" PRO template - a showcase
 * of the three event spaces plus a private-event inquiry form with the same in-place
 * success-state pattern used on the restaurant template's reservations page.
 */
@Component({
  selector: 'app-hotel-website-events',
  imports: [NgTemplateOutlet, RouterLink, NxButton, NxIcon, NxBreadcrumb, NxInput, NxTextarea, NxAlert],
  templateUrl: './hotel-website-events.html',
  styleUrl: './hotel-website-events.scss',
})
export class HotelWebsiteEventsDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [
    { label: 'Home', link: '/hotel-website/home' },
    { label: 'Events & Weddings' },
  ];

  protected readonly spaces = HOTEL_EVENT_SPACES;

  protected readonly submitted = signal(false);

  protected submitInquiry(): void {
    this.submitted.set(true);
  }

  protected sendAnotherInquiry(): void {
    this.submitted.set(false);
  }
}
