import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output, booleanAttribute } from '@angular/core';

export interface NxActivityFeedItem {
  id: string | number;
  actorName: string;
  actorAvatarUrl?: string;
  action: string;
  target?: string;
  /** An ISO timestamp - used to group entries by day when groupByDay is true. */
  timestamp: string;
}

interface NxActivityFeedGroup {
  label: string;
  items: NxActivityFeedItem[];
}

/**
 * A flat, day-grouped activity list with a "Load more" affordance - the
 * feed-shaped sibling of `nx-activity-timeline` (which draws a connected
 * vertical line instead of grouping by day).
 */
@Component({
  selector: 'nx-activity-feed',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './ui-activity-feed.html',
  styleUrl: './ui-activity-feed.scss',
})
export class NxActivityFeed {
  @Input() items: NxActivityFeedItem[] = [];
  @Input({ transform: booleanAttribute }) groupByDay = true;
  @Input({ transform: booleanAttribute }) showLoadMore = false;

  @Output() loadMore = new EventEmitter<void>();

  get groups(): NxActivityFeedGroup[] {
    if (!this.groupByDay) {
      return this.items.length ? [{ label: '', items: this.items }] : [];
    }

    const order: string[] = [];
    const byLabel = new Map<string, NxActivityFeedItem[]>();

    for (const item of this.items) {
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
}
