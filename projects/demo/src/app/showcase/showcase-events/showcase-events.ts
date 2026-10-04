import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NxNavbar, NxIcon, NxBadge, NxButton, NxInput, NxCalendar, NxCalendarEvent, NxCalendarView } from 'components';
import { ShowcaseSourceView } from '../shared/showcase-source-view/showcase-source-view';
import { EVENTS_TS_SOURCE, EVENTS_HTML_SOURCE } from './showcase-events.source';

interface NxTicketTier {
  id: string;
  name: string;
  price: number;
  description: string;
}

interface NxShowcaseEvent {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  isoStart: string;
  venue: string;
  swatch: string;
  icon: string;
  description: string;
  tiers: NxTicketTier[];
}

@Component({
  selector: 'app-showcase-events',
  standalone: true,
  imports: [RouterLink, FormsModule, NxNavbar, NxIcon, NxBadge, NxButton, NxInput, NxCalendar, ShowcaseSourceView],
  templateUrl: './showcase-events.html',
  styleUrl: './showcase-events.scss',
})
export class ShowcaseEvents {
  tsSource = EVENTS_TS_SOURCE;
  htmlSource = EVENTS_HTML_SOURCE;

  categories = ['All', 'Music', 'Comedy', 'Theater', 'Sports'];
  activeCategory = signal('All');

  events: NxShowcaseEvent[] = [
    {
      id: 'aurora-live',
      title: 'Aurora - Live in Concert',
      category: 'Music',
      date: 'Fri, Nov 13',
      time: '8:00 PM',
      isoStart: '2026-11-13T20:00:00',
      venue: 'Meridian Hall, Ashford',
      swatch: '#6c3fa3',
      icon: 'nx-music',
      description: 'Aurora brings her Echoes world tour to Meridian Hall for one night only, with support from local openers.',
      tiers: [
        { id: 'ga', name: 'General Admission', price: 65, description: 'Standing room, main floor' },
        { id: 'vip', name: 'VIP', price: 145, description: 'Front section + early entry' },
      ],
    },
    {
      id: 'late-night-laughs',
      title: 'Late Night Laughs',
      category: 'Comedy',
      date: 'Sat, Nov 21',
      time: '9:30 PM',
      isoStart: '2026-11-21T21:30:00',
      venue: 'The Brookfield Room',
      swatch: '#c0392b',
      icon: 'nx-heart',
      description: 'A rotating lineup of stand-up comedians for an evening of late-night laughs. 18+ show.',
      tiers: [
        { id: 'standard', name: 'Standard Seat', price: 28, description: 'Reserved seating' },
        { id: 'table', name: 'Table for 2', price: 70, description: 'Front table, drink service' },
      ],
    },
    {
      id: 'midwinter-play',
      title: 'A Midwinter Play',
      category: 'Theater',
      date: 'Sun, Dec 6',
      time: '3:00 PM',
      isoStart: '2026-12-06T15:00:00',
      venue: 'Harbor Repertory Theater',
      swatch: '#2980b9',
      icon: 'nx-book',
      description: "A new stage adaptation of the classic winter tale, performed by Harbor Rep's resident company.",
      tiers: [
        { id: 'balcony', name: 'Balcony', price: 32, description: 'Upper level seating' },
        { id: 'orchestra', name: 'Orchestra', price: 58, description: 'Main floor, center seating' },
      ],
    },
    {
      id: 'riverside-derby',
      title: 'Riverside Derby Night',
      category: 'Sports',
      date: 'Sat, Nov 28',
      time: '7:00 PM',
      isoStart: '2026-11-28T19:00:00',
      venue: 'Riverside Arena',
      swatch: '#16a085',
      icon: 'nx-flag',
      description: 'The season rivalry match returns to Riverside Arena - come early for the fan zone.',
      tiers: [
        { id: 'upper', name: 'Upper Bowl', price: 40, description: 'Upper level general seating' },
        { id: 'lower', name: 'Lower Bowl', price: 95, description: 'Lower level, closer to the action' },
      ],
    },
  ];

  filteredEvents = computed(() => {
    const cat = this.activeCategory();
    return cat === 'All' ? this.events : this.events.filter((e) => e.category === cat);
  });

  viewMode = signal<'grid' | 'calendar'>('grid');
  calView = signal<NxCalendarView>('month');
  calDate = signal('2026-11-01T00:00:00');

  calendarEvents = computed<NxCalendarEvent[]>(() =>
    this.filteredEvents().map((event) => ({
      id: event.id,
      title: event.title,
      start: event.isoStart,
      color: event.swatch,
    })),
  );

  onCalendarEventClick(calEvent: NxCalendarEvent): void {
    const event = this.events.find((e) => e.id === calEvent.id);
    if (event) {
      this.openEvent(event);
    }
  }

  selectedEventId = signal<string | null>(null);
  selectedEvent = computed(() => this.events.find((e) => e.id === this.selectedEventId()) ?? null);

  quantities = signal<Record<string, number>>({});

  checkingOut = signal(false);
  confirmed = signal(false);

  name = '';
  email = '';

  openEvent(event: NxShowcaseEvent): void {
    this.selectedEventId.set(event.id);
    this.quantities.set({});
    this.checkingOut.set(false);
    this.confirmed.set(false);
  }

  backToEvents(): void {
    this.selectedEventId.set(null);
  }

  qtyFor(tierId: string): number {
    return this.quantities()[tierId] ?? 0;
  }

  incrementQty(tierId: string): void {
    this.quantities.update((q) => ({ ...q, [tierId]: (q[tierId] ?? 0) + 1 }));
  }

  decrementQty(tierId: string): void {
    this.quantities.update((q) => ({ ...q, [tierId]: Math.max(0, (q[tierId] ?? 0) - 1) }));
  }

  selectedTierLines = computed(() => {
    const event = this.selectedEvent();
    if (!event) return [];
    const qtys = this.quantities();
    return event.tiers.filter((t) => (qtys[t.id] ?? 0) > 0).map((t) => ({ tier: t, qty: qtys[t.id] }));
  });

  orderTotal = computed(() => this.selectedTierLines().reduce((sum, line) => sum + line.tier.price * line.qty, 0));
  totalTickets = computed(() => this.selectedTierLines().reduce((sum, line) => sum + line.qty, 0));

  goToCheckout(): void {
    this.checkingOut.set(true);
  }

  backToTiers(): void {
    this.checkingOut.set(false);
  }

  confirmOrder(): void {
    this.confirmed.set(true);
  }
}
