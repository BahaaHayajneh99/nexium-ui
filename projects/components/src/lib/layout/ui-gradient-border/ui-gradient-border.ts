import { Component, Input, booleanAttribute, numberAttribute } from '@angular/core';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

/** A CSS length in px, or any raw CSS length/string (e.g. `'1rem'`). */
export type NxGradientBorderRadius = number | string;

/**
 * A decorative wrapper that renders an animated (or static) gradient border ring around
 * its projected content - handy for highlighting a card, button, or panel. Uses the
 * conic-gradient + `mask-composite` ring technique: a pseudo-element is painted with the
 * full gradient, then masked down to just the `borderWidth`-thick ring, so the content
 * itself never needs a matching background color to "punch a hole" in the middle.
 */
@Component({
  selector: 'nx-gradient-border',
  standalone: true,
  imports: [NxProLocked],
  templateUrl: './ui-gradient-border.html',
  styleUrl: './ui-gradient-border.scss',
})
export class NxGradientBorder {
  protected readonly licensed = nxProLicenseGranted();

  @Input() colors: string[] = ['#7c3aed', '#2563eb', '#06b6d4'];
  @Input({ transform: numberAttribute }) borderWidth = 2;
  @Input() borderRadius: NxGradientBorderRadius = 12;
  @Input({ transform: booleanAttribute }) animated = true;
  /** Full-rotation duration, in seconds, when `animated` is true. */
  @Input({ transform: numberAttribute }) speed = 4;

  get radiusValue(): string {
    return typeof this.borderRadius === 'number' ? `${this.borderRadius}px` : this.borderRadius;
  }

  get contentRadiusValue(): string {
    if (typeof this.borderRadius !== 'number') {
      return this.borderRadius;
    }
    return `${Math.max(this.borderRadius - this.borderWidth, 0)}px`;
  }

  get borderWidthValue(): string {
    return `${this.borderWidth}px`;
  }

  get speedValue(): string {
    return `${this.speed}s`;
  }

  /**
   * Just the comma-separated color-stop list (no `conic-gradient(...)` wrapper). The
   * `conic-gradient(from var(--nx-gradient-border-angle), ...)` call itself lives directly in
   * the stylesheet (see `.nx-gradient-border::before`'s `background`) rather than being baked
   * into this string - nesting `var(--nx-gradient-border-angle)` inside a VALUE that is itself
   * assigned to another custom property via an inline style does not reliably re-resolve on
   * every animation frame (confirmed: the angle read back as frozen at its initial value even
   * while the keyframe animation was demonstrably running). Keeping the angle reference as a
   * literal part of `background`'s own value, used directly where `--nx-gradient-border-angle`
   * is animated (on `::before` itself), avoids that indirection entirely.
   */
  get colorStopsValue(): string {
    const stops = this.colors.length ? this.colors : ['#7c3aed', '#2563eb', '#06b6d4'];
    return [...stops, stops[0]].join(', ');
  }
}
