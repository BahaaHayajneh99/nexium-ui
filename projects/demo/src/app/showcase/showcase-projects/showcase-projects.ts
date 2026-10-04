import { Component, signal } from '@angular/core';
import { NxPageHeader, NxKanban, NxKanbanCard, NxKanbanColumn, NxModal, NxTransferBox, NxTransferItem } from 'components';
import { ShowcaseSourceView } from '../shared/showcase-source-view/showcase-source-view';
import { PROJECTS_TS_SOURCE, PROJECTS_HTML_SOURCE } from './showcase-projects.source';

@Component({
  selector: 'app-showcase-projects',
  standalone: true,
  imports: [NxPageHeader, NxKanban, NxModal, NxTransferBox, ShowcaseSourceView],
  templateUrl: './showcase-projects.html',
  styleUrl: './showcase-projects.scss',
})
export class ShowcaseProjects {
  tsSource = PROJECTS_TS_SOURCE;
  htmlSource = PROJECTS_HTML_SOURCE;

  teamRoster: NxTransferItem[] = [
    { id: 'alex', label: 'Alex Chen' },
    { id: 'jordan', label: 'Jordan Blake' },
    { id: 'maria', label: 'Maria Gomez' },
    { id: 'sam', label: 'Sam Patel' },
    { id: 'taylor', label: 'Taylor Reed' },
    { id: 'noah', label: 'Noah Kim' },
    { id: 'liu', label: 'Liu Wang' },
  ];

  memberNames: Record<string, string> = Object.fromEntries(
    this.teamRoster.map((member) => [member.id, member.label]),
  );

  columns: NxKanbanColumn[] = [
    {
      id: 'backlog',
      title: 'Backlog',
      cards: [
        { id: 1, title: 'Redesign onboarding flow', description: 'Simplify the first-run experience for new teams.', assignees: [] },
        { id: 2, title: 'Add SSO for enterprise plan', description: 'SAML support requested by Vertex Studio.', assignees: [] },
      ],
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      cards: [
        { id: 3, title: 'Migrate billing to yearly plans', description: 'Backend work for the new pricing tiers.', assignees: ['maria', 'sam'] },
        { id: 4, title: 'Mobile app crash on export', description: 'Reported by 3 customers this week.', assignees: [] },
      ],
    },
    {
      id: 'review',
      title: 'In Review',
      cards: [{ id: 5, title: 'Dark mode contrast pass', description: 'Design review scheduled for Friday.', assignees: ['taylor'] }],
    },
    {
      id: 'done',
      title: 'Done',
      cards: [
        { id: 6, title: 'Q3 roadmap published', description: '', assignees: ['alex'] },
        { id: 7, title: 'Upgrade Postgres to v16', description: '', assignees: [] },
      ],
    },
  ];

  assignPanelOpen = signal(false);
  selectedCard = signal<NxKanbanCard | null>(null);

  openAssignPanel(card: NxKanbanCard): void {
    this.selectedCard.set(card);
    this.assignPanelOpen.set(true);
  }

  onAssigneesChange(ids: string[]): void {
    const current = this.selectedCard();
    if (!current) {
      return;
    }
    const updated: NxKanbanCard = { ...current, assignees: ids };
    this.columns = this.columns.map((column) => ({
      ...column,
      cards: column.cards.map((card) => (card.id === updated.id ? updated : card)),
    }));
    this.selectedCard.set(updated);
  }
}
