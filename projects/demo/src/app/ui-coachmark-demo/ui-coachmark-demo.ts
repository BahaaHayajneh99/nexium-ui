import { Component, inject, signal } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxCoachmark } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-coachmark-demo',
  imports: [NxCoachmark, DemoSection],
  templateUrl: './ui-coachmark-demo.html',
  styleUrl: './ui-coachmark-demo.scss',
})
export class UiCoachmarkDemo {
  importCode = `import { NxCoachmark } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  /** Two-way bound - in a real app this would be persisted to localStorage so it stays dismissed. */
  exportHintDismissed = signal(false);

  resetExportHint(): void {
    this.exportHintDismissed.set(false);
  }

  basicCode = `<nx-coachmark
    title="New: Export"
    description="You can now export this report as a PDF or CSV straight from the toolbar."
    [dismissed]="exportHintDismissed()"
    (dismissedChange)="exportHintDismissed.set($event)">
    <button class="demo-btn">Export</button>
</nx-coachmark>`;

  basicTs = `exportHintDismissed = signal(false); // persist this to localStorage to keep it dismissed

// With a plain (non-signal) boolean property, [(dismissed)]="exportHintDismissed"
// two-way binding shorthand works too.`;

  placementCode = `<nx-coachmark title="Filters moved" description="Filters now live up here, above the table." placement="top">
    <button class="demo-btn">Filter</button>
</nx-coachmark>

<nx-coachmark title="Row actions" description="Click a row's coachmark for quick actions." placement="right">
    <button class="demo-btn">Row actions</button>
</nx-coachmark>

<nx-coachmark title="Workspace switcher" description="Jump between workspaces from here." placement="left">
    <button class="demo-btn">Workspace</button>
</nx-coachmark>`;

  noPulseCode = `<nx-coachmark
    title="Settings moved"
    description="Click the dot any time to see this hint again - it never auto-dismisses."
    [showPulse]="false">
    <button class="demo-btn">Settings</button>
</nx-coachmark>`;
}
