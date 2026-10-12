import { Component, ElementRef, EventEmitter, HostListener, Input, Output, booleanAttribute, signal } from '@angular/core';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export type NxCoachmarkPlacement = 'top' | 'bottom' | 'left' | 'right';

/**
 * A single, lightweight contextual feature hint - a pulsing dot overlaid on
 * its projected content that, on click, opens a small popover with a title,
 * description, and a "Got it" dismiss button.
 *
 * Unlike `nx-tour` (a sequential, multi-step guided walkthrough with
 * next/back controls), `nx-coachmark` spotlights exactly ONE feature,
 * independently anywhere in the app - there's no step sequence to manage.
 *
 * `<ng-content>` IS the anchor: whatever you project becomes the element the
 * dot is pinned to.
 *
 * ```html
 * <nx-coachmark title="New" description="Try the new export button." [(dismissed)]="exportHintDismissed">
 *   <button>Export</button>
 * </nx-coachmark>
 * ```
 */
@Component({
  selector: 'nx-coachmark',
  standalone: true,
  imports: [NxProLocked],
  templateUrl: './ui-coachmark.html',
  styleUrl: './ui-coachmark.scss',
})
export class NxCoachmark {
  protected readonly licensed = nxProLicenseGranted();

  @Input() title = '';
  @Input() description = '';
  @Input() placement: NxCoachmarkPlacement = 'bottom';
  /** Whether the animated pulsing ring/dot shows before the popover has ever been opened. */
  @Input({ transform: booleanAttribute }) showPulse = true;

  /** Two-way bindable - persist this (e.g. to localStorage) so the hint doesn't come back. */
  @Input()
  get dismissed(): boolean {
    return this._dismissed;
  }
  set dismissed(value: boolean) {
    this._dismissed = value;
    if (value) {
      this.open.set(false);
    }
  }
  private _dismissed = false;

  @Output() dismissedChange = new EventEmitter<boolean>();

  /** Whether the title/description popover is currently showing. */
  open = signal(false);

  constructor(private readonly elementRef: ElementRef<HTMLElement>) {}

  get dotLabel(): string {
    return this.title ? `Show hint: ${this.title}` : 'Show feature hint';
  }

  toggleOpen(): void {
    if (this.dismissed) {
      return;
    }
    this.open.update((value) => !value);
  }

  dismiss(): void {
    this.open.set(false);
    this.dismissed = true;
    this.dismissedChange.emit(true);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.open() && !this.elementRef.nativeElement.contains(event.target as Node)) {
      this.open.set(false);
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.open.set(false);
  }
}
