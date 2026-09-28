import { Component, EventEmitter, Input, Output, booleanAttribute, signal } from '@angular/core';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export interface NxShadowValue {
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
  inset: boolean;
}

/** A visual box-shadow builder: offset/blur/spread sliders, a color swatch, and a live preview + CSS output. */
@Component({
  selector: 'nx-shadow-editor',
  standalone: true,
  imports: [NxProLocked],
  templateUrl: './ui-shadow-editor.html',
  styleUrl: './ui-shadow-editor.scss',
})
export class NxShadowEditor {
  protected readonly licensed = nxProLicenseGranted();

  @Input() value: NxShadowValue = { x: 0, y: 4, blur: 12, spread: 0, color: 'rgba(0, 0, 0, 0.25)', inset: false };
  @Input({ transform: booleanAttribute }) showCopyButton = true;

  @Output() valueChange = new EventEmitter<NxShadowValue>();

  copied = signal(false);

  get cssValue(): string {
    const { x, y, blur, spread, color, inset } = this.value;
    return `${inset ? 'inset ' : ''}${x}px ${y}px ${blur}px ${spread}px ${color}`;
  }

  get cssDeclaration(): string {
    return `box-shadow: ${this.cssValue};`;
  }

  update(patch: Partial<NxShadowValue>): void {
    this.value = { ...this.value, ...patch };
    this.valueChange.emit(this.value);
  }

  copyCss(): void {
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
    navigator.clipboard?.writeText(this.cssDeclaration).catch(() => {});
  }
}
