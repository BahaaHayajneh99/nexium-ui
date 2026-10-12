import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxIcon } from '../ui-icon';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export interface NxTimelineEditorGroup {
  id: string;
  label: string;
  /** Optional swimlane/event accent color (any valid CSS color). */
  color?: string;
}

export interface NxTimelineEditorEvent {
  id: string;
  groupId: string;
  label: string;
  detail?: string;
  /** ISO 8601 date-time string. */
  start: string;
  /** ISO 8601 date-time string. Omit for a point-in-time event with no duration. */
  end?: string;
  color?: string;
}

export interface NxTimelineEditorMoveEvent {
  event: NxTimelineEditorEvent;
  previousStart: string;
  previousEnd?: string;
}

interface NxTimelineEditorTick {
  x: number;
  label: string;
}

interface NxTimelineEditorRow {
  group: NxTimelineEditorGroup;
  events: NxTimelineEditorEvent[];
}

interface DragState {
  pointerId: number;
  eventId: string;
  originStartMs: number;
  originEndMs: number | null;
  startClientX: number;
  moved: boolean;
}

interface DragPreview {
  id: string;
  startMs: number;
  endMs: number | null;
}

const DAY_MS = 24 * 60 * 60 * 1000;
const HOUR_MS = 60 * 60 * 1000;
/** Pixels representing one day of timeline at zoom level 1. */
const BASE_PX_PER_DAY = 80;
const MIN_ZOOM = 0.25;
const MAX_ZOOM = 6;
const ZOOM_FACTOR = 1.5;
const MIN_EVENT_WIDTH = 110;
const RANGE_PADDING_DAYS = 2;
/** Drag/add snaps to the nearest hour so events don't land on odd fractional minutes. */
const SNAP_MS = HOUR_MS;
/** Minimum pointer travel (px) before a press-and-release on an event is treated as a drag rather than a click-to-edit. */
const DRAG_THRESHOLD_PX = 4;
const ALL_GROUPS = 'all';

/**
 * An interactive, editable timeline: events live in named group "swimlanes", can be dragged
 * along the time axis to reschedule, created by clicking empty track space, and edited inline
 * via a docked panel. Zoom changes the time-to-pixel scale; search/group filters narrow what's
 * shown. Unlike the read-only `NxTimeline`/`NxActivityTimeline`/`NxAuditTimeline`, this is a
 * controlled component: it never mutates data silently - every add/move/edit/delete both updates
 * the local view (so dragging feels instant) and emits an `@Output()` so the parent can persist
 * the change (or reject it by not updating the bound `events` input).
 */
@Component({
  selector: 'nx-timeline-editor',
  standalone: true,
  imports: [FormsModule, NxIcon, NxProLocked],
  templateUrl: './ui-timeline-editor.html',
  styleUrl: './ui-timeline-editor.scss',
})
export class NxTimelineEditor {
  protected readonly licensed = nxProLicenseGranted();

  @ViewChild('canvasEl') private canvasRef?: ElementRef<HTMLDivElement>;

  // Backed by signals (not plain fields) so every `computed()` below that reads them actually
  // re-runs when the parent rebinds new arrays, instead of caching what it first saw on render.
  private readonly eventsSignal = signal<NxTimelineEditorEvent[]>([]);
  @Input()
  get events(): NxTimelineEditorEvent[] {
    return this.eventsSignal();
  }
  set events(value: NxTimelineEditorEvent[]) {
    this.eventsSignal.set(value ?? []);
  }

  private readonly groupsSignal = signal<NxTimelineEditorGroup[]>([]);
  @Input()
  get groups(): NxTimelineEditorGroup[] {
    return this.groupsSignal();
  }
  set groups(value: NxTimelineEditorGroup[]) {
    this.groupsSignal.set(value ?? []);
  }

  /** Two-way bindable (`[(events)]`) full snapshot after any add/move/edit/delete. */
  @Output() eventsChange = new EventEmitter<NxTimelineEditorEvent[]>();
  @Output() eventAdded = new EventEmitter<NxTimelineEditorEvent>();
  @Output() eventMoved = new EventEmitter<NxTimelineEditorMoveEvent>();
  @Output() eventEdited = new EventEmitter<NxTimelineEditorEvent>();
  @Output() eventDeleted = new EventEmitter<string>();

  readonly zoom = signal(1);
  readonly searchText = signal('');
  readonly groupFilter = signal<string>(ALL_GROUPS);
  readonly editingId = signal<string | null>(null);
  readonly dragPreview = signal<DragPreview | null>(null);

  draftLabel = signal('');
  draftDetail = signal('');
  draftGroupId = signal('');
  draftStart = signal('');
  draftEnd = signal('');

  private dragState: DragState | null = null;

  readonly zoomLabel = computed(() => `${Math.round(this.zoom() * 100)}%`);
  readonly isMinZoom = computed(() => this.zoom() <= MIN_ZOOM);
  readonly isMaxZoom = computed(() => this.zoom() >= MAX_ZOOM);

  readonly pxPerMs = computed(() => (BASE_PX_PER_DAY * this.zoom()) / DAY_MS);

