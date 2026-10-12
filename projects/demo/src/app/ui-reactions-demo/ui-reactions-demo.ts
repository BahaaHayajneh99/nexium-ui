import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxReactions, NxReaction, NxReactionToggleEvent } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-reactions-demo',
  imports: [NxReactions, DemoSection],
  templateUrl: './ui-reactions-demo.html',
  styleUrl: './ui-reactions-demo.scss',
})
export class UiReactionsDemo {
  public commonService = inject(CommonService);

  importCode = `import { NxReactions } from 'nexium-ui';`;

  // ---------- Basic: a message's reaction bar ----------

  messageReactions: NxReaction[] = [
    { emoji: 'thumbs-up', count: 5, reactedByMe: true, reactors: ['You', 'Alice', 'Diego', 'Mei', 'Sam'] },
    { emoji: 'red-heart', count: 2, reactedByMe: false, reactors: ['Priya', 'Jordan'] },
    { emoji: 'face-with-tears-of-joy', count: 1, reactedByMe: false, reactors: ['Noah'] },
  ];

  basicCode = `<nx-reactions [reactions]="reactions" (reactionToggled)="onToggle($event)"></nx-reactions>`;

  basicTs = `reactions: NxReaction[] = [
  { emoji: 'thumbs-up', count: 5, reactedByMe: true, reactors: ['You', 'Alice', 'Diego', 'Mei', 'Sam'] },
  { emoji: 'red-heart', count: 2, reactedByMe: false, reactors: ['Priya', 'Jordan'] },
  { emoji: 'face-with-tears-of-joy', count: 1, reactedByMe: false, reactors: ['Noah'] },
];

onToggle(event: NxReactionToggleEvent): void {
  const existing = this.reactions.find((r) => r.emoji === event.emoji);

  if (existing) {
    existing.count += event.reacted ? 1 : -1;
    existing.reactedByMe = event.reacted;
    this.reactions = existing.count > 0 ? [...this.reactions] : this.reactions.filter((r) => r !== existing);
  } else if (event.reacted) {
    this.reactions = [...this.reactions, { emoji: event.emoji, count: 1, reactedByMe: true }];
  }
}`;

  onMessageToggle(event: NxReactionToggleEvent): void {
    const existing = this.messageReactions.find((reaction) => reaction.emoji === event.emoji);

    if (existing) {
      existing.count += event.reacted ? 1 : -1;
      existing.reactedByMe = event.reacted;
      this.messageReactions = existing.count > 0
        ? [...this.messageReactions]
        : this.messageReactions.filter((reaction) => reaction !== existing);
    } else if (event.reacted) {
      this.messageReactions = [...this.messageReactions, { emoji: event.emoji, count: 1, reactedByMe: true }];
    }
  }

  // ---------- Comment with no reactions yet ----------

  emptyReactions: NxReaction[] = [];

  emptyCode = `<nx-reactions [reactions]="[]" (reactionToggled)="onToggle($event)"></nx-reactions>`;

  onEmptyToggle(event: NxReactionToggleEvent): void {
    if (event.reacted) {
      this.emptyReactions = [...this.emptyReactions, { emoji: event.emoji, count: 1, reactedByMe: true }];
    }
  }

  // ---------- Disabled (read-only, e.g. an archived thread) ----------

  disabledReactions: NxReaction[] = [
    { emoji: 'rocket', count: 8, reactedByMe: true },
    { emoji: 'eyes', count: 3, reactedByMe: false },
  ];

  disabledCode = `<nx-reactions [reactions]="reactions" [disabled]="true"></nx-reactions>`;

  // ---------- Without the add-reaction button (display-only pills, still togglable) ----------

  noAddReactions: NxReaction[] = [
    { emoji: 'clapping-hands', count: 4, reactedByMe: false },
    { emoji: 'fire', count: 11, reactedByMe: true },
  ];

  noAddCode = `<nx-reactions [reactions]="reactions" [showAddButton]="false" (reactionToggled)="onToggle($event)"></nx-reactions>`;

  onNoAddToggle(event: NxReactionToggleEvent): void {
    const existing = this.noAddReactions.find((reaction) => reaction.emoji === event.emoji);
    if (existing) {
      existing.count += event.reacted ? 1 : -1;
      existing.reactedByMe = event.reacted;
      this.noAddReactions = [...this.noAddReactions];
    }
  }
}
