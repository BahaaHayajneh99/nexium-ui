import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from '../services/common.service';
import { NxIcon } from '../../../../../dist/components';
import { NxDateRangePicker } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-data-entry-date-range-picker-demo',
  standalone: true,
  imports: [CommonModule, NxDateRangePicker, NxIcon, DemoSection],
  templateUrl: './data-entry-date-range-picker-demo.html',
  styleUrl: './data-entry-date-range-picker-demo.scss',
})
export class DataEntryDateRangePickerDemo {
  commonService = inject(CommonService);

  importCode = `import { NxDateRangePicker } from 'nexium-ui';`;

  basicUsageCode = `<nx-date-range-picker
  label="Travel dates"
  [(startDate)]="basicStartDate"
  [(endDate)]="basicEndDate">
</nx-date-range-picker>`;

  minMaxCode = `<nx-date-range-picker
  label="Booking window"
  min="2026-01-01"
  max="2026-12-31"
  [(startDate)]="bookingStartDate"
  [(endDate)]="bookingEndDate">
</nx-date-range-picker>`;

  withTimeCode = `<nx-date-range-picker
  label="Meeting schedule"
  [showTime]="true"
  [(startDate)]="meetingStartDate"
  [(endDate)]="meetingEndDate">
</nx-date-range-picker>`;

  disabledCode = `<nx-date-range-picker
  label="Disabled range"
  [disabled]="true"
  [startDate]="'2026-09-10'"
  [endDate]="'2026-09-12'">
</nx-date-range-picker>`;

  basicStartDate = '';
  basicEndDate = '';
  bookingStartDate = '2026-05-10';
  bookingEndDate = '2026-05-14';
  meetingStartDate = '';
  meetingEndDate = '';

  features = [
    { name: 'Range Selection', description: 'Select start and end dates' },
    { name: 'Date Restrictions', description: 'Min/max date configuration' },
    { name: 'Preset Ranges', description: 'Last 7 days, Last 30 days, etc.' },
    { name: 'Disabled Dates', description: 'Disable specific dates or date ranges' },
    { name: 'Custom Formatting', description: 'Format range display' },
    { name: 'Accessibility', description: 'Full keyboard and screen reader support' },
  ];

  useCases = [
    { title: 'Analytics Dashboard', description: 'Filter data by date range' },
    { title: 'Booking System', description: 'Select check-in and check-out dates' },
    { title: 'Report Generation', description: 'Choose report time period' },
    { title: 'Event Management', description: 'Select event start and end dates' },
    { title: 'Subscription Period', description: 'Choose subscription dates' },
    { title: 'Project Timeline', description: 'Define project start and end dates' },
  ];

  variantOptions = [
    { name: 'Default', description: 'Standard popover range selector', icon: 'nx-calendar' },
    { name: 'Inline', description: 'Embed the picker directly in the layout', icon: 'nx-calendar' },
    { name: 'Flat', description: 'Use a compact, borderless presentation', icon: 'nx-calendar' },
  ];
}
