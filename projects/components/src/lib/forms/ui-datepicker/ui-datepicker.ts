import { Component, ElementRef, EventEmitter, Input, Output, booleanAttribute } from '@angular/core';

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
})
export class NxDatepicker {
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

  @Output() valueChange = new EventEmitter<string>();
  @Output() endValueChange = new EventEmitter<string>();

  readonly calendarIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" stroke-width="2"/>
    <path d="M3 9H21" stroke="currentColor" stroke-width="2"/>
    <path d="M8 3V6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M16 3V6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>`;

  readonly weekdayLabels = WEEKDAY_LABELS;

  open = false;
  private selectingEnd = false;
  private viewYear: number;
  private viewMonth: number;
  timeValue = '00:00';

  constructor(private elementRef: ElementRef<HTMLElement>) {
    const seed = parseIso(this.value) ?? todayYmd();
    this.viewYear = seed.year;
    this.viewMonth = seed.month;
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
    }
  }

  close(): void {
    this.open = false;
  }

  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
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

    if (!start || this.selectingEnd) {
      if (start && compareYmd(cell.ymd, start) < 0) {
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

  private emitValue(iso: string): void {
    this.value = iso;
    this.valueChange.emit(iso);
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
