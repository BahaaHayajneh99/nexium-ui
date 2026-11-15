import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';
import { NxAvatar } from '../../data-display/ui-avatar';
import { NxIcon } from '../../data-display/ui-icon';

export interface NxAllocationPerson {
  id: string;
  name: string;
  avatarSrc?: string;
  /** Max assignments this person can hold in a single slot before it's flagged as over-allocated. Defaults to 1. */
  capacityPerSlot?: number;
}

export interface NxAllocationSlot {
  id: string;
  label: string;
}

export interface NxAllocationAssignment {
  id: string;
  personId: string;
  slotId: string;
  projectName: string;
  color?: string;
}

const DEFAULT_CAPACITY = 1;

/**
 * A grid of people (rows) by time slots (columns, e.g. a work week) where each
 * cell shows the assignment chips occupying it, with a conflict indicator when
 * a cell holds more assignments than that person's capacity. This component only
 * renders the grid - a consumer supplies their own "add/edit assignment" UI,
 * triggered via `cellClick`/`assignmentClick`.
 */
@Component({
  selector: 'nx-resource-allocation-board',
  standalone: true,
  imports: [NgIf, NgFor, NxProLocked, NxAvatar, NxIcon],
  templateUrl: './ui-resource-allocation-board.html',
  styleUrl: './ui-resource-allocation-board.scss',
})
export class NxResourceAllocationBoard {
  protected readonly licensed = nxProLicenseGranted();

  @Input() people: NxAllocationPerson[] = [];
  @Input() slots: NxAllocationSlot[] = [];
  @Input() assignments: NxAllocationAssignment[] = [];

  @Output() assignmentClick = new EventEmitter<NxAllocationAssignment>();
  /** Emitted when the empty part of a cell (not an assignment chip) is clicked. */
  @Output() cellClick = new EventEmitter<{ personId: string; slotId: string }>();

  cellAssignments(personId: string, slotId: string): NxAllocationAssignment[] {
    return this.assignments.filter((assignment) => assignment.personId === personId && assignment.slotId === slotId);
  }

  capacityFor(person: NxAllocationPerson): number {
    return person.capacityPerSlot ?? DEFAULT_CAPACITY;
  }

  isOverAllocated(person: NxAllocationPerson, slotId: string): boolean {
    return this.cellAssignments(person.id, slotId).length > this.capacityFor(person);
  }

  chipColor(assignment: NxAllocationAssignment): string {
    return assignment.color ?? 'var(--shell-primary)';
  }

  onAssignmentClick(assignment: NxAllocationAssignment, event: MouseEvent): void {
    event.stopPropagation();
    this.assignmentClick.emit(assignment);
  }

  onCellClick(personId: string, slotId: string): void {
    this.cellClick.emit({ personId, slotId });
  }

  trackBySlotId(index: number, slot: NxAllocationSlot): string {
    return slot.id;
  }

  trackByPersonId(index: number, person: NxAllocationPerson): string {
    return person.id;
  }

  trackByAssignmentId(index: number, assignment: NxAllocationAssignment): string {
    return assignment.id;
  }
}
