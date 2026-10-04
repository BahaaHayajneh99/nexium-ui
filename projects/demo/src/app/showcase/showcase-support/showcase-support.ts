import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NxNavbar, NxIcon, NxBadge, NxAvatar, NxChatStream, NxChatStreamMessage, NxPromptInput } from 'components';
import { ShowcaseSourceView } from '../shared/showcase-source-view/showcase-source-view';
import { SUPPORT_TS_SOURCE, SUPPORT_HTML_SOURCE } from './showcase-support.source';

type NxTicketStatus = 'Open' | 'Pending' | 'Closed';
type NxTicketPriority = 'Low' | 'Medium' | 'High';

interface NxTicketMessage {
  from: 'customer' | 'agent';
  text: string;
  time: string;
}

interface NxShowcaseTicket {
  id: number;
  subject: string;
  requester: string;
  priority: NxTicketPriority;
  status: NxTicketStatus;
  updated: string;
  messages: NxTicketMessage[];
}

@Component({
  selector: 'app-showcase-support',
  standalone: true,
  imports: [RouterLink, NxNavbar, NxIcon, NxBadge, NxAvatar, NxChatStream, NxPromptInput, ShowcaseSourceView],
  templateUrl: './showcase-support.html',
  styleUrl: './showcase-support.scss',
})
export class ShowcaseSupport {
  tsSource = SUPPORT_TS_SOURCE;
  htmlSource = SUPPORT_HTML_SOURCE;

  statuses: ('All' | NxTicketStatus)[] = ['All', 'Open', 'Pending', 'Closed'];
  statusFilter = signal<'All' | NxTicketStatus>('All');

  tickets: NxShowcaseTicket[] = [
    {
      id: 1,
      subject: 'Cannot export report to CSV',
      requester: 'Priya Nair',
      priority: 'High',
      status: 'Open',
      updated: '12m ago',
      messages: [
        { from: 'customer', text: 'The export button spins forever and nothing downloads.', time: '10:02 AM' },
        { from: 'agent', text: "Thanks for flagging - can you tell me which browser you're using?", time: '10:14 AM' },
        { from: 'customer', text: 'Chrome, latest version. Happens on the Orders page.', time: '10:16 AM' },
      ],
    },
    {
      id: 2,
      subject: 'Upgrade billing to yearly plan',
      requester: 'Marcus Webb',
      priority: 'Medium',
      status: 'Pending',
      updated: '1h ago',
      messages: [
        { from: 'customer', text: "We'd like to switch from monthly to the yearly plan.", time: '9:20 AM' },
        { from: 'agent', text: "I've sent over the yearly invoice - let me know once it's paid and I'll flip the switch.", time: '9:45 AM' },
      ],
    },
    {
      id: 3,
      subject: 'SSO login redirect loop',
      requester: 'Ava Thompson',
      priority: 'High',
      status: 'Open',
      updated: '2h ago',
      messages: [
        { from: 'customer', text: 'Our team gets stuck in a redirect loop after SSO login since this morning.', time: '8:05 AM' },
      ],
    },
    {
      id: 4,
      subject: 'Question about API rate limits',
      requester: 'Owen Bishop',
      priority: 'Low',
      status: 'Closed',
      updated: 'Yesterday',
      messages: [
        { from: 'customer', text: "What's the rate limit on the webhook endpoint?", time: 'Mon 4:10 PM' },
        { from: 'agent', text: "It's 100 requests/minute per API key, documented on the API reference page.", time: 'Mon 4:30 PM' },
        { from: 'customer', text: 'Perfect, thank you!', time: 'Mon 4:32 PM' },
      ],
    },
    {
      id: 5,
      subject: 'Add teammate seats to plan',
      requester: 'Sofia Reyes',
      priority: 'Low',
      status: 'Pending',
      updated: 'Yesterday',
      messages: [{ from: 'customer', text: 'Can we add 5 more seats to our Pro plan?', time: 'Mon 2:00 PM' }],
    },
    {
      id: 6,
      subject: 'Dark mode chart colors hard to read',
      requester: 'Daniel Cho',
      priority: 'Medium',
      status: 'Closed',
      updated: '2 days ago',
      messages: [
        { from: 'customer', text: 'The area chart fill is almost invisible in dark mode.', time: 'Sun 11:00 AM' },
        { from: 'agent', text: "Good catch - that's fixed in the latest release, please refresh and let us know.", time: 'Sun 1:15 PM' },
      ],
    },
  ];

  filteredTickets = computed(() => {
    const status = this.statusFilter();
    return status === 'All' ? this.tickets : this.tickets.filter((t) => t.status === status);
  });

  selectedId = signal(1);
  selectedTicket = computed(() => this.tickets.find((t) => t.id === this.selectedId()) ?? this.tickets[0]);

  chatMessages = computed<NxChatStreamMessage[]>(() =>
    this.selectedTicket().messages.map((message) => ({
      role: message.from === 'agent' ? 'assistant' : 'user',
      content: message.text,
    })),
  );

  selectTicket(id: number): void {
    this.selectedId.set(id);
  }

  onReply(text: string): void {
    const ticket = this.selectedTicket();
    ticket.messages.push({ from: 'agent', text, time: 'Just now' });
  }

  priorityVariant(priority: NxTicketPriority): 'danger' | 'warning' | 'secondary' {
    if (priority === 'High') return 'danger';
    if (priority === 'Medium') return 'warning';
    return 'secondary';
  }

  statusVariant(status: NxTicketStatus): 'info' | 'warning' | 'success' {
    if (status === 'Open') return 'info';
    if (status === 'Pending') return 'warning';
    return 'success';
  }
}
