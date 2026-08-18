import { Component } from '@angular/core';
import { UiCard, UiCardContent, UiTable, NxTableColumn, UiProgressBarComponent, UiAvatar } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

interface LeaveBalance {
  name: string;
  usedPercent: number;
  label: string;
}

@Component({
  selector: 'app-templates-hr-portal-demo',
  imports: [UiCard, UiCardContent, UiTable, UiProgressBarComponent, UiAvatar, DemoSection],
  templateUrl: './templates-hr-portal-demo.html',
})
export class TemplatesHrPortalDemo {
  columns: NxTableColumn[] = [
    { field: 'name', header: 'Employee' },
    { field: 'department', header: 'Department' },
    { field: 'title', header: 'Title' },
    { field: 'status', header: 'Status' },
  ];

  employees: Record<string, unknown>[] = [
    { name: 'Ada Lovelace', department: 'Engineering', title: 'Staff Engineer', status: 'Active' },
    { name: 'Grace Hopper', department: 'Engineering', title: 'Engineering Manager', status: 'Active' },
    { name: 'Alan Turing', department: 'Research', title: 'Research Scientist', status: 'On Leave' },
    { name: 'Margaret Hamilton', department: 'Engineering', title: 'Principal Engineer', status: 'Active' },
  ];

  leaveBalances: LeaveBalance[] = [
    { name: 'Vacation Days', usedPercent: 60, label: '12 of 20 used' },
    { name: 'Sick Leave', usedPercent: 20, label: '2 of 10 used' },
    { name: 'Personal Days', usedPercent: 40, label: '2 of 5 used' },
  ];

  directoryCode = `<nx-table [columns]="columns" [data]="employees" striped hoverable></nx-table>`;

  leaveCode = `<nx-progress-bar [value]="60" variant="info" [showLabel]="true" label="12 of 20 used"></nx-progress-bar>`;
}
