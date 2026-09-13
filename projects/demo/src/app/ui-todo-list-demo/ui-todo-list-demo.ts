import { Component } from '@angular/core';
import { NxTodoList, NxTodoItem } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-todo-list-demo',
  imports: [NxTodoList, DemoSection],
  templateUrl: './ui-todo-list-demo.html',
  styleUrl: './ui-todo-list-demo.scss',
})
export class UiTodoListDemo {
  importCode = `import { NxTodoList, NxTodoItem } from 'nexium-ui';`;

  tasks: NxTodoItem[] = [
    { id: 1, label: 'Write documentation', done: false },
    { id: 2, label: 'Review pull request', done: true },
    { id: 3, label: 'Ship the release', done: false },
  ];

  basicCode = `<nx-todo-list [items]="tasks" (itemsChange)="tasks = $event"></nx-todo-list>`;
  basicTs = `tasks: NxTodoItem[] = [
  { id: 1, label: 'Write documentation', done: false },
  { id: 2, label: 'Review pull request', done: true },
  { id: 3, label: 'Ship the release', done: false },
];`;

  reactingTasks: NxTodoItem[] = [
    { id: 1, label: 'Plan the sprint', done: false },
  ];
  lastAdded = '';

  onItemAdded(item: NxTodoItem): void {
    this.lastAdded = item.label;
  }

  reactingCode = `<nx-todo-list
  [items]="reactingTasks"
  (itemsChange)="reactingTasks = $event"
  (itemAdded)="onItemAdded($event)">
</nx-todo-list>

@if (lastAdded) {
  <p>Last added: "{{ lastAdded }}"</p>
}`;

  reactingTs = `reactingTasks: NxTodoItem[] = [
  { id: 1, label: 'Plan the sprint', done: false },
];
lastAdded = '';

onItemAdded(item: NxTodoItem): void {
  this.lastAdded = item.label;
}`;

  readonlyTasks: NxTodoItem[] = [
    { id: 1, label: 'Onboarding step 1: verify email', done: true },
    { id: 2, label: 'Onboarding step 2: set a password', done: false },
  ];

  noAddCode = `<nx-todo-list [items]="readonlyTasks" [showAddInput]="false"></nx-todo-list>`;

  disabledTasks: NxTodoItem[] = [
    { id: 1, label: 'Approved by manager', done: true },
    { id: 2, label: 'Awaiting finance sign-off', done: false },
  ];

  disabledCode = `<nx-todo-list [items]="disabledTasks" [disabled]="true"></nx-todo-list>`;

  emptyCode = `<nx-todo-list [items]="[]" emptyText="Nothing to do - enjoy your day!"></nx-todo-list>`;
}
