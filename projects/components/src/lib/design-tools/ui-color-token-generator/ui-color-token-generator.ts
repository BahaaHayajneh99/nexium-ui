import { Component, EventEmitter, Input, Output, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export interface NxColorToken {
  step: number;
  hex: string;
  isBase: boolean;
}

const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

// A fixed lightness per step, independent of the base color's own lightness - this is what
// gives every generated scale a consistent, predictable light-to-dark spread (the same
// simplified approach Tailwind/Material tonal palettes use), rather than a scale that drifts
// depending on how light or dark the input happens to be.
const STEP_LIGHTNESS: Record<number, number> = {
  50: 97,
  100: 93,
  200: 85,
  300: 74,
  400: 61,
  500: 50,
  600: 42,
  700: 34,
  800: 27,
  900: 20,
  950: 12,
};

function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
    }
    h *= 60;
  }
  return { h, s: s * 100, l: l * 100 };
}

function hslToHex(h: number, s: number, l: number): string {
  const sNorm = s / 100;
  const lNorm = l / 100;
  const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = lNorm - c / 2;
  let [r, g, b] = [0, 0, 0];
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];

  const toHex = (v: number) =>
    Math.round((v + m) * 255)
      .toString(16)
      .padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Generates a full 11-step tonal color scale (50-950) from a single base color, by holding the
 * base's hue and saturation fixed and sweeping lightness. Copy any swatch's hex, or export the
 * whole scale as CSS custom properties.
 */
@Component({
  selector: 'nx-color-token-generator',
  standalone: true,
  imports: [FormsModule, NxProLocked],
  templateUrl: './ui-color-token-generator.html',
  styleUrl: './ui-color-token-generator.scss',
})
export class NxColorTokenGenerator {
  protected readonly licensed = nxProLicenseGranted();

  // Backed by signals (not plain fields) so `tokens`/`exportCss` below - which are `computed()`s
  // reading `this.baseColor`/`this.tokenPrefix` - actually re-run when setBaseColor()/ngModel
  // change them, instead of permanently caching whatever they first saw on initial render.
  private readonly baseColorSignal = signal('#3498db');
  @Input()
  get baseColor(): string {
    return this.baseColorSignal();
  }
  set baseColor(value: string) {
    this.baseColorSignal.set(value);
  }
  @Output() baseColorChange = new EventEmitter<string>();

  private readonly tokenPrefixSignal = signal('brand');
  @Input()
  get tokenPrefix(): string {
    return this.tokenPrefixSignal();
  }
  set tokenPrefix(value: string) {
    this.tokenPrefixSignal.set(value);
  }

  copiedStep = signal<number | null>(null);
  showExport = signal(false);

  readonly tokens = computed<NxColorToken[]>(() => {
    const { h, s, l: baseLightness } = hexToHsl(this.baseColor);
    const closestStep = STEPS.reduce((closest, step) =>
      Math.abs(STEP_LIGHTNESS[step] - baseLightness) < Math.abs(STEP_LIGHTNESS[closest] - baseLightness) ? step : closest,
    );
    return STEPS.map((step) => ({
      step,
      hex: hslToHex(h, s, STEP_LIGHTNESS[step]),
      isBase: step === closestStep,
    }));
  });

  readonly exportCss = computed(() => {
    const lines = this.tokens().map((token) => `  --${this.tokenPrefix}-${token.step}: ${token.hex};`);
    return `:root {\n${lines.join('\n')}\n}`;
  });

  setBaseColor(value: string): void {
    this.baseColor = value;
    this.baseColorChange.emit(value);
  }

  copyHex(token: NxColorToken): void {
    navigator.clipboard?.writeText(token.hex).catch(() => {});
    this.copiedStep.set(token.step);
    setTimeout(() => {
      if (this.copiedStep() === token.step) {
        this.copiedStep.set(null);
      }
    }, 1500);
  }

  copyExport(): void {
    navigator.clipboard?.writeText(this.exportCss()).catch(() => {});
  }

  textColorFor(hex: string): string {
    const { l } = hexToHsl(hex);
    return l > 55 ? '#1a1a1a' : '#ffffff';
  }
}
