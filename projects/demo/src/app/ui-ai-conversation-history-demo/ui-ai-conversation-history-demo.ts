import { Component, inject, signal } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxAiConversationHistory, NxAiConversation } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

function hoursAgo(hours: number): string {
  return new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
}

function daysAgo(days: number): string {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
}

@Component({
  selector: 'app-ui-ai-conversation-history-demo',
  imports: [NxAiConversationHistory, DemoSection],
  templateUrl: './ui-ai-conversation-history-demo.html',
  styleUrl: './ui-ai-conversation-history-demo.scss',
})
export class UiAiConversationHistoryDemo {
  importCode = `import { NxAiConversationHistory, NxAiConversation } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  private nextId = 11;

  // Signals rather than plain properties: select/rename/delete/newChat below rebuild these
  // immutably, and in this zoneless demo app a plain property write wouldn't be picked up until
  // some unrelated click happened to trigger a re-render.
  activeId = signal<string | number | null>(1);

  conversations = signal<NxAiConversation[]>([
    { id: 1, title: 'Refactor the auth module', updatedAt: hoursAgo(1) },
    { id: 2, title: 'Draft onboarding email copy', updatedAt: hoursAgo(4) },
    { id: 3, title: 'Debug flaky e2e test', updatedAt: hoursAgo(9) },
    { id: 4, title: 'Plan Q3 roadmap', updatedAt: hoursAgo(26) },
    { id: 5, title: 'Summarize customer feedback', updatedAt: hoursAgo(30) },
    { id: 6, title: 'Compare pricing tiers', updatedAt: daysAgo(3) },
    { id: 7, title: 'Generate release notes', updatedAt: daysAgo(5) },
    { id: 8, title: 'Explain this SQL query', updatedAt: daysAgo(6) },
    { id: 9, title: 'Brainstorm product names', updatedAt: daysAgo(21) },
    { id: 10, title: 'Rewrite API documentation', updatedAt: daysAgo(40) },
  ]);

  onSelect(id: string | number): void {
    this.activeId.set(id);
  }

  onRename(event: { id: string | number; title: string }): void {
    this.conversations.update((current) =>
      current.map((conversation) =>
        conversation.id === event.id
          ? { ...conversation, title: event.title, updatedAt: new Date().toISOString() }
          : conversation,
      ),
    );
  }

  onDelete(id: string | number): void {
    this.conversations.update((current) => current.filter((conversation) => conversation.id !== id));
    if (this.activeId() === id) {
      this.activeId.set(null);
    }
  }

  onNewChat(): void {
    const id = this.nextId++;
    this.conversations.update((current) => [{ id, title: 'New chat', updatedAt: new Date().toISOString() }, ...current]);
    this.activeId.set(id);
  }

  basicCode = `<nx-ai-conversation-history
    [conversations]="conversations()"
    [activeId]="activeId()"
    (select)="onSelect($event)"
    (rename)="onRename($event)"
    (delete)="onDelete($event)"
    (newChat)="onNewChat()">
</nx-ai-conversation-history>`;

  basicTs = `conversations: NxAiConversation[] = [
  { id: 1, title: 'Refactor the auth module', updatedAt: '2026-11-01T09:00:00Z' },
  { id: 2, title: 'Plan Q3 roadmap', updatedAt: '2026-10-30T15:00:00Z' },
  // ...more conversations
];

onSelect(id: string | number): void {
  this.activeId = id;
}

onRename(event: { id: string | number; title: string }): void {
  this.conversations = this.conversations.map((c) => (c.id === event.id ? { ...c, title: event.title } : c));
}

onDelete(id: string | number): void {
  this.conversations = this.conversations.filter((c) => c.id !== id);
}

onNewChat(): void {
  this.conversations = [{ id: Date.now(), title: 'New chat', updatedAt: new Date().toISOString() }, ...this.conversations];
}`;
}
