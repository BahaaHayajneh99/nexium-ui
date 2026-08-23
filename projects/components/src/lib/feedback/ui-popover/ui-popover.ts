import { Component, ElementRef, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'nx-popover',
  standalone: true,
  imports: [NgClass],
  template: `
    <div class="nx-popover-wrapper">
      <div class="nx-popover-trigger" (click)="toggle()">
        <ng-content select="[nx-popover-trigger]"></ng-content>
      </div>
      @if (open) {
        <div class="nx-popover-panel" [ngClass]="position">
          <ng-content></ng-content>
        </div>
      }
    </div>
  `,
  styles: `
    .nx-popover-wrapper {
      position: relative;
      display: inline-block;
    }
    .nx-popover-trigger {
      cursor: pointer;
      display: inline-block;
    }
    .nx-popover-panel {
      position: absolute;
      z-index: 100;
      min-width: 200px;
      padding: 12px 16px;
      background-color: var(--shell-surface);
      border: 1px solid var(--shell-border);
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, .12);
      top: calc(100% + 8px);
      left: 0;
    }
    .nx-popover-panel.right {
      left: auto;
      right: 0;
    }
  `,
  host: {
    '(document:click)': 'onDocumentClick($event)',
  },
})
export class NxPopover {
  @Input() position: 'left' | 'right' = 'left';
  open = false;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  toggle(): void {
    this.open = !this.open;
  }

  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.open = false;
    }
  }
}
