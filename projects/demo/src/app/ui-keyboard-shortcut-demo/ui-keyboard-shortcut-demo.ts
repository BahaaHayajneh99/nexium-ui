import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxKeyboardShortcut } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-keyboard-shortcut-demo',
  imports: [NxKeyboardShortcut, DemoSection],
  templateUrl: './ui-keyboard-shortcut-demo.html',
  styleUrl: './ui-keyboard-shortcut-demo.scss',
})
export class UiKeyboardShortcutDemo {
  importCode = `import { NxKeyboardShortcut } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  stringCode = `<nx-keyboard-shortcut keys="Ctrl+K"></nx-keyboard-shortcut>
<nx-keyboard-shortcut keys="Ctrl+Shift+P"></nx-keyboard-shortcut>`;

  stringTs = `// keys accepts a "+"-joined string...`;

  arrayCode = `<nx-keyboard-shortcut [keys]="['Ctrl', 'Alt', 'Delete']"></nx-keyboard-shortcut>`;

  arrayTs = `// ...or an array of individual key names, rendered as the same styled <kbd> chips.`;

  contextCode = `<div class="command-row" *ngFor="let command of commands">
    <span>{{ command.label }}</span>
    <nx-keyboard-shortcut [keys]="command.keys"></nx-keyboard-shortcut>
</div>`;

  contextTs = `commands = [
  { label: 'Command palette', keys: 'Ctrl+K' },
  { label: 'Save', keys: 'Ctrl+S' },
  { label: 'Toggle sidebar', keys: 'Ctrl+B' },
];`;

  commands = [
    { label: 'Command palette', keys: 'Ctrl+K' },
    { label: 'Save', keys: 'Ctrl+S' },
    { label: 'Toggle sidebar', keys: 'Ctrl+B' },
  ];
}
