import { Component, EventEmitter, Input, Output, computed, signal } from '@angular/core';
import { NxIcon } from '../ui-icon';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export interface NxCalendarEvent {
  id: string | number;
  title: string;
  /** ISO datetime (or date-only `YYYY-MM-DD` for an all-day event). */
  start: string;
  end?: string;
  color?: string;
  allDay?: boolean;
}

export type NxCalendarView = 'day' | 'week' | 'month' | 'year';

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const HOURS = Array.from({ length: 24 }, (_, i) => i);

function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function sameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

/**
 * A full event calendar with day/week/month/year views, event pills, and prev/next/today
 * navigation. `events` use plain ISO datetime strings - no date library dependency.
 */
@Component({
  selector: 'nx-calendar',
  standalone: true,
  imports: [NxIcon, NxProLocked],
  templateUrl: './ui-calendar.html',
  styleUrl: './ui-calendar.scss',
})
export class NxCalendar {
  protected readonly licensed = nxProLicenseGranted();

  @Input() events: NxCalendarEvent[] = [];

  // Backed by signals (not plain fields) so the `computed()`s below - which read `this.view`/
  // `this.currentDate` - actually re-run when prev()/next()/today()/setView() change them, instead
  // of permanently caching whatever they first saw on initial render.
  private readonly viewSignal = signal<NxCalendarView>('month');
  @Input()
  get view(): NxCalendarView {
    return this.viewSignal();
  }
  set view(value: NxCalendarView) {
    this.viewSignal.set(value);
  }
  @Output() viewChange = new EventEmitter<NxCalendarView>();

  private readonly dateSignal = signal<string>(new Date().toISOString());
  @Input()
  get currentDate(): string {
    return this.dateSignal();
  }
  set currentDate(value: string) {
    this.dateSignal.set(value);
  }
  @Output() currentDateChange = new EventEmitter<string>();

  @Output() eventClick = new EventEmitter<NxCalendarEvent>();
  @Output() dayClick = new EventEmitter<Date>();

  readonly views: NxCalendarView[] = ['day', 'week', 'month', 'year'];
  readonly dayNames = DAY_NAMES;
  readonly hours = HOURS;

  readonly current = computed(() => new Date(this.currentDate));

  readonly headerLabel = computed(() => {
    const d = this.current();
    switch (this.view) {
      case 'day':
        return `${MONTH_NAMES[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
      case 'week': {
        const days = this.weekDays(d);
        const first = days[0];
        const last = days[6];
        return `${MONTH_NAMES[first.getMonth()]} ${first.getDate()} - ${MONTH_NAMES[last.getMonth()]} ${last.getDate()}, ${last.getFullYear()}`;
      }
      case 'year':
        return `${d.getFullYear()}`;
      case 'month':
      default:
        return `${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`;
    }
  });

  readonly monthWeeks = computed<Date[][]>(() => this.buildMonthGrid(this.current()));
  readonly weekDaysList = computed<Date[]>(() => this.weekDays(this.current()));
  readonly yearMonths = computed<{ month: Date; weeks: Date[][] }[]>(() => {
    const year = this.current().getFullYear();
    return Array.from({ length: 12 }, (_, m) => {
      const month = new Date(year, m, 1);
      return { month, weeks: this.buildMonthGrid(month) };
    });
  });

  monthName(date: Date): string {
    return MONTH_NAMES[date.getMonth()];
  }

  setView(view: NxCalendarView): void {
    this.view = view;
    this.viewChange.emit(view);
  }

  today(): void {
    this.setDate(new Date());
  }

  prev(): void {
    const d = new Date(this.current());
    if (this.view === 'day') d.setDate(d.getDate() - 1);
    else if (this.view === 'week') d.setDate(d.getDate() - 7);
    else if (this.view === 'year') d.setFullYear(d.getFullYear() - 1);
    else d.setMonth(d.getMonth() - 1);
    this.setDate(d);
  }

  next(): void {
    const d = new Date(this.current());
    if (this.view === 'day') d.setDate(d.getDate() + 1);
    else if (this.view === 'week') d.setDate(d.getDate() + 7);
    else if (this.view === 'year') d.setFullYear(d.getFullYear() + 1);
    else d.setMonth(d.getMonth() + 1);
    this.setDate(d);
  }

  jumpToMonth(date: Date): void {
    this.setDate(date);
    this.setView('month');
  }

  private setDate(d: Date): void {
    this.currentDate = d.toISOString();
    this.currentDateChange.emit(this.currentDate);
  }

  onDayClick(day: Date): void {
    this.dayClick.emit(day);
  }

  onEventClick(event: NxCalendarEvent, domEvent: Event): void {
    domEvent.stopPropagation();
    this.eventClick.emit(event);
  }

  isToday(day: Date): boolean {
    return sameDay(day, new Date());
  }

  isCurrentMonth(day: Date, ref: Date): boolean {
    return day.getMonth() === ref.getMonth();
  }

  eventsForDay(day: Date): NxCalendarEvent[] {
    return this.events.filter((e) => sameDay(new Date(e.start), day));
  }

  hasEvents(day: Date): boolean {
    return this.eventsForDay(day).length > 0;
  }

  eventTop(event: NxCalendarEvent): number {
    const start = new Date(event.start);
    return ((start.getHours() * 60 + start.getMinutes()) / 1440) * 100;
  }

  eventHeight(event: NxCalendarEvent): number {
    const start = new Date(event.start);
    const end = event.end ? new Date(event.end) : new Date(start.getTime() + 60 * 60000);
    const minutes = Math.max(30, (end.getTime() - start.getTime()) / 60000);
    return (minutes / 1440) * 100;
  }

  eventTimeLabel(event: NxCalendarEvent): string {
    const start = new Date(event.start);
    return start.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
  }

  private weekDays(ref: Date): Date[] {
    const start = startOfDay(ref);
    start.setDate(start.getDate() - start.getDay());
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  }

  private buildMonthGrid(ref: Date): Date[][] {
    const year = ref.getFullYear();
    const month = ref.getMonth();
    const firstOfMonth = new Date(year, month, 1);
    const gridStart = new Date(year, month, 1 - firstOfMonth.getDay());
    const weeks: Date[][] = [];
    for (let w = 0; w < 6; w++) {
      const week: Date[] = [];
      for (let d = 0; d < 7; d++) {
        const day = new Date(gridStart);
        day.setDate(gridStart.getDate() + w * 7 + d);
        week.push(day);
      }
      weeks.push(week);
    }
    return weeks;
  }
}
