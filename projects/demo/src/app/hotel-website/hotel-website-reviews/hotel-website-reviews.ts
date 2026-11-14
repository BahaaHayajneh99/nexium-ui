import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NxButton, NxIcon, NxBreadcrumb, NxBreadcrumbItem, NxRating, NxStatistic, nxProLicenseGranted } from 'components';
import { HOTEL_TESTIMONIALS } from '../hotel-website-data';

/**
 * Reviews page of the "Hotel / Travel Booking Website" PRO template - an overall rating
 * summary followed by every guest review as a card.
 */
@Component({
  selector: 'app-hotel-website-reviews',
  imports: [NgTemplateOutlet, RouterLink, NxButton, NxIcon, NxBreadcrumb, NxRating, NxStatistic],
  templateUrl: './hotel-website-reviews.html',
  styleUrl: './hotel-website-reviews.scss',
})
export class HotelWebsiteReviewsDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [
    { label: 'Home', link: '/hotel-website/home' },
    { label: 'Reviews' },
  ];

  protected readonly reviews = HOTEL_TESTIMONIALS;

  protected readonly averageRating =
    Math.round((HOTEL_TESTIMONIALS.reduce((sum, review) => sum + review.rating, 0) / HOTEL_TESTIMONIALS.length) * 10) / 10;
}
