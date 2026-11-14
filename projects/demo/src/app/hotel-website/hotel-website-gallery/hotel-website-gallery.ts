import { Component, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NxButton, NxIcon, NxBreadcrumb, NxBreadcrumbItem, NxMasonry, NxLightbox, NxLightboxImage, nxProLicenseGranted } from 'components';
import { hotelImage } from '../hotel-website-data';

interface NxHotelGalleryImage {
  src: string;
  alt: string;
}

/**
 * Gallery page of the "Hotel / Travel Booking Website" PRO template - a masonry grid of
 * hotel photography that opens into a full-screen lightbox when clicked.
 */
@Component({
  selector: 'app-hotel-website-gallery',
  imports: [NgTemplateOutlet, RouterLink, NxButton, NxIcon, NxBreadcrumb, NxMasonry, NxLightbox],
  templateUrl: './hotel-website-gallery.html',
  styleUrl: './hotel-website-gallery.scss',
})
export class HotelWebsiteGalleryDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [
    { label: 'Home', link: '/hotel-website/home' },
    { label: 'Gallery' },
  ];

  protected readonly images: NxHotelGalleryImage[] = [
    { src: hotelImage('nx-marlow-gallery-lobby', 700, 500), alt: 'The Marlow lobby' },
    { src: hotelImage('nx-marlow-gallery-suite', 700, 900), alt: 'A suite at The Marlow' },
    { src: hotelImage('nx-marlow-gallery-pool', 700, 460), alt: 'Rooftop infinity pool' },
    { src: hotelImage('nx-marlow-gallery-spa', 700, 820), alt: 'Spa treatment room' },
    { src: hotelImage('nx-marlow-gallery-restaurant', 700, 520), alt: 'The Marlow Restaurant' },
    { src: hotelImage('nx-marlow-gallery-room', 700, 700), alt: 'A guest room' },
    { src: hotelImage('nx-marlow-gallery-terrace', 700, 480), alt: 'Private terrace' },
    { src: hotelImage('nx-marlow-gallery-exterior-night', 700, 900), alt: 'Hotel exterior at night' },
    { src: hotelImage('nx-marlow-gallery-bar', 700, 560), alt: 'The lobby bar' },
    { src: hotelImage('nx-marlow-gallery-garden', 700, 640), alt: 'The courtyard garden' },
    { src: hotelImage('nx-marlow-gallery-bath', 700, 500), alt: 'A suite bathroom' },
    { src: hotelImage('nx-marlow-gallery-view', 700, 760), alt: 'Harbor view from a guest room' },
  ];

  protected readonly lightboxImages: NxLightboxImage[] = this.images.map((image) => ({
    src: image.src,
    alt: image.alt,
  }));

  protected readonly lightboxOpen = signal(false);
  protected readonly lightboxIndex = signal(0);

  protected openLightbox(index: number): void {
    this.lightboxIndex.set(index);
    this.lightboxOpen.set(true);
  }
}
