import { Component, EventEmitter, Input, Output, booleanAttribute, signal } from '@angular/core';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export type NxTerminalLineType = 'input' | 'output' | 'error';

export interface NxTerminalLine {
  type: NxTerminalLineType;
  text: string;
}

/** A terminal-style output view - prompt-prefixed input lines, plain output, red errors, plus an optional live input row. */
@Component({
  selector: 'nx-terminal',
  standalone: true,
  imports: [NxProLocked],
  templateUrl: './ui-terminal.html',
  styleUrl: './ui-terminal.scss',
})
export class NxTerminal {
  protected readonly licensed = nxProLicenseGranted();

  @Input() lines: NxTerminalLine[] = [];
  @Input() prompt = '$';
  @Input({ transform: booleanAttribute }) interactive = false;

  @Output() command = new EventEmitter<string>();

  draft = signal('');

  onEnter(): void {
    const text = this.draft().trim();
    if (!text) {
      return;
    }
    this.command.emit(text);
    this.draft.set('');
  }
}
