import { Component, OnDestroy, inject } from '@angular/core';
import { NxAiCommandBar, NxAiCommandBarCommand, NxButton } from 'components';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

/** A canned paragraph "streamed" character-by-character to simulate a live AI reply - this demo never calls a real network/LLM API. */
const CANNED_RESPONSE =
  "Here's what I found: 14 users haven't logged in for 30+ days, mostly on the Starter plan. " +
  'Three of them opened a support ticket in the last week, which usually signals a stalled onboarding rather than churn. ' +
  "I'd suggest a short re-engagement email to that group before flagging them as inactive.";

@Component({
  selector: 'app-ui-ai-command-bar-demo',
  imports: [NxAiCommandBar, NxButton, DemoSection],
  templateUrl: './ui-ai-command-bar-demo.html',
  styleUrl: './ui-ai-command-bar-demo.scss',
})
export class UiAiCommandBarDemo implements OnDestroy {
  importCode = `import { NxAiCommandBar, NxAiCommandBarCommand } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  open = false;
  isLoading = false;
  streamingText = '';
  lastSubmitted = '';
  lastCommand = '';

  suggestions: string[] = [
    "Show me users who haven't logged in this month",
    "Summarize this week's support tickets",
    'Draft a release note for v3.2',
    'Compare Q1 vs Q2 revenue by region',
  ];

  history: string[] = ['What changed in the last deploy?', 'List failed payments today'];

  commands: NxAiCommandBarCommand[] = [
    { label: 'Export current report', icon: 'nx-download', action: 'export-report' },
    { label: 'Create support ticket', icon: 'nx-plus', action: 'create-ticket' },
    { label: 'Invite teammate', icon: 'nx-user-plus', action: 'invite-teammate' },
  ];

  private thinkingTimeout?: ReturnType<typeof setTimeout>;
  private streamInterval?: ReturnType<typeof setInterval>;

  ngOnDestroy(): void {
    this.clearTimers();
  }

  /** Simulates a real host: kick off "work" when the user asks something, then stream a
   *  canned reply back in via `streamingText` a couple of characters at a time. */
  onSubmit(query: string): void {
    this.clearTimers();
    this.lastSubmitted = query;
    this.isLoading = true;
    this.streamingText = '';

    // Brief delay before the first chunk so the "thinking" dots actually get to show.
    this.thinkingTimeout = setTimeout(() => {
      let revealed = 0;
      this.streamInterval = setInterval(() => {
        revealed = Math.min(revealed + 3, CANNED_RESPONSE.length);
        this.streamingText = CANNED_RESPONSE.slice(0, revealed);
        if (revealed >= CANNED_RESPONSE.length) {
          this.clearTimers();
          this.isLoading = false;
        }
      }, 16);
    }, 700);
  }

  onCancel(): void {
    this.clearTimers();
    this.isLoading = false;
  }

  onCommandSelected(action: string): void {
    this.lastCommand = action;
  }

  private clearTimers(): void {
    if (this.thinkingTimeout !== undefined) {
      clearTimeout(this.thinkingTimeout);
      this.thinkingTimeout = undefined;
    }
    if (this.streamInterval !== undefined) {
      clearInterval(this.streamInterval);
      this.streamInterval = undefined;
    }
  }

  basicCode = `<nx-button (click)="open = true">Ask Nexium (or press Ctrl K)</nx-button>

<nx-ai-command-bar
    [(open)]="open"
    [suggestions]="suggestions"
    [history]="history"
    [commands]="commands"
    [isLoading]="isLoading"
    [streamingText]="streamingText"
    (submit)="onSubmit($event)"
    (cancel)="onCancel()"
    (commandSelected)="onCommandSelected($event)">
</nx-ai-command-bar>`;

  basicTs = `suggestions = [
  "Show me users who haven't logged in this month",
  "Summarize this week's support tickets",
];
history = ['What changed in the last deploy?'];
commands = [{ label: 'Export current report', icon: 'nx-download', action: 'export-report' }];

isLoading = false;
streamingText = '';

onSubmit(query: string): void {
  // Kick off your own request here, then stream the reply back in:
  this.isLoading = true;
  this.streamingText = '';
  // ...as chunks arrive: this.streamingText += chunk;
  // once done: this.isLoading = false;
}

onCancel(): void {
  // Abort your in-flight request here.
  this.isLoading = false;
}

onCommandSelected(action: string): void {
  // 'export-report', 'create-ticket', ...
}`;
}
