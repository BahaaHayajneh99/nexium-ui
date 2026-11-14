import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  NxButton,
  NxIcon,
  NxBreadcrumb,
  NxBreadcrumbItem,
  NxTabsComponent,
  NxTabComponent,
  nxProLicenseGranted,
} from 'components';
import { HOTEL_DINING_MENU, NxHotelMenuHighlight, hotelImage } from '../hotel-website-data';

const COURSES: NxHotelMenuHighlight['course'][] = ['Starters', 'Mains', 'Desserts'];

/**
 * Dining page of the "Hotel / Travel Booking Website" PRO template - a hero for The
 * Marlow Restaurant and its menu highlights grouped into tabs by course.
 */
@Component({
  selector: 'app-hotel-website-dining',
  imports: [NgTemplateOutlet, RouterLink, NxButton, NxIcon, NxBreadcrumb, NxTabsComponent, NxTabComponent],
  templateUrl: './hotel-website-dining.html',
  styleUrl: './hotel-website-dining.scss',
})
export class HotelWebsiteDiningDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [
    { label: 'Home', link: '/hotel-website/home' },
    { label: 'Dining' },
  ];

  protected readonly heroImage = hotelImage('nx-marlow-restaurant', 1100, 620);

  protected readonly menuByCourse = COURSES.map((course) => ({
    course,
    items: HOTEL_DINING_MENU.filter((item) => item.course === course),
  }));
}
