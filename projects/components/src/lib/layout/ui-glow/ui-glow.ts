import { Component, Input, booleanAttribute } from '@angular/core';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export type NxGlowIntensityPreset = 'low' | 'medium' | 'high';
export type NxGlowIntensity = NxGlowIntensityPreset | number;
export type NxGlowPosition = 'behind' | 'edge';

interface NxGlowResolvedIntensity {
  blur: number;
  spread: number;
  opacity: number;
}

const INTENSITY_PRESETS: Record<NxGlowIntensityPreset, NxGlowResolvedIntensity> = {
  low: { blur: 24, spread: 4, opacity: 0.35 },
  medium: { blur: 48, spread: 8, opacity: 0.55 },
  high: { blur: 80, spread: 16, opacity: 0.75 },
};

/**
 * A decorative wrapper that adds a configurable soft glow/aura around its projected
 * content - a hero card, a CTA button, anything that should feel like it's lit from
 * within. `position: 'behind'` blurs a colored shape sitting behind the content;
 * `position: 'edge'` hugs the content's actual edges with a `box-shadow` glow instead.
 */
@Component({
  selector: 'nx-glow',
  standalone: true,
  imports: [NxProLocked],
  templateUrl: './ui-glow.html',
  styleUrl: './ui-glow.scss',
})
export class NxGlow {
  protected readonly licensed = nxProLicenseGranted();

  @Input() color = '#7c3aed';
  @Input() intensity: NxGlowIntensity = 'medium';
  @Input({ transform: booleanAttribute }) pulse = false;
  @Input() position: NxGlowPosition = 'behind';

  get isEdge(): boolean {
    return this.position === 'edge';
  }

  get resolvedIntensity(): NxGlowResolvedIntensity {
    if (typeof this.intensity === 'number') {
      const clamped = Math.min(Math.max(this.intensity, 0), 1);
      return {
        blur: 16 + clamped * 80,
        spread: 2 + clamped * 20,
        opacity: 0.2 + clamped * 0.65,
      };
    }
    return INTENSITY_PRESETS[this.intensity] ?? INTENSITY_PRESETS.medium;
  }

  get blurValue(): string {
    return `${this.resolvedIntensity.blur}px`;
  }

  get spreadValue(): string {
    return `${this.resolvedIntensity.spread}px`;
  }

  get opacityValue(): string {
    return `${this.resolvedIntensity.opacity}`;
  }

  /** A translucent version of `color`, used as the `box-shadow` color in `edge` mode. */
  get shadowColorValue(): string {
    const pct = Math.round(this.resolvedIntensity.opacity * 100);
    return `color-mix(in srgb, ${this.color} ${pct}%, transparent)`;
  }
}
