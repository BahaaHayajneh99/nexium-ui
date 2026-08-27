import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxCard, NxCardContent, NxBadge, NxSelect, NxSelectOption, NxAvatar } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

type TicketStatus = 'Open' | 'Pending' | 'Closed';

interface Ticket {
  id: string;
  subject: string;
  requester: string;
  status: TicketStatus;
}

@Component({
  selector: 'app-how-to-support-tickets-demo',
  imports: [NxCard, NxCardContent, NxBadge, NxSelect, NxAvatar, FormsModule, DemoSection],
  templateUrl: './how-to-support-tickets-demo.html',
})
export class HowToSupportTicketsDemo {
  statusOptions: NxSelectOption[] = [
    { label: 'All Statuses', value: '' },
    { label: 'Open', value: 'Open' },
    { label: 'Pending', value: 'Pending' },
    { label: 'Closed', value: 'Closed' },
  ];
  statusFilter = '';

  tickets: Ticket[] = [
    { id: '#1042', subject: "Can't reset my password", requester: 'Grace Hopper', status: 'Open' },
    { id: '#1041', subject: 'Billing question about invoice', requester: 'Alan Turing', status: 'Pending' },
    { id: '#1040', subject: 'Feature request: dark mode', requester: 'Ada Lovelace', status: 'Closed' },
    { id: '#1039', subject: 'App crashes on upload', requester: 'Margaret Hamilton', status: 'Open' },
  ];

  get filteredTickets(): Ticket[] {
    return this.statusFilter ? this.tickets.filter((t) => t.status === this.statusFilter) : this.tickets;
  }

  statusVariant(status: TicketStatus): 'danger' | 'warning' | 'success' {
    return status === 'Open' ? 'danger' : status === 'Pending' ? 'warning' : 'success';
  }

  code = `<nx-select [options]="statusOptions" [(value)]="statusFilter"></nx-select>

@for (ticket of filteredTickets; track ticket.id) {
    <nx-card variant="outlined">
        <nx-card-content>
            <nx-avatar [name]="ticket.requester" size="small"></nx-avatar>
            <div>{{ ticket.id }} - {{ ticket.subject }}</div>
            <nx-badge [variant]="statusVariant(ticket.status)" size="small">{{ ticket.status }}</nx-badge>
        </nx-card-content>
    </nx-card>
}`;

  tsCode = `statusOptions: NxSelectOption[] = [
  { label: 'All Statuses', value: '' },
  { label: 'Open', value: 'Open' },
  { label: 'Pending', value: 'Pending' },
  { label: 'Closed', value: 'Closed' },
];
statusFilter = '';

tickets: Ticket[] = [ /* ... */ ];

get filteredTickets(): Ticket[] {
  return this.statusFilter ? this.tickets.filter((t) => t.status === this.statusFilter) : this.tickets;
}

statusVariant(status: TicketStatus): 'danger' | 'warning' | 'success' {
  return status === 'Open' ? 'danger' : status === 'Pending' ? 'warning' : 'success';
}`;
}
