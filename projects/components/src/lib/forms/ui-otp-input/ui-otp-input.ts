import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChildren,
  booleanAttribute,
  numberAttribute,
} from '@angular/core';

export type NxOtpInputType = 'number' | 'text';

@Component({
  selector: 'nx-otp-input',
  standalone: true,
  imports: [],
  templateUrl: './ui-otp-input.html',
  styleUrl: './ui-otp-input.scss',
})
export class UiOtpInput {
  @Input({ transform: numberAttribute }) length = 6;
  @Input() value = '';
  @Input() type: NxOtpInputType = 'number';
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute }) invalid = false;

  @Output() valueChange = new EventEmitter<string>();
  @Output() completed = new EventEmitter<string>();

  @ViewChildren('cell') private cells!: QueryList<ElementRef<HTMLInputElement>>;

  get indexes(): number[] {
    return Array.from({ length: this.length }, (_, i) => i);
  }

  digitAt(index: number): string {
    return this.value[index] ?? '';
  }

  onInput(index: number, event: Event): void {
    const input = event.target as HTMLInputElement;
    const char = input.value.slice(-1);

    if (char && this.type === 'number' && !/[0-9]/.test(char)) {
      input.value = this.digitAt(index);
      return;
    }

    const chars = this.value.padEnd(this.length, ' ').split('');
    chars[index] = char;
    this.setValue(chars.join('').trimEnd());

    if (char && index < this.length - 1) {
      this.focusCell(index + 1);
    }
  }

  onKeydown(index: number, event: KeyboardEvent): void {
    if (event.key === 'Backspace' && !this.digitAt(index) && index > 0) {
      this.focusCell(index - 1);
    } else if (event.key === 'ArrowLeft' && index > 0) {
      this.focusCell(index - 1);
    } else if (event.key === 'ArrowRight' && index < this.length - 1) {
      this.focusCell(index + 1);
    }
  }

  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pasted = event.clipboardData?.getData('text') ?? '';
    const filtered = this.type === 'number' ? pasted.replace(/\D/g, '') : pasted;
    this.setValue(filtered.slice(0, this.length));
    this.focusCell(Math.min(this.value.length, this.length - 1));
  }

  private setValue(value: string): void {
    this.value = value;
    this.valueChange.emit(value);
    if (value.length === this.length) {
      this.completed.emit(value);
    }
  }

  private focusCell(index: number): void {
    queueMicrotask(() => this.cells.get(index)?.nativeElement.focus());
  }
}
