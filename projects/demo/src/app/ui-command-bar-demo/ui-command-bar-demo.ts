import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxCommandBar, NxCommandBarGroup } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-command-bar-demo',
  imports: [NxCommandBar, DemoSection],
  templateUrl: './ui-command-bar-demo.html',
  styleUrl: './ui-command-bar-demo.scss',
})
export class UiCommandBarDemo {
  importCode = `import { NxCommandBar } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  basicCode = `<nx-command-bar [groups]="groups" (commandClick)="onCommandClick($event)"></nx-command-bar>`;

  basicTs = `groups: NxCommandBarGroup[] = [
  {
    items: [
      { id: 'save', label: 'Save', icon: 'nx-save' },
      { id: 'undo', label: 'Undo', icon: 'nx-refresh' },
    ],
  },
  {
    items: [
      { id: 'bold', label: 'Bold', icon: 'nx-edit' },
      { id: 'link', label: 'Link', icon: 'nx-link' },
      { id: 'share', label: 'Share', icon: 'nx-share', disabled: true },
    ],
  },
];

onCommandClick(id: string | number): void {
  console.log('command clicked', id);
}`;

  groups: NxCommandBarGroup[] = [
    {
      items: [
        { id: 'save', label: 'Save', icon: 'nx-save' },
        { id: 'undo', label: 'Undo', icon: 'nx-refresh' },
      ],
    },
    {
      items: [
        { id: 'bold', label: 'Bold', icon: 'nx-edit' },
        { id: 'link', label: 'Link', icon: 'nx-link' },
        { id: 'share', label: 'Share', icon: 'nx-share', disabled: true },
      ],
    },
  ];

  lastCommand: string | number | null = null;

  onCommandClick(id: string | number): void {
    this.lastCommand = id;
  }

  editorCode = `<nx-command-bar [groups]="editorGroups" (commandClick)="onCommandClick($event)"></nx-command-bar>`;

  editorTs = `// A typical use case - a document/editor action bar, grouped by function.
editorGroups: NxCommandBarGroup[] = [
  { items: [{ id: 'download', label: 'Download', icon: 'nx-download' }] },
  { items: [{ id: 'filter', label: 'Filter', icon: 'nx-filter' }, { id: 'settings', label: 'Settings', icon: 'nx-settings' }] },
];`;

  editorGroups: NxCommandBarGroup[] = [
    { items: [{ id: 'download', label: 'Download', icon: 'nx-download' }] },
    {
      items: [
        { id: 'filter', label: 'Filter', icon: 'nx-filter' },
        { id: 'settings', label: 'Settings', icon: 'nx-settings' },
      ],
    },
  ];
}
