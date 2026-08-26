import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NxDatepicker } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-datepicker-demo',
  imports: [NxDatepicker, DemoSection, FormsModule, ReactiveFormsModule],
  templateUrl: './ui-datepicker-demo.html',
  styleUrl: './ui-datepicker-demo.scss',
})
export class UiDatepickerDemo {
  importCode = `import { NxDatepicker } from 'nexium-ui';`;

  private fb = new FormBuilder();

  birthDate = '';

  birthDateForm = this.fb.group({ birthDate: [''] });

  reactiveCode = `<div [formGroup]="birthDateForm">
    <nx-datepicker label="Date of birth" formControlName="birthDate"></nx-datepicker>
</div>`;

  reactiveTs = `birthDateForm = this.fb.group({ birthDate: [''] });`;

  templateCode = `<nx-datepicker label="Date of birth" [(ngModel)]="birthDate">
</nx-datepicker>`;

  templateTs = `birthDate = '';`;

  iconDate = '';

  iconCode = `<nx-datepicker label="Appointment date" [showIcon]="false" [(ngModel)]="iconDate">
</nx-datepicker>`;

  minMaxDate = '';

  minMaxCode = `<nx-datepicker
    label="Booking date"
    min="2026-01-01"
    max="2026-12-31"
    [(ngModel)]="minMaxDate">
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

  timeCode = `<nx-datepicker label="Meeting time" [showTime]="true" [(ngModel)]="meetingTime">
</nx-datepicker>`;

  invalidCode = `<nx-datepicker label="Required date" [invalid]="true">
</nx-datepicker>`;

  disabledCode = `<nx-datepicker label="Disabled date" [disabled]="true">
</nx-datepicker>`;
}
