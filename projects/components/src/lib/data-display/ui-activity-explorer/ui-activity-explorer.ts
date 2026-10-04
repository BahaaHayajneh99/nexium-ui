import { Component, Input, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxIcon } from '../ui-icon';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export interface NxActivityEvent {
  id: string | number;
  user: string;
  action: string;
  entity: string;
  entityName?: string;
  detail?: string;
  /** ISO timestamp. */
  date: string;
  icon?: string;
}

export interface NxActivityDateGroup {
  dateLabel: string;
  events: NxActivityEvent[];
}

const ALL = 'all';

/**
 * A date-grouped, fully filterable activity timeline - by user, action type, entity, a date
 * range, and free-text search. Where `NxAuditLog` is a table for reviewing individual field
 * diffs, this is for scanning "what happened, and when" across a whole system at a glance.
 */
@Component({
  selector: 'nx-activity-explorer',
  standalone: true,
  imports: [FormsModule, NxIcon, NxProLocked],
  templateUrl: './ui-activity-explorer.html',
  styleUrl: './ui-activity-explorer.scss',
})
export class NxActivityExplorer {
  protected readonly licensed = nxProLicenseGranted();

  // Backed by a signal (not a plain field) so `users`/`actions`/`entities`/`filteredEvents` below -
  // all `computed()`s reading `this.events` - actually re-run when the parent rebinds new events,
  // instead of permanently caching whatever they first saw on initial render.
  private readonly eventsSignal = signal<NxActivityEvent[]>([]);
  @Input()
  get events(): NxActivityEvent[] {
    return this.eventsSignal();
  }
  set events(value: NxActivityEvent[]) {
    this.eventsSignal.set(value);
  }

  searchText = signal('');
  userFilter = signal(ALL);
  actionFilter = signal(ALL);
  entityFilter = signal(ALL);
  dateFrom = signal<string | null>(null);
  dateTo = signal<string | null>(null);

  readonly users = computed(() => this.unique(this.events.map((e) => e.user)));
  readonly actions = computed(() => this.unique(this.events.map((e) => e.action)));
  readonly entities = computed(() => this.unique(this.events.map((e) => e.entity)));

  readonly filteredEvents = computed(() => {
    const search = this.searchText().trim().toLowerCase();
    const user = this.userFilter();
    const action = this.actionFilter();
    const entity = this.entityFilter();
    const from = this.dateFrom();
    const to = this.dateTo();

    return this.events
      .filter((event) => {
        if (user !== ALL && event.user !== user) return false;
        if (action !== ALL && event.action !== action) return false;
        if (entity !== ALL && event.entity !== entity) return false;
        if (from && event.date.slice(0, 10) < from) return false;
        if (to && event.date.slice(0, 10) > to) return false;
        if (search) {
          const haystack = `${event.user} ${event.action} ${event.entity} ${event.entityName ?? ''} ${event.detail ?? ''}`.toLowerCase();
          if (!haystack.includes(search)) return false;
        }
        return true;
      })
      .sort((a, b) => b.date.localeCompare(a.date));
  });

  readonly groups = computed<NxActivityDateGroup[]>(() => {
    const map = new Map<string, NxActivityEvent[]>();
    for (const event of this.filteredEvents()) {
      const key = event.date.slice(0, 10);
      const bucket = map.get(key);
      if (bucket) {
        bucket.push(event);
      } else {
        map.set(key, [event]);
      }
    }
    return [...map.entries()].map(([dateLabel, events]) => ({ dateLabel, events }));
  });

  timeLabel(iso: string): string {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) {
      return '';
    }
    return d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
  }

  resetFilters(): void {
    this.searchText.set('');
    this.userFilter.set(ALL);
    this.actionFilter.set(ALL);
    this.entityFilter.set(ALL);
    this.dateFrom.set(null);
    this.dateTo.set(null);
  }

  private unique(values: string[]): string[] {
    return [...new Set(values)].sort((a, b) => a.localeCompare(b));
  }
}
