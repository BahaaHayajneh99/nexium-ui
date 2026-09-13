import { Component, EventEmitter, Input, Output, booleanAttribute } from '@angular/core';

export interface NxTodoItem {
  id: string | number;
  label: string;
  done: boolean;
}

@Component({
  selector: 'nx-todo-list',
  standalone: true,
  imports: [],
  templateUrl: './ui-todo-list.html',
  styleUrl: './ui-todo-list.scss',
})
export class NxTodoList {
  @Input() items: NxTodoItem[] = [];
  @Input() label = '';
  @Input() placeholder = 'Add a task...';
  @Input() emptyText = 'No tasks yet.';
  @Input({ transform: booleanAttribute }) showAddInput = true;
  @Input({ transform: booleanAttribute }) showSummary = true;
  @Input({ transform: booleanAttribute }) disabled = false;

  @Output() itemsChange = new EventEmitter<NxTodoItem[]>();
  @Output() itemAdded = new EventEmitter<NxTodoItem>();
  @Output() itemToggled = new EventEmitter<NxTodoItem>();
  @Output() itemRemoved = new EventEmitter<NxTodoItem>();

  draft = '';

  get remainingCount(): number {
    return this.items.filter((item) => !item.done).length;
  }

  onDraftInput(event: Event): void {
    this.draft = (event.target as HTMLInputElement).value;
  }

  addItem(): void {
    const label = this.draft.trim();
    if (!label || this.disabled) {
      return;
    }

    const item: NxTodoItem = { id: Date.now() + Math.random(), label, done: false };
    this.items = [...this.items, item];
    this.draft = '';
    this.itemsChange.emit(this.items);
    this.itemAdded.emit(item);
  }

  toggleItem(item: NxTodoItem): void {
    if (this.disabled) {
      return;
    }

    this.items = this.items.map((current) => (current === item ? { ...current, done: !current.done } : current));
    this.itemsChange.emit(this.items);
    this.itemToggled.emit(item);
  }

  removeItem(item: NxTodoItem): void {
    if (this.disabled) {
      return;
    }

    this.items = this.items.filter((current) => current !== item);
    this.itemsChange.emit(this.items);
    this.itemRemoved.emit(item);
  }
}
