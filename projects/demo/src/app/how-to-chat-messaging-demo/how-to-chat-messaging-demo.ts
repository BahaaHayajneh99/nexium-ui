import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxAvatar, NxInput, NxButton } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

interface ChatMessage {
  from: 'me' | 'them';
  author: string;
  text: string;
}

@Component({
  selector: 'app-how-to-chat-messaging-demo',
  imports: [NxAvatar, NxInput, NxButton, FormsModule, DemoSection],
  templateUrl: './how-to-chat-messaging-demo.html',
  styleUrl: './how-to-chat-messaging-demo.scss',
})
export class HowToChatMessagingDemo {
  messages: ChatMessage[] = [
    { from: 'them', author: 'Ada Lovelace', text: 'Hey! Did you get a chance to look at the new component?' },
    { from: 'me', author: 'You', text: "Yep, it looks great! I'll ship it this afternoon." },
    { from: 'them', author: 'Ada Lovelace', text: 'Perfect, thank you.' },
  ];

  draft = '';

  send(): void {
    const text = this.draft.trim();
    if (!text) return;
    this.messages.push({ from: 'me', author: 'You', text });
    this.draft = '';
  }

  code = `@for (message of messages; track $index) {
    <div class="chat-row" [class.chat-row-me]="message.from === 'me'">
        <nx-avatar [name]="message.author" size="small"></nx-avatar>
        <div class="chat-bubble">{{ message.text }}</div>
    </div>
}

<nx-input placeholder="Type a message..." [(ngModel)]="draft" (keyup.enter)="send()"></nx-input>
<nx-button variant="primary" (click)="send()">Send</nx-button>`;

  tsCode = `messages: ChatMessage[] = [ /* ... */ ];
draft = '';

send(): void {
  const text = this.draft.trim();
  if (!text) return;
  this.messages.push({ from: 'me', author: 'You', text });
  this.draft = '';
}`;
}
