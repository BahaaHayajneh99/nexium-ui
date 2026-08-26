import { Component, ElementRef, EventEmitter, Input, Output, booleanAttribute, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const HEX_PATTERN = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;

const DEFAULT_PRESETS = [
  '#3498db', '#6c757d', '#28a745', '#e74c3c', '#f39c12', '#17a2b8',
  '#4a3aa7', '#e87ba4', '#212529', '#495057', '#adb5bd', '#ffffff',
];

@Component({
  selector: 'nx-color-picker',
  standalone: true,
  imports: [],
  templateUrl: './ui-color-picker.html',
  styleUrl: './ui-color-picker.scss',
  host: {
    '(document:click)': 'onDocumentClick($event)',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NxColorPicker),
      multi: true,
    },
  ],
})
export class NxColorPicker implements ControlValueAccessor {
  @Input() label = '';
  @Input() value = '#3498db';
  @Input() presets: string[] = DEFAULT_PRESETS;
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute }) invalid = false;

  @Output() valueChange = new EventEmitter<string>();

  open = false;
  hexDraft = this.value;

  private onChangeFn: (value: string) => void = () => {};
  private onTouchedFn: () => void = () => {};

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  get isValidHex(): boolean {
    return HEX_PATTERN.test(this.value);
  }

  toggle(): void {
    if (this.disabled) {
      return;
    }

    this.open = !this.open;
    if (this.open) {
      this.hexDraft = this.value;
    }
  }

  close(): void {
    this.open = false;
  }

  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.open = false;
    }
  }

  selectPreset(hex: string): void {
    this.emitValue(hex);
    this.open = false;
  }

  onNativeInput(event: Event): void {
    this.emitValue((event.target as HTMLInputElement).value);
  }

  onHexDraftChange(event: Event): void {
    this.hexDraft = (event.target as HTMLInputElement).value;
  }

  commitHexDraft(): void {
    const candidate = this.hexDraft.trim();
    if (HEX_PATTERN.test(candidate)) {
      this.emitValue(candidate.startsWith('#') ? candidate : `#${candidate}`);
    } else {
      this.hexDraft = this.value;
    }
  }

  onBlur(): void {
    this.onTouchedFn();
  }

  writeValue(value: string): void {
    this.value = value ?? '#3498db';
    this.hexDraft = this.value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  private emitValue(hex: string): void {
    this.value = hex;
    this.hexDraft = hex;
    this.valueChange.emit(hex);
    this.onChangeFn(hex);
  }
}
