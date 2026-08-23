import { Component } from '@angular/core';
import { NxMenubar, NxMenubarItem, NxMenuItem } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-menubar-demo',
  imports: [NxMenubar, DemoSection],
  templateUrl: './ui-menubar-demo.html',
})
export class UiMenubarDemo {
  importCode = `import { NxMenubar, NxMenubarItem, NxMenuItem } from 'nexium-ui';`;

  lastSelected = '';

  menus: NxMenubarItem[] = [
    {
      label: 'File',
      items: [
        { id: 'new', label: 'New File' },
        { id: 'open', label: 'Open...' },
        { id: 'save', label: 'Save' },
      ],
    },
    {
      label: 'Edit',
      items: [
        { id: 'undo', label: 'Undo' },
        { id: 'redo', label: 'Redo' },
      ],
    },
    {
      label: 'View',
      items: [
        { id: 'zoom-in', label: 'Zoom In' },
        { id: 'zoom-out', label: 'Zoom Out' },
      ],
    },
  ];

  basicCode = `<nx-menubar [menus]="menus" (itemSelect)="onSelect($event)"></nx-menubar>`;

  basicTs = `menus: NxMenubarItem[] = [
  { label: 'File', items: [{ id: 'new', label: 'New File' }, { id: 'open', label: 'Open...' }, { id: 'save', label: 'Save' }] },
  { label: 'Edit', items: [{ id: 'undo', label: 'Undo' }, { id: 'redo', label: 'Redo' }] },
  { label: 'View', items: [{ id: 'zoom-in', label: 'Zoom In' }, { id: 'zoom-out', label: 'Zoom Out' }] },
];`;

  onSelect(item: NxMenuItem): void {
    this.lastSelected = item.label;
  }
}
