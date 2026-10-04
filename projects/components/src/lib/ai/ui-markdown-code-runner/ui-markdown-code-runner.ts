import { Component, Input } from '@angular/core';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export interface NxCodeRunnerBlock {
  language: string;
  code: string;
}

interface NxCodeRunState {
  output: string[];
  error: string | null;
  ran: boolean;
}

const RUNNABLE_LANGUAGES = new Set(['javascript', 'js']);

function stringifyLogArg(arg: unknown): string {
  if (typeof arg === 'string') {
    return arg;
  }
  try {
    return JSON.stringify(arg);
  } catch {
    return String(arg);
  }
}

/**
 * Renders one or more fenced code blocks with monospace styling (plain text only - real syntax
 * highlighting is out of scope) and, for blocks whose `language` is `'javascript'` or `'js'`, a
 * "Run" button.
 *
 * SECURITY NOTE - read this before wiring up untrusted content: clicking "Run" executes that
 * block's code with `new Function(...)` directly in the current page's own JS context - the
 * same trust model as typing into the browser's devtools console. It has full access to
 * `window`, the DOM, cookies, and anything else the page can reach; there is no sandboxing or
 * worker isolation. This mirrors the precedent already set by `NxSpreadsheet`'s formula
 * evaluator (see `evalFormula` in `ui-spreadsheet.ts`), which uses `new Function` the same way
 * for the same reason. Only use this component for trusted, consumer-authored demo/tutorial
 * snippets that ship as part of your own app - never to run arbitrary third-party or
 * end-user-submitted code in production, where it would amount to straightforward script
 * injection.
 */
@Component({
  selector: 'nx-markdown-code-runner',
  standalone: true,
  imports: [NxProLocked],
  templateUrl: './ui-markdown-code-runner.html',
  styleUrl: './ui-markdown-code-runner.scss',
})
export class NxMarkdownCodeRunner {
  protected readonly licensed = nxProLicenseGranted();

  @Input() blocks: NxCodeRunnerBlock[] = [];

  private readonly stateByIndex = new Map<number, NxCodeRunState>();

  protected isRunnable(language: string): boolean {
    return RUNNABLE_LANGUAGES.has(language.trim().toLowerCase());
  }

  protected stateFor(index: number): NxCodeRunState {
    let state = this.stateByIndex.get(index);
    if (!state) {
      state = { output: [], error: null, ran: false };
      this.stateByIndex.set(index, state);
    }
    return state;
  }

  protected run(index: number, code: string): void {
    const state = this.stateFor(index);
    const output: string[] = [];
    const originalConsoleLog = console.log;

    console.log = (...args: unknown[]) => {
      output.push(args.map(stringifyLogArg).join(' '));
    };

    try {
      // See the class-level SECURITY NOTE above - this runs in the page's own JS context.
      // eslint-disable-next-line no-new-func
      new Function(`"use strict"; ${code}`)();
      state.output = output;
      state.error = null;
    } catch (err) {
      state.output = output;
      state.error = err instanceof Error ? err.message : String(err);
    } finally {
      console.log = originalConsoleLog;
      state.ran = true;
    }
  }
}
