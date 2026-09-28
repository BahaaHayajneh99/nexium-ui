import { Component } from '@angular/core';
import { NxFilterChipGroup, NxFilterChipOption } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-filter-chip-group-demo',
  imports: [NxFilterChipGroup, DemoSection],
  templateUrl: './ui-filter-chip-group-demo.html',
  styleUrl: './ui-filter-chip-group-demo.scss',
})
export class UiFilterChipGroupDemo {
  importCode = `import { NxFilterChipGroup } from 'nexium-ui';`;

  statusOptions: NxFilterChipOption[] = [
    { id: 'open', label: 'Open', count: 12 },
    { id: 'in-progress', label: 'In progress', count: 5 },
    { id: 'closed', label: 'Closed', count: 34 },
    { id: 'blocked', label: 'Blocked', count: 2 },
  ];
  selectedStatuses: Array<string | number> = ['open'];

  basicCode = `<nx-filter-chip-group
    [options]="statusOptions"
    [selectedIds]="selectedStatuses"
    (selectedIdsChange)="selectedStatuses = $event">
</nx-filter-chip-group>`;

  basicTs = `statusOptions: NxFilterChipOption[] = [
  { id: 'open', label: 'Open', count: 12 },
  { id: 'in-progress', label: 'In progress', count: 5 },
  { id: 'closed', label: 'Closed', count: 34 },
  { id: 'blocked', label: 'Blocked', count: 2 },
];
selectedStatuses: Array<string | number> = ['open'];`;

  tagOptions: NxFilterChipOption[] = [
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'design', label: 'Design' },
    { id: 'infra', label: 'Infra' },
  ];
  selectedTags: Array<string | number> = [];

  noCountCode = `<nx-filter-chip-group
    [options]="tagOptions"
    [selectedIds]="selectedTags"
    clearLabel="Reset"
    (selectedIdsChange)="selectedTags = $event">
</nx-filter-chip-group>`;

  noCountTs = `// count is optional - omit it for a plain toggle chip.
// clearLabel customizes the text of the "Clear all" button
// (it only appears once at least one chip is selected).
tagOptions: NxFilterChipOption[] = [
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'design', label: 'Design' },
  { id: 'infra', label: 'Infra' },
];
selectedTags: Array<string | number> = [];`;
}
