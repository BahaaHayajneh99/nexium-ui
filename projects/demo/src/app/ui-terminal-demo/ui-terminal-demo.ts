import { Component, inject, signal } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxTerminal, NxTerminalLine } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-terminal-demo',
  imports: [NxTerminal, DemoSection],
  templateUrl: './ui-terminal-demo.html',
  styleUrl: './ui-terminal-demo.scss',
})
export class UiTerminalDemo {
  importCode = `import { NxTerminal, NxTerminalLine } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  lines: NxTerminalLine[] = [
    { type: 'input', text: 'npm install nexium-ui' },
    { type: 'output', text: 'added 1 package in 1.2s' },
    { type: 'input', text: 'npm run build' },
    { type: 'output', text: 'Build complete. Output: dist/components' },
    { type: 'input', text: 'npm test' },
    { type: 'error', text: 'Error: 2 tests failed in ui-terminal.spec.ts' },
  ];

  basicCode = `<nx-terminal [lines]="lines" prompt="$"></nx-terminal>`;

  basicTs = `lines: NxTerminalLine[] = [
  { type: 'input', text: 'npm install nexium-ui' },
  { type: 'output', text: 'added 1 package in 1.2s' },
  { type: 'input', text: 'npm run build' },
  { type: 'output', text: 'Build complete. Output: dist/components' },
  { type: 'input', text: 'npm test' },
  { type: 'error', text: 'Error: 2 tests failed in ui-terminal.spec.ts' },
];`;

  interactiveLines = signal<NxTerminalLine[]>([
    { type: 'output', text: 'Type a command and press Enter.' },
  ]);

  interactiveCode = `<nx-terminal
    [lines]="interactiveLines"
    [interactive]="true"
    prompt="$"
    (command)="onCommand($event)">
</nx-terminal>`;

  interactiveTs = `interactiveLines = signal<NxTerminalLine[]>([
  { type: 'output', text: 'Type a command and press Enter.' },
]);

onCommand(command: string): void {
  this.interactiveLines.update((lines) => [
    ...lines,
    { type: 'input', text: command },
    { type: 'output', text: \`Ran: \${command}\` },
  ]);
}`;

  onCommand(command: string): void {
    this.interactiveLines.update((lines) => [
      ...lines,
      { type: 'input', text: command },
      { type: 'output', text: `Ran: ${command}` },
    ]);
  }
}
