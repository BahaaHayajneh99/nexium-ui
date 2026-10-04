import { Component, EventEmitter, Input, Output, booleanAttribute, signal } from '@angular/core';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export interface NxTransformValue {
  translateX: number;
  translateY: number;
  rotate: number;
  scale: number;
  skewX: number;
  skewY: number;
}

/** A translate/rotate/scale/skew builder with a live-transformed preview box and CSS output. */
@Component({
  selector: 'nx-transform-editor',
  standalone: true,
  imports: [NxProLocked],
  templateUrl: './ui-transform-editor.html',
  styleUrl: './ui-transform-editor.scss',
})
export class NxTransformEditor {
  protected readonly licensed = nxProLicenseGranted();

  @Input() value: NxTransformValue = {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    scale: 1,
    skewX: 0,
    skewY: 0,
  };

  @Input({ transform: booleanAttribute }) showCopyButton = true;

  @Output() valueChange = new EventEmitter<NxTransformValue>();

  copied = signal(false);

  get cssValue(): string {
    const v = this.value;
    return `translate(${v.translateX}px, ${v.translateY}px) rotate(${v.rotate}deg) scale(${v.scale}) skew(${v.skewX}deg, ${v.skewY}deg)`;
  }

  get cssDeclaration(): string {
    return `transform: ${this.cssValue};`;
  }

  update(patch: Partial<NxTransformValue>): void {
    this.value = { ...this.value, ...patch };
    this.valueChange.emit(this.value);
  }

  copyCss(): void {
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
    navigator.clipboard?.writeText(this.cssDeclaration).catch(() => {});
  }
}