  /** Visible time span: min/max across all (unfiltered) events, padded, or a sane default when empty. */
  readonly range = computed(() => {
    const events = this.events;
    if (events.length === 0) {
      const now = Date.now();
      return { startMs: now - 3 * DAY_MS, endMs: now + 11 * DAY_MS };
    }
    let min = Infinity;
    let max = -Infinity;
    for (const event of events) {
      const startMs = new Date(event.start).getTime();
      if (!Number.isNaN(startMs)) {
        min = Math.min(min, startMs);
        max = Math.max(max, startMs);
      }
      const endMs = event.end ? new Date(event.end).getTime() : startMs;
      if (!Number.isNaN(endMs)) {
        max = Math.max(max, endMs);
      }
    }
    const pad = RANGE_PADDING_DAYS * DAY_MS;
    return { startMs: min - pad, endMs: max + pad };
  });

  readonly timelineWidth = computed(() => {
    const { startMs, endMs } = this.range();
    return Math.max(600, Math.ceil((endMs - startMs) * this.pxPerMs()));
  });

  readonly ticks = computed<NxTimelineEditorTick[]>(() => {
    const { startMs, endMs } = this.range();
    const pxPerMs = this.pxPerMs();
    const pxPerDay = pxPerMs * DAY_MS;
    const minPxBetweenTicks = 70;
    const stepDays = Math.max(1, Math.ceil(minPxBetweenTicks / pxPerDay));

    const dayStart = new Date(startMs);
    dayStart.setHours(0, 0, 0, 0);

    const ticks: NxTimelineEditorTick[] = [];
    for (let t = dayStart.getTime(); t <= endMs + DAY_MS; t += stepDays * DAY_MS) {
      if (t < startMs - DAY_MS) {
        continue;
      }
      ticks.push({
        x: (t - startMs) * pxPerMs,
        label: new Date(t).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      });
    }
    return ticks;
  });

  readonly filteredEvents = computed(() => {
    const search = this.searchText().trim().toLowerCase();
    if (!search) {
      return this.events;
    }
    return this.events.filter((event) =>
      `${event.label} ${event.detail ?? ''}`.toLowerCase().includes(search),
    );
  });

  readonly filteredGroups = computed(() => {
    const filter = this.groupFilter();
    return filter === ALL_GROUPS ? this.groups : this.groups.filter((group) => group.id === filter);
  });

  readonly rows = computed<NxTimelineEditorRow[]>(() => {
    const events = this.filteredEvents();
    return this.filteredGroups().map((group) => ({
      group,
      events: events.filter((event) => event.groupId === group.id),
    }));
  });

  readonly editingEvent = computed(() => {
    const id = this.editingId();
    if (!id) {
      return null;
    }
    return this.events.find((event) => event.id === id) ?? null;
  });

  zoomIn(): void {
    this.zoom.update((z) => Math.min(MAX_ZOOM, Number((z * ZOOM_FACTOR).toFixed(3))));
  }

  zoomOut(): void {
    this.zoom.update((z) => Math.max(MIN_ZOOM, Number((z / ZOOM_FACTOR).toFixed(3))));
  }

  resetZoom(): void {
    this.zoom.set(1);
  }

  chipLeft(event: NxTimelineEditorEvent): number {
    const startMs = this.previewStartMs(event);
    return (startMs - this.range().startMs) * this.pxPerMs();
  }

  chipWidth(event: NxTimelineEditorEvent): number {
    const preview = this.dragPreview();
    const startMs = this.previewStartMs(event);
    const endMs =
      preview && preview.id === event.id
        ? preview.endMs
        : event.end
          ? new Date(event.end).getTime()
          : null;
    if (endMs == null) {
      return MIN_EVENT_WIDTH;
    }
    return Math.max(MIN_EVENT_WIDTH, (endMs - startMs) * this.pxPerMs());
  }

  isDragging(event: NxTimelineEditorEvent): boolean {
    return this.dragPreview()?.id === event.id;
  }

