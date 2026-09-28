import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const normalized = hex.replace('#', '');
  const full =
    normalized.length === 3
      ? normalized.split('').map((c) => c + c).join('')
      : normalized.padEnd(6, '0');
  const num = parseInt(full, 16) || 0;
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

function relativeLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  const [rs, gs, bs] = [r, g, b].map((channel) => {
    const s = channel / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(hexA: string, hexB: string): number {
  const l1 = relativeLuminance(hexA);
  const l2 = relativeLuminance(hexB);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Computes the WCAG contrast ratio between two colors and shows AA/AAA
 * pass/fail for both normal and large text, with a live text preview -
 * useful both as a docs tool and embedded directly in a design-review UI.
 */
@Component({
  selector: 'nx-color-contrast-checker',
  standalone: true,
  imports: [NxProLocked],
  templateUrl: './ui-color-contrast-checker.html',
  styleUrl: './ui-color-contrast-checker.scss',
})
export class NxColorContrastChecker {
  protected readonly licensed = nxProLicenseGranted();

  @Input() foreground = '#000000';
  @Input() background = '#ffffff';
  @Input() previewText = 'The quick brown fox jumps over the lazy dog';

  @Output() foregroundChange = new EventEmitter<string>();
  @Output() backgroundChange = new EventEmitter<string>();

  get ratio(): number {
    return contrastRatio(this.foreground, this.background);
  }

  get ratioLabel(): string {
    return `${this.ratio.toFixed(2)}:1`;
  }

  get passesAA(): boolean {
    return this.ratio >= 4.5;
  }

  get passesAAA(): boolean {
    return this.ratio >= 7;
  }

  get passesAALarge(): boolean {
    return this.ratio >= 3;
  }

  get passesAAALarge(): boolean {
    return this.ratio >= 4.5;
  }

  onForegroundInput(event: Event): void {
    this.foreground = (event.target as HTMLInputElement).value;
    this.foregroundChange.emit(this.foreground);
  }

  onBackgroundInput(event: Event): void {
    this.background = (event.target as HTMLInputElement).value;
    this.backgroundChange.emit(this.background);
  }
}
