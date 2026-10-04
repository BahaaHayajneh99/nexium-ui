export const CRM_TS_SOURCE = `import { Component } from '@angular/core';
import { NxNavbar, NxIcon, NxKanban, NxKanbanColumn, NxMetricGrid, NxMetricCard, NxAvatar, NxBadge, NxTagInput } from 'nexium-ui';

@Component({
  selector: 'app-crm',
  standalone: true,
  imports: [NxNavbar, NxIcon, NxKanban, NxMetricGrid, NxMetricCard, NxAvatar, NxBadge, NxTagInput],
  templateUrl: './crm.html',
})
export class Crm {
  columns: NxKanbanColumn[] = [
    { id: 'lead', title: 'Lead', cards: [
      { id: 1, title: 'Vertex Studio', description: '$18,000 · Referral from Bluewave' },
    ] },
    { id: 'qualified', title: 'Qualified', cards: [ /* ... */ ] },
    { id: 'proposal', title: 'Proposal', cards: [ /* ... */ ] },
    { id: 'negotiation', title: 'Negotiation', cards: [ /* ... */ ] },
    { id: 'won', title: 'Won', cards: [ /* ... */ ] },
  ];

  contacts = [
    { name: 'Marcus Webb', company: 'Orbit Labs', lastContact: '2 days ago', dealValue: 48000, stage: 'Proposal', tags: ['Hot lead', 'Champion'] },
    // ...more contacts
  ];

  tagSuggestions = ['Hot lead', 'Renewal', 'Needs demo', 'Champion', 'At risk'];
}
`;

export const CRM_HTML_SOURCE = `<nx-metric-grid [minColumnWidth]="200">
    <nx-metric-card label="Pipeline value" [value]="148000" prefix="$" delta="+14%"></nx-metric-card>
    <nx-metric-card label="Win rate" [value]="38" suffix="%" delta="+3%"></nx-metric-card>
</nx-metric-grid>

<nx-kanban [columns]="columns" (columnsChange)="columns = $event"></nx-kanban>

<table>
    <thead><tr><th>Contact</th><th>Stage</th><th>Deal value</th><th>Last contact</th><th>Tags</th></tr></thead>
    <tbody>
        @for (contact of contacts; track contact.name) {
            <tr>
                <td><nx-avatar [name]="contact.name" size="small"></nx-avatar> {{ contact.name }}</td>
                <td><nx-badge [variant]="stageVariant(contact.stage)">{{ contact.stage }}</nx-badge></td>
                <td>{{ contact.dealValue }}</td>
                <td>{{ contact.lastContact }}</td>
                <td><nx-tag-input [(value)]="contact.tags" [suggestions]="tagSuggestions"></nx-tag-input></td>
            </tr>
        }
    </tbody>
</table>
`;
