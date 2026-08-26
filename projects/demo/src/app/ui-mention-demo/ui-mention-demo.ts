import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NxMention, NxMentionSuggestion } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-mention-demo',
  imports: [NxMention, FormsModule, ReactiveFormsModule, DemoSection],
  templateUrl: './ui-mention-demo.html',
})
export class UiMentionDemo {
  importCode = `import { NxMention, NxMentionSuggestion } from 'nexium-ui';`;

  private fb = new FormBuilder();

  comment = '';
  lastMentioned = '';

  commentForm = this.fb.group({ comment: [''] });

  teammates: NxMentionSuggestion[] = [
    { id: 1, label: 'ada.lovelace' },
    { id: 2, label: 'grace.hopper' },
    { id: 3, label: 'alan.turing' },
    { id: 4, label: 'margaret.hamilton' },
  ];

  reactiveCode = `<div [formGroup]="commentForm">
    <nx-mention
        formControlName="comment"
        [suggestions]="teammates"
        placeholder="Leave a comment - type @ to mention someone"
        (mentioned)="onMentioned($event)">
    </nx-mention>
</div>`;

  reactiveTs = `commentForm = this.fb.group({ comment: [''] });

teammates: NxMentionSuggestion[] = [
  { id: 1, label: 'ada.lovelace' },
  { id: 2, label: 'grace.hopper' },
  { id: 3, label: 'alan.turing' },
  { id: 4, label: 'margaret.hamilton' },
];

onMentioned(suggestion: NxMentionSuggestion): void {
  // e.g. notify the mentioned teammate
}`;

  templateCode = `<nx-mention
    [(ngModel)]="comment"
    [suggestions]="teammates"
    placeholder="Leave a comment - type @ to mention someone"
    (mentioned)="onMentioned($event)">
</nx-mention>`;

  templateTs = `teammates: NxMentionSuggestion[] = [
  { id: 1, label: 'ada.lovelace' },
  { id: 2, label: 'grace.hopper' },
  { id: 3, label: 'alan.turing' },
  { id: 4, label: 'margaret.hamilton' },
];

onMentioned(suggestion: NxMentionSuggestion): void {
  // e.g. notify the mentioned teammate
}`;

  onMentioned(suggestion: NxMentionSuggestion): void {
    this.lastMentioned = suggestion.label;
  }
}
