import { Component, ElementRef, EventEmitter, Input, Output, numberAttribute } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export interface NxGanttTask {
  id: string | number;
  name: string;
  start: Date;
  end: Date;
  progress?: number;
  color?: string;
}

interface NxGanttRow {
  task: NxGanttTask;
  left: number;
  width: number;
}

const MS_PER_DAY = 24 * 60 * 60 * 1000;

function daysBetween(a: Date, b: Date): number {
  return Math.round((b.getTime() - a.getTime()) / MS_PER_DAY);
}

/** A timeline of task bars - drag a bar to move it, drag its right edge to resize (change its end date). */
@Component({
  selector: 'nx-gantt-chart',
  standalone: true,
  imports: [NxProLocked, DatePipe],
  templateUrl: './ui-gantt-chart.html',
  styleUrl: './ui-gantt-chart.scss',
})
export class NxGanttChart {
  protected readonly licensed = nxProLicenseGranted();

  @Input() tasks: NxGanttTask[] = [];
  @Input({ transform: numberAttribute }) pxPerDay = 32;

  @Output() taskChange = new EventEmitter<NxGanttTask>();

  private dragTaskId: string | number | null = null;
  private dragMode: 'move' | 'resize' = 'move';
  private dragStartX = 0;
  private dragStartLeft = 0;
  private dragStartWidth = 0;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  get rangeStart(): Date {
    if (!this.tasks.length) {
      return new Date();
    }
    return new Date(Math.min(...this.tasks.map((t) => t.start.getTime())));
  }

  get rangeEnd(): Date {
    if (!this.tasks.length) {
      return new Date();
    }
    return new Date(Math.max(...this.tasks.map((t) => t.end.getTime())));
  }

  get totalDays(): number {
    return Math.max(1, daysBetween(this.rangeStart, this.rangeEnd) + 1);
  }

  get dayTicks(): { date: Date; left: number }[] {
    const ticks: { date: Date; left: number }[] = [];
    for (let i = 0; i < this.totalDays; i += 7) {
      const date = new Date(this.rangeStart.getTime() + i * MS_PER_DAY);
      ticks.push({ date, left: i * this.pxPerDay });
    }
    return ticks;
  }

  get rows(): NxGanttRow[] {
    return this.tasks.map((task) => ({
      task,
      left: daysBetween(this.rangeStart, task.start) * this.pxPerDay,
      width: Math.max(this.pxPerDay, (daysBetween(task.start, task.end) + 1) * this.pxPerDay),
    }));
  }

  onBarPointerDown(row: NxGanttRow, mode: 'move' | 'resize', event: PointerEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.dragTaskId = row.task.id;
    this.dragMode = mode;
    this.dragStartX = event.clientX;
    this.dragStartLeft = row.left;
    this.dragStartWidth = row.width;
    window.addEventListener('pointermove', this.onDragMove);
    window.addEventListener('pointerup', this.onDragEnd);
  }

  private onDragMove = (event: PointerEvent): void => {
    if (this.dragTaskId === null) {
      return;
    }
    const deltaPx = event.clientX - this.dragStartX;
    const bar = this.elementRef.nativeElement.querySelector(
      `[data-task="${this.dragTaskId}"]`,
    ) as HTMLElement | null;
    if (!bar) {
      return;
    }
    if (this.dragMode === 'move') {
      bar.style.left = `${this.dragStartLeft + deltaPx}px`;
    } else {
      bar.style.width = `${Math.max(this.pxPerDay, this.dragStartWidth + deltaPx)}px`;
    }
  };

  private onDragEnd = (event: PointerEvent): void => {
    if (this.dragTaskId === null) {
      return;
    }
    const task = this.tasks.find((t) => t.id === this.dragTaskId);
    window.removeEventListener('pointermove', this.onDragMove);
    window.removeEventListener('pointerup', this.onDragEnd);

    if (task) {
      const deltaPx = event.clientX - this.dragStartX;
      const deltaDays = Math.round(deltaPx / this.pxPerDay);
      if (deltaDays !== 0) {
        if (this.dragMode === 'move') {
          this.taskChange.emit({
            ...task,
            start: new Date(task.start.getTime() + deltaDays * MS_PER_DAY),
            end: new Date(task.end.getTime() + deltaDays * MS_PER_DAY),
          });
        } else {
          const newEnd = new Date(task.end.getTime() + deltaDays * MS_PER_DAY);
          if (newEnd.getTime() > task.start.getTime()) {
            this.taskChange.emit({ ...task, end: newEnd });
          }
        }
      }
    }
    this.dragTaskId = null;
  };
}
