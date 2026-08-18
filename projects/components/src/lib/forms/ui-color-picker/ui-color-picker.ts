import { Component, ElementRef, EventEmitter, Input, Output, booleanAttribute } from '@angular/core';

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
})
export class UiColorPicker {
  @Input() label = '';
  @Input() value = '#3498db';
  @Input() presets: string[] = DEFAULT_PRESETS;
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute }) invalid = false;

  @Output() valueChange = new EventEmitter<string>();

  open = false;
  hexDraft = this.value;

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

  private emitValue(hex: string): void {
    this.value = hex;
    this.hexDraft = hex;
    this.valueChange.emit(hex);
  }
}
