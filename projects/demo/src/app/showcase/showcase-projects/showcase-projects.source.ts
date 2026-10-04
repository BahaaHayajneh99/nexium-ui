export const PROJECTS_TS_SOURCE = `import { Component, signal } from '@angular/core';
import { NxPageHeader, NxKanban, NxKanbanCard, NxKanbanColumn, NxModal, NxTransferBox, NxTransferItem } from 'nexium-ui';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [NxPageHeader, NxKanban, NxModal, NxTransferBox],
  templateUrl: './projects.html',
})
export class Projects {
  teamRoster: NxTransferItem[] = [
    { id: 'alex', label: 'Alex Chen' },
    { id: 'jordan', label: 'Jordan Blake' },
    // ...more team members
  ];

  memberNames: Record<string, string> = Object.fromEntries(this.teamRoster.map((m) => [m.id, m.label]));

  columns: NxKanbanColumn[] = [
    {
      id: 'backlog',
      title: 'Backlog',
      cards: [
        { id: 1, title: 'Redesign onboarding flow', description: 'Simplify the first-run experience.', assignees: [] },
      ],
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      cards: [
        { id: 3, title: 'Migrate billing to yearly plans', description: 'Backend work for pricing tiers.', assignees: ['maria', 'sam'] },
      ],
    },
    // ...more columns
  ];

  assignPanelOpen = signal(false);
  selectedCard = signal<NxKanbanCard | null>(null);

  openAssignPanel(card: NxKanbanCard): void {
    this.selectedCard.set(card);
    this.assignPanelOpen.set(true);
  }

  onAssigneesChange(ids: string[]): void {
    // find the card by id across columns, set assignees = ids, update selectedCard
  }
}
`;

export const PROJECTS_HTML_SOURCE = `<div class="page">
    <nx-page-header title="Projects" description="Drag cards between columns - real drag-and-drop, not a mockup."></nx-page-header>

    <nx-kanban
        [columns]="columns"
        [memberNames]="memberNames"
        (columnsChange)="columns = $event"
        (cardAssignClicked)="openAssignPanel($event)">
    </nx-kanban>
</div>

<nx-modal [open]="assignPanelOpen()" (openChange)="assignPanelOpen.set($event)" header="Assign team members">
    @if (selectedCard(); as card) {
        <nx-transfer-box [items]="teamRoster" [selectedIds]="card.assignees ?? []" (selectedIdsChange)="onAssigneesChange($event)"></nx-transfer-box>
    }
</nx-modal>
`;
