import { Component, Input } from '@angular/core';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export interface NxVersionTimelineEntry {
  id: string | number;
  version: string;
  date?: string;
  current?: boolean;
}

/** A horizontal version history strip, with a branch callout under whichever entry is marked `current`. */
@Component({
  selector: 'nx-version-timeline',
  standalone: true,
  imports: [NxProLocked],
  templateUrl: './ui-version-timeline.html',
  styleUrl: './ui-version-timeline.scss',
})
export class NxVersionTimeline {
  protected readonly licensed = nxProLicenseGranted();

  @Input() entries: NxVersionTimelineEntry[] = [];
}
