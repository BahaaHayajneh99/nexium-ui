import { Directive, EventEmitter, HostListener, Input, OnChanges, Output } from '@angular/core';

interface ParsedHotkey {
  ctrl: boolean;
  shift: boolean;
  alt: boolean;
  key: string;
}

const MODIFIER_TOKENS = new Set(['ctrl', 'cmd', 'meta', 'shift', 'alt']);

/**
 * Fires nxHotkeyTriggered when a combo like 'ctrl+k', 'ctrl+shift+p',
 * 'escape' or '/' is pressed anywhere in the document. `ctrl` and `cmd`/`meta`
 * are treated as interchangeable so the same spec works cross-platform.
 */
@Directive({
  selector: '[nxHotkey]',
  standalone: true,
})
export class NxHotkey implements OnChanges {
  @Input() nxHotkey = '';
  @Output() nxHotkeyTriggered = new EventEmitter<void>();

  private parsed: ParsedHotkey | null = null;

  ngOnChanges(): void {
    this.parsed = this.parse(this.nxHotkey);
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (!this.parsed || this.parsed.key === '' || !this.matches(event, this.parsed)) {
      return;
    }

    event.preventDefault();
    this.nxHotkeyTriggered.emit();
  }

  private parse(spec: string): ParsedHotkey | null {
    const tokens = spec
      .toLowerCase()
      .split('+')
      .map((token) => token.trim())
      .filter(Boolean);

    if (tokens.length === 0) {
      return null;
    }

    const key = tokens.find((token) => !MODIFIER_TOKENS.has(token)) ?? '';

    return {
      ctrl: tokens.includes('ctrl') || tokens.includes('cmd') || tokens.includes('meta'),
      shift: tokens.includes('shift'),
      alt: tokens.includes('alt'),
      key,
    };
  }

  private matches(event: KeyboardEvent, hotkey: ParsedHotkey): boolean {
    const ctrlPressed = event.ctrlKey || event.metaKey;

    return (
      ctrlPressed === hotkey.ctrl &&
      event.shiftKey === hotkey.shift &&
      event.altKey === hotkey.alt &&
      event.key.toLowerCase() === hotkey.key
    );
  }
}
