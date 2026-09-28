import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { NxJsonEditor } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-json-editor-demo',
  imports: [NxJsonEditor, FormsModule, DemoSection],
  templateUrl: './ui-json-editor-demo.html',
  styleUrl: './ui-json-editor-demo.scss',
})
export class UiJsonEditorDemo {
  importCode = `import { NxJsonEditor } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  basicCode = `<nx-json-editor [(ngModel)]="settings" (valueChange)="onValueChange($event)"></nx-json-editor>`;

  basicTs = `settings: unknown = { theme: 'dark', notifications: true };

onValueChange(value: unknown): void {
  // Only fires when the current text is valid JSON.
  console.log('parsed value', value);
}`;

  settings: unknown = { theme: 'dark', notifications: true };
  lastParsed: unknown = null;

  onValueChange(value: unknown): void {
    this.lastParsed = value;
  }

  optionsCode = `<nx-json-editor
    placeholder='{
  "key": "value"
}'
    [indent]="4"
    [(ngModel)]="payload">
</nx-json-editor>`;

  optionsTs = `// placeholder shows when the editor is empty, indent controls the
// spacing used by the "Format" (pretty-print) action.
payload: unknown = null;`;

  payload: unknown = null;

  disabledCode = `<nx-json-editor [disabled]="true" [ngModel]="readonlyValue"></nx-json-editor>`;

  disabledTs = `readonlyValue = { locked: true, reason: 'read-only preview' };`;

  readonlyValue = { locked: true, reason: 'read-only preview' };
}
