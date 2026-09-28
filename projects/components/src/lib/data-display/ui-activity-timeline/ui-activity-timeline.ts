import { Component, Input } from '@angular/core';

export interface NxActivityItem {
  id: string | number;
  actorName: string;
  actorAvatarUrl?: string;
  /** e.g. "updated", "created", "commented on" */
  action: string;
  /** e.g. "the pricing page" */
  target?: string;
  timestamp: string;
  icon?: string;
}

/**
 * A connected vertical timeline of "who did what" entries, each with an
 * actor avatar (or initial) - the actor-centric sibling of `nx-timeline`
 * (which is a plain step/event list with no actor).
 */
@Component({
  selector: 'nx-activity-timeline',
  standalone: true,
  imports: [],
  templateUrl: './ui-activity-timeline.html',
  styleUrl: './ui-activity-timeline.scss',
})
export class NxActivityTimeline {
  @Input() items: NxActivityItem[] = [];

  initialFor(name: string): string {
    return name.trim().charAt(0).toUpperCase() || '?';
  }
}
