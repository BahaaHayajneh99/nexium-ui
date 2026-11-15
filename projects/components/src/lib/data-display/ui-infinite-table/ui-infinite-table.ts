import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
  booleanAttribute,
  numberAttribute,
} from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { NxSpinnerComponent } from '../ui-spinner';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export interface NxInfiniteTableColumn {
  key: string;
  label: string;
}

/**
 * A simple column/row table that progressively loads more rows as the user scrolls near the
 * bottom, instead of paginating. An `IntersectionObserver` watches a sentinel element at the
 * bottom of the scrollable body; when it comes into view and `hasMore` is true and `loading` is
 * false, `loadMore` is emitted so the host can fetch and append the next page into `rows`.
 */
@Component({
  selector: 'nx-infinite-table',
  standalone: true,
  imports: [NgIf, NgFor, NxSpinnerComponent, NxProLocked],
  templateUrl: './ui-infinite-table.html',
  styleUrl: './ui-infinite-table.scss',
})
export class NxInfiniteTable implements AfterViewInit, OnDestroy {
  protected readonly licensed = nxProLicenseGranted();

  @Input() columns: NxInfiniteTableColumn[] = [];
  @Input() rows: Record<string, unknown>[] = [];
  @Input({ transform: booleanAttribute }) hasMore = true;
  @Input({ transform: booleanAttribute }) loading = false;
  @Input({ transform: numberAttribute }) maxHeight = 420;

  @Output() loadMore = new EventEmitter<void>();

  @ViewChild('sentinel') private sentinelRef?: ElementRef<HTMLElement>;
  @ViewChild('scrollBody') private scrollBodyRef?: ElementRef<HTMLElement>;

  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    if (typeof IntersectionObserver === 'undefined' || !this.sentinelRef) {
      return;
    }
    this.observer = new IntersectionObserver(
      (entries) => {
        const sentinelVisible = entries.some((entry) => entry.isIntersecting);
        if (sentinelVisible && this.hasMore && !this.loading) {
          this.loadMore.emit();
        }
      },
      {
        root: this.scrollBodyRef?.nativeElement ?? null,
        rootMargin: '0px 0px 120px 0px',
        threshold: 0,
      },
    );
    this.observer.observe(this.sentinelRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  cellValue(row: Record<string, unknown>, key: string): unknown {
    return row[key];
  }

  trackByColKey(index: number, col: NxInfiniteTableColumn): string {
    return col.key;
  }

  trackByIndex(index: number, row: unknown): number {
    return index;
  }
}
