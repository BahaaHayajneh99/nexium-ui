import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export type NxTextScrambleTrigger = 'onInit' | 'onChange' | 'manual';

/**
 * Renders text that "scrambles" through random characters before settling into the real target
 * text - the classic cyberpunk/hacker text-reveal effect. Characters are progressively "locked
 * in" left-to-right via a `requestAnimationFrame` loop while the remaining characters keep
 * randomizing, until the whole string matches `text`.
 */
@Component({
  selector: 'nx-text-scramble',
  standalone: true,
  imports: [NxProLocked],
  templateUrl: './ui-text-scramble.html',
  styleUrl: './ui-text-scramble.scss',
})
export class NxTextScramble implements OnInit, OnChanges, OnDestroy {
  protected readonly licensed = nxProLicenseGranted();

  @Input() text = '';
  @Input() duration = 1200;
  @Input() characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!<>-_\\/[]{}—=+*^?#';
  /** 'onInit' scrambles once on load, 'onChange' re-scrambles whenever `text` changes (default), 'manual' only via `scramble()`. */
  @Input() trigger: NxTextScrambleTrigger = 'onChange';

  protected displayText = '';

  private frameId: number | null = null;
  private startTime = 0;
  private initialized = false;

  ngOnInit(): void {
    this.displayText = this.text;
    this.initialized = true;
    if (this.trigger === 'onInit') {
      this.scramble();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // The very first ngOnChanges call always precedes ngOnInit, which already seeds
    // `displayText` and handles the 'onInit' trigger - so only react here to later changes.
    if (!this.initialized) {
      return;
    }

    if (changes['text'] && !changes['text'].firstChange && this.trigger === 'onChange') {
      this.scramble();
    }
  }

  /** Re-runs the scramble-to-resolve animation toward the current `text`. Call directly when `trigger` is 'manual'. */
  scramble(): void {
    this.cancelAnimation();

    const target = this.text;
    this.startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - this.startTime;
      const progress = Math.min(1, this.duration > 0 ? elapsed / this.duration : 1);
      const lockedCount = Math.floor(progress * target.length);

      let output = '';
      for (let i = 0; i < target.length; i++) {
        output += i < lockedCount ? target[i] : this.randomChar();
      }
      this.displayText = output;

      if (progress < 1) {
        this.frameId = requestAnimationFrame(step);
      } else {
        this.displayText = target;
        this.frameId = null;
      }
    };

    this.frameId = requestAnimationFrame(step);
  }

  private randomChar(): string {
    if (!this.characters) {
      return '';
    }
    return this.characters.charAt(Math.floor(Math.random() * this.characters.length));
  }

  private cancelAnimation(): void {
    if (this.frameId !== null) {
      cancelAnimationFrame(this.frameId);
      this.frameId = null;
    }
  }

  ngOnDestroy(): void {
    this.cancelAnimation();
  }
}
