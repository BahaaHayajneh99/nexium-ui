import { Component, inject } from '@angular/core';
import { NxKanban, NxKanbanCardMovedEvent, NxKanbanColumn } from 'components';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-kanban-demo',
  imports: [NxKanban, DemoSection],
  templateUrl: './ui-kanban-demo.html',
  styleUrl: './ui-kanban-demo.scss',
})
export class UiKanbanDemo {
  importCode = `import { NxKanban } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  columns: NxKanbanColumn[] = [
    {
      id: 'todo',
      title: 'To do',
      cards: [
        { id: 1, title: 'Set up CI pipeline', description: 'GitHub Actions for lint + test' },
        { id: 2, title: 'Draft onboarding docs' },
      ],
    },
    {
      id: 'in-progress',
      title: 'In progress',
      cards: [{ id: 3, title: 'Virtual scroll component', description: 'Row buffer + smooth scroll' }],
    },
    {
      id: 'done',
      title: 'Done',
      cards: [{ id: 4, title: 'Design tokens', description: 'Color + spacing scale' }],
    },
  ];

  lastMove = '';

  basicCode = `<nx-kanban [(columns)]="columns" (cardMoved)="onCardMoved($event)"></nx-kanban>`;

  basicTs = `columns: NxKanbanColumn[] = [
  { id: 'todo', title: 'To do', cards: [ /* ... */ ] },
  { id: 'in-progress', title: 'In progress', cards: [ /* ... */ ] },
  { id: 'done', title: 'Done', cards: [ /* ... */ ] },
];

onCardMoved(event: NxKanbanCardMovedEvent): void {
  // event.card, event.fromColumnId, event.toColumnId - cards move via
  // native HTML5 drag and drop between <nx-kanban> columns.
}`;

  onCardMoved(event: NxKanbanCardMovedEvent): void {
    this.lastMove = `"${event.card.title}" moved from "${event.fromColumnId}" to "${event.toColumnId}"`;
  }
}
