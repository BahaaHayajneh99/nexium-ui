import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxScheduler, NxSchedulerEvent } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

function atHour(dayOffset: number, hour: number, minute = 0): Date {
  const date = new Date();
  date.setHours(hour, minute, 0, 0);
  date.setDate(date.getDate() + dayOffset);
  return date;
}

@Component({
  selector: 'app-ui-scheduler-demo',
  imports: [NxScheduler, DemoSection],
  templateUrl: './ui-scheduler-demo.html',
  styleUrl: './ui-scheduler-demo.scss',
})
export class UiSchedulerDemo {
  importCode = `import { NxScheduler } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  startDate = atHour(0, 0);

  events: NxSchedulerEvent[] = [
    { id: 1, title: 'Standup', start: atHour(0, 9), end: atHour(0, 9, 30), color: '#3b82f6' },
    { id: 2, title: 'Design Review', start: atHour(0, 11), end: atHour(0, 12), color: '#8b5cf6' },
    { id: 3, title: 'Client Call', start: atHour(1, 13), end: atHour(1, 14, 30) },
    { id: 4, title: 'Sprint Planning', start: atHour(2, 10), end: atHour(2, 12), color: '#22c55e' },
    { id: 5, title: '1:1', start: atHour(3, 15), end: atHour(3, 15, 30) },
  ];

  basicCode = `<nx-scheduler
    [startDate]="startDate"
    [events]="events"
    (eventChange)="onEventChange($event)">
</nx-scheduler>`;

  basicTs = `startDate = new Date();
events: NxSchedulerEvent[] = [
  { id: 1, title: 'Standup', start: ..., end: ..., color: '#3b82f6' },
  { id: 2, title: 'Design Review', start: ..., end: ..., color: '#8b5cf6' },
  { id: 3, title: 'Client Call', start: ..., end: ... },
  { id: 4, title: 'Sprint Planning', start: ..., end: ..., color: '#22c55e' },
  { id: 5, title: '1:1', start: ..., end: ... },
];

onEventChange(updated: NxSchedulerEvent): void {
  this.events = this.events.map((e) => (e.id === updated.id ? updated : e));
}`;

  onEventChange(updated: NxSchedulerEvent): void {
    this.events = this.events.map((e) => (e.id === updated.id ? updated : e));
  }
}
