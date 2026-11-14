import { Component, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  NxButton,
  NxIcon,
  NxTag,
  NxRating,
  NxStatistic,
  NxDateRangePicker,
  NxDateRangeValue,
  NxMarquee,
  nxProLicenseGranted,
} from 'components';
import { HOTEL_ROOMS, HOTEL_AMENITIES, HOTEL_TESTIMONIALS, NxHotelRoom, NxHotelRoomType } from '../hotel-website-data';

interface NxHotelStat {
  label: string;
  value: string;
  suffix?: string;
}

const ROOM_TYPE_COLORS: Record<NxHotelRoomType, string> = {
  Standard: '#577590',
  Deluxe: '#3d5a80',
  Suite: '#9c6644',
  Penthouse: '#a4133c',
};

@Component({
  selector: 'app-hotel-website-home',
  standalone: true,
  imports: [NgTemplateOutlet, RouterLink, NxButton, NxIcon, NxTag, NxRating, NxStatistic, NxDateRangePicker, NxMarquee],
  templateUrl: './hotel-website-home.html',
  styleUrl: './hotel-website-home.scss',
})
export class HotelWebsiteHomeDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly stayDates = signal<NxDateRangeValue>({ startDate: '', endDate: '' });
  protected readonly guestCount = signal(2);

  protected readonly featuredRooms: NxHotelRoom[] = [
    HOTEL_ROOMS[2],
    HOTEL_ROOMS[3],
    HOTEL_ROOMS[6],
    HOTEL_ROOMS[9],
    HOTEL_ROOMS[4],
    HOTEL_ROOMS[7],
  ];

  protected readonly amenities = HOTEL_AMENITIES;
  protected readonly testimonials = HOTEL_TESTIMONIALS;

  protected readonly pressMentions: string[] = [
    'Featured in Travel + Leisure',
    'Condé Nast Traveler Gold List',
    'Michelin Guide Recommended',
    'Named "Best Boutique Hotel" - Harbor City Magazine',
    'Forbes Travel Guide Four-Star Award',
    'AFAR "Stays We Love" 2025',
  ];

  protected readonly stats: NxHotelStat[] = [
    { label: 'Guest Rating', value: '4.9', suffix: '/5' },
    { label: 'Rooms', value: '120', suffix: '+' },
    { label: 'Established', value: '1998' },
    { label: 'Concierge', value: '24/7' },
  ];

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
