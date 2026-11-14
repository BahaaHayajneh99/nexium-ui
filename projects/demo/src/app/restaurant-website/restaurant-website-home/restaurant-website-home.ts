import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NxButton, NxIcon, NxRating, NxCarousel, NxCarouselSlide, NxNumberTicker, nxProLicenseGranted } from 'components';
import {
  MENU_ITEMS,
  NxMenuItem,
  RESTAURANT_TESTIMONIALS,
  RESTAURANT_GALLERY,
  RESTAURANT_HOURS,
  RESTAURANT_ADDRESS,
  RESTAURANT_PHONE,
} from '../restaurant-website-data';

/**
 * Home page of the "Restaurant Website" PRO template (Olive & Oak) - a photo-background
 * hero, a chef's-picks row pulled from the shared menu data, a photo gallery carousel,
 * testimonials, an animated stats row, an opening-hours/location panel, and a final
 * reservation CTA.
 */
@Component({
  selector: 'app-restaurant-website-home',
  imports: [NgTemplateOutlet, RouterLink, NxButton, NxIcon, NxRating, NxCarousel, NxNumberTicker],
  templateUrl: './restaurant-website-home.html',
  styleUrl: './restaurant-website-home.scss',
})
export class RestaurantWebsiteHomeDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly chefsPicks: NxMenuItem[] = MENU_ITEMS.filter((item) => item.tags?.includes("Chef's Pick"));

  protected readonly gallerySlides: NxCarouselSlide[] = RESTAURANT_GALLERY.map((src, index) => ({
    src,
    alt: `Olive & Oak interior and dishes ${index + 1}`,
  }));
  protected readonly testimonials = RESTAURANT_TESTIMONIALS;
  protected readonly hours = RESTAURANT_HOURS;
  protected readonly address = RESTAURANT_ADDRESS;
  protected readonly phone = RESTAURANT_PHONE;
}
