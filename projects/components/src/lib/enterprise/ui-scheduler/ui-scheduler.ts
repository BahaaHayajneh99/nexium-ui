import { Component, ElementRef, EventEmitter, Input, Output, numberAttribute } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export interface NxSchedulerEvent {
  id: string | number;
  title: string;
  start: Date;
  end: Date;
  color?: string;
}

interface NxSchedulerPositionedEvent {
  event: NxSchedulerEvent;
  dayIndex: number;
  top: number;
  height: number;
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function minutesSinceMidnight(date: Date): number {
  return date.getHours() * 60 + date.getMinutes();
}

/** A week-view time grid - drag an event to move it, drag its bottom edge to resize (change its end time). */
@Component({
  selector: 'nx-scheduler',
  standalone: true,
  imports: [NxProLocked, DatePipe],
  templateUrl: './ui-scheduler.html',
  styleUrl: './ui-scheduler.scss',
})
export class NxScheduler {
  protected readonly licensed = nxProLicenseGranted();

  @Input() startDate: Date = new Date();
  @Input({ transform: numberAttribute }) dayCount = 7;
  @Input({ transform: numberAttribute }) startHour = 7;
  @Input({ transform: numberAttribute }) endHour = 20;
  @Input({ transform: numberAttribute }) pxPerHour = 48;
  @Input() events: NxSchedulerEvent[] = [];

  @Output() eventChange = new EventEmitter<NxSchedulerEvent>();

  private dragEventId: string | number | null = null;
  private dragMode: 'move' | 'resize' = 'move';
  private dragStartY = 0;
  private dragStartTop = 0;
  private dragStartHeight = 0;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  get days(): Date[] {
    return Array.from({ length: this.dayCount }, (_, i) => {
      const date = new Date(this.startDate);
      date.setDate(date.getDate() + i);
      return date;
    });
  }

  get hours(): number[] {
    const list: number[] = [];
    for (let h = this.startHour; h <= this.endHour; h++) {
      list.push(h);
    }
    return list;
  }

  get gridHeight(): number {
    return (this.endHour - this.startHour) * this.pxPerHour;
  }

  get positionedEvents(): NxSchedulerPositionedEvent[] {
    const result: NxSchedulerPositionedEvent[] = [];
    this.days.forEach((day, dayIndex) => {
      for (const event of this.events) {
        if (!isSameDay(event.start, day)) {
          continue;
        }
        const startMinutes = minutesSinceMidnight(event.start) - this.startHour * 60;
        const endMinutes = minutesSinceMidnight(event.end) - this.startHour * 60;
        result.push({
          event,
          dayIndex,
          top: (startMinutes / 60) * this.pxPerHour,
          height: Math.max(20, ((endMinutes - startMinutes) / 60) * this.pxPerHour),
        });
      }
    });
    return result;
  }

  onEventPointerDown(positioned: NxSchedulerPositionedEvent, mode: 'move' | 'resize', domEvent: PointerEvent): void {
    domEvent.preventDefault();
    domEvent.stopPropagation();
    this.dragEventId = positioned.event.id;
    this.dragMode = mode;
    this.dragStartY = domEvent.clientY;
    this.dragStartTop = positioned.top;
    this.dragStartHeight = positioned.height;
    window.addEventListener('pointermove', this.onDragMove);
    window.addEventListener('pointerup', this.onDragEnd);
  }

  private onDragMove = (domEvent: PointerEvent): void => {
    if (this.dragEventId === null) {
      return;
    }
    const deltaY = domEvent.clientY - this.dragStartY;
    const bar = this.elementRef.nativeElement.querySelector(
      `[data-event="${this.dragEventId}"]`,
    ) as HTMLElement | null;
    if (!bar) {
      return;
    }
    if (this.dragMode === 'move') {
      bar.style.top = `${this.dragStartTop + deltaY}px`;
    } else {
      bar.style.height = `${Math.max(20, this.dragStartHeight + deltaY)}px`;
    }
  };

  private onDragEnd = (domEvent: PointerEvent): void => {
    if (this.dragEventId === null) {
      return;
    }
    const event = this.events.find((e) => e.id === this.dragEventId);
    window.removeEventListener('pointermove', this.onDragMove);
    window.removeEventListener('pointerup', this.onDragEnd);

    if (event) {
      const deltaY = domEvent.clientY - this.dragStartY;
      const deltaMinutesRaw = (deltaY / this.pxPerHour) * 60;
      const deltaMinutes = Math.round(deltaMinutesRaw / 15) * 15;
      if (deltaMinutes !== 0) {
        if (this.dragMode === 'move') {
          this.eventChange.emit({
            ...event,
            start: new Date(event.start.getTime() + deltaMinutes * 60000),
            end: new Date(event.end.getTime() + deltaMinutes * 60000),
          });
        } else {
          const newEnd = new Date(event.end.getTime() + deltaMinutes * 60000);
          if (newEnd.getTime() > event.start.getTime()) {
            this.eventChange.emit({ ...event, end: newEnd });
          }
        }
      }
    }
    this.dragEventId = null;
  };
}
