import { Component } from '@angular/core';
import { NxCard, NxCardContent, NxButton } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

type TaskStatus = 'To Do' | 'In Progress' | 'Done';

interface Task {
  title: string;
  status: TaskStatus;
}

@Component({
  selector: 'app-how-to-kanban-board-demo',
  imports: [NxCard, NxCardContent, NxButton, DemoSection],
  templateUrl: './how-to-kanban-board-demo.html',
  styleUrl: './how-to-kanban-board-demo.scss',
})
export class HowToKanbanBoardDemo {
  columns: TaskStatus[] = ['To Do', 'In Progress', 'Done'];

  tasks: Task[] = [
    { title: 'Design landing page', status: 'To Do' },
    { title: 'Write API docs', status: 'To Do' },
    { title: 'Build login form', status: 'In Progress' },
    { title: 'Fix nav overflow bug', status: 'In Progress' },
    { title: 'Set up CI pipeline', status: 'Done' },
  ];

  tasksIn(column: TaskStatus): Task[] {
    return this.tasks.filter((task) => task.status === column);
  }

  moveNext(task: Task): void {
    const index = this.columns.indexOf(task.status);
    if (index < this.columns.length - 1) task.status = this.columns[index + 1];
  }

  code = `@for (column of columns; track column) {
    <div class="kanban-column">
        <h4>{{ column }}</h4>
        @for (task of tasksIn(column); track task.title) {
            <nx-card variant="outlined">
                <nx-card-content>
                    {{ task.title }}
                    @if (task.status !== 'Done') {
                        <nx-button size="small" variant="secondary" (click)="moveNext(task)">Move &rarr;</nx-button>
                    }
                </nx-card-content>
            </nx-card>
        }
    </div>
}`;

  tsCode = `columns: TaskStatus[] = ['To Do', 'In Progress', 'Done'];

tasks: Task[] = [ /* ... */ ];

tasksIn(column: TaskStatus): Task[] {
  return this.tasks.filter((task) => task.status === column);
}

moveNext(task: Task): void {
  const index = this.columns.indexOf(task.status);
  if (index < this.columns.length - 1) task.status = this.columns[index + 1];
}`;
}