  /** Clicking empty track space in a group row creates a new event there, snapped to the hour. */
  onRowClick(groupId: string, event: MouseEvent): void {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) {
      return;
    }
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const rawMs = this.range().startMs + x / this.pxPerMs();
    const snappedMs = Math.round(rawMs / SNAP_MS) * SNAP_MS;
    this.createEvent(groupId, snappedMs);
  }

  /** Explicit "Add event" toolbar control - creates an event "now" (or mid-range) in the first visible group. */
  addEventAtNow(): void {
    const groupId = this.filteredGroups()[0]?.id ?? this.groups[0]?.id;
    if (!groupId) {
      return;
    }
    const { startMs, endMs } = this.range();
    const nowMs = Date.now();
    const targetMs = nowMs >= startMs && nowMs <= endMs ? nowMs : startMs + (endMs - startMs) / 2;
    this.createEvent(groupId, Math.round(targetMs / SNAP_MS) * SNAP_MS);
  }

  onEventClick(event: MouseEvent): void {
    // Keep a click on a chip from also bubbling into the row's "add event" handler.
    event.stopPropagation();
  }

  onEventPointerDown(evt: NxTimelineEditorEvent, event: PointerEvent): void {
    event.stopPropagation();
    const target = event.currentTarget as HTMLElement;
    target.setPointerCapture(event.pointerId);
    this.dragState = {
      pointerId: event.pointerId,
      eventId: evt.id,
      originStartMs: new Date(evt.start).getTime(),
      originEndMs: evt.end ? new Date(evt.end).getTime() : null,
      startClientX: event.clientX,
      moved: false,
    };
  }

  onEventPointerMove(event: PointerEvent): void {
    const state = this.dragState;
    if (!state || event.pointerId !== state.pointerId) {
      return;
    }
    const dxPx = event.clientX - state.startClientX;
    if (!state.moved && Math.abs(dxPx) < DRAG_THRESHOLD_PX) {
      return;
    }
    state.moved = true;

    const deltaMs = dxPx / this.pxPerMs();
    const rawStartMs = state.originStartMs + deltaMs;
    const snappedStartMs = Math.round(rawStartMs / SNAP_MS) * SNAP_MS;
    const duration = state.originEndMs != null ? state.originEndMs - state.originStartMs : null;

    this.dragPreview.set({
      id: state.eventId,
      startMs: snappedStartMs,
      endMs: duration != null ? snappedStartMs + duration : null,
    });
  }

  onEventPointerUp(evt: NxTimelineEditorEvent, event: PointerEvent): void {
    event.stopPropagation();
    const state = this.dragState;
    this.dragState = null;
    if (!state || event.pointerId !== state.pointerId) {
      this.dragPreview.set(null);
      return;
    }
    const target = event.currentTarget as HTMLElement;
    if (target.hasPointerCapture?.(event.pointerId)) {
      target.releasePointerCapture(event.pointerId);
    }

    if (!state.moved) {
      this.dragPreview.set(null);
      this.openEditor(evt);
      return;
    }

    const preview = this.dragPreview();
    this.dragPreview.set(null);
    if (!preview) {
      return;
    }

    const previousStart = evt.start;
    const previousEnd = evt.end;
    const updated: NxTimelineEditorEvent = {
      ...evt,
      start: new Date(preview.startMs).toISOString(),
      end: preview.endMs != null ? new Date(preview.endMs).toISOString() : evt.end,
    };
    this.replaceEvent(updated);
    this.eventMoved.emit({ event: updated, previousStart, previousEnd });
  }

  onEventPointerCancel(): void {
    this.dragState = null;
    this.dragPreview.set(null);
  }

  openEditor(evt: NxTimelineEditorEvent): void {
    this.editingId.set(evt.id);
    this.draftLabel.set(evt.label);
    this.draftDetail.set(evt.detail ?? '');
    this.draftGroupId.set(evt.groupId);
    this.draftStart.set(this.toLocalInputValue(evt.start));
    this.draftEnd.set(evt.end ? this.toLocalInputValue(evt.end) : '');
  }

  closeEditor(): void {
    this.editingId.set(null);
  }

  saveEdit(): void {
    const current = this.editingEvent();
    if (!current) {
      return;
    }
    const start = this.fromLocalInputValue(this.draftStart()) ?? current.start;
    const endInput = this.draftEnd().trim();
    const end = endInput ? (this.fromLocalInputValue(endInput) ?? current.end) : undefined;

    const updated: NxTimelineEditorEvent = {
      ...current,
      label: this.draftLabel().trim() || current.label,
      detail: this.draftDetail().trim() || undefined,
      groupId: this.draftGroupId() || current.groupId,
      start,
      end,
    };
    this.replaceEvent(updated);
    this.eventEdited.emit(updated);
    this.closeEditor();
  }

  deleteEditing(): void {
    const current = this.editingEvent();
    if (!current) {
      return;
    }
    const next = this.events.filter((event) => event.id !== current.id);
    this.eventsSignal.set(next);
    this.eventsChange.emit(next);
    this.eventDeleted.emit(current.id);
    this.closeEditor();
  }

  private previewStartMs(event: NxTimelineEditorEvent): number {
    const preview = this.dragPreview();
    if (preview && preview.id === event.id) {
      return preview.startMs;
    }
    return new Date(event.start).getTime();
  }

  private createEvent(groupId: string, startMs: number): void {
    const created: NxTimelineEditorEvent = {
      id: this.generateId(),
      groupId,
      label: 'New event',
      start: new Date(startMs).toISOString(),
    };
    const next = [...this.events, created];
    this.eventsSignal.set(next);
    this.eventsChange.emit(next);
    this.eventAdded.emit(created);
    this.openEditor(created);
  }

  private replaceEvent(updated: NxTimelineEditorEvent): void {
    const next = this.events.map((event) => (event.id === updated.id ? updated : event));
    this.eventsSignal.set(next);
    this.eventsChange.emit(next);
  }

  private generateId(): string {
    return `evt-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  }

  private toLocalInputValue(iso: string): string {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) {
      return '';
    }
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

  private fromLocalInputValue(value: string): string | null {
    if (!value) {
      return null;
    }
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) {
      return null;
    }
    return d.toISOString();
  }
}
