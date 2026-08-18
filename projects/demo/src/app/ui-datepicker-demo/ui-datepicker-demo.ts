import { Component } from '@angular/core';
import { UiDatepicker } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-datepicker-demo',
  imports: [UiDatepicker, DemoSection],
  templateUrl: './ui-datepicker-demo.html',
  styleUrl: './ui-datepicker-demo.scss',
})
export class UiDatepickerDemo {
  birthDate = '';

  basicCode = `<nx-datepicker label="Date of birth" [(value)]="birthDate">
</nx-datepicker>`;

  basicTs = `birthDate = '';`;

  iconDate = '';

  iconCode = `<nx-datepicker label="Appointment date" [showIcon]="false" [(value)]="iconDate">
</nx-datepicker>`;

  minMaxDate = '';

  minMaxCode = `<nx-datepicker
    label="Booking date"
    min="2026-01-01"
    max="2026-12-31"
    [(value)]="minMaxDate">
</nx-datepicker>`;

  rangeStart = '';
  rangeEnd = '';

  rangeCode = `<nx-datepicker
    label="Stay duration"
    [range]="true"
    [(value)]="rangeStart"
    [(endValue)]="rangeEnd">
</nx-datepicker>`;

  meetingTime = '';

  timeCode = `<nx-datepicker label="Meeting time" [showTime]="true" [(value)]="meetingTime">
</nx-datepicker>`;

  invalidCode = `<nx-datepicker label="Required date" [invalid]="true">
</nx-datepicker>`;

  disabledCode = `<nx-datepicker label="Disabled date" [disabled]="true">
</nx-datepicker>`;
}
