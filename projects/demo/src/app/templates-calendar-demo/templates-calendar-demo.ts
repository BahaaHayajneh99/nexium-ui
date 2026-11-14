import { Component } from '@angular/core';
import { NxBadge, NxBadgeVariant, NxTag } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

interface DayEvent {
  label: string;
  variant: NxBadgeVariant;
}

interface DayCell {
  day: number;
  isToday?: boolean;
  isOutside?: boolean;
  events?: DayEvent[];
}

interface UpcomingEvent {
  date: string;
  title: string;
  meta: string;
  category: string;
  color: string;
}

@Component({
  selector: 'app-templates-calendar-demo',
  imports: [NxBadge, NxTag, DemoSection],
  templateUrl: './templates-calendar-demo.html',
})
export class TemplatesCalendarDemo {
  weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  days: DayCell[] = [
    { day: 1, isToday: true, events: [{ label: 'Standup', variant: 'primary' }] },
    { day: 2 },
    { day: 3 },
    { day: 4 },
    { day: 5 },
    { day: 6 },
    { day: 7 },
    { day: 8 },
    { day: 9 },
    { day: 10 },
    { day: 11 },
    { day: 12, events: [{ label: 'Client Call', variant: 'warning' }] },
    { day: 13 },
    { day: 14 },
    { day: 15 },
    { day: 16 },
    { day: 17 },
    { day: 18 },
    { day: 19 },
    { day: 20, events: [{ label: 'Launch', variant: 'success' }] },
    { day: 21 },
    { day: 22 },
    { day: 23 },
    { day: 24 },
    { day: 25 },
    { day: 26 },
    { day: 27 },
    { day: 28 },
    { day: 29 },
    { day: 30 },
    { day: 1, isOutside: true },
    { day: 2, isOutside: true },
    { day: 3, isOutside: true },
    { day: 4, isOutside: true },
    { day: 5, isOutside: true },
  ];

  upcomingEvents: UpcomingEvent[] = [
    { date: 'Nov 3 · 9:00 AM', title: 'Team Standup', meta: 'Conference Room A · 8 attendees', category: 'Internal', color: 'var(--chart-series-1)' },
    { date: 'Nov 5 · 2:00 PM', title: 'Product Launch Review', meta: 'Main Auditorium · 42 attendees', category: 'Company', color: 'var(--chart-series-2)' },
    { date: 'Nov 12 · 11:30 AM', title: 'Client Call - Acme Corp', meta: 'Zoom · 4 attendees', category: 'Client', color: 'var(--chart-series-3)' },
    { date: 'Nov 18 · 3:00 PM', title: 'Design Review', meta: 'Room 204 · 6 attendees', category: 'Design', color: 'var(--chart-series-4)' },
    { date: 'Nov 24 · 10:00 AM', title: 'Quarterly Planning', meta: 'Boardroom · 12 attendees', category: 'Leadership', color: 'var(--chart-series-5)' },
  ];

  monthViewCode = `<div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 0.5rem;">
    @for (wd of weekDays; track wd) {
        <div>{{ wd }}</div>
    }
    @for (cell of days; track $index) {
        <div [style.border]="cell.isToday ? '2px solid var(--shell-primary)' : '1px solid var(--shell-border)'">
            <span>{{ cell.day }}</span>
            @for (evt of cell.events; track evt.label) {
                <nx-badge [variant]="evt.variant" size="small">{{ evt.label }}</nx-badge>
            }
        </div>
    }
</div>`;

  upcomingEventsCode = `<div class="template-setting-row">
    <div>
        <div class="template-setting-title">{{ event.title }}</div>
        <div class="template-setting-desc">{{ event.date }} · {{ event.meta }}</div>
    </div>
    <nx-tag [color]="event.color">{{ event.category }}</nx-tag>
</div>`;
}
