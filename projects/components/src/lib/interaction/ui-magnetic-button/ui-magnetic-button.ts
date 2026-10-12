import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  ViewChild,
  booleanAttribute,
} from '@angular/core';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

/**
 * A button wrapper whose content subtly translates toward the cursor as it approaches/hovers -
 * the "magnetic" micro-interaction popular on premium landing pages - then springs back to
 * center on mouseleave via a CSS transition. No external animation library is used; the pull is
 * just an inline `transform: translate(x, y)` recomputed on every `mousemove`.
 *
 * `radius` (if set) pads the host so the activation zone extends beyond the visible button -
 * the button itself still only translates toward the cursor's position relative to its own
 * center. Without `radius`, the effect only reacts while the cursor is directly over the button.
 */
@Component({
  selector: 'nx-magnetic-button',
  standalone: true,
  imports: [NxProLocked],
  templateUrl: './ui-magnetic-button.html',
  styleUrl: './ui-magnetic-button.scss',
})
export class NxMagneticButton {
  protected readonly licensed = nxProLicenseGranted();

  /** How far the content is pulled toward the cursor, 0 (no movement) to 1 (full pull). */
  @Input() strength = 0.3;
  /** Activation zone radius in px, added as padding around the button. Omit to only react while hovered. */
  @Input() radius?: number;
  @Input({ transform: booleanAttribute }) disabled = false;

  // Not `static: true` - the <button> now sits behind an `@if (licensed())` block, so it isn't
  // guaranteed present on the very first change-detection pass.
  @ViewChild('button') private readonly buttonRef?: ElementRef<HTMLButtonElement>;

  protected translateX = 0;
  protected translateY = 0;

  /** Expands the host's hit area by `radius` so the magnetic pull can start before the cursor reaches the button. */
  @HostBinding('style.padding.px')
  get hostPadding(): number {
    return this.disabled ? 0 : (this.radius ?? 0);
  }

  @HostListener('mousemove', ['$event'])
  protected onMouseMove(event: MouseEvent): void {
    if (this.disabled || !this.buttonRef) {
      return;
    }

    const rect = this.buttonRef.nativeElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    this.translateX = (event.clientX - centerX) * this.strength;
    this.translateY = (event.clientY - centerY) * this.strength;
  }

  @HostListener('mouseleave')
  protected onMouseLeave(): void {
    this.translateX = 0;
    this.translateY = 0;
  }

  protected get transformStyle(): string {
    return `translate(${this.translateX}px, ${this.translateY}px)`;
  }
}
