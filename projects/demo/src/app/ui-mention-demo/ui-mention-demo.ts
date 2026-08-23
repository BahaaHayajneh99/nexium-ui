import { Component } from '@angular/core';
import { NxMention, NxMentionSuggestion } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-mention-demo',
  imports: [NxMention, DemoSection],
  templateUrl: './ui-mention-demo.html',
})
export class UiMentionDemo {
  importCode = `import { NxMention, NxMentionSuggestion } from 'nexium-ui';`;

  comment = '';
  lastMentioned = '';

  teammates: NxMentionSuggestion[] = [
    { id: 1, label: 'ada.lovelace' },
    { id: 2, label: 'grace.hopper' },
    { id: 3, label: 'alan.turing' },
    { id: 4, label: 'margaret.hamilton' },
  ];

  basicCode = `<nx-mention
    [(value)]="comment"
    [suggestions]="teammates"
    placeholder="Leave a comment - type @ to mention someone"
    (mentioned)="onMentioned($event)">
</nx-mention>`;

  basicTs = `teammates: NxMentionSuggestion[] = [
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
