import { Component, computed, inject } from '@angular/core';
import { DecimalPipe, NgTemplateOutlet } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { NxButton, NxIcon, NxBadge, NxStatistic, NxBreadcrumb, NxBreadcrumbItem, nxProLicenseGranted } from 'components';
import { REAL_ESTATE_FEATURED_CITIES, REAL_ESTATE_LISTINGS, NxRealEstateCity, NxPropertyListing, NxPropertyStatus } from '../real-estate-website-data';

/**
 * Neighborhood Detail page of the "Real Estate Website" PRO template - resolves a featured
 * city by the string `:slug` route param (same toSignal + computed() pattern as Listing
 * Detail / Agent Detail), then shows its stats and current listings.
 */
@Component({
  selector: 'app-real-estate-website-neighborhood-detail',
  standalone: true,
  imports: [NgTemplateOutlet, DecimalPipe, RouterLink, NxButton, NxIcon, NxBadge, NxStatistic, NxBreadcrumb],
  templateUrl: './real-estate-website-neighborhood-detail.html',
  styleUrl: './real-estate-website-neighborhood-detail.scss',
})
export class RealEstateWebsiteNeighborhoodDetailDemo {
  private readonly route = inject(ActivatedRoute);

  protected readonly licensed = nxProLicenseGranted();

  private readonly slug = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('slug') ?? '')),
    { initialValue: this.route.snapshot.paramMap.get('slug') ?? '' },
  );

  protected readonly neighborhood = computed<NxRealEstateCity | null>(
    () => REAL_ESTATE_FEATURED_CITIES.find((city) => city.slug === this.slug()) ?? null,
  );

  protected readonly breadcrumbItems = computed<NxBreadcrumbItem[]>(() => [
    { label: 'Home', link: '/real-estate-website/home' },
    { label: 'Neighborhoods', link: '/real-estate-website/neighborhoods' },
    { label: this.neighborhood()?.name ?? 'Neighborhood' },
  ]);

  protected readonly neighborhoodListings = computed<NxPropertyListing[]>(() => {
    const neighborhood = this.neighborhood();
    if (!neighborhood) {
      return [];
    }
    const cityName = neighborhood.name.split(',')[0].trim();
    return REAL_ESTATE_LISTINGS.filter((listing) => listing.city === cityName);
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
