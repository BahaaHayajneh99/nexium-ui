import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxGanttChart, NxGanttTask } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

function daysFromNow(days: number): Date {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + days);
  return date;
}

@Component({
  selector: 'app-ui-gantt-chart-demo',
  imports: [NxGanttChart, DemoSection],
  templateUrl: './ui-gantt-chart-demo.html',
  styleUrl: './ui-gantt-chart-demo.scss',
})
export class UiGanttChartDemo {
  importCode = `import { NxGanttChart } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  tasks: NxGanttTask[] = [
    { id: 1, name: 'Discovery', start: daysFromNow(0), end: daysFromNow(3), progress: 100, color: '#22c55e' },
    { id: 2, name: 'Design', start: daysFromNow(3), end: daysFromNow(8), progress: 70, color: '#3b82f6' },
    { id: 3, name: 'Build', start: daysFromNow(7), end: daysFromNow(16), progress: 30 },
    { id: 4, name: 'QA', start: daysFromNow(15), end: daysFromNow(19) },
    { id: 5, name: 'Launch', start: daysFromNow(19), end: daysFromNow(21), color: '#ef4444' },
  ];

  basicCode = `<nx-gantt-chart [tasks]="tasks" (taskChange)="onTaskChange($event)"></nx-gantt-chart>`;

  basicTs = `tasks: NxGanttTask[] = [
  { id: 1, name: 'Discovery', start: ..., end: ..., progress: 100, color: '#22c55e' },
  { id: 2, name: 'Design', start: ..., end: ..., progress: 70, color: '#3b82f6' },
  { id: 3, name: 'Build', start: ..., end: ..., progress: 30 },
  { id: 4, name: 'QA', start: ..., end: ... },
  { id: 5, name: 'Launch', start: ..., end: ..., color: '#ef4444' },
];

onTaskChange(updated: NxGanttTask): void {
  this.tasks = this.tasks.map((t) => (t.id === updated.id ? updated : t));
}`;

  onTaskChange(updated: NxGanttTask): void {
    this.tasks = this.tasks.map((t) => (t.id === updated.id ? updated : t));
  }
}
