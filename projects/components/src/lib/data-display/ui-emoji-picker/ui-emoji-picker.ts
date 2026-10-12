import { Component, EventEmitter, Input, Output, booleanAttribute } from '@angular/core';
import { NxEmoji, NX_EMOJIS, NX_EMOJI_CATEGORIES } from '../ui-emoji';
import { NxIcon } from '../ui-icon';
import { NxSearch } from '../../forms/ui-search';

/** Label used for the "show everything" tab, and the implicit source when searching. */
const ALL_TAB = 'All';

/**
 * Interactive, searchable emoji picker grid - the Slack/Discord-style panel that
 * opens from a chat composer or a message's reaction button.
 *
 * It's the missing interactive counterpart to the display-only `nx-emoji`: it
 * pulls every available name straight from the `NX_EMOJIS` registry, renders
 * each cell via `nx-emoji` (so glyph rendering stays in one place), and emits
 * the chosen emoji's kebab-case name via `(emojiSelected)` for the host to
 * insert wherever it likes.
 *
 * This component is just the panel's *content* - it doesn't manage its own
 * open/closed state or positioning. Host it inside the existing `nx-popover`
 * (or any dropdown/overlay primitive), behind a trigger button, and let that
 * primitive own the show/hide behavior - see the demo page for an example.
 */
@Component({
  selector: 'nx-emoji-picker',
  standalone: true,
  imports: [NxEmoji, NxIcon, NxSearch],
  templateUrl: './ui-emoji-picker.html',
  styleUrl: './ui-emoji-picker.scss',
})
export class NxEmojiPicker {
  /** Placeholder text for the search field. */
  @Input() searchPlaceholder = 'Search emoji...';
  /** Size (px, or any CSS size string) each emoji glyph renders at inside the grid. */
  @Input() emojiSize: number | string = 22;
  /** Shows the category tab bar above the grid. Set to false for a flat searchable grid only. */
  @Input({ transform: booleanAttribute }) showCategories = true;
  /** Text shown when no emoji matches the current search term. */
  @Input() noResultsText = 'No emoji found';

  /** Emitted with the selected emoji's kebab-case name (e.g. `red-heart`), ready to insert. */
  @Output() emojiSelected = new EventEmitter<string>();

  /** Category groups straight from the shared registry, in display order. */
  readonly categories = NX_EMOJI_CATEGORIES;
  /** Every emoji name available to pick from. */
  readonly allNames: string[] = Object.keys(NX_EMOJIS);
  /** Tab labels: "All" followed by each real category - no invented groupings. */
  readonly tabs: string[] = [ALL_TAB, ...NX_EMOJI_CATEGORIES.map((group) => group.category)];

  search = '';
  activeCategory: string = ALL_TAB;

  get isSearching(): boolean {
    return this.search.trim().length > 0;
  }

  /** Names currently shown in the grid - filtered by search term and/or active category. */
  get filteredNames(): string[] {
    const term = this.search.trim().toLowerCase();
    const base = this.isSearching || this.activeCategory === ALL_TAB ? this.allNames : this.categoryKeys(this.activeCategory);

    return term ? base.filter((name) => name.includes(term)) : base;
  }

  private categoryKeys(category: string): string[] {
    return this.categories.find((group) => group.category === category)?.keys ?? this.allNames;
  }

  onSearchChange(value: string): void {
    this.search = value;
  }

  selectCategory(category: string): void {
    this.activeCategory = category;
  }

  selectEmoji(name: string): void {
    this.emojiSelected.emit(name);
  }

  trackByName(_index: number, name: string): string {
    return name;
  }
}
