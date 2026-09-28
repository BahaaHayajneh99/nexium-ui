import { Component, ElementRef, Input, ViewChild, booleanAttribute, forwardRef, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

/** An editable code textarea with a scroll-synced line-number gutter - the editable counterpart to `NxCodeBlock`. */
@Component({
  selector: 'nx-code-editor',
  standalone: true,
  imports: [NxProLocked],
  templateUrl: './ui-code-editor.html',
  styleUrl: './ui-code-editor.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NxCodeEditor),
      multi: true,
    },
  ],
})
export class NxCodeEditor implements ControlValueAccessor {
  protected readonly licensed = nxProLicenseGranted();

  @Input() language = '';
  @Input({ transform: booleanAttribute }) showLineNumbers = true;
  @Input({ transform: booleanAttribute }) disabled = false;

  @ViewChild('gutter') private gutterRef?: ElementRef<HTMLElement>;

  code = signal('');

  private onChangeFn: (value: string) => void = () => {};
  private onTouchedFn: () => void = () => {};

  get lines(): string[] {
    return this.code().split('\n');
  }

  onInput(value: string): void {
    this.code.set(value);
    this.onChangeFn(value);
    this.onTouchedFn();
  }

  onScroll(event: Event): void {
    if (this.gutterRef) {
      this.gutterRef.nativeElement.scrollTop = (event.target as HTMLElement).scrollTop;
    }
  }

  writeValue(value: string): void {
    this.code.set(value ?? '');
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
}
