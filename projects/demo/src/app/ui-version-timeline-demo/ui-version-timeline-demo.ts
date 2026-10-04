import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxVersionTimeline, NxVersionTimelineEntry } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-version-timeline-demo',
  imports: [NxVersionTimeline, DemoSection],
  templateUrl: './ui-version-timeline-demo.html',
  styleUrl: './ui-version-timeline-demo.scss',
})
export class UiVersionTimelineDemo {
  importCode = `import { NxVersionTimeline } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  basicCode = `<nx-version-timeline [entries]="entries"></nx-version-timeline>`;

  basicTs = `entries: NxVersionTimelineEntry[] = [
  { id: 1, version: 'v1.0.0', date: 'Jan 2024' },
  { id: 2, version: 'v1.2.0', date: 'Apr 2024' },
  { id: 3, version: 'v1.4.0', date: 'Jul 2024' },
  { id: 4, version: 'v2.0.0', date: 'Feb 2025', current: true },
];`;

  entries: NxVersionTimelineEntry[] = [
    { id: 1, version: 'v1.0.0', date: 'Jan 2024' },
    { id: 2, version: 'v1.2.0', date: 'Apr 2024' },
    { id: 3, version: 'v1.4.0', date: 'Jul 2024' },
    { id: 4, version: 'v2.0.0', date: 'Feb 2025', current: true },
  ];

  noDatesCode = `<nx-version-timeline [entries]="releases"></nx-version-timeline>`;

  noDatesTs = `// date is optional - omit it for a plainer, version-only strip.
releases: NxVersionTimelineEntry[] = [
  { id: 1, version: 'v0.1.0' },
  { id: 2, version: 'v0.2.0' },
  { id: 3, version: 'v0.3.0', current: true },
];`;

  releases: NxVersionTimelineEntry[] = [
    { id: 1, version: 'v0.1.0' },
    { id: 2, version: 'v0.2.0' },
    { id: 3, version: 'v0.3.0', current: true },
  ];

  contextCode = `<div class="release-panel">
    <h4>Release history</h4>
    <nx-version-timeline [entries]="entries"></nx-version-timeline>
</div>`;

  contextTs = `// Whichever entry has current: true gets a "Current" branch callout
// rendered underneath it.`;
}
