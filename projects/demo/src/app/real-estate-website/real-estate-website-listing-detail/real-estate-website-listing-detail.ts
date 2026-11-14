import { Component, computed, inject } from '@angular/core';
import { DecimalPipe, NgTemplateOutlet } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import {
  NxButton,
  NxIcon,
  NxBadge,
  NxBreadcrumb,
  NxBreadcrumbItem,
  NxCarousel,
  NxCarouselSlide,
  nxProLicenseGranted,
} from 'components';
import {
  REAL_ESTATE_LISTINGS,
  REAL_ESTATE_AGENTS,
  NxPropertyListing,
  NxPropertyStatus,
  realEstateListingGallery,
} from '../real-estate-website-data';

interface NxListingSpec {
  label: string;
  value: string;
}

/**
 * Listing Detail page of the "Real Estate Website" PRO template - resolves the listing by
 * the numeric `:id` route param (same toSignal + computed() pattern as pro-website-details).
 */
@Component({
  selector: 'app-real-estate-website-listing-detail',
  standalone: true,
  imports: [NgTemplateOutlet, DecimalPipe, RouterLink, NxButton, NxIcon, NxBadge, NxBreadcrumb, NxCarousel],
  templateUrl: './real-estate-website-listing-detail.html',
  styleUrl: './real-estate-website-listing-detail.scss',
})
export class RealEstateWebsiteListingDetailDemo {
  private readonly route = inject(ActivatedRoute);

  protected readonly licensed = nxProLicenseGranted();

  private readonly id = toSignal(
    this.route.paramMap.pipe(map((params) => Number(params.get('id')))),
    { initialValue: Number(this.route.snapshot.paramMap.get('id')) },
  );

  protected readonly listing = computed<NxPropertyListing | null>(
    () => REAL_ESTATE_LISTINGS.find((item) => item.id === this.id()) ?? null,
  );

  protected readonly agent = computed(() => {
    const listing = this.listing();
    return listing ? (REAL_ESTATE_AGENTS.find((a) => a.id === listing.agentId) ?? null) : null;
  });

  protected readonly breadcrumbItems = computed<NxBreadcrumbItem[]>(() => [
    { label: 'Home', link: '/real-estate-website/home' },
    { label: 'Listings', link: '/real-estate-website/listings' },
    { label: this.listing()?.title ?? 'Listing' },
  ]);

  protected readonly galleryImages = computed<string[]>(() => {
    const listing = this.listing();
    return listing ? realEstateListingGallery(listing) : [];
  });

  protected readonly gallerySlides = computed<NxCarouselSlide[]>(() => {
    const listing = this.listing();
    if (!listing) {
      return [];
    }
    return this.galleryImages().map((src) => ({ src, alt: listing.title }));
  });

  protected readonly similarListings = computed<NxPropertyListing[]>(() => {
    const listing = this.listing();
    if (!listing) {
      return [];
    }
    return REAL_ESTATE_LISTINGS.filter((item) => item.id !== listing.id && item.type === listing.type).slice(0, 4);
  });

  protected readonly specs = computed<NxListingSpec[]>(() => {
    const listing = this.listing();
    if (!listing) {
      return [];
    }
    return [
      { label: 'Property Type', value: listing.type },
      { label: 'Status', value: listing.status },
      { label: 'Bedrooms', value: String(listing.beds) },
      { label: 'Bathrooms', value: String(listing.baths) },
      { label: 'Square Footage', value: `${listing.sqft.toLocaleString()} sqft` },
      { label: 'City', value: listing.city },
    ];
  });

  protected badgeVariant(status: NxPropertyStatus): 'success' | 'info' | 'warning' {
    if (status === 'For Rent') {
      return 'info';
    }
    if (status === 'Pending') {
      return 'warning';
    }
    return 'success';
  }
}
