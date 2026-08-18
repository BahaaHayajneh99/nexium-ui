import { Component } from '@angular/core';
import { UiCommandPalette, NxCommandItem, UiButton } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-command-palette-demo',
  imports: [UiCommandPalette, UiButton, DemoSection],
  templateUrl: './ui-command-palette-demo.html',
})
export class UiCommandPaletteDemo {
  open = false;
  lastExecuted = '';

  commands: NxCommandItem[] = [
    { id: 'new-file', label: 'New File', shortcut: 'Ctrl N', group: 'File' },
    { id: 'open-file', label: 'Open File', shortcut: 'Ctrl O', group: 'File' },
    { id: 'toggle-theme', label: 'Toggle Theme', group: 'View' },
    { id: 'zoom-in', label: 'Zoom In', group: 'View' },
    { id: 'go-profile', label: 'Go to Profile', group: 'Navigate' },
    { id: 'go-settings', label: 'Go to Settings', group: 'Navigate' },
  ];

  basicCode = `<nx-button (click)="open = true">Open Command Palette (or press Ctrl K)</nx-button>

<nx-command-palette [(open)]="open" [commands]="commands" (execute)="onExecute($event)"></nx-command-palette>`;

  basicTs = `commands: NxCommandItem[] = [
  { id: 'new-file', label: 'New File', shortcut: 'Ctrl N', group: 'File' },
  { id: 'open-file', label: 'Open File', shortcut: 'Ctrl O', group: 'File' },
  { id: 'toggle-theme', label: 'Toggle Theme', group: 'View' },
  { id: 'zoom-in', label: 'Zoom In', group: 'View' },
  { id: 'go-profile', label: 'Go to Profile', group: 'Navigate' },
  { id: 'go-settings', label: 'Go to Settings', group: 'Navigate' },
];

onExecute(command: NxCommandItem): void {
  // run the command
}`;

  onExecute(command: NxCommandItem): void {
    this.lastExecuted = command.label;
  }
}
