import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export interface NxCronValue {
  minute: string;
  hour: string;
  dayOfMonth: string;
  month: string;
  dayOfWeek: string;
}

const DEFAULT_CRON: NxCronValue = { minute: '*', hour: '*', dayOfMonth: '*', month: '*', dayOfWeek: '*' };

/** Assembles a 5-field cron expression from per-field inputs, with a best-effort plain-English description. */
@Component({
  selector: 'nx-cron-builder',
  standalone: true,
  imports: [NxProLocked],
  templateUrl: './ui-cron-builder.html',
  styleUrl: './ui-cron-builder.scss',
})
export class NxCronBuilder {
  protected readonly licensed = nxProLicenseGranted();
  @Input() value: NxCronValue = { ...DEFAULT_CRON };

  @Output() valueChange = new EventEmitter<NxCronValue>();

  get expression(): string {
    const v = this.value;
    return `${v.minute} ${v.hour} ${v.dayOfMonth} ${v.month} ${v.dayOfWeek}`;
  }

  get description(): string {
    const v = this.value;
    if (v.minute === '*' && v.hour === '*' && v.dayOfMonth === '*' && v.month === '*' && v.dayOfWeek === '*') {
      return 'Runs every minute';
    }
    if (v.dayOfMonth === '*' && v.month === '*' && v.dayOfWeek === '*' && v.hour !== '*' && v.minute !== '*') {
      return `Runs daily at ${v.hour.padStart(2, '0')}:${v.minute.padStart(2, '0')}`;
    }
    if (v.dayOfMonth === '*' && v.month === '*' && v.hour !== '*' && v.minute !== '*' && v.dayOfWeek !== '*') {
      return `Runs at ${v.hour.padStart(2, '0')}:${v.minute.padStart(2, '0')} on day-of-week ${v.dayOfWeek}`;
    }
    if (v.hour === '*' && v.minute !== '*') {
      return `Runs at minute ${v.minute} past every hour`;
    }
    return `Minute "${v.minute}", hour "${v.hour}", day-of-month "${v.dayOfMonth}", month "${v.month}", day-of-week "${v.dayOfWeek}"`;
  }

  setField(field: keyof NxCronValue, fieldValue: string): void {
    this.value = { ...this.value, [field]: fieldValue };
    this.valueChange.emit(this.value);
  }
}
