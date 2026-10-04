import { Component } from '@angular/core';
import { NxChangelogWidget, NxChangelogEntry } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-changelog-widget-demo',
  imports: [NxChangelogWidget, DemoSection],
  templateUrl: './ui-changelog-widget-demo.html',
  styleUrl: './ui-changelog-widget-demo.scss',
})
export class UiChangelogWidgetDemo {
  importCode = `import { NxChangelogWidget } from 'nexium-ui';`;

  entries: NxChangelogEntry[] = [
    {
      version: 'v4.3.0',
      date: 'Sep 18, 2026',
      changes: [
        { type: 'feature', description: 'Added the nx-audit-timeline component' },
        { type: 'improvement', description: 'Faster initial render for nx-data-table' },
        { type: 'fix', description: 'Fixed a focus trap in nx-modal on Escape' },
      ],
    },
    {
      version: 'v4.2.0',
      date: 'Aug 30, 2026',
      changes: [
        { type: 'feature', description: 'Added the nx-filter-chip-group component' },
        { type: 'fix', description: 'Corrected date parsing in nx-datepicker' },
      ],
    },
    {
      version: 'v4.1.0',
      date: 'Aug 2, 2026',
      changes: [{ type: 'improvement', description: 'Reduced bundle size by 8kb' }],
    },
    {
      version: 'v4.0.0',
      date: 'Jul 10, 2026',
      changes: [{ type: 'feature', description: 'Initial public release' }],
    },
  ];

  basicCode = `<nx-changelog-widget [entries]="entries"></nx-changelog-widget>`;
  basicTs = `entries: NxChangelogEntry[] = [
  {
    version: 'v4.3.0',
    date: 'Sep 18, 2026',
    changes: [
      { type: 'feature', description: 'Added the nx-audit-timeline component' },
      { type: 'improvement', description: 'Faster initial render for nx-data-table' },
      { type: 'fix', description: 'Fixed a focus trap in nx-modal on Escape' },
    ],
  },
  // ...more entries
];`;

  limitedCode = `<nx-changelog-widget [entries]="entries" [maxVersions]="1"></nx-changelog-widget>`;
  limitedTs = `// maxVersions caps how many version groups render (default 3) - handy inside
// a small popover behind a version badge, rather than a full changelog page.`;

  emptyCode = `<nx-changelog-widget [entries]="[]"></nx-changelog-widget>`;
  emptyTs = `// With no entries, the widget shows a plain "No changes yet." message
// instead of rendering an empty shell.`;
}
