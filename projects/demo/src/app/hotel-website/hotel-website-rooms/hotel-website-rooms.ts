import { Component, computed, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  NxButton,
  NxIcon,
  NxTag,
  NxChip,
  NxBreadcrumb,
  NxBreadcrumbItem,
  NxComparisonTable,
  NxComparisonTableColumn,
  NxComparisonTableRow,
  nxProLicenseGranted,
} from 'components';
import { HOTEL_ROOMS, HOTEL_ROOM_TYPES, NxHotelRoom, NxHotelRoomType } from '../hotel-website-data';

const ROOM_TYPE_COLORS: Record<NxHotelRoomType, string> = {
  Standard: '#577590',
  Deluxe: '#3d5a80',
  Suite: '#9c6644',
  Penthouse: '#a4133c',
};

@Component({
  selector: 'app-hotel-website-rooms',
  standalone: true,
  imports: [NgTemplateOutlet, RouterLink, NxButton, NxIcon, NxTag, NxChip, NxBreadcrumb, NxComparisonTable],
  templateUrl: './hotel-website-rooms.html',
  styleUrl: './hotel-website-rooms.scss',
})
export class HotelWebsiteRoomsDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [{ label: 'Home', link: '/hotel-website/home' }, { label: 'Rooms' }];

  protected readonly typeFilters: ('All' | NxHotelRoomType)[] = ['All', ...HOTEL_ROOM_TYPES];

  protected readonly activeType = signal<'All' | NxHotelRoomType>('All');

  protected readonly filteredRooms = computed<NxHotelRoom[]>(() => {
    const type = this.activeType();
    return type === 'All' ? HOTEL_ROOMS.slice() : HOTEL_ROOMS.filter((room) => room.type === type);
  });

  protected selectType(type: 'All' | NxHotelRoomType): void {
    this.activeType.set(type);
  }

  protected roomTypeColor(type: NxHotelRoomType): string {
    return ROOM_TYPE_COLORS[type];
  }

  // ---- Compare room types -------------------------------------------------
  // One representative room per tier, built from the real HOTEL_ROOMS data so
  // numbers/amenities never drift from what the room cards/detail page show.

  private static readonly compareRooms: readonly [NxHotelRoom, NxHotelRoom, NxHotelRoom] = [
    HOTEL_ROOMS.find((room) => room.id === 3)!, // City View Standard
    HOTEL_ROOMS.find((room) => room.id === 4)!, // Deluxe Ocean View
    HOTEL_ROOMS.find((room) => room.id === 7)!, // Junior Suite
  ];

  protected readonly compareColumns: NxComparisonTableColumn[] = HotelWebsiteRoomsDemo.compareRooms.map((room) => ({
    name: room.type,
    description: room.name,
    highlighted: room.type === 'Deluxe',
  }));

  protected readonly compareRows: NxComparisonTableRow[] = HotelWebsiteRoomsDemo.buildCompareRows();

  private static buildCompareRows(): NxComparisonTableRow[] {
    const rooms = HotelWebsiteRoomsDemo.compareRooms;
    const hasAmenity = (amenity: string): boolean[] => rooms.map((room) => room.amenities.includes(amenity));

    return [
      {
        label: 'Price / night',
        cells: rooms.map((room) => ({ type: 'text', value: `$${room.pricePerNight}`, emphasis: true })),
      },
      {
        label: 'Max guests',
        cells: rooms.map((room) => ({ type: 'text', value: `${room.capacity}` })),
      },
      {
        label: 'Room size',
        cells: rooms.map((room) => ({ type: 'text', value: `${room.sizeSqft} sqft` })),
      },
      {
        label: 'Bed configuration',
        cells: rooms.map((room) => ({ type: 'text', value: room.bedType })),
      },
      {
        label: 'Ocean view',
        cells: hasAmenity('Ocean View').map((value) => ({ type: 'boolean', value })),
      },
      {
        label: 'Living area',
        cells: hasAmenity('Living Area').map((value) => ({ type: 'boolean', value })),
      },
      {
        label: 'Butler service',
        cells: hasAmenity('Butler Service').map((value) => ({ type: 'boolean', value })),
      },
      {
        label: 'Breakfast included',
        tooltip: 'Complimentary continental breakfast at The Marlow Restaurant.',
        cells: [
          { type: 'boolean', value: false },
          { type: 'boolean', value: false },
          { type: 'boolean', value: true },
        ],
      },
    ];
  }
}
