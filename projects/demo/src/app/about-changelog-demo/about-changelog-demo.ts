import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';

interface ChangelogEntry {
  version: string;
  date: string;
  changes: string[];
}

@Component({
  selector: 'app-about-changelog-demo',
  templateUrl: './about-changelog-demo.html',
})
export class AboutChangelogDemo {
  public commonService = inject(CommonService);
  entries: ChangelogEntry[] = [
    {
      version: '0.1.0',
      date: 'Unreleased',
      changes: [
        'Initial set of data-display, forms, feedback, navigation, panels, media and upload components.',
        'Shared design-token system in variables.scss for colors, spacing, radius, typography and motion.',
        'Demo application showcasing every component with copyable HTML/TS snippets.',
      ],
    },
  ];
}
