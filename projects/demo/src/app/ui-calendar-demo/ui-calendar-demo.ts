import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxCalendar, NxCalendarEvent, NxCalendarView } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

function at(dayOffset: number, hour: number, minute = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + dayOffset);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
}

@Component({
  selector: 'app-ui-calendar-demo',
  imports: [NxCalendar, DemoSection],
  templateUrl: './ui-calendar-demo.html',
  styleUrl: './ui-calendar-demo.scss',
})
export class UiCalendarDemo {
  importCode = `import { NxCalendar } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  view: NxCalendarView = 'month';
  currentDate = new Date().toISOString();

  events: NxCalendarEvent[] = [
    { id: 1, title: 'Design review', start: at(0, 10), end: at(0, 11), color: '#3498db' },
    { id: 2, title: 'Team standup', start: at(0, 9), end: at(0, 9, 30), color: '#27ae60' },
    { id: 3, title: 'Client call', start: at(1, 14), end: at(1, 15), color: '#e67e22' },
    { id: 4, title: 'Sprint planning', start: at(2, 10), end: at(2, 12), color: '#9b59b6' },
    { id: 5, title: 'Lunch with Priya', start: at(2, 12, 30), end: at(2, 13, 30), color: '#16a085' },
    { id: 6, title: '1:1 with Marcus', start: at(3, 15), end: at(3, 15, 30), color: '#3498db' },
    { id: 7, title: 'Product demo', start: at(5, 11), end: at(5, 12), color: '#e74c3c' },
    { id: 8, title: 'Q3 retro', start: at(-2, 13), end: at(-2, 14), color: '#27ae60' },
    { id: 9, title: 'Launch day 🚀', start: at(10, 9), end: at(10, 10), color: '#e74c3c' },
    { id: 10, title: 'Board meeting', start: at(18, 9), end: at(18, 11), color: '#9b59b6' },
  ];

  onViewChange(view: NxCalendarView): void {
    this.view = view;
  }

  onCurrentDateChange(date: string): void {
    this.currentDate = date;
  }

  onEventClick(event: NxCalendarEvent): void {
    console.log('event clicked', event.title);
  }

  onDayClick(day: Date): void {
    console.log('day clicked', day.toDateString());
  }

  basicCode = `<nx-calendar
    [events]="events"
    [view]="view"
    (viewChange)="onViewChange($event)"
    [currentDate]="currentDate"
    (currentDateChange)="onCurrentDateChange($event)"
    (eventClick)="onEventClick($event)"
    (dayClick)="onDayClick($event)">
</nx-calendar>`;

  basicTs = `events: NxCalendarEvent[] = [
  { id: 1, title: 'Design review', start: '2026-10-01T10:00:00', end: '2026-10-01T11:00:00', color: '#3498db' },
  // ...more events
];

view: NxCalendarView = 'month'; // switch to 'day' | 'week' | 'year'

onEventClick(event: NxCalendarEvent): void {
  // open a detail panel, navigate, etc.
}`;
}
