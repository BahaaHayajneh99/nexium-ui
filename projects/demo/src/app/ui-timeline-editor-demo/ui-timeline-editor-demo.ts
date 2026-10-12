import { Component, inject } from '@angular/core';
import {
  NxTimelineEditor,
  NxTimelineEditorEvent,
  NxTimelineEditorGroup,
  NxTimelineEditorMoveEvent,
} from 'components';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-timeline-editor-demo',
  imports: [NxTimelineEditor, DemoSection],
  templateUrl: './ui-timeline-editor-demo.html',
  styleUrl: './ui-timeline-editor-demo.scss',
})
export class UiTimelineEditorDemo {
  importCode = `import { NxTimelineEditor } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  groups: NxTimelineEditorGroup[] = [
    { id: 'marketing', label: 'Marketing', color: '#f3e8ff' },
    { id: 'engineering', label: 'Engineering', color: '#e0f2fe' },
    { id: 'design', label: 'Design', color: '#fef3c7' },
  ];

  events: NxTimelineEditorEvent[] = [
    { id: 'evt-1', groupId: 'marketing', label: 'Q4 campaign kickoff', start: '2026-09-29T09:00:00' },
    { id: 'evt-2', groupId: 'marketing', label: 'Launch social teaser', start: '2026-10-02T10:00:00', end: '2026-10-02T12:00:00' },
    { id: 'evt-3', groupId: 'marketing', label: 'Press release', start: '2026-10-10T09:00:00' },
    { id: 'evt-4', groupId: 'marketing', label: 'Partner webinar', detail: 'Joint session with reseller partners', start: '2026-10-18T15:00:00', end: '2026-10-18T16:30:00' },
    { id: 'evt-5', groupId: 'engineering', label: 'API freeze', start: '2026-10-01T00:00:00' },
    { id: 'evt-6', groupId: 'engineering', label: 'Sprint 24', detail: 'Timeline Editor + Query Builder polish', start: '2026-10-05T09:00:00', end: '2026-10-16T18:00:00' },
    { id: 'evt-7', groupId: 'engineering', label: 'Security audit', start: '2026-10-08T09:00:00', end: '2026-10-09T17:00:00' },
    { id: 'evt-8', groupId: 'engineering', label: 'Release v2.4', start: '2026-10-20T09:00:00' },
    { id: 'evt-9', groupId: 'design', label: 'Design review', start: '2026-10-03T13:00:00' },
    { id: 'evt-10', groupId: 'design', label: 'Prototype handoff', start: '2026-10-12T11:00:00' },
  ];

  lastChange = '';

  onEventAdded(event: NxTimelineEditorEvent): void {
    this.lastChange = `Added "${event.label}" to ${this.groupLabel(event.groupId)}`;
  }

  onEventMoved(move: NxTimelineEditorMoveEvent): void {
    this.lastChange = `Moved "${move.event.label}" to ${new Date(move.event.start).toLocaleString()}`;
  }

  onEventEdited(event: NxTimelineEditorEvent): void {
    this.lastChange = `Saved changes to "${event.label}"`;
  }

  onEventDeleted(id: string): void {
    this.lastChange = `Deleted event ${id}`;
  }

  private groupLabel(groupId: string): string {
    return this.groups.find((g) => g.id === groupId)?.label ?? groupId;
  }

  basicCode = `<nx-timeline-editor
    [(events)]="events"
    [groups]="groups"
    (eventAdded)="onEventAdded($event)"
    (eventMoved)="onEventMoved($event)"
    (eventEdited)="onEventEdited($event)"
    (eventDeleted)="onEventDeleted($event)">
</nx-timeline-editor>`;

  basicTs = `groups: NxTimelineEditorGroup[] = [
  { id: 'marketing', label: 'Marketing' },
  { id: 'engineering', label: 'Engineering' },
  { id: 'design', label: 'Design' },
];

events: NxTimelineEditorEvent[] = [
  { id: 'evt-1', groupId: 'marketing', label: 'Q4 campaign kickoff', start: '2026-09-29T09:00:00' },
  { id: 'evt-6', groupId: 'engineering', label: 'Sprint 24',
    start: '2026-10-05T09:00:00', end: '2026-10-16T18:00:00' },
  // ...more events, across 3 groups and ~3 weeks
];

onEventMoved(move: NxTimelineEditorMoveEvent): void {
  // Drag an event chip along the axis to reschedule it - fired on drop with
  // the updated event plus its previous start/end, so you can persist or undo.
}`;
}
