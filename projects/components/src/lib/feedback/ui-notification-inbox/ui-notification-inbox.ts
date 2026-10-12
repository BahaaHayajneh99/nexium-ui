import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output, booleanAttribute, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxInfiniteScroll } from '../../interaction/nx-infinite-scroll';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export type NxNotificationPriority = 'low' | 'normal' | 'high' | 'urgent';
export type NxNotificationReadFilter = 'all' | 'unread' | 'read';

/** A single configurable action rendered as a button on a notification (e.g. "Archive", "View"). */
export interface NxNotificationAction {
  id: string;
  label: string;
  /** Optional short glyph/initial shown before the label - this component has no bundled icon set opinion. */
  icon?: string;
}

export interface NxNotificationInboxItem {
  id: string | number;
  title: string;
  message: string;
  /** ISO timestamp - drives both sorting and the today/yesterday/this week/older grouping. */
  timestamp: string;
  read: boolean;
  /** Arbitrary string - "System", "Mentions", "Updates", or anything a consuming app wants. */
  category: string;
  priority: NxNotificationPriority;
  /** Per-item action buttons - fully consumer-defined, nothing here is hardcoded to one action set. */
  actions?: NxNotificationAction[];
}

export interface NxNotificationActionEvent {
  item: NxNotificationInboxItem;
  action: NxNotificationAction;
}

interface NxNotificationDateGroup {
  label: string;
  items: NxNotificationInboxItem[];
}

const ALL = 'all';
const PRIORITY_RANK: Record<NxNotificationPriority, number> = { urgent: 0, high: 1, normal: 2, low: 3 };

/**
 * A full-page/panel notification inbox - search, combinable filters (read state, category,
 * priority), date-grouped sections, infinite scroll, and configurable per-item actions. Where
 * `NxNotificationCenter` is a lightweight bell-icon dropdown (read/unread + dismiss + mark-all),
 * this is the heavier sibling for a dedicated inbox view. PRO component.
 */
@Component({
  selector: 'nx-notification-inbox',
  standalone: true,
  imports: [FormsModule, DatePipe, NxInfiniteScroll, NxProLocked],
  templateUrl: './ui-notification-inbox.html',
  styleUrl: './ui-notification-inbox.scss',
})
export class NxNotificationInbox {
  protected readonly licensed = nxProLicenseGranted();

  // Backed by a signal (not a plain field) so the `computed()`s below actually re-run when the
  // parent rebinds new notifications (e.g. after a `loadMore`), instead of permanently caching
  // whatever they first saw on initial render.
  private readonly itemsSignal = signal<NxNotificationInboxItem[]>([]);
  @Input()
  get notifications(): NxNotificationInboxItem[] {
    return this.itemsSignal();
  }
  set notifications(value: NxNotificationInboxItem[]) {
    this.itemsSignal.set(value ?? []);
  }

  @Input() emptyMessage = "You're all caught up.";
  /** Whether the parent has more pages available - gates the infinite-scroll trigger and the trailing loader row. */
  @Input({ transform: booleanAttribute }) hasMore = false;
  /** Shows a trailing "Loading more..." row and suppresses further `loadMore` emits while a page is in flight. */
  @Input({ transform: booleanAttribute }) loading = false;

  @Output() itemClick = new EventEmitter<NxNotificationInboxItem>();
  @Output() markAllRead = new EventEmitter<void>();
  @Output() readToggle = new EventEmitter<NxNotificationInboxItem>();
  @Output() actionClick = new EventEmitter<NxNotificationActionEvent>();
  /** Emitted when the list is scrolled near the bottom and `hasMore` is true - fetch the next page and rebind `notifications`. */
  @Output() loadMore = new EventEmitter<void>();

  readonly searchText = signal('');
  readonly readFilter = signal<NxNotificationReadFilter>(ALL as NxNotificationReadFilter);
  readonly categoryFilter = signal(ALL);
  readonly priorityFilter = signal<NxNotificationPriority | 'all'>(ALL);

  readonly priorities: NxNotificationPriority[] = ['urgent', 'high', 'normal', 'low'];

  readonly categories = computed(() => this.unique(this.notifications.map((n) => n.category)));

  readonly unreadCount = computed(() => this.notifications.filter((n) => !n.read).length);

  readonly filteredItems = computed(() => {
    const search = this.searchText().trim().toLowerCase();
    const read = this.readFilter();
    const category = this.categoryFilter();
    const priority = this.priorityFilter();

    return this.notifications
      .filter((item) => {
        if (read === 'unread' && item.read) return false;
        if (read === 'read' && !item.read) return false;
        if (category !== ALL && item.category !== category) return false;
        if (priority !== ALL && item.priority !== priority) return false;
        if (search) {
          const haystack = `${item.title} ${item.message}`.toLowerCase();
          if (!haystack.includes(search)) return false;
        }
        return true;
      })
      .sort((a, b) => b.timestamp.localeCompare(a.timestamp));
  });

  readonly groups = computed<NxNotificationDateGroup[]>(() => {
    const order: string[] = [];
    const byLabel = new Map<string, NxNotificationInboxItem[]>();

    for (const item of this.filteredItems()) {
      const label = this.dateLabel(item.timestamp);
      if (!byLabel.has(label)) {
        byLabel.set(label, []);
        order.push(label);
      }
      byLabel.get(label)!.push(item);
    }

    return order.map((label) => ({ label, items: byLabel.get(label)! }));
  });

  priorityRank(priority: NxNotificationPriority): number {
    return PRIORITY_RANK[priority];
  }

  onItemClick(item: NxNotificationInboxItem): void {
    this.itemClick.emit(item);
  }

  onMarkAllRead(): void {
    this.markAllRead.emit();
  }

  onToggleRead(event: MouseEvent, item: NxNotificationInboxItem): void {
    event.stopPropagation();
    this.readToggle.emit(item);
  }

  onAction(event: MouseEvent, item: NxNotificationInboxItem, action: NxNotificationAction): void {
    event.stopPropagation();
    this.actionClick.emit({ item, action });
  }

  onLoadMore(): void {
    if (this.loading || !this.hasMore) {
      return;
    }
    this.loadMore.emit();
  }

  resetFilters(): void {
    this.searchText.set('');
    this.readFilter.set(ALL as NxNotificationReadFilter);
    this.categoryFilter.set(ALL);
    this.priorityFilter.set(ALL);
  }

  private dateLabel(timestamp: string): string {
    const date = new Date(timestamp);
    if (Number.isNaN(date.getTime())) {
      return 'Older';
    }

    const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    const diffDays = Math.round((startOfDay(new Date()) - startOfDay(date)) / 86_400_000);

    if (diffDays <= 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays <= 7) return 'This Week';
    return 'Older';
  }

  private unique(values: string[]): string[] {
    return [...new Set(values)].sort((a, b) => a.localeCompare(b));
  }
}
