import { Component } from '@angular/core';
import { UiColorPicker } from 'components';

function hexToRgb(hex: string): [number, number, number] | null {
  const match = /^#?([0-9a-f]{6}|[0-9a-f]{3})$/i.exec(hex.trim());
  if (!match) {
    return null;
  }

  let value = match[1];
  if (value.length === 3) {
    value = value.split('').map((c) => c + c).join('');
  }

  const num = parseInt(value, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function relativeLuminance([r, g, b]: [number, number, number]): number {
  const channel = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

@Component({
  selector: 'app-accessibility-color-contrast-demo',
  imports: [UiColorPicker],
  templateUrl: './accessibility-color-contrast-demo.html',
})
export class AccessibilityColorContrastDemo {
  foreground = '#212529';
  background = '#ffffff';

  get ratio(): number | null {
    const fg = hexToRgb(this.foreground);
    const bg = hexToRgb(this.background);
    if (!fg || !bg) {
      return null;
    }

    const l1 = relativeLuminance(fg);
    const l2 = relativeLuminance(bg);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  }

  get ratioLabel(): string {
    return this.ratio ? `${this.ratio.toFixed(2)} : 1` : '—';
  }

  passes(threshold: number): boolean {
    return this.ratio !== null && this.ratio >= threshold;
  }
}
