import { Component, ContentChild, Input, TemplateRef, numberAttribute, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export interface NxVirtualScrollRow<T> {
  item: T;
  index: number;
}

/**
 * Renders only the rows visible within a fixed-height viewport (plus a small
 * buffer), so lists of thousands of rows stay smooth. Row content is
 * provided by the consumer via a projected `<ng-template let-item let-index="index">`.
 */
@Component({
  selector: 'nx-virtual-scroll',
  standalone: true,
  imports: [NgTemplateOutlet, NxProLocked],
  templateUrl: './ui-virtual-scroll.html',
  styleUrl: './ui-virtual-scroll.scss',
})
export class NxVirtualScroll<T> {
  protected readonly licensed = nxProLicenseGranted();

  @Input() items: T[] = [];
  @Input({ transform: numberAttribute }) itemHeight = 40;
  @Input({ transform: numberAttribute }) height = 400;
  @Input({ transform: numberAttribute }) buffer = 4;

  @ContentChild(TemplateRef) itemTemplate?: TemplateRef<{ $implicit: T; index: number }>;

  private scrollTop = signal(0);

  get totalHeight(): number {
    return this.items.length * this.itemHeight;
  }

  get startIndex(): number {
    return Math.max(0, Math.floor(this.scrollTop() / this.itemHeight) - this.buffer);
  }

  get visibleCount(): number {
    return Math.ceil(this.height / this.itemHeight) + this.buffer * 2;
  }

  get endIndex(): number {
    return Math.min(this.items.length, this.startIndex + this.visibleCount);
  }

  get offsetY(): number {
    return this.startIndex * this.itemHeight;
  }

  get visibleRows(): NxVirtualScrollRow<T>[] {
    const rows: NxVirtualScrollRow<T>[] = [];
    for (let i = this.startIndex; i < this.endIndex; i++) {
      rows.push({ item: this.items[i], index: i });
    }
    return rows;
  }

  onScroll(event: Event): void {
    this.scrollTop.set((event.target as HTMLElement).scrollTop);
  }
}
