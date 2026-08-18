import { Component } from '@angular/core';
import { UiRichTextEditor } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-rich-text-editor-demo',
  imports: [UiRichTextEditor, DemoSection],
  templateUrl: './ui-rich-text-editor-demo.html',
})
export class UiRichTextEditorDemo {
  content = '<p>Start typing to try <strong>bold</strong>, <em>italic</em>, lists and more.</p>';

  basicCode = `<nx-rich-text-editor [(value)]="content"></nx-rich-text-editor>`;
  basicTs = `content = '<p>Start typing to try <strong>bold</strong>, <em>italic</em>, lists and more.</p>';`;

  disabledCode = `<nx-rich-text-editor [value]="content" [disabled]="true"></nx-rich-text-editor>`;
}
