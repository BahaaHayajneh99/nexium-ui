import { Component } from '@angular/core';
import { NxTable, NxTableColumn, NxFunnelChart, NxFunnelStage, NxAvatar } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-templates-crm-demo',
  imports: [NxTable, NxFunnelChart, NxAvatar, DemoSection],
  templateUrl: './templates-crm-demo.html',
})
export class TemplatesCrmDemo {
  pipeline: NxFunnelStage[] = [
    { label: 'Leads', value: 420 },
    { label: 'Qualified', value: 260 },
    { label: 'Proposal Sent', value: 140 },
    { label: 'Negotiation', value: 78 },
    { label: 'Closed Won', value: 46 },
  ];

  columns: NxTableColumn[] = [
    { field: 'company', header: 'Company' },
    { field: 'contact', header: 'Contact' },
    { field: 'value', header: 'Deal Value' },
    { field: 'stage', header: 'Stage' },
  ];

  deals: Record<string, unknown>[] = [
    { company: 'Initech', contact: 'Ada Lovelace', value: '$24,000', stage: 'Negotiation' },
    { company: 'Globex', contact: 'Grace Hopper', value: '$12,500', stage: 'Proposal Sent' },
    { company: 'Umbrella Corp', contact: 'Alan Turing', value: '$8,900', stage: 'Qualified' },
    { company: 'Soylent', contact: 'Margaret Hamilton', value: '$41,200', stage: 'Closed Won' },
  ];

  recentContacts = [
    { name: 'Ada Lovelace', company: 'Initech' },
    { name: 'Grace Hopper', company: 'Globex' },
    { name: 'Alan Turing', company: 'Umbrella Corp' },
  ];

  pipelineCode = `<nx-funnel-chart [stages]="pipeline"></nx-funnel-chart>`;

  dealsCode = `<nx-table [columns]="columns" [data]="deals" striped hoverable></nx-table>`;

  contactsCode = `<nx-avatar [name]="contact.name" size="medium"></nx-avatar>`;
}
