import { Component, inject, signal } from '@angular/core';
import { NxDraggable, NxDropZone } from 'components';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

interface DemoCard {
  id: number;
  title: string;
}

type ColumnKey = 'todo' | 'done';

@Component({
  selector: 'app-directive-drag-drop-demo',
  imports: [NxDraggable, NxDropZone, DemoSection],
  templateUrl: './directive-drag-drop-demo.html',
  styleUrl: './directive-drag-drop-demo.scss',
})
export class DirectiveDragDropDemo {
  importCode = `import { NxDraggable, NxDropZone } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  todo = signal<DemoCard[]>([
    { id: 1, title: 'Write release notes' },
    { id: 2, title: 'Review pull request #482' },
    { id: 3, title: 'Update dependencies' },
  ]);

  done = signal<DemoCard[]>([{ id: 4, title: 'Fix flaky test' }]);

  code = `<div class="column" nxDropZone (nxDropZoneDrop)="onDrop($event, 'todo')">
    @for (card of todo(); track card.id) {
        <div [nxDraggable]="card" (dragStarted)="onDragStarted($event, 'todo')">
            {{ card.title }}
        </div>
    }
</div>

<div class="column" nxDropZone (nxDropZoneDrop)="onDrop($event, 'done')">
    @for (card of done(); track card.id) {
        <div [nxDraggable]="card" (dragStarted)="onDragStarted($event, 'done')">
            {{ card.title }}
        </div>
    }
</div>`;

  ts = `todo = signal<DemoCard[]>([ /* ... */ ]);
done = signal<DemoCard[]>([ /* ... */ ]);

private draggedFrom: 'todo' | 'done' | null = null;

onDragStarted(card: DemoCard, from: 'todo' | 'done'): void {
  this.draggedFrom = from;
}

onDrop(card: unknown, to: 'todo' | 'done'): void {
  const dropped = card as DemoCard;
  if (!dropped || this.draggedFrom === to) {
    return;
  }
  // remove from the source column, append to the destination column
  const source = this.draggedFrom === 'todo' ? this.todo : this.done;
  source.update((cards) => cards.filter((c) => c.id !== dropped.id));

  const target = to === 'todo' ? this.todo : this.done;
  target.update((cards) => [...cards, dropped]);
  this.draggedFrom = null;
}`;

  private draggedFrom: ColumnKey | null = null;

  onDragStarted(_card: DemoCard, from: ColumnKey): void {
    this.draggedFrom = from;
  }

  onDrop(payload: unknown, to: ColumnKey): void {
    const card = payload as DemoCard;
    if (!card || this.draggedFrom === to) {
      this.draggedFrom = null;
      return;
    }

    const source = this.draggedFrom === 'todo' ? this.todo : this.draggedFrom === 'done' ? this.done : null;
    source?.update((cards) => cards.filter((c) => c.id !== card.id));

    const target = to === 'todo' ? this.todo : this.done;
    target.update((cards) => [...cards, card]);
    this.draggedFrom = null;
  }
}
