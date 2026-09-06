import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from '../services/common.service';
import { highlightTs } from '../shared/demo-section/ts-highlight';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-data-display-calendar-demo',
  standalone: true,
  imports: [CommonModule, DemoSection],
  templateUrl: './data-display-calendar-demo.html',
  styleUrls: ['./data-display-calendar-demo.scss'],
})
export class DataDisplayCalendarDemo {
  commonService = inject(CommonService);

  currentDate = new Date(2024, 0, 15);
  selectedDate: Date | null = null;
  months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  basicCode = highlightTs(`
<nx-calendar 
  [(ngModel)]="selectedDate"
  [minDate]="minDate"
  [maxDate]="maxDate">
</nx-calendar>
  `);

  features = [
    { name: 'Date Selection', description: 'Pick single or range dates' },
    { name: 'Month Navigation', description: 'Browse past and future months' },
    { name: 'Disabled Dates', description: 'Prevent selection of specific dates' },
    { name: 'Range Selection', description: 'Select date ranges' },
    { name: 'Multiple Selection', description: 'Select multiple dates' },
    { name: 'Keyboard Navigation', description: 'Arrow key support' },
  ];

  useCases = [
    { title: 'Event Booking', description: 'Select event dates' },
    { title: 'Flight/Hotel', description: 'Travel date selection' },
    { title: 'Medical Appointments', description: 'Schedule appointments' },
    { title: 'Report Generation', description: 'Date range for reports' },
    { title: 'Deadline Setting', description: 'Project timeline' },
    { title: 'Birth Date', description: 'Personal information' },
  ];

  getDaysInMonth(date: Date): number {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }

  getFirstDayOfMonth(date: Date): number {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  }

  previousMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(),
      this.currentDate.getMonth() - 1);
  }

  nextMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1);
  }

  selectDate(day: number) {
    this.selectedDate = new Date(this.currentDate.getFullYear(),
      this.currentDate.getMonth(), day);
  }

  isSelected(day: number): boolean {
    return this.selectedDate?.getDate() === day &&
      this.selectedDate?.getMonth() === this.currentDate.getMonth() &&
      this.selectedDate?.getFullYear() === this.currentDate.getFullYear();
  }

  isToday(day: number): boolean {
    const today = new Date();
    return today.getDate() === day &&
      today.getMonth() === this.currentDate.getMonth() &&
      today.getFullYear() === this.currentDate.getFullYear();
  }
}
