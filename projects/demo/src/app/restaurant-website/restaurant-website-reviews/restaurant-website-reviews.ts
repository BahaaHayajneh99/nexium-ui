import { Component, computed } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { nxProLicenseGranted, NxButton, NxIcon, NxRating, NxStatistic, NxBreadcrumb, NxBreadcrumbItem } from 'components';
import { RESTAURANT_TESTIMONIALS, NxRestaurantTestimonial } from '../restaurant-website-data';

/**
 * Reviews page of the "Restaurant Website" PRO template - an average-rating summary row
 * built from RESTAURANT_TESTIMONIALS, followed by every review as a card.
 */
@Component({
  selector: 'app-restaurant-website-reviews',
  imports: [NgTemplateOutlet, RouterLink, NxButton, NxIcon, NxRating, NxStatistic, NxBreadcrumb],
  templateUrl: './restaurant-website-reviews.html',
  styleUrl: './restaurant-website-reviews.scss',
})
export class RestaurantWebsiteReviewsDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [
    { label: 'Home', link: '/restaurant-website/home' },
    { label: 'Reviews' },
  ];

  protected readonly reviews: NxRestaurantTestimonial[] = RESTAURANT_TESTIMONIALS;

  protected readonly averageRating = computed(() => {
    const total = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    return Math.round((total / this.reviews.length) * 10) / 10;
  });

  protected readonly reviewCount = computed(() => this.reviews.length);
}
