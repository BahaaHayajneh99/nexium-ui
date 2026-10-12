import { Component, inject, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { CommonService } from '../services/common.service';
import { NxBulkEditor, NxBulkEditorField, NxBulkEditorChange } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

interface DemoTicket {
  id: string;
  name: string;
  status: string;
  assignee: string;
  priority: string;
  dueDate: string;
}

@Component({
  selector: 'app-ui-bulk-editor-demo',
  imports: [NxBulkEditor, DemoSection, JsonPipe],
  templateUrl: './ui-bulk-editor-demo.html',
  styleUrl: './ui-bulk-editor-demo.scss',
})
export class UiBulkEditorDemo {
  importCode = `import { NxBulkEditor } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  tickets = signal<DemoTicket[]>([
    { id: 't-1', name: 'Login page throws 500 on submit', status: 'Open', assignee: 'Priya', priority: 'High', dueDate: '2026-10-12' },
    { id: 't-2', name: 'Dashboard chart mislabels Q3 totals', status: 'Open', assignee: 'Ahmed', priority: 'Medium', dueDate: '2026-10-15' },
    { id: 't-3', name: 'Export to CSV drops the last row', status: 'In Progress', assignee: 'Priya', priority: 'High', dueDate: '2026-10-10' },
    { id: 't-4', name: 'Dark mode toggle flickers on load', status: 'Open', assignee: 'Unassigned', priority: 'Low', dueDate: '2026-10-20' },
    { id: 't-5', name: 'Email notifications sent twice', status: 'In Progress', assignee: 'Ahmed', priority: 'High', dueDate: '2026-10-09' },
    { id: 't-6', name: 'Search filter ignores date range', status: 'Open', assignee: 'Unassigned', priority: 'Medium', dueDate: '2026-10-18' },
    { id: 't-7', name: 'Mobile nav menu overlaps footer', status: 'Resolved', assignee: 'Priya', priority: 'Low', dueDate: '2026-10-05' },
    { id: 't-8', name: 'Bulk import rejects valid CSV headers', status: 'Open', assignee: 'Ahmed', priority: 'High', dueDate: '2026-10-14' },
  ]);

  selectedIds = signal<Set<string>>(new Set());

  bulkEditorOpen = signal(false);

  bulkFields: NxBulkEditorField[] = [
    {
      key: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { label: 'Open', value: 'Open' },
        { label: 'In Progress', value: 'In Progress' },
        { label: 'Resolved', value: 'Resolved' },
      ],
    },
    {
      key: 'assignee',
      label: 'Assignee',
      type: 'select',
      options: [
        { label: 'Unassigned', value: 'Unassigned' },
        { label: 'Priya', value: 'Priya' },
        { label: 'Ahmed', value: 'Ahmed' },
      ],
    },
    {
      key: 'priority',
      label: 'Priority',
      type: 'select',
      options: [
        { label: 'Low', value: 'Low' },
        { label: 'Medium', value: 'Medium' },
        { label: 'High', value: 'High' },
      ],
    },
    { key: 'dueDate', label: 'Due Date', type: 'date' },
  ];

  lastPayload = signal<NxBulkEditorChange[] | null>(null);

  isSelected(id: string): boolean {
    return this.selectedIds().has(id);
  }

  toggleSelected(id: string, checked: boolean): void {
    this.selectedIds.update((set) => {
      const next = new Set(set);
      checked ? next.add(id) : next.delete(id);
      return next;
    });
  }

  get selectedRecords(): Record<string, unknown>[] {
    const selected = this.selectedIds();
    return this.tickets().filter((ticket) => selected.has(ticket.id)) as unknown as Record<string, unknown>[];
  }

  openBulkEditor(): void {
    this.bulkEditorOpen.set(true);
  }

  onApply(changes: NxBulkEditorChange[]): void {
    this.lastPayload.set(changes);

    // The host (this demo) owns applying the payload to its own records - NxBulkEditor never
    // mutates `records` itself.
    const selected = this.selectedIds();
    this.tickets.update((tickets) =>
      tickets.map((ticket) => {
        if (!selected.has(ticket.id)) return ticket;
        const patched = { ...ticket } as Record<string, unknown>;
        for (const change of changes) {
          patched[change.fieldKey] = change.value;
        }
        return patched as unknown as DemoTicket;
      }),
    );
  }

  onCancel(): void {
    this.lastPayload.set(null);
  }

  basicCode = `<button (click)="openBulkEditor()">Bulk Edit Selected</button>

<nx-bulk-editor
    [records]="selectedRecords"
    recordLabelKey="name"
    [fields]="bulkFields"
    [open]="bulkEditorOpen()"
    (openChange)="bulkEditorOpen.set($event)"
    (apply)="onApply($event)"
    (cancel)="onCancel()">
</nx-bulk-editor>`;

  basicTs = `bulkFields: NxBulkEditorField[] = [
  { key: 'status', label: 'Status', type: 'select', options: [
      { label: 'Open', value: 'Open' }, { label: 'In Progress', value: 'In Progress' }, { label: 'Resolved', value: 'Resolved' } ] },
  { key: 'assignee', label: 'Assignee', type: 'select', options: [ /* ... */ ] },
  { key: 'priority', label: 'Priority', type: 'select', options: [ /* ... */ ] },
  { key: 'dueDate', label: 'Due Date', type: 'date' },
];

onApply(changes: NxBulkEditorChange[]): void {
  // changes: only the fields the admin checked "Apply this field" for, e.g.
  // [{ fieldKey: 'status', value: 'Resolved' }, { fieldKey: 'assignee', value: 'Priya' }]
  // Apply them to your own records however you see fit - this component never mutates \`records\`.
}`;
}
