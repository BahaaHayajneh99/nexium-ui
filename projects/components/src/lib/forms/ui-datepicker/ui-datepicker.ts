import { Component, ElementRef, EventEmitter, Input, Output, booleanAttribute, forwardRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const WEEKDAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

interface YMD {
  year: number;
  month: number; // 0-based
  day: number;
}

interface DayCell {
  ymd: YMD;
  iso: string;
  label: number;
  inCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isInRange: boolean;
  isDisabled: boolean;
}

function pad2(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

function toIso(ymd: YMD): string {
  return `${ymd.year}-${pad2(ymd.month + 1)}-${pad2(ymd.day)}`;
}

function parseIso(value: string): YMD | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
  if (!match) {
    return null;
  }

  return { year: Number(match[1]), month: Number(match[2]) - 1, day: Number(match[3]) };
}

function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function firstWeekdayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function todayYmd(): YMD {
  const now = new Date();
  return { year: now.getFullYear(), month: now.getMonth(), day: now.getDate() };
}

function compareYmd(a: YMD, b: YMD): number {
  if (a.year !== b.year) return a.year - b.year;
  if (a.month !== b.month) return a.month - b.month;
  return a.day - b.day;
}

@Component({
  selector: 'nx-datepicker',
  standalone: true,
  imports: [],
  templateUrl: './ui-datepicker.html',
  styleUrl: './ui-datepicker.scss',
  host: {
    '(document:click)': 'onDocumentClick($event)',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NxDatepicker),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => NxDatepicker),
      multi: true,
    },
  ],
})
export class NxDatepicker implements ControlValueAccessor, Validator {
  @Input() label = '';
  @Input() placeholder = 'Select date';
  @Input() value = '';
  @Input() endValue = '';
  @Input() min = '';
  @Input() max = '';
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute }) invalid = false;
  @Input({ transform: booleanAttribute }) showIcon = true;
  @Input({ transform: booleanAttribute }) range = false;
  @Input({ transform: booleanAttribute }) showTime = false;
  /** Marks the field as required - a value must be selected (both dates, in range mode). Validated once touched. */
  @Input({ transform: booleanAttribute }) isRequired = false;
  @Input() requiredErrorMessage = 'Please select a date';

  @Output() valueChange = new EventEmitter<string>();
  @Output() endValueChange = new EventEmitter<string>();

  readonly weekdayLabels = WEEKDAY_LABELS;

  open = false;
  touched = false;
  private selectingEnd = false;
  private viewYear: number;
  private viewMonth: number;
  timeValue = '00:00';

  // CVA covers the single `value` date only - range mode's endValue stays a
  // plain [(endValue)] binding, since a FormControl's single value can't
  // naturally represent a start/end pair without a custom value shape.
  private onChangeFn: (value: string) => void = () => {};
  private onTouchedFn: () => void = () => {};
  private onValidatorChangeFn: () => void = () => {};

  constructor(private elementRef: ElementRef<HTMLElement>) {
    const seed = parseIso(this.value) ?? todayYmd();
    this.viewYear = seed.year;
    this.viewMonth = seed.month;
  }

  private get isValueMissing(): boolean {
    return this.range ? (!this.value || !this.endValue) : !this.value;
  }

  get displayError(): string {
    if (!this.touched) {
      return '';
    }
    if (this.isRequired && this.isValueMissing) {
      return this.requiredErrorMessage;
    }
    return '';
  }

  get displayText(): string {
    const start = parseIso(this.value);
    if (!start) {
      return '';
    }

    if (!this.range) {
      return this.formatDisplay(start);
    }

    const end = parseIso(this.endValue);
    return end ? `${this.formatDisplay(start)} – ${this.formatDisplay(end)}` : this.formatDisplay(start);
  }

  get viewLabel(): string {
    return `${MONTH_NAMES[this.viewMonth]} ${this.viewYear}`;
  }

  get weeks(): DayCell[][] {
    const cells = this.buildDayCells();
    const weeks: DayCell[][] = [];
    for (let i = 0; i < cells.length; i += 7) {
      weeks.push(cells.slice(i, i + 7));
    }
    return weeks;
  }

  toggle(): void {
    if (this.disabled) {
      return;
    }

    this.open = !this.open;
    if (this.open) {
      const seed = parseIso(this.value) ?? todayYmd();
      this.viewYear = seed.year;
      this.viewMonth = seed.month;
      this.selectingEnd = false;
    } else {
      this.touched = true;
      this.onTouchedFn();
    }
  }

  close(): void {
    this.open = false;
    this.touched = true;
    this.onTouchedFn();
  }

  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      if (this.open) {
        this.touched = true;
        this.onTouchedFn();
      }
      this.open = false;
    }
  }

  prevMonth(): void {
    if (this.viewMonth === 0) {
      this.viewMonth = 11;
      this.viewYear -= 1;
    } else {
      this.viewMonth -= 1;
    }
  }

  nextMonth(): void {
    if (this.viewMonth === 11) {
      this.viewMonth = 0;
      this.viewYear += 1;
    } else {
      this.viewMonth += 1;
    }
  }

  selectDay(cell: DayCell): void {
    if (this.disabled || cell.isDisabled) {
      return;
    }

    if (!this.range) {
      this.emitValue(cell.iso);
      if (!this.showTime) {
        this.open = false;
      }
      return;
    }

    const start = parseIso(this.value);

    if (!start) {
      this.emitValue(cell.iso);
      this.emitEndValue('');
      this.selectingEnd = true;
      return;
    }

    if (this.selectingEnd) {
      if (compareYmd(cell.ymd, start) < 0) {
        this.emitValue(cell.iso);
        this.emitEndValue('');
        this.selectingEnd = true;
        return;
      }

      this.emitEndValue(cell.iso);
      this.selectingEnd = false;
      this.open = false;
      return;
    }

    this.emitValue(cell.iso);
    this.emitEndValue('');
    this.selectingEnd = true;
  }

  selectToday(): void {
    const today = todayYmd();
    this.viewYear = today.year;
    this.viewMonth = today.month;
    this.selectDay(this.toCell(today));
  }

  clear(): void {
    this.emitValue('');
    this.emitEndValue('');
    this.selectingEnd = false;
  }

  onTimeChange(event: Event): void {
    this.timeValue = (event.target as HTMLInputElement).value;
    if (this.value) {
      this.emitValue(this.value);
    }
  }

  writeValue(value: string): void {
    this.value = value ?? '';
    const seed = parseIso(this.value) ?? todayYmd();
    this.viewYear = seed.year;
    this.viewMonth = seed.month;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (this.isRequired && this.isValueMissing) {
      return { required: true };
    }
    return null;
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onValidatorChangeFn = fn;
  }

  private emitValue(iso: string): void {
    this.value = iso;
    this.valueChange.emit(iso);
    this.onChangeFn(iso);
  }

  private emitEndValue(iso: string): void {
    this.endValue = iso;
    this.endValueChange.emit(iso);
  }

  private formatDisplay(ymd: YMD): string {
    return `${MONTH_NAMES[ymd.month].slice(0, 3)} ${ymd.day}, ${ymd.year}`;
  }

  private toCell(ymd: YMD): DayCell {
    return this.buildDayCells().find((cell) => compareYmd(cell.ymd, ymd) === 0) ?? {
      ymd,
      iso: toIso(ymd),
      label: ymd.day,
      inCurrentMonth: true,
      isToday: false,
      isSelected: false,
      isRangeStart: false,
      isRangeEnd: false,
      isInRange: false,
      isDisabled: false,
    };
  }

  private buildDayCells(): DayCell[] {
    const today = todayYmd();
    const start = parseIso(this.value);
    const end = this.range ? parseIso(this.endValue) : null;

    const total = daysInMonth(this.viewYear, this.viewMonth);
    const leading = firstWeekdayOfMonth(this.viewYear, this.viewMonth);
    const prevMonth = this.viewMonth === 0 ? 11 : this.viewMonth - 1;
    const prevYear = this.viewMonth === 0 ? this.viewYear - 1 : this.viewYear;
    const prevTotal = daysInMonth(prevYear, prevMonth);

    const cells: DayCell[] = [];

    for (let i = 0; i < leading; i++) {
      const day = prevTotal - leading + i + 1;
      cells.push(this.makeCell({ year: prevYear, month: prevMonth, day }, false, today, start, end));
    }

    for (let day = 1; day <= total; day++) {
      cells.push(this.makeCell({ year: this.viewYear, month: this.viewMonth, day }, true, today, start, end));
    }

    const nextMonth = this.viewMonth === 11 ? 0 : this.viewMonth + 1;
    const nextYear = this.viewMonth === 11 ? this.viewYear + 1 : this.viewYear;
    let nextDay = 1;
    while (cells.length % 7 !== 0 || cells.length < 42) {
      cells.push(this.makeCell({ year: nextYear, month: nextMonth, day: nextDay }, false, today, start, end));
      nextDay += 1;
      if (cells.length >= 42) {
        break;
      }
    }

    return cells;
  }

  private makeCell(ymd: YMD, inCurrentMonth: boolean, today: YMD, start: YMD | null, end: YMD | null): DayCell {
    const isSelected = !!start && compareYmd(ymd, start) === 0;
    const isRangeStart = isSelected;
    const isRangeEnd = !!end && compareYmd(ymd, end) === 0;
    const isInRange = !!start && !!end && compareYmd(ymd, start) > 0 && compareYmd(ymd, end) < 0;

    const iso = toIso(ymd);
    const isDisabled = (!!this.min && iso < this.min) || (!!this.max && iso > this.max);

    return {
      ymd,
      iso,
      label: ymd.day,
      inCurrentMonth,
      isToday: compareYmd(ymd, today) === 0,
      isSelected: this.range ? isRangeStart || isRangeEnd : isSelected,
      isRangeStart,
      isRangeEnd,
      isInRange,
      isDisabled,
    };
  }
}
