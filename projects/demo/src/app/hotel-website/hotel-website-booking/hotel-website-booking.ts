import { Component, computed, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  NxButton,
  NxIcon,
  NxInput,
  NxBreadcrumb,
  NxBreadcrumbItem,
  NxCard,
  NxCardHeader,
  NxCardTitle,
  NxCardContent,
  NxCardFooter,
  NxDivider,
  NxAlert,
  NxDateRangePicker,
  NxDateRangeValue,
  nxProLicenseGranted,
} from 'components';
import { HOTEL_ROOMS, NxHotelRoom } from '../hotel-website-data';

type NxHotelPaymentMethod = 'card' | 'paypal' | 'apple';

/**
 * Booking page of the "Hotel / Travel Booking Website" PRO template - mirrors the classic
 * e-commerce checkout shape (form sections + sticky order summary sidebar), adapted for a
 * room reservation flow (room pick, stay dates, guest info, payment, confirmation).
 */
@Component({
  selector: 'app-hotel-website-booking',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    RouterLink,
    NxButton,
    NxIcon,
    NxInput,
    NxBreadcrumb,
    NxCard,
    NxCardHeader,
    NxCardTitle,
    NxCardContent,
    NxCardFooter,
    NxDivider,
    NxAlert,
    NxDateRangePicker,
  ],
  templateUrl: './hotel-website-booking.html',
  styleUrl: './hotel-website-booking.scss',
})
export class HotelWebsiteBookingDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [
    { label: 'Home', link: '/hotel-website/home' },
    { label: 'Rooms', link: '/hotel-website/rooms' },
    { label: 'Booking' },
  ];

  protected readonly selectableRooms: NxHotelRoom[] = [HOTEL_ROOMS[2], HOTEL_ROOMS[3], HOTEL_ROOMS[6], HOTEL_ROOMS[9]];

  protected readonly selectedRoomId = signal<number>(this.selectableRooms[0].id);

  protected readonly selectedRoom = computed<NxHotelRoom>(
    () => this.selectableRooms.find((room) => room.id === this.selectedRoomId()) ?? this.selectableRooms[0],
  );

  protected readonly stayDates = signal<NxDateRangeValue>({ startDate: '', endDate: '' });
  protected readonly guestCount = signal(2);

  protected readonly paymentMethod = signal<NxHotelPaymentMethod>('card');

  protected readonly paymentMethods: { id: NxHotelPaymentMethod; label: string; icon: string }[] = [
    { id: 'card', label: 'Credit Card', icon: 'nx-credit-card' },
    { id: 'paypal', label: 'PayPal', icon: 'nx-tag' },
    { id: 'apple', label: 'Apple Pay', icon: 'nx-smartphone' },
  ];

  protected readonly bookingConfirmed = signal(false);

  protected readonly nights = computed<number>(() => {
    const { startDate, endDate } = this.stayDates();
    if (!startDate || !endDate) {
      return 1;
    }
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const diffDays = Math.round((end - start) / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  });

  protected readonly subtotal = computed(() => this.selectedRoom().pricePerNight * this.nights());

  protected readonly taxesAndFees = computed(() => this.subtotal() * 0.12);

  protected readonly total = computed(() => this.subtotal() + this.taxesAndFees());

  protected selectRoom(id: number): void {
    this.selectedRoomId.set(id);
  }

  protected incrementGuests(): void {
    this.guestCount.update((value) => Math.min(10, value + 1));
  }

  protected decrementGuests(): void {
    this.guestCount.update((value) => Math.max(1, value - 1));
  }

  protected selectPaymentMethod(method: NxHotelPaymentMethod): void {
    this.paymentMethod.set(method);
  }

  protected confirmBooking(): void {
    this.bookingConfirmed.set(true);
  }
}
