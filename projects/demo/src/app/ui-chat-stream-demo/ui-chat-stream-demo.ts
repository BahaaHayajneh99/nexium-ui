import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxChatStream, NxChatStreamMessage } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-chat-stream-demo',
  imports: [NxChatStream, DemoSection],
  templateUrl: './ui-chat-stream-demo.html',
  styleUrl: './ui-chat-stream-demo.scss',
})
export class UiChatStreamDemo {
  importCode = `import { NxChatStream } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  staticMessages: NxChatStreamMessage[] = [
    { role: 'user', content: 'Can you summarize what a binary search tree is?' },
    {
      role: 'assistant',
      content:
        'A binary search tree is a node-based structure where each node has at most two children, and for every node, values in its left subtree are smaller and values in its right subtree are larger. That ordering lets you search, insert, and delete in O(log n) time on average.',
    },
  ];
  staticCode = `<nx-chat-stream [messages]="messages"></nx-chat-stream>`;
  staticTs = `messages = [
  { role: 'user', content: 'Can you summarize what a binary search tree is?' },
  { role: 'assistant', content: 'A binary search tree is a node-based structure where...' },
];`;

  liveMessages: NxChatStreamMessage[] = [
    { role: 'user', content: 'What happens if it is not balanced?' },
    {
      role: 'assistant',
      content:
        'If insertions happen in sorted order, the tree can degrade into something resembling a linked list, where every node has only one child. In that worst case, search, insert, and delete all drop to O(n) time instead of O(log n), which is why self-balancing variants like AVL or red-black trees exist.',
    },
  ];
  liveStreaming = true;
  liveCode = `<nx-chat-stream [messages]="messages" [streaming]="streaming"></nx-chat-stream>`;
  liveTs = `streaming = true; // animates the reveal of the last (assistant) message

askFollowUp(): void {
  this.messages = [
    ...this.messages,
    { role: 'user', content: 'And how do self-balancing trees fix that?' },
    { role: 'assistant', content: 'They perform rotations during insertion and deletion...' },
  ];
}`;

  askFollowUp(): void {
    this.liveMessages = [
      ...this.liveMessages,
      { role: 'user', content: 'And how do self-balancing trees fix that?' },
      {
        role: 'assistant',
        content:
          'They perform rotations during insertion and deletion to keep the height close to log n, trading a bit of extra bookkeeping on writes for consistently fast reads.',
      },
    ];
  }
}
