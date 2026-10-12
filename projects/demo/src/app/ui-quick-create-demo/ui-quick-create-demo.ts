import { Component, inject, signal } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxQuickCreate, NxQuickCreateField } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

interface DemoTask {
  title: string;
  priority: string;
}

interface DemoContact {
  name: string;
  email: string;
  age: number | null;
}

@Component({
  selector: 'app-ui-quick-create-demo',
  imports: [NxQuickCreate, DemoSection],
  templateUrl: './ui-quick-create-demo.html',
  styleUrl: './ui-quick-create-demo.scss',
})
export class UiQuickCreateDemo {
  importCode = `import { NxQuickCreate } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  taskFields: NxQuickCreateField[] = [
    { key: 'title', label: 'Title', type: 'text' },
    {
      key: 'priority',
      label: 'Priority',
      type: 'select',
      options: [
        { label: 'Low', value: 'low' },
        { label: 'Medium', value: 'medium' },
        { label: 'High', value: 'high' },
      ],
    },
  ];

  tasks = signal<DemoTask[]>([
    { title: 'Write the v2.4.0 release notes', priority: 'medium' },
    { title: 'Fix the cache invalidation edge case', priority: 'high' },
  ]);

  contactFields: NxQuickCreateField[] = [
    { key: 'name', label: 'Name', type: 'text' },
    { key: 'email', label: 'Email', type: 'text' },
    { key: 'age', label: 'Age', type: 'number' },
  ];

  contacts = signal<DemoContact[]>([
    { name: 'Priya Shah', email: 'priya@example.com', age: 29 },
  ]);

  customExpanded = false;
  customLog = '';

  onTaskCreated(value: Record<string, unknown>): void {
    this.tasks.update((current) => [
      ...current,
      { title: String(value['title'] ?? ''), priority: String(value['priority'] ?? 'low') },
    ]);
  }

  onContactCreated(value: Record<string, unknown>): void {
    this.contacts.update((current) => [
      ...current,
      {
        name: String(value['name'] ?? ''),
        email: String(value['email'] ?? ''),
        age: typeof value['age'] === 'number' ? (value['age'] as number) : null,
      },
    ]);
  }

  onCustomCreated(value: Record<string, unknown>): void {
    this.customLog = `created: ${JSON.stringify(value)}`;
  }

  taskCode = `<nx-quick-create [fields]="taskFields" (create)="onTaskCreated($event)"></nx-quick-create>`;

  taskTs = `taskFields: NxQuickCreateField[] = [
  { key: 'title', label: 'Title', type: 'text' },
  { key: 'priority', label: 'Priority', type: 'select', options: [
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' },
  ]},
];

onTaskCreated(value: Record<string, unknown>): void {
  // value = { title: '...', priority: 'medium' } - push it onto your list
}`;

  contactCode = `<nx-quick-create [fields]="contactFields" (create)="onContactCreated($event)"></nx-quick-create>`;

  contactTs = `contactFields: NxQuickCreateField[] = [
  { key: 'name', label: 'Name', type: 'text' },
  { key: 'email', label: 'Email', type: 'text' },
  { key: 'age', label: 'Age', type: 'number' },
];`;

  customCode = `<nx-quick-create
    [fields]="taskFields"
    [(expanded)]="customExpanded"
    (create)="onCustomCreated($event)">
    <span trigger class="custom-trigger">New task +</span>
</nx-quick-create>`;

  customTs = `// A custom [trigger] slot replaces the default "+ Add" button entirely, and
// [(expanded)] lets the host open/close the mini-form programmatically too.`;
}
