import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxTimePicker } from '../../../../components/src/lib/forms/ui-time-picker';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-data-entry-time-picker-demo',
  standalone: true,
  imports: [FormsModule, DemoSection, NxTimePicker],
  templateUrl: './data-entry-time-picker-demo.html',
  styleUrl: './data-entry-time-picker-demo.scss',
})
export class DataEntryTimePickerDemo {
  commonService = inject(CommonService);

  importCode = `import { NxTimePicker } from 'nexium-ui';`;

  selectedTime = '';

  onTimeChange(value: string): void {
    this.selectedTime = value;
  }

  basicUsageCode = `<nx-time-picker
  [(ngModel)]="selectedTime"
  format="HH:mm"
  (timeChange)="onTimeChange($event)">
</nx-time-picker>`;

  twelveHourTime = '';

  twelveHourCode = `<nx-time-picker
  [(ngModel)]="twelveHourTime"
  format="hh:mm A">
</nx-time-picker>`;

  secondsTime = '';

  secondsCode = `<nx-time-picker
  [(ngModel)]="secondsTime"
  format="HH:mm:ss">
</nx-time-picker>`;

  steppedTime = '';

  steppedCode = `<nx-time-picker
  [(ngModel)]="steppedTime"
  format="HH:mm"
  [minuteStep]="15">
</nx-time-picker>`;

  rangedTime = '';

  rangedCode = `<nx-time-picker
  [(ngModel)]="rangedTime"
  format="HH:mm"
  minTime="09:00"
  maxTime="17:00">
</nx-time-picker>`;

  disabledTime = '14:30';

  disabledCode = `<nx-time-picker
  [(ngModel)]="disabledTime"
  format="HH:mm"
  [disabled]="true">
</nx-time-picker>`;

  features = [
    { name: '12/24 Hour Format', description: 'Support both time formats' },
    { name: 'Minute Intervals', description: 'Configurable minute steps' },
    { name: 'Time Ranges', description: 'Set min and max time' },
    { name: 'Dropdown & Inline', description: 'Multiple display options' },
    { name: 'Custom Formatting', description: 'Flexible time format' },
    { name: 'Accessibility', description: 'ARIA labels and keyboard support' },
  ];

  useCases = [
    { title: 'Appointment Booking', description: 'Select appointment time slots' },
    { title: 'Meeting Scheduling', description: 'Choose meeting start time' },
    { title: 'Event Registration', description: 'Set event start time' },
    { title: 'Delivery Scheduling', description: 'Select delivery time window' },
    { title: 'Work Shifts', description: 'Define work hours' },
    { title: 'Alarm Configuration', description: 'Set alarm times' },
  ];
}
