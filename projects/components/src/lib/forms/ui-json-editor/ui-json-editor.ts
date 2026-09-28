import { Component, EventEmitter, Input, Output, booleanAttribute, forwardRef, numberAttribute, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

/** A raw-text JSON editor with live parse validation and a pretty-print "Format" action. */
@Component({
  selector: 'nx-json-editor',
  standalone: true,
  imports: [NxProLocked],
  templateUrl: './ui-json-editor.html',
  styleUrl: './ui-json-editor.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NxJsonEditor),
      multi: true,
    },
  ],
})
export class NxJsonEditor implements ControlValueAccessor {
  protected readonly licensed = nxProLicenseGranted();

  @Input() placeholder = '{\n  "key": "value"\n}';
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: numberAttribute }) indent = 2;

  /** Emits the parsed value only when the current text is valid JSON. */
  @Output() valueChange = new EventEmitter<unknown>();

  text = signal('');
  error = signal<string | null>(null);

  private onChangeFn: (value: unknown) => void = () => {};
  private onTouchedFn: () => void = () => {};

  onInput(value: string): void {
    this.text.set(value);
    this.onTouchedFn();
    this.parseAndEmit(value);
  }

  format(): void {
    try {
      const parsed = JSON.parse(this.text());
      const formatted = JSON.stringify(parsed, null, this.indent);
      this.text.set(formatted);
      this.error.set(null);
    } catch {
      // Nothing valid to format; leave the text and error message as-is.
    }
  }

  writeValue(value: unknown): void {
    if (value === null || value === undefined) {
      this.text.set('');
      this.error.set(null);
      return;
    }
    this.text.set(typeof value === 'string' ? value : JSON.stringify(value, null, this.indent));
    this.error.set(null);
  }

  registerOnChange(fn: (value: unknown) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  private parseAndEmit(value: string): void {
    if (value.trim() === '') {
      this.error.set(null);
      this.onChangeFn(null);
      return;
    }
    try {
      const parsed = JSON.parse(value);
      this.error.set(null);
      this.valueChange.emit(parsed);
      this.onChangeFn(parsed);
    } catch (err) {
      this.error.set(err instanceof Error ? err.message : 'Invalid JSON');
    }
  }
}
