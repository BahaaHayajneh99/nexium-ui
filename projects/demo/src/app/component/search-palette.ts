import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NxIcon } from '../../../../../dist/components';
import { NxSearchItem, SEARCH_INDEX } from './search-index';

interface NxSearchGroup {
  group: string;
  items: NxSearchItem[];
}

@Component({
  selector: 'app-search-palette',
  standalone: true,
  imports: [NxIcon],
  templateUrl: './search-palette.html',
  styleUrl: './search-palette.scss',
})
export class SearchPalette implements OnChanges {
  @Input() open = false;
  @Output() closed = new EventEmitter<void>();

  @ViewChild('searchInput') searchInputRef?: ElementRef<HTMLInputElement>;

  query = '';
  activeIndex = 0;
  groupedResults: NxSearchGroup[] = [];
  flatResults: NxSearchItem[] = [];

  constructor(private router: Router) {
    this.updateResults();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open'] && this.open) {
      this.query = '';
      this.activeIndex = 0;
      this.updateResults();
      setTimeout(() => this.searchInputRef?.nativeElement.focus());
    }
  }

  onQueryChange(value: string): void {
    this.query = value;
    this.activeIndex = 0;
    this.updateResults();
  }

  moveActive(delta: number): void {
    const total = this.flatResults.length;
    if (!total) {
      return;
    }
    this.activeIndex = (this.activeIndex + delta + total) % total;
  }

  setActive(item: NxSearchItem): void {
    this.activeIndex = this.flatResults.indexOf(item);
  }

  selectActive(): void {
    const item = this.flatResults[this.activeIndex];
    if (item) {
      this.go(item);
    }
  }

  go(item: NxSearchItem): void {
    this.router.navigateByUrl(item.path);
    this.close();
  }

  close(): void {
    this.closed.emit();
  }

  private updateResults(): void {
    const q = this.query.trim().toLowerCase();
    const matches = q
      ? SEARCH_INDEX.filter(item => item.label.toLowerCase().includes(q) || item.group.toLowerCase().includes(q))
      : SEARCH_INDEX;

    const byGroup = new Map<string, NxSearchItem[]>();
    for (const item of matches) {
      const list = byGroup.get(item.group) ?? [];
      list.push(item);
      byGroup.set(item.group, list);
    }

    this.groupedResults = [...byGroup.entries()].map(([group, items]) => ({ group, items }));
    this.flatResults = matches;
  }
}
