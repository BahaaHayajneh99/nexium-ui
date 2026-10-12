import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxVersionSelector, NxVersionOption } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-version-selector-demo',
  imports: [NxVersionSelector, DemoSection],
  templateUrl: './ui-version-selector-demo.html',
  styleUrl: './ui-version-selector-demo.scss',
})
export class UiVersionSelectorDemo {
  importCode = `import { NxVersionSelector } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  docVersions: NxVersionOption[] = [
    { label: 'v2.4', value: '2.4', tag: 'latest' },
    { label: 'v2.3', value: '2.3', tag: 'stable' },
    { label: 'v2.2', value: '2.2' },
    { label: 'v1.x', value: '1.x', tag: 'deprecated' },
  ];
  selectedDocVersion = '2.4';

  apiVersions: NxVersionOption[] = [
    { label: '2026-10-01', value: '2026-10-01', tag: 'beta' },
    { label: '2026-04-01', value: '2026-04-01', tag: 'stable' },
    { label: '2025-10-01', value: '2025-10-01', tag: 'deprecated' },
  ];
  selectedApiVersion = '2026-04-01';

  lastChange = '';

  onDocVersionChange(value: string): void {
    this.lastChange = `docs switched to ${value}`;
  }

  onApiVersionChange(value: string): void {
    this.lastChange = `API switched to ${value}`;
  }

  basicCode = `<nx-version-selector
    [versions]="docVersions"
    [(selected)]="selectedDocVersion"
    (selectedChange)="onDocVersionChange($event)">
</nx-version-selector>`;

  basicTs = `docVersions: NxVersionOption[] = [
  { label: 'v2.4', value: '2.4', tag: 'latest' },
  { label: 'v2.3', value: '2.3', tag: 'stable' },
  { label: 'v2.2', value: '2.2' },
  { label: 'v1.x', value: '1.x', tag: 'deprecated' },
];

selectedDocVersion = '2.4';

onDocVersionChange(value: string): void {
  // navigate to the docs build for this version
}`;

  apiCode = `<nx-version-selector
    [versions]="apiVersions"
    [(selected)]="selectedApiVersion"
    (selectedChange)="onApiVersionChange($event)">
</nx-version-selector>`;

  apiTs = `apiVersions: NxVersionOption[] = [
  { label: '2026-10-01', value: '2026-10-01', tag: 'beta' },
  { label: '2026-04-01', value: '2026-04-01', tag: 'stable' },
  { label: '2025-10-01', value: '2025-10-01', tag: 'deprecated' },
];`;
}
