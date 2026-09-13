import { Component } from '@angular/core';
import { NxNotesApp, NxNote } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-notes-app-demo',
  imports: [NxNotesApp, DemoSection],
  templateUrl: './ui-notes-app-demo.html',
  styleUrl: './ui-notes-app-demo.scss',
})
export class UiNotesAppDemo {
  importCode = `import { NxNotesApp } from 'nexium-ui';`;

  basicCode = `<nx-notes-app></nx-notes-app>`;
  basicTs = `// No extra TypeScript needed - nx-notes-app ships with its own sample
// data, so it works with zero bindings. Each note it works with (and
// that you'd pass via [notes]) is shaped like:
// { id: number; title: string; body: string; category: string }`;

  projectCategories = ['Bugs', 'Features', 'Docs'];

  projectNotes: NxNote[] = [
    { id: 1, title: 'Fix pagination bug', body: 'Page size resets to 10 after navigating away and back.', category: 'Bugs' },
    { id: 2, title: 'Add dark mode toggle', body: 'Persist the choice in localStorage.', category: 'Features' },
    { id: 3, title: 'Document the API client', body: 'Cover auth, retries, and pagination.', category: 'Docs' },
  ];

  customCategoriesCode = `<nx-notes-app [categories]="projectCategories" [notes]="projectNotes"></nx-notes-app>`;
  customCategoriesTs = `projectCategories = ['Bugs', 'Features', 'Docs'];

projectNotes: NxNote[] = [
  { id: 1, title: 'Fix pagination bug', body: 'Page size resets to 10 after navigating away and back.', category: 'Bugs' },
  { id: 2, title: 'Add dark mode toggle', body: 'Persist the choice in localStorage.', category: 'Features' },
  { id: 3, title: 'Document the API client', body: 'Cover auth, retries, and pagination.', category: 'Docs' },
];`;

  reactingNotes: NxNote[] = [
    { id: 1, title: 'Welcome!', body: 'Add a note below to see the outputs fire.', category: 'Work' },
  ];
  lastAddedTitle = '';

  onNoteAdded(note: NxNote): void {
    this.lastAddedTitle = note.title;
  }

  reactingCode = `<nx-notes-app
  [notes]="reactingNotes"
  (notesChange)="reactingNotes = $event"
  (noteAdded)="onNoteAdded($event)">
</nx-notes-app>

@if (lastAddedTitle) {
  <p>Last added: "{{ lastAddedTitle }}" - {{ reactingNotes.length }} note(s) total</p>
}`;

  reactingTs = `reactingNotes: NxNote[] = [
  { id: 1, title: 'Welcome!', body: 'Add a note below to see the outputs fire.', category: 'Work' },
];
lastAddedTitle = '';

onNoteAdded(note: NxNote): void {
  this.lastAddedTitle = note.title;
}`;
}
