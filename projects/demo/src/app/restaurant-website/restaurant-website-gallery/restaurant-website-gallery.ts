import { Component, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { nxProLicenseGranted, NxButton, NxIcon, NxMasonry, NxLightbox, NxLightboxImage, NxBreadcrumb, NxBreadcrumbItem } from 'components';

function restaurantImage(seed: string, width = 600, height = 450): string {
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
}

/**
 * Gallery page of the "Restaurant Website" PRO template - a masonry grid of dining room,
 * kitchen, and plated-dish photography that opens into a full-screen lightbox on click.
 */
@Component({
  selector: 'app-restaurant-website-gallery',
  imports: [NgTemplateOutlet, RouterLink, NxButton, NxIcon, NxMasonry, NxLightbox, NxBreadcrumb],
  templateUrl: './restaurant-website-gallery.html',
  styleUrl: './restaurant-website-gallery.scss',
})
export class RestaurantWebsiteGalleryDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [{ label: 'Home', link: '/restaurant-website/home' }, { label: 'Gallery' }];

  protected readonly photos: NxLightboxImage[] = [
    { src: restaurantImage('resto-gal-dining-room', 700, 900), alt: 'The main dining room', caption: 'Our main dining room at golden hour.' },
    { src: restaurantImage('resto-gal-kitchen', 700, 500), alt: 'The open kitchen', caption: 'The open kitchen, visible from every table.' },
    { src: restaurantImage('resto-gal-bar', 700, 850), alt: 'The bar', caption: 'Hand-crafted cocktails at the front bar.' },
    { src: restaurantImage('resto-gal-patio', 700, 500), alt: 'The garden patio', caption: 'The garden patio on a warm evening.' },
    { src: restaurantImage('resto-gal-plated-lamb', 700, 820), alt: 'Plated rack of lamb', caption: 'Herb-crusted rack of lamb, ready to serve.' },
    { src: restaurantImage('resto-gal-dessert', 700, 500), alt: 'Basque cheesecake', caption: 'Our signature Basque cheesecake.' },
    { src: restaurantImage('resto-gal-wine-cellar', 700, 900), alt: 'The wine cellar', caption: 'Part of our 300-bottle wine cellar.' },
    { src: restaurantImage('resto-gal-private-room', 700, 500), alt: 'The private dining room', caption: 'The glass-walled private dining room.' },
    { src: restaurantImage('resto-gal-chef-at-work', 700, 880), alt: 'A chef plating a dish', caption: 'Plating in progress on a busy Friday.' },
    { src: restaurantImage('resto-gal-exterior', 700, 500), alt: 'Restaurant exterior', caption: 'Our storefront on Thistle Lane.' },
    { src: restaurantImage('resto-gal-starter', 700, 820), alt: 'Charred octopus starter', caption: 'Charred octopus with smoked paprika oil.' },
    { src: restaurantImage('resto-gal-cocktail', 700, 500), alt: 'A barrel-aged negroni', caption: 'Our barrel-aged negroni, served over one cube.' },
  ];

  protected readonly lightboxOpen = signal(false);
  protected readonly lightboxIndex = signal(0);

  protected openLightbox(index: number): void {
    this.lightboxIndex.set(index);
    this.lightboxOpen.set(true);
  }
}
