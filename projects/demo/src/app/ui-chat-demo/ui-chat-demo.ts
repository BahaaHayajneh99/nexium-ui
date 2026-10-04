import { Component, inject, signal } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxChat, NxChatMessage } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-chat-demo',
  imports: [NxChat, DemoSection],
  templateUrl: './ui-chat-demo.html',
  styleUrl: './ui-chat-demo.scss',
})
export class UiChatDemo {
  importCode = `import { NxChat } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  // Signals rather than plain properties: the simulated reply lands inside a
  // setTimeout, outside any Angular-dispatched event, so in this zoneless
  // app a plain property write wouldn't get picked up until some unrelated
  // click happened to trigger a re-render.
  messages = signal<NxChatMessage[]>([
    { id: 1, role: 'user', content: 'How do I center a div in CSS?' },
    {
      id: 2,
      role: 'assistant',
      content:
        'The cleanest way today is **flexbox**:\n\n```css\n.container {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n```\n\nThat centers the child both horizontally *and* vertically.',
    },
    { id: 3, role: 'user', content: 'Nice - what about with CSS Grid instead?' },
    {
      id: 4,
      role: 'assistant',
      content:
        'Grid works too, and needs even less code:\n\n```css\n.container {\n  display: grid;\n  place-items: center;\n}\n```\n\nUse whichever one fits the rest of your layout best.',
    },
  ]);

  typing = signal(false);

  onMessageSend(text: string): void {
    this.messages.update((current) => [...current, { id: Date.now(), role: 'user', content: text }]);
    this.typing.set(true);

    setTimeout(() => {
      this.messages.update((current) => [
        ...current,
        {
          id: Date.now() + 1,
          role: 'assistant',
          content: `Here's a simulated reply to: *"${text}"*`,
        },
      ]);
      this.typing.set(false);
    }, 1400);
  }

  onRegenerate(message: NxChatMessage): void {
    this.typing.set(true);
    setTimeout(() => {
      this.messages.update((current) =>
        current.map((entry) =>
          entry.id === message.id ? { ...entry, content: `${entry.content}\n\n*(regenerated)*` } : entry,
        ),
      );
      this.typing.set(false);
    }, 1000);
  }

  basicCode = `<nx-chat
    [messages]="messages"
    [typing]="typing"
    (messageSend)="onMessageSend($event)"
    (regenerate)="onRegenerate($event)">
</nx-chat>`;

  basicTs = `messages: NxChatMessage[] = [
  { id: 1, role: 'user', content: 'How do I center a div in CSS?' },
  {
    id: 2,
    role: 'assistant',
    content: 'The cleanest way today is **flexbox**: \`\`\`css .container { display: flex; align-items: center; justify-content: center; } \`\`\`',
  },
];

typing = false;

onMessageSend(text: string): void {
  this.messages = [...this.messages, { id: Date.now(), role: 'user', content: text }];
  this.typing = true;

  setTimeout(() => {
    this.messages = [
      ...this.messages,
      { id: Date.now() + 1, role: 'assistant', content: \`Here's a simulated reply to: "\${text}"\` },
    ];
    this.typing = false;
  }, 1400);
}

onRegenerate(message: NxChatMessage): void {
  // Re-run whatever produced this assistant message and replace its content.
}`;

  placeholderCode = `<nx-chat [messages]="[]" placeholder="Ask me anything..."></nx-chat>`;

  placeholderTs = `// placeholder sets the composer's empty-state hint text.`;

  disabledCode = `<nx-chat [messages]="messages" [disabled]="true" placeholder="Connecting..."></nx-chat>`;

  disabledTs = `// disabled greys out and locks the composer - useful while waiting on a
// connection, or once a conversation has been closed.`;
}
