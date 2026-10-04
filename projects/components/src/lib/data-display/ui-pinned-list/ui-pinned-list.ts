import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { NxIcon } from '../ui-icon';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export type NxPinnedItemType = 'text' | 'image' | 'video' | 'link' | 'custom';

export interface NxPinnedItem {
  id: string;
  type: NxPinnedItemType;
  title: string;
  subtitle?: string;
  /** Image/video src, link href, or text body - meaning depends on `type`. Unused for `'custom'`. */
  content?: string;
  /** Icon shown for `'text'`/`'link'` items; ignored for `'image'`/`'video'`/`'custom'`. */
  icon?: string;
  /** Arbitrary payload a `'custom'` item's template can read off `$implicit.data`. */
  data?: unknown;
}

/**
 * A reorderable pinned-items list where every item can be a different kind of content - text,
 * an image, a video, a link, or (via `customTemplate`) absolutely anything. Built for "pinned"
 * use cases (dashboard shortcuts, favorited docs, saved media) where the content type varies
 * item to item rather than being fixed up front.
 */
@Component({
  selector: 'nx-pinned-list',
  standalone: true,
  imports: [NgTemplateOutlet, NxIcon, NxProLocked],
  templateUrl: './ui-pinned-list.html',
  styleUrl: './ui-pinned-list.scss',
})
export class NxPinnedList {
  protected readonly licensed = nxProLicenseGranted();

  @Input() items: NxPinnedItem[] = [];
  /** Rendered for any item with `type: 'custom'`, with `{ $implicit: item }` as context. */
  @Input() customTemplate?: TemplateRef<{ $implicit: NxPinnedItem }>;
  @Input() emptyMessage = 'Nothing pinned yet.';

  @Output() itemsChange = new EventEmitter<NxPinnedItem[]>();
  @Output() itemClick = new EventEmitter<NxPinnedItem>();
  @Output() unpinned = new EventEmitter<NxPinnedItem>();

  unpin(item: NxPinnedItem): void {
    const next = this.items.filter((i) => i.id !== item.id);
    this.items = next;
    this.itemsChange.emit(next);
    this.unpinned.emit(item);
  }

  moveUp(index: number): void {
    if (index <= 0) {
      return;
    }
    const next = [...this.items];
    [next[index - 1], next[index]] = [next[index], next[index - 1]];
    this.items = next;
    this.itemsChange.emit(next);
  }

  moveDown(index: number): void {
    if (index >= this.items.length - 1) {
      return;
    }
    const next = [...this.items];
    [next[index + 1], next[index]] = [next[index], next[index + 1]];
    this.items = next;
    this.itemsChange.emit(next);
  }

  onActivate(item: NxPinnedItem): void {
    this.itemClick.emit(item);
  }
}
