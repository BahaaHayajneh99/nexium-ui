import { Component, computed, inject, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import {
  NxButton,
  NxIcon,
  NxTag,
  NxBreadcrumb,
  NxBreadcrumbItem,
  NxDateRangePicker,
  NxDateRangeValue,
  NxCarousel,
  NxCarouselSlide,
  nxProLicenseGranted,
} from 'components';
import { HOTEL_ROOMS, NxHotelRoom, NxHotelRoomType, hotelRoomGallery } from '../hotel-website-data';

const ROOM_TYPE_COLORS: Record<NxHotelRoomType, string> = {
  Standard: '#577590',
  Deluxe: '#3d5a80',
  Suite: '#9c6644',
  Penthouse: '#a4133c',
};

@Component({
  selector: 'app-hotel-website-room-detail',
  standalone: true,
  imports: [NgTemplateOutlet, RouterLink, NxButton, NxIcon, NxTag, NxBreadcrumb, NxDateRangePicker, NxCarousel],
  templateUrl: './hotel-website-room-detail.html',
  styleUrl: './hotel-website-room-detail.scss',
})
export class HotelWebsiteRoomDetailDemo {
  private readonly route = inject(ActivatedRoute);

  protected readonly licensed = nxProLicenseGranted();

  private readonly idParam = toSignal(this.route.paramMap.pipe(map((params) => params.get('id'))), {
    initialValue: this.route.snapshot.paramMap.get('id'),
  });

  protected readonly room = computed<NxHotelRoom | null>(() => {
    const id = Number(this.idParam());
    return HOTEL_ROOMS.find((room) => room.id === id) ?? null;
  });

  protected readonly galleryImages = computed<string[]>(() => {
    const room = this.room();
    return room ? hotelRoomGallery(room) : [];
  });

  protected readonly gallerySlides = computed<NxCarouselSlide[]>(() => {
    const room = this.room();
    return this.galleryImages().map((src, i) => ({
      src,
      alt: room ? `${room.name} - photo ${i + 1}` : `Room photo ${i + 1}`,
    }));
  });

  protected readonly similarRooms = computed<NxHotelRoom[]>(() => {
    const room = this.room();
    if (!room) {
      return [];
    }
    return HOTEL_ROOMS.filter((item) => item.id !== room.id && item.type === room.type)
      .concat(HOTEL_ROOMS.filter((item) => item.id !== room.id && item.type !== room.type))
      .slice(0, 3);
  });

  protected readonly stayDates = signal<NxDateRangeValue>({ startDate: '', endDate: '' });
  protected readonly guestCount = signal(2);

  protected readonly breadcrumbItems = computed<NxBreadcrumbItem[]>(() => [
    { label: 'Home', link: '/hotel-website/home' },
    { label: 'Rooms', link: '/hotel-website/rooms' },
    { label: this.room()?.name ?? 'Room' },
  ]);

  protected incrementGuests(): void {
    this.guestCount.update((value) => Math.min(10, value + 1));
  }

  protected decrementGuests(): void {
    this.guestCount.update((value) => Math.max(1, value - 1));
  }

  protected roomTypeColor(type: NxHotelRoomType): string {
    return ROOM_TYPE_COLORS[type];
  }
}
