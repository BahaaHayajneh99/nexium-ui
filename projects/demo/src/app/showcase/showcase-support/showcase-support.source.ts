export const SUPPORT_TS_SOURCE = `import { Component, computed, signal } from '@angular/core';
import { NxNavbar, NxIcon, NxBadge, NxAvatar, NxChatStream, NxChatStreamMessage, NxPromptInput } from 'nexium-ui';

interface Ticket {
  id: number;
  subject: string;
  requester: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Open' | 'Pending' | 'Closed';
  messages: { from: 'customer' | 'agent'; text: string; time: string }[];
}

@Component({
  selector: 'app-helpdesk',
  standalone: true,
  imports: [NxNavbar, NxIcon, NxBadge, NxAvatar, NxChatStream, NxPromptInput],
  templateUrl: './helpdesk.html',
})
export class Helpdesk {
  statuses = ['All', 'Open', 'Pending', 'Closed'] as const;
  statusFilter = signal<string>('All');

  tickets: Ticket[] = [
    { id: 1, subject: 'Cannot export report to CSV', requester: 'Priya Nair', priority: 'High', status: 'Open', messages: [
      { from: 'customer', text: 'The export button spins forever.', time: '10:02 AM' },
    ] },
    // ...more tickets
  ];

  filteredTickets = computed(() => {
    const status = this.statusFilter();
    return status === 'All' ? this.tickets : this.tickets.filter((t) => t.status === status);
  });

  selectedId = signal(1);
  selectedTicket = computed(() => this.tickets.find((t) => t.id === this.selectedId())!);

  // Map the ticket's own message shape to the shape nx-chat-stream expects.
  chatMessages = computed<NxChatStreamMessage[]>(() =>
    this.selectedTicket().messages.map((m) => ({ role: m.from === 'agent' ? 'assistant' : 'user', content: m.text })),
  );

  onReply(text: string): void {
    this.selectedTicket().messages.push({ from: 'agent', text, time: 'Just now' });
  }
}
`;

export const SUPPORT_HTML_SOURCE = `<div class="support-body">
    <aside class="support-list">
        <div class="filters">
            @for (status of statuses; track status) {
                <button [class.active]="statusFilter() === status" (click)="statusFilter.set(status)">{{ status }}</button>
            }
        </div>
        @for (ticket of filteredTickets(); track ticket.id) {
            <button class="ticket-card" [class.active]="selectedTicket().id === ticket.id" (click)="selectedId.set(ticket.id)">
                <span>{{ ticket.subject }}</span>
                <nx-badge [variant]="priorityVariant(ticket.priority)">{{ ticket.priority }}</nx-badge>
                <nx-avatar [name]="ticket.requester" size="small"></nx-avatar>
            </button>
        }
    </aside>

    <main class="conversation">
        <h2>{{ selectedTicket().subject }}</h2>
        <nx-badge [variant]="statusVariant(selectedTicket().status)">{{ selectedTicket().status }}</nx-badge>

        <nx-chat-stream [messages]="chatMessages()" [streaming]="false"></nx-chat-stream>

        <nx-prompt-input placeholder="Type your reply..." (submit)="onReply($event)"></nx-prompt-input>
    </main>
</div>
`;
