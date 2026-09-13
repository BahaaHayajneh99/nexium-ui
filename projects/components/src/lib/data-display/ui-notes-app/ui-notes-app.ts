import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxSearch } from '../../forms/ui-search';
import { NxChip } from '../ui-chip';
import { NxInput } from '../../forms/ui-input';
import { NxTextarea } from '../../forms/ui-textarea';
import { NxSelect, NxSelectOption } from '../../forms/ui-select';
import { NxButton } from '../../forms/ui-button';
import { NxCard, NxCardHeader, NxCardTitle, NxCardContent, NxCardFooter } from '../ui-card';
import { NxTag } from '../ui-tag';
import { NxEmptyState } from '../ui-empty-state';

export interface NxNote {
  id: number;
  title: string;
  body: string;
  category: string;
}

const DEFAULT_CATEGORIES = ['Work', 'Personal', 'Ideas', 'Shopping'];

const DEFAULT_NOTES: NxNote[] = [
  { id: 1, title: 'Sprint planning notes', body: 'Discuss backlog grooming and finalize the sprint goal with the team before Monday standup.', category: 'Work' },
  { id: 2, title: 'Book flights for reunion', body: 'Compare fares for the family reunion weekend, check baggage rules for the connecting flight.', category: 'Personal' },
  { id: 3, title: 'App onboarding redesign', body: 'Sketch a shorter onboarding flow that skips the tutorial for returning users.', category: 'Ideas' },
  { id: 4, title: 'Grocery run', body: 'Milk, eggs, coffee beans, and something for the potluck dinner on Friday.', category: 'Shopping' },
  { id: 5, title: 'Q3 retro takeaways', body: 'Follow up on the deployment delays raised in the retro and share notes with the team.', category: 'Work' },
];

/**
 * A self-contained notes app - live search, category filtering, and an
 * add-note form - composed entirely from other NexiumUI components
 * (Search, Chip, Input, Textarea, Select, Card, Tag, Empty State).
 */
@Component({
  selector: 'nx-notes-app',
  standalone: true,
  imports: [
    FormsModule,
    NxSearch,
    NxChip,
    NxInput,
    NxTextarea,
    NxSelect,
    NxButton,
    NxCard,
    NxCardHeader,
    NxCardTitle,
    NxCardContent,
    NxCardFooter,
    NxTag,
    NxEmptyState,
  ],
  templateUrl: './ui-notes-app.html',
  styleUrl: './ui-notes-app.scss',
})
export class NxNotesApp {
  @Input() categories: string[] = DEFAULT_CATEGORIES;
  @Input() notes: NxNote[] = DEFAULT_NOTES;
  @Input() searchPlaceholder = 'Search notes...';
  @Input() emptyTitle = 'No notes found';
  @Input() emptyDescription = 'Try a different search term or clear the category filter.';

  @Output() notesChange = new EventEmitter<NxNote[]>();
  @Output() noteAdded = new EventEmitter<NxNote>();
  @Output() noteRemoved = new EventEmitter<NxNote>();

  private nextId = Math.max(0, ...DEFAULT_NOTES.map((note) => note.id)) + 1;

  searchTerm = '';
  activeCategory = 'all';

  newTitle = '';
  newBody = '';
  newCategory = this.categories[0] ?? '';

  get categoryOptions(): NxSelectOption[] {
    return this.categories.map((category) => ({ label: category, value: category }));
  }

  get filteredNotes(): NxNote[] {
    const term = this.searchTerm.trim().toLowerCase();

    return this.notes.filter((note) => {
      const matchesTerm =
        !term || note.title.toLowerCase().includes(term) || note.body.toLowerCase().includes(term);
      const matchesCategory = this.activeCategory === 'all' || note.category === this.activeCategory;
      return matchesTerm && matchesCategory;
    });
  }

  setCategory(category: string): void {
    this.activeCategory = this.activeCategory === category ? 'all' : category;
  }

  addNote(): void {
    const title = this.newTitle.trim();
    if (!title) {
      return;
    }

    const note: NxNote = {
      id: this.nextId++,
      title,
      body: this.newBody.trim(),
      category: this.newCategory || this.categories[0] || '',
    };

    this.notes = [note, ...this.notes];
    this.newTitle = '';
    this.newBody = '';

    this.notesChange.emit(this.notes);
    this.noteAdded.emit(note);
  }

  removeNote(note: NxNote): void {
    this.notes = this.notes.filter((current) => current.id !== note.id);
    this.notesChange.emit(this.notes);
    this.noteRemoved.emit(note);
  }
}
