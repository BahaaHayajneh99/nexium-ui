export const EVENTS_TS_SOURCE = `import { Component, computed, signal } from '@angular/core';
import { NxNavbar, NxIcon, NxBadge, NxButton, NxInput, NxCalendar, NxCalendarEvent } from 'nexium-ui';

interface TicketTier { id: string; name: string; price: number; description: string; }
interface Event { id: string; title: string; category: string; date: string; isoStart: string; venue: string; swatch: string; icon: string; tiers: TicketTier[]; }

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [NxNavbar, NxIcon, NxBadge, NxButton, NxInput, NxCalendar],
  templateUrl: './events.html',
})
export class Events {
  categories = ['All', 'Music', 'Comedy', 'Theater', 'Sports'];
  activeCategory = signal('All');

  events: Event[] = [
    { id: 'aurora-live', title: 'Aurora - Live in Concert', category: 'Music', date: 'Fri, Nov 13', isoStart: '2026-11-13T20:00:00', venue: 'Meridian Hall', swatch: '#6c3fa3', icon: 'nx-music', tiers: [
      { id: 'ga', name: 'General Admission', price: 65, description: 'Standing room' },
      { id: 'vip', name: 'VIP', price: 145, description: 'Front section + early entry' },
    ] },
    // ...more events
  ];

  filteredEvents = computed(() => {
    const cat = this.activeCategory();
    return cat === 'All' ? this.events : this.events.filter((e) => e.category === cat);
  });

  viewMode = signal<'grid' | 'calendar'>('grid');
  calView = signal('month');
  calDate = signal('2026-11-01T00:00:00');

  calendarEvents = computed<NxCalendarEvent[]>(() =>
    this.filteredEvents().map((e) => ({ id: e.id, title: e.title, start: e.isoStart, color: e.swatch })),
  );

  onCalendarEventClick(calEvent: NxCalendarEvent): void {
    const event = this.events.find((e) => e.id === calEvent.id);
    if (event) this.openEvent(event);
  }

  selectedEventId = signal<string | null>(null);
  selectedEvent = computed(() => this.events.find((e) => e.id === this.selectedEventId()) ?? null);

  quantities = signal<Record<string, number>>({});

  incrementQty(tierId: string): void {
    this.quantities.update((q) => ({ ...q, [tierId]: (q[tierId] ?? 0) + 1 }));
  }

  selectedTierLines = computed(() => {
    const event = this.selectedEvent();
    if (!event) return [];
    const qtys = this.quantities();
    return event.tiers.filter((t) => (qtys[t.id] ?? 0) > 0).map((t) => ({ tier: t, qty: qtys[t.id] }));
  });

  orderTotal = computed(() => this.selectedTierLines().reduce((sum, line) => sum + line.tier.price * line.qty, 0));
}
`;

export const EVENTS_HTML_SOURCE = `@if (!selectedEvent()) {
    <div class="toolbar">
        <button [class.active]="viewMode() === 'grid'" (click)="viewMode.set('grid')">Grid</button>
        <button [class.active]="viewMode() === 'calendar'" (click)="viewMode.set('calendar')">Calendar</button>
    </div>

    @if (viewMode() === 'grid') {
        <div class="grid">
            @for (event of filteredEvents(); track event.id) {
                <button (click)="openEvent(event)">
                    <nx-icon [icon]="event.icon" variant="svg"></nx-icon>
                    <nx-badge variant="secondary">{{ event.category }}</nx-badge>
                    <div>{{ event.title }}</div>
                    <div>From \${{ event.tiers[0].price }}</div>
                </button>
            }
        </div>
    } @else {
        <nx-calendar
            [events]="calendarEvents()"
            [(view)]="calView"
            [(currentDate)]="calDate"
            (eventClick)="onCalendarEventClick($event)">
        </nx-calendar>
    }
} @else if (!checkingOut()) {
    <h2>{{ selectedEvent()!.title }}</h2>

    @for (tier of selectedEvent()!.tiers; track tier.id) {
        <div class="tier-row">
            <div>{{ tier.name }} · \${{ tier.price }}</div>
            <div class="stepper">
                <button (click)="decrementQty(tier.id)"><nx-icon icon="nx-minus" variant="svg"></nx-icon></button>
                <span>{{ qtyFor(tier.id) }}</span>
                <button (click)="incrementQty(tier.id)"><nx-icon icon="nx-plus" variant="svg"></nx-icon></button>
            </div>
        </div>
    }

    <strong>Total: \${{ orderTotal() }}</strong>
    <nx-button variant="primary" [disabled]="totalTickets() === 0" (click)="goToCheckout()">Checkout</nx-button>
} @else if (!confirmed()) {
    <nx-input label="Full name" [(ngModel)]="name"></nx-input>
    <nx-input label="Email" [(ngModel)]="email"></nx-input>
    <nx-button variant="primary" (click)="confirmOrder()">Confirm order</nx-button>
} @else {
    <p>You're going, {{ name }}! {{ totalTickets() }} ticket(s) confirmed.</p>
}
`;
