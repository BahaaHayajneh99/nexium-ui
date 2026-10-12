import { Component, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { NxDockLayout, NxDockPanel, NxDockPanelContent, NxIcon } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-dock-layout-demo',
  imports: [NxDockLayout, NxDockPanelContent, NxIcon, JsonPipe, DemoSection],
  templateUrl: './ui-dock-layout-demo.html',
  styleUrl: './ui-dock-layout-demo.scss',
})
export class UiDockLayoutDemo {
  importCode = `import { NxDockLayout, NxDockPanelContent } from 'nexium-ui';`;

  // Signal rather than a plain field: panelClosed below removes an entry, and in this zoneless
  // demo app a plain-array mutation wouldn't be picked up until some unrelated click re-rendered.
  idePanels = signal<NxDockPanel[]>([
    { id: 'explorer', title: 'Explorer', region: 'left', size: 240 },
    { id: 'properties', title: 'Properties', region: 'right', size: 260 },
    { id: 'console', title: 'Console', region: 'bottom', size: 180 },
    { id: 'editor', title: 'Editor', region: 'center', closable: false },
  ]);

  lastLayoutChange = signal<Record<string, number> | null>(null);
  lastClosedPanel = signal<string | null>(null);

  files = [
    { name: 'src', type: 'folder' },
    { name: 'app.component.ts', type: 'file', depth: 1 },
    { name: 'app.routes.ts', type: 'file', depth: 1 },
    { name: 'components', type: 'folder', depth: 1 },
    { name: 'ui-dock-layout.ts', type: 'file', depth: 2 },
    { name: 'ui-dock-layout.html', type: 'file', depth: 2 },
    { name: 'ui-dock-layout.scss', type: 'file', depth: 2 },
    { name: 'package.json', type: 'file' },
    { name: 'tsconfig.json', type: 'file' },
  ];

  consoleLines = [
    { level: 'info', text: 'Compiled successfully in 842ms.' },
    { level: 'warn', text: 'NG0912: Component NxDockLayout has an unknown selector match.' },
    { level: 'info', text: 'Watching for file changes...' },
    { level: 'error', text: "Cannot find name 'foo' in ui-dock-layout.ts:42." },
  ];

  onPanelClosed(panelId: string): void {
    this.lastClosedPanel.set(panelId);
    this.idePanels.update((panels) => panels.filter((p) => p.id !== panelId));
  }

  onLayoutChange(sizes: Record<string, number>): void {
    this.lastLayoutChange.set(sizes);
  }

  resetLayout(): void {
    this.idePanels.set([
      { id: 'explorer', title: 'Explorer', region: 'left', size: 240 },
      { id: 'properties', title: 'Properties', region: 'right', size: 260 },
      { id: 'console', title: 'Console', region: 'bottom', size: 180 },
      { id: 'editor', title: 'Editor', region: 'center', closable: false },
    ]);
    this.lastClosedPanel.set(null);
    this.lastLayoutChange.set(null);
  }

  basicCode = `<nx-dock-layout
  [panels]="idePanels()"
  (panelClosed)="onPanelClosed($event)"
  (layoutChange)="onLayoutChange($event)">

  <div nxDockPanelContent="explorer">...file tree...</div>
  <div nxDockPanelContent="properties">...properties form...</div>
  <div nxDockPanelContent="console">...log lines...</div>
  <div nxDockPanelContent="editor">...editor content...</div>
</nx-dock-layout>`;

  basicTs = `idePanels: NxDockPanel[] = [
  { id: 'explorer', title: 'Explorer', region: 'left', size: 240 },
  { id: 'properties', title: 'Properties', region: 'right', size: 260 },
  { id: 'console', title: 'Console', region: 'bottom', size: 180 },
  { id: 'editor', title: 'Editor', region: 'center', closable: false },
];

onPanelClosed(panelId: string): void {
  // The panel is already hidden internally; remove it from your own model too
  // so a later [panels] rebind doesn't bring it back.
  this.idePanels = this.idePanels.filter((p) => p.id !== panelId);
}

onLayoutChange(sizes: Record<string, number>): void {
  // sizes: { [panelId]: widthOrHeightPx } for every non-center panel - persist it however you like.
  localStorage.setItem('ide-layout', JSON.stringify(sizes));
}`;
}
