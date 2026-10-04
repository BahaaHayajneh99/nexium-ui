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

export interface NxCronPreset {
  label: string;
  value: NxCronValue;
}

const DEFAULT_CRON: NxCronValue = { minute: '*', hour: '*', dayOfMonth: '*', month: '*', dayOfWeek: '*' };

const WEEKDAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const MONTH_NAMES = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const FIELD_RANGES: Record<keyof NxCronValue, [number, number]> = {
  minute: [0, 59],
  hour: [0, 23],
  dayOfMonth: [1, 31],
  month: [1, 12],
  dayOfWeek: [0, 7],
};

export const NX_CRON_PRESETS: NxCronPreset[] = [
  { label: 'Every minute', value: { minute: '*', hour: '*', dayOfMonth: '*', month: '*', dayOfWeek: '*' } },
  { label: 'Every 5 minutes', value: { minute: '*/5', hour: '*', dayOfMonth: '*', month: '*', dayOfWeek: '*' } },
  { label: 'Every 15 minutes', value: { minute: '*/15', hour: '*', dayOfMonth: '*', month: '*', dayOfWeek: '*' } },
  { label: 'Hourly', value: { minute: '0', hour: '*', dayOfMonth: '*', month: '*', dayOfWeek: '*' } },
  { label: 'Daily at midnight', value: { minute: '0', hour: '0', dayOfMonth: '*', month: '*', dayOfWeek: '*' } },
  { label: 'Daily at 9am', value: { minute: '0', hour: '9', dayOfMonth: '*', month: '*', dayOfWeek: '*' } },
  { label: 'Weekdays at 9am', value: { minute: '0', hour: '9', dayOfMonth: '*', month: '*', dayOfWeek: '1-5' } },
  { label: 'Weekly (Sun midnight)', value: { minute: '0', hour: '0', dayOfMonth: '*', month: '*', dayOfWeek: '0' } },
  { label: 'Monthly (1st, midnight)', value: { minute: '0', hour: '0', dayOfMonth: '1', month: '*', dayOfWeek: '*' } },
];

function isIntInRange(raw: string, range: [number, number]): boolean {
  if (!/^\d+$/.test(raw)) {
    return false;
  }
  const n = Number(raw);
  return n >= range[0] && n <= range[1];
}

function isValidPart(part: string, range: [number, number]): boolean {
  if (part === '*') {
    return true;
  }
  if (part.startsWith('*/')) {
    const step = part.slice(2);
    return /^\d+$/.test(step) && Number(step) > 0;
  }
  if (part.includes('-')) {
    const [a, b] = part.split('-');
    return isIntInRange(a, range) && isIntInRange(b, range);
  }
  return isIntInRange(part, range);
}

function isValidField(value: string, range: [number, number]): boolean {
  if (!value.trim()) {
    return false;
  }
  return value.split(',').every((part) => isValidPart(part.trim(), range));
}

function namedList(value: string, names?: string[]): string {
  return value
    .split(',')
    .map((part) => (names ? (names[Number(part)] ?? part) : part))
    .join(', ');
}

/** `null` means "every {unit}" - the caller decides whether to say that explicitly. */
function describeField(value: string, unit: string, names?: string[]): string | null {
  if (value === '*') {
    return null;
  }
  if (value.startsWith('*/')) {
    const step = value.slice(2);
    return `every ${step} ${unit}${step === '1' ? '' : 's'}`;
  }
  if (value.includes(',')) {
    return `on ${namedList(value, names)}`;
  }
  if (value.includes('-')) {
    const [a, b] = value.split('-');
    const an = names ? (names[Number(a)] ?? a) : a;
    const bn = names ? (names[Number(b)] ?? b) : b;
    return `from ${an} to ${bn}`;
  }
  return names ? (names[Number(value)] ?? value) : value;
}

/**
 * Assembles a 5-field cron expression from per-field inputs, with preset shortcuts, per-field
 * validation, and a plain-English description that understands `*`, `*\/n`, ranges, and lists.
 */
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

  readonly presets = NX_CRON_PRESETS;

  get expression(): string {
    const v = this.value;
    return `${v.minute} ${v.hour} ${v.dayOfMonth} ${v.month} ${v.dayOfWeek}`;
  }

  fieldError(field: keyof NxCronValue): string | null {
    return isValidField(this.value[field], FIELD_RANGES[field]) ? null : 'Invalid';
  }

  get isValid(): boolean {
    return (Object.keys(FIELD_RANGES) as (keyof NxCronValue)[]).every((field) => !this.fieldError(field));
  }

  get description(): string {
    if (!this.isValid) {
      return 'Fix the highlighted field(s) to see a description.';
    }

    const v = this.value;
    const minute = describeField(v.minute, 'minute');
    const hour = describeField(v.hour, 'hour');
    const dayOfMonth = describeField(v.dayOfMonth, 'day');
    const month = describeField(v.month, 'month', MONTH_NAMES);
    const dayOfWeek = describeField(v.dayOfWeek, 'weekday', WEEKDAY_NAMES);

    if (!minute && !hour && !dayOfMonth && !month && !dayOfWeek) {
      return 'Runs every minute';
    }

    // Simple numeric minute+hour with everything else wildcarded -> "Runs daily/weekly/monthly at HH:MM"
    const isPlainMinute = /^\d+$/.test(v.minute);
    const isPlainHour = /^\d+$/.test(v.hour);
    if (isPlainMinute && isPlainHour) {
      const time = `${v.hour.padStart(2, '0')}:${v.minute.padStart(2, '0')}`;
      if (!dayOfMonth && !month && !dayOfWeek) {
        return `Runs daily at ${time}`;
      }
      if (!dayOfMonth && !month && dayOfWeek) {
        return `Runs at ${time} ${dayOfWeek}`;
      }
      if (dayOfMonth && !month && !dayOfWeek) {
        return `Runs at ${time} on day ${v.dayOfMonth} of the month`;
      }
    }

    if (!hour && minute && !dayOfMonth && !month && !dayOfWeek) {
      return `Runs ${minute}`;
    }

    const parts = [
      minute && `minute: ${minute}`,
      hour && `hour: ${hour}`,
      dayOfMonth && `day: ${dayOfMonth}`,
      month && `month: ${month}`,
      dayOfWeek && `weekday: ${dayOfWeek}`,
    ].filter(Boolean);
    return `Runs when ${parts.join(', ')}`;
  }

  setField(field: keyof NxCronValue, fieldValue: string): void {
    this.value = { ...this.value, [field]: fieldValue };
    this.valueChange.emit(this.value);
  }

  applyPreset(preset: NxCronPreset): void {
    this.value = { ...preset.value };
    this.valueChange.emit(this.value);
  }
}
