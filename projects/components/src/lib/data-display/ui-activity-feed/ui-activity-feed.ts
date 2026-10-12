import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output, booleanAttribute } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxIcon } from '../ui-icon';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

/** One label/value pair rendered in an item's expandable detail row. */
export interface NxActivityFeedMetadataEntry {
  label: string;
  value: string;
}

/** A single action button rendered on an item (e.g. "View", "Undo", "Dismiss"). */
export interface NxActivityFeedAction {
  id: string;
  label: string;
  icon?: string;
}

export interface NxActivityFeedItem {
  id: string | number;
  actorName: string;
  actorAvatarUrl?: string;
  action: string;
  target?: string;
  /** An ISO timestamp - used to group entries by day when groupByDay is true. */
  timestamp: string;
  /** Optional free-form category/type (e.g. "comment", "billing", "security") - used by the actor/type filters. */
  category?: string;
  /** Optional structured detail, rendered in a row the user can expand. */
  metadata?: NxActivityFeedMetadataEntry[];
  /** Actions for this item specifically; falls back to the component-wide `itemActions` input when omitted. */
  actions?: NxActivityFeedAction[];
}

interface NxActivityFeedGroup {
  label: string;
  items: NxActivityFeedItem[];
}

const ALL = 'all';

/**
 * A flat, day-grouped activity list with a "Load more" affordance - the
 * feed-shaped sibling of `nx-activity-timeline` (which draws a connected
 * vertical line instead of grouping by day).
 *
 * PRO: adds per-item metadata (expandable detail rows), actor/type filters,
 * configurable per-item actions, and a chained connector line between
 * consecutive entries within a day - on top of the original free layout.
 */
@Component({
  selector: 'nx-activity-feed',
  standalone: true,
  imports: [DatePipe, FormsModule, NxIcon, NxProLocked],
  templateUrl: './ui-activity-feed.html',
  styleUrl: './ui-activity-feed.scss',
})
export class NxActivityFeed {
  protected readonly licensed = nxProLicenseGranted();

  @Input() items: NxActivityFeedItem[] = [];
  @Input({ transform: booleanAttribute }) groupByDay = true;
  @Input({ transform: booleanAttribute }) showLoadMore = false;
  /** Shows the actor/type filter bar above the list (only when there's more than one actor or any categories to filter by). */
  @Input({ transform: booleanAttribute }) showFilters = false;
  /** Fallback actions applied to every item that doesn't define its own `actions`. */
  @Input() itemActions: NxActivityFeedAction[] = [];

  @Output() loadMore = new EventEmitter<void>();
  /** Emits whenever a per-item action button is clicked. */
  @Output() actionInvoked = new EventEmitter<{ item: NxActivityFeedItem; action: NxActivityFeedAction }>();

  actorFilter = ALL;
  categoryFilter = ALL;

  private readonly expandedIds = new Set<string | number>();

  get actors(): string[] {
    return this.unique(this.items.map((item) => item.actorName));
  }

  get categories(): string[] {
    return this.unique(
      this.items
        .map((item) => item.category)
        .filter((category): category is string => !!category),
    );
  }

  get hasCategories(): boolean {
    return this.categories.length > 0;
  }

  get hasActiveFilters(): boolean {
    return this.actorFilter !== ALL || this.categoryFilter !== ALL;
  }

  get filteredItems(): NxActivityFeedItem[] {
    return this.items.filter((item) => {
      if (this.actorFilter !== ALL && item.actorName !== this.actorFilter) return false;
      if (this.categoryFilter !== ALL && item.category !== this.categoryFilter) return false;
      return true;
    });
  }

  get groups(): NxActivityFeedGroup[] {
    const source = this.filteredItems;

    if (!this.groupByDay) {
      return source.length ? [{ label: '', items: source }] : [];
    }

    const order: string[] = [];
    const byLabel = new Map<string, NxActivityFeedItem[]>();

    for (const item of source) {
      const label = this.dayLabel(item.timestamp);
      if (!byLabel.has(label)) {
        byLabel.set(label, []);
        order.push(label);
      }
      byLabel.get(label)!.push(item);
    }

    return order.map((label) => ({ label, items: byLabel.get(label)! }));
  }

  initialFor(name: string): string {
    return name.trim().charAt(0).toUpperCase() || '?';
  }

  /** A consistent hue (0-359) per actor name, used to tint the fallback initial-letter avatar. */
  avatarHueFor(name: string): number {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
    }
    return hash % 360;
  }

  actionsFor(item: NxActivityFeedItem): NxActivityFeedAction[] {
    return item.actions ?? this.itemActions;
  }

  isExpanded(item: NxActivityFeedItem): boolean {
    return this.expandedIds.has(item.id);
  }

  toggleExpand(item: NxActivityFeedItem): void {
    if (this.expandedIds.has(item.id)) {
      this.expandedIds.delete(item.id);
    } else {
      this.expandedIds.add(item.id);
    }
  }

  invokeAction(item: NxActivityFeedItem, action: NxActivityFeedAction): void {
    this.actionInvoked.emit({ item, action });
  }

  resetFilters(): void {
    this.actorFilter = ALL;
    this.categoryFilter = ALL;
  }

  private dayLabel(timestamp: string): string {
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) {
      return 'Earlier';
    }

    const today = new Date();
    const isSameDay = (a: Date, b: Date) => a.toDateString() === b.toDateString();

    if (isSameDay(date, today)) {
      return 'Today';
    }

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    if (isSameDay(date, yesterday)) {
      return 'Yesterday';
    }

    return date.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' });
  }

  private unique(values: string[]): string[] {
    return [...new Set(values)].sort((a, b) => a.localeCompare(b));
  }
}
