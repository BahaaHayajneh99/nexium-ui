import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxDatepicker, NxSelect, NxSelectOption, NxButton, NxCard, NxCardContent } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-how-to-booking-flow-demo',
  imports: [NxDatepicker, NxSelect, NxButton, NxCard, NxCardContent, FormsModule, DemoSection],
  templateUrl: './how-to-booking-flow-demo.html',
})
export class HowToBookingFlowDemo {
  date = '';

  timeOptions: NxSelectOption[] = [
    { label: '9:00 AM', value: '09:00' },
    { label: '11:00 AM', value: '11:00' },
    { label: '2:00 PM', value: '14:00' },
    { label: '4:00 PM', value: '16:00' },
  ];
  time = '';

  guestOptions: NxSelectOption[] = [
    { label: '1 Guest', value: '1' },
    { label: '2 Guests', value: '2' },
    { label: '4 Guests', value: '4' },
  ];
  guests = '2';

  confirmed = false;

  get canConfirm(): boolean {
    return !!this.date && !!this.time;
  }

  confirm(): void {
    if (this.canConfirm) this.confirmed = true;
  }

  code = `<nx-datepicker label="Date" [(value)]="date"></nx-datepicker>
<nx-select label="Time" [options]="timeOptions" [(value)]="time"></nx-select>
<nx-select label="Guests" [options]="guestOptions" [(value)]="guests"></nx-select>

<nx-button variant="primary" [disabled]="!canConfirm" (click)="confirm()">Confirm Reservation</nx-button>

@if (confirmed) {
    <nx-card variant="outlined">
        <nx-card-content>
            Reserved for {{ guests }} guest(s) on {{ date }} at {{ time }}.
        </nx-card-content>
    </nx-card>
}`;

  tsCode = `date = '';

timeOptions: NxSelectOption[] = [
  { label: '9:00 AM', value: '09:00' },
  { label: '11:00 AM', value: '11:00' },
  { label: '2:00 PM', value: '14:00' },
  { label: '4:00 PM', value: '16:00' },
];
time = '';

guestOptions: NxSelectOption[] = [
  { label: '1 Guest', value: '1' },
  { label: '2 Guests', value: '2' },
  { label: '4 Guests', value: '4' },
];
guests = '2';

confirmed = false;

get canConfirm(): boolean {
  return !!this.date && !!this.time;
}

confirm(): void {
  if (this.canConfirm) this.confirmed = true;
}`;
}
