import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NxNavbar, NxIcon, NxKanban, NxKanbanColumn, NxMetricGrid, NxMetricCard, NxAvatar, NxBadge, NxTagInput } from 'components';
import { ShowcaseSourceView } from '../shared/showcase-source-view/showcase-source-view';
import { CRM_TS_SOURCE, CRM_HTML_SOURCE } from './showcase-crm.source';

interface NxShowcaseContact {
  name: string;
  company: string;
  lastContact: string;
  dealValue: number;
  stage: 'Lead' | 'Qualified' | 'Proposal' | 'Won';
  tags: string[];
}

@Component({
  selector: 'app-showcase-crm',
  standalone: true,
  imports: [RouterLink, NxNavbar, NxIcon, NxKanban, NxMetricGrid, NxMetricCard, NxAvatar, NxBadge, NxTagInput, ShowcaseSourceView],
  templateUrl: './showcase-crm.html',
  styleUrl: './showcase-crm.scss',
})
export class ShowcaseCrm {
  tsSource = CRM_TS_SOURCE;
  htmlSource = CRM_HTML_SOURCE;

  columns: NxKanbanColumn[] = [
    {
      id: 'lead',
      title: 'Lead',
      cards: [
        { id: 1, title: 'Vertex Studio', description: '$18,000 · Referral from Bluewave' },
        { id: 2, title: 'Northwind Retail', description: '$9,500 · Inbound demo request' },
      ],
    },
    {
      id: 'qualified',
      title: 'Qualified',
      cards: [
        { id: 3, title: 'Harbor Systems', description: '$24,000 · Expanding to 40 seats' },
        { id: 4, title: 'Cascade Freight', description: '$12,000 · Evaluating vs. competitor' },
      ],
    },
    {
      id: 'proposal',
      title: 'Proposal',
      cards: [{ id: 5, title: 'Lumen Health', description: '$36,000 · Enterprise proposal sent' }],
    },
    {
      id: 'negotiation',
      title: 'Negotiation',
      cards: [{ id: 6, title: 'Orbit Labs', description: '$48,000 · Redlining contract terms' }],
    },
    {
      id: 'won',
      title: 'Won',
      cards: [
        { id: 7, title: 'Bluewave Inc.', description: '$21,000 · Closed this month' },
        { id: 8, title: 'Nimbus Retail', description: '$15,500 · Closed this month' },
      ],
    },
  ];

  contacts: NxShowcaseContact[] = [
    { name: 'Marcus Webb', company: 'Orbit Labs', lastContact: '2 days ago', dealValue: 48000, stage: 'Proposal', tags: ['Hot lead', 'Champion'] },
    { name: 'Ava Thompson', company: 'Lumen Health', lastContact: '3 days ago', dealValue: 36000, stage: 'Proposal', tags: ['Enterprise'] },
    { name: 'Elena Ruiz', company: 'Harbor Systems', lastContact: '5 days ago', dealValue: 24000, stage: 'Qualified', tags: ['Needs demo', 'Expansion'] },
    { name: 'Daniel Cho', company: 'Cascade Freight', lastContact: '1 week ago', dealValue: 12000, stage: 'Qualified', tags: ['At risk'] },
    { name: 'Priya Nair', company: 'Bluewave Inc.', lastContact: '1 week ago', dealValue: 21000, stage: 'Won', tags: ['Renewal', 'Champion'] },
  ];

  tagSuggestions = ['Hot lead', 'Renewal', 'Needs demo', 'Champion', 'At risk', 'Expansion', 'Enterprise', 'Referral'];

  stageVariant(stage: NxShowcaseContact['stage']): 'secondary' | 'info' | 'primary' | 'success' {
    if (stage === 'Lead') return 'secondary';
    if (stage === 'Qualified') return 'info';
    if (stage === 'Proposal') return 'primary';
    return 'success';
  }
}
