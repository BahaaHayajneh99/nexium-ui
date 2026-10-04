import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';
import { NxAvatar } from '../../data-display/ui-avatar';

export interface NxKanbanCard {
  id: string | number;
  title: string;
  description?: string;
  /** Ids of assigned members, resolved to display names via `memberNames` for the avatar row. */
  assignees?: string[];
}

export interface NxKanbanColumn {
  id: string | number;
  title: string;
  cards: NxKanbanCard[];
}

export interface NxKanbanCardMovedEvent {
  card: NxKanbanCard;
  fromColumnId: string | number;
  toColumnId: string | number;
}

/** A drag-between-columns board - cards move from one column to another via native HTML5 drag and drop. */
@Component({
  selector: 'nx-kanban',
  standalone: true,
  imports: [NxProLocked, NxAvatar],
  templateUrl: './ui-kanban.html',
  styleUrl: './ui-kanban.scss',
})
export class NxKanban {
  protected readonly licensed = nxProLicenseGranted();

  @Input() columns: NxKanbanColumn[] = [];
  /** Maps an assignee id (from `card.assignees`) to a display name, for the avatar initials. */
  @Input() memberNames: Record<string, string> = {};

  @Output() columnsChange = new EventEmitter<NxKanbanColumn[]>();
  @Output() cardMoved = new EventEmitter<NxKanbanCardMovedEvent>();
  /** Emitted when the card's assign affordance (not the card itself) is clicked. */
  @Output() cardAssignClicked = new EventEmitter<NxKanbanCard>();

  dragOverColumnId = signal<string | number | null>(null);

  private draggedCard: { card: NxKanbanCard; columnId: string | number } | null = null;

  onCardDragStart(card: NxKanbanCard, columnId: string | number, event: DragEvent): void {
    this.draggedCard = { card, columnId };
    event.dataTransfer?.setData('text/plain', String(card.id));
  }

  onColumnDragOver(columnId: string | number, event: DragEvent): void {
    event.preventDefault();
    this.dragOverColumnId.set(columnId);
  }

  onColumnDragLeave(): void {
    this.dragOverColumnId.set(null);
  }

  onColumnDrop(toColumnId: string | number, event: DragEvent): void {
    event.preventDefault();
    this.dragOverColumnId.set(null);
    if (!this.draggedCard) {
      return;
    }

    const { card, columnId: fromColumnId } = this.draggedCard;
    this.draggedCard = null;
    if (fromColumnId === toColumnId) {
      return;
    }

    const next = this.columns.map((column) => {
      if (column.id === fromColumnId) {
        return { ...column, cards: column.cards.filter((c) => c.id !== card.id) };
      }
      if (column.id === toColumnId) {
        return { ...column, cards: [...column.cards, card] };
      }
      return column;
    });

    this.columns = next;
    this.columnsChange.emit(next);
    this.cardMoved.emit({ card, fromColumnId, toColumnId });
  }

  onCardDragEnd(): void {
    this.draggedCard = null;
    this.dragOverColumnId.set(null);
  }

  /** Only consumers that opt in with `[memberNames]` get the assignee footer - everyone else's cards render exactly as before. */
  hasAssigneeSupport(): boolean {
    return Object.keys(this.memberNames).length > 0;
  }

  assigneeName(id: string): string {
    return this.memberNames[id] ?? id;
  }

  visibleAssignees(card: NxKanbanCard): string[] {
    return (card.assignees ?? []).slice(0, 3);
  }
}
