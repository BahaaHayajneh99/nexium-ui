import { Component, computed, signal } from '@angular/core';
import { DecimalPipe, NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  NxButton,
  NxIcon,
  NxBadge,
  NxBreadcrumb,
  NxBreadcrumbItem,
  NxComparisonTable,
  NxComparisonTableColumn,
  NxComparisonTableRow,
  nxProLicenseGranted,
} from 'components';
import { REAL_ESTATE_LISTINGS, REAL_ESTATE_PROPERTY_TYPES, NxPropertyListing, NxPropertyStatus } from '../real-estate-website-data';

const MAX_COMPARE = 3;

/**
 * Listings page of the "Real Estate Website" PRO template - a filterable grid of
 * properties, filtered by type with a signal + computed() (same pattern as the
 * E-Commerce Website Shop page's category filter).
 */
@Component({
  selector: 'app-real-estate-website-listings',
  standalone: true,
  imports: [NgTemplateOutlet, DecimalPipe, RouterLink, NxButton, NxIcon, NxBadge, NxBreadcrumb, NxComparisonTable],
  templateUrl: './real-estate-website-listings.html',
  styleUrl: './real-estate-website-listings.scss',
})
export class RealEstateWebsiteListingsDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [{ label: 'Home', link: '/real-estate-website/home' }, { label: 'Listings' }];

  protected readonly propertyTypes = REAL_ESTATE_PROPERTY_TYPES;

  protected readonly activeType = signal<string>('All');

  protected readonly filteredListings = computed<NxPropertyListing[]>(() => {
    const type = this.activeType();
    if (type === 'All') {
      return REAL_ESTATE_LISTINGS;
    }
    return REAL_ESTATE_LISTINGS.filter((listing) => listing.type === type);
  });

  protected selectType(type: string): void {
    this.activeType.set(type);
  }

  protected badgeVariant(status: NxPropertyStatus): 'success' | 'info' | 'warning' {
    if (status === 'For Rent') {
      return 'info';
    }
    if (status === 'Pending') {
      return 'warning';
    }
    return 'success';
  }

  // ---- Compare listings -----------------------------------------------------------

  protected readonly maxCompare = MAX_COMPARE;

  protected readonly compareIds = signal<number[]>([]);

  protected readonly compareListings = computed<NxPropertyListing[]>(() => {
    const ids = this.compareIds();
    return REAL_ESTATE_LISTINGS.filter((listing) => ids.includes(listing.id));
  });

  protected readonly compareColumns = computed<NxComparisonTableColumn[]>(() =>
    this.compareListings().map((listing) => ({ name: listing.title })),
  );

  protected readonly compareRows = computed<NxComparisonTableRow[]>(() => {
    const listings = this.compareListings();
    if (listings.length < 2) {
      return [];
    }

    return [
      {
        label: 'Price',
        cells: listings.map((listing) => ({
          type: 'text' as const,
          value: `$${listing.price.toLocaleString()}${listing.status === 'For Rent' ? '/mo' : ''}`,
        })),
      },
      {
        label: 'Type',
        cells: listings.map((listing) => ({ type: 'text' as const, value: listing.type })),
      },
      {
        label: 'Status',
        cells: listings.map((listing) => ({ type: 'text' as const, value: listing.status })),
      },
      {
        label: 'Beds',
        cells: listings.map((listing) => ({ type: 'text' as const, value: String(listing.beds) })),
      },
      {
        label: 'Baths',
        cells: listings.map((listing) => ({ type: 'text' as const, value: String(listing.baths) })),
      },
      {
        label: 'Sqft',
        cells: listings.map((listing) => ({ type: 'text' as const, value: listing.sqft.toLocaleString() })),
      },
      {
        label: 'Pool',
        cells: listings.map((listing) => ({ type: 'boolean' as const, value: listing.features.includes('Pool') })),
      },
      {
        label: 'Garage',
        cells: listings.map((listing) => ({
          type: 'boolean' as const,
          value: listing.features.some((feature) => feature.toLowerCase().includes('garage')),
        })),
      },
      {
        label: 'Hardwood Floors',
        cells: listings.map((listing) => ({ type: 'boolean' as const, value: listing.features.includes('Hardwood Floors') })),
      },
    ];
  });

  protected isComparing(id: number): boolean {
    return this.compareIds().includes(id);
  }

  protected toggleCompare(id: number): void {
    const ids = this.compareIds();
    if (ids.includes(id)) {
      this.compareIds.set(ids.filter((item) => item !== id));
      return;
    }
    if (ids.length >= MAX_COMPARE) {
      return;
    }
    this.compareIds.set([...ids, id]);
  }
}
