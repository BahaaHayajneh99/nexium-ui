import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NxRichTextEditor } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-rich-text-editor-demo',
  imports: [NxRichTextEditor, DemoSection, FormsModule, ReactiveFormsModule],
  templateUrl: './ui-rich-text-editor-demo.html',
})
export class UiRichTextEditorDemo {
  importCode = `import { NxRichTextEditor } from 'nexium-ui';`;

  content = '<p>Start typing to try <strong>bold</strong>, <em>italic</em>, lists and more.</p>';

  enhancedContent = '<p>Type <strong>/</strong> for commands, or <strong>@</strong> to mention a teammate.</p>';
  mentionUsers = ['Priya Nair', 'Marcus Webb', 'Elena Ruiz', 'Owen Bishop'];

  onAutosave(html: string): void {
    console.log('autosaved', html.length, 'chars');
  }

  enhancedCode = `<nx-rich-text-editor
    [(ngModel)]="content"
    [mentionUsers]="mentionUsers"
    [autosaveInterval]="4000"
    (autosave)="onAutosave($event)">
</nx-rich-text-editor>`;

  enhancedTs = `mentionUsers = ['Priya Nair', 'Marcus Webb', 'Elena Ruiz', 'Owen Bishop'];

onAutosave(html: string): void {
  // fires every 4s while there are unsaved changes
  console.log('autosaved', html.length, 'chars');
}`;

  private fb = new FormBuilder();

  contentForm = this.fb.group({
    content: ['<p>Start typing to try <strong>bold</strong>, <em>italic</em>, lists and more.</p>'],
  });

  reactiveCode = `<div [formGroup]="contentForm">
    <nx-rich-text-editor formControlName="content"></nx-rich-text-editor>
</div>`;
  reactiveTs = `contentForm = this.fb.group({
  content: ['<p>Start typing to try <strong>bold</strong>, <em>italic</em>, lists and more.</p>'],
});`;

  templateCode = `<nx-rich-text-editor [(ngModel)]="content"></nx-rich-text-editor>`;
  templateTs = `content = '<p>Start typing to try <strong>bold</strong>, <em>italic</em>, lists and more.</p>';`;

  disabledCode = `<nx-rich-text-editor [value]="content" [disabled]="true"></nx-rich-text-editor>`;

  requiredContent = '';

  requiredCode = `<nx-rich-text-editor [isRequired]="true" [(ngModel)]="requiredContent">
</nx-rich-text-editor>`;
}
