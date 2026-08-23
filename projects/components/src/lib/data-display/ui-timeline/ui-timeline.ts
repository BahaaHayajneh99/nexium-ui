import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

export interface NxTimelineItem {
  title: string;
  time?: string;
  description?: string;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
}

@Component({
  selector: 'nx-timeline',
  standalone: true,
  imports: [NgClass],
  templateUrl: './ui-timeline.html',
  styleUrl: './ui-timeline.scss',
})
export class NxTimeline {
  @Input() items: NxTimelineItem[] = [];
}
