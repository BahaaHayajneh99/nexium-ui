import { Component, inject } from '@angular/core';
import {
  NxResourceAllocationBoard,
  NxAllocationAssignment,
  NxAllocationPerson,
  NxAllocationSlot,
} from 'components';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-resource-allocation-board-demo',
  imports: [NxResourceAllocationBoard, DemoSection],
  templateUrl: './ui-resource-allocation-board-demo.html',
  styleUrl: './ui-resource-allocation-board-demo.scss',
})
export class UiResourceAllocationBoardDemo {
  importCode = `import { NxResourceAllocationBoard } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  people: NxAllocationPerson[] = [
    { id: 'p1', name: 'Ada Lovelace', capacityPerSlot: 1 },
    { id: 'p2', name: 'Grace Hopper', capacityPerSlot: 1 },
    { id: 'p3', name: 'Alan Turing', capacityPerSlot: 2 },
    { id: 'p4', name: 'Katherine Johnson', capacityPerSlot: 1 },
    { id: 'p5', name: 'Margaret Hamilton', capacityPerSlot: 1 },
  ];

  slots: NxAllocationSlot[] = [
    { id: 'mon', label: 'Mon' },
    { id: 'tue', label: 'Tue' },
    { id: 'wed', label: 'Wed' },
    { id: 'thu', label: 'Thu' },
    { id: 'fri', label: 'Fri' },
  ];

  // p1 (capacity 1) is double-booked on "mon" - two assignments in a single-capacity slot,
  // so the conflict indicator is visibly demonstrated.
  assignments: NxAllocationAssignment[] = [
    { id: 'a1', personId: 'p1', slotId: 'mon', projectName: 'Website Revamp', color: '#3b82f6' },
    { id: 'a2', personId: 'p1', slotId: 'mon', projectName: 'Client Call', color: '#f97316' },
    { id: 'a3', personId: 'p1', slotId: 'tue', projectName: 'Website Revamp', color: '#3b82f6' },
    { id: 'a4', personId: 'p2', slotId: 'mon', projectName: 'API Migration', color: '#22c55e' },
    { id: 'a5', personId: 'p2', slotId: 'wed', projectName: 'API Migration', color: '#22c55e' },
    { id: 'a6', personId: 'p3', slotId: 'wed', projectName: 'Mobile App', color: '#a855f7' },
    { id: 'a7', personId: 'p3', slotId: 'wed', projectName: 'Code Review', color: '#ef4444' },
    { id: 'a8', personId: 'p3', slotId: 'thu', projectName: 'Mobile App', color: '#a855f7' },
    { id: 'a9', personId: 'p4', slotId: 'fri', projectName: 'Data Pipeline', color: '#06b6d4' },
    { id: 'a10', personId: 'p5', slotId: 'thu', projectName: 'Security Audit', color: '#eab308' },
  ];

  lastEvent = '';

  basicCode = `<nx-resource-allocation-board
    [people]="people"
    [slots]="slots"
    [assignments]="assignments"
    (assignmentClick)="onAssignmentClick($event)"
    (cellClick)="onCellClick($event)">
</nx-resource-allocation-board>`;

  basicTs = `people: NxAllocationPerson[] = [
  { id: 'p1', name: 'Ada Lovelace', capacityPerSlot: 1 },
  { id: 'p2', name: 'Grace Hopper', capacityPerSlot: 1 },
  // ...
];

slots: NxAllocationSlot[] = [
  { id: 'mon', label: 'Mon' }, { id: 'tue', label: 'Tue' }, /* ...Wed, Thu, Fri */
];

// p1 has capacityPerSlot 1 but two assignments on "mon" - that cell renders with a
// red conflict border + warning icon since it exceeds capacity.
assignments: NxAllocationAssignment[] = [
  { id: 'a1', personId: 'p1', slotId: 'mon', projectName: 'Website Revamp', color: '#3b82f6' },
  { id: 'a2', personId: 'p1', slotId: 'mon', projectName: 'Client Call', color: '#f97316' },
  // ...
];

onAssignmentClick(assignment: NxAllocationAssignment): void {
  // Open your own edit UI for this assignment - the board itself has no edit form.
}

onCellClick(event: { personId: string; slotId: string }): void {
  // Empty part of the cell was clicked - open your own "add assignment" UI.
}`;

  onAssignmentClick(assignment: NxAllocationAssignment): void {
    this.lastEvent = `assignmentClick: "${assignment.projectName}" (${assignment.id})`;
  }

  onCellClick(event: { personId: string; slotId: string }): void {
    this.lastEvent = `cellClick: person "${event.personId}" / slot "${event.slotId}"`;
  }
}
