import { Component, inject, signal } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxMarkdownEditor } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-markdown-editor-demo',
  imports: [NxMarkdownEditor, DemoSection],
  templateUrl: './ui-markdown-editor-demo.html',
  styleUrl: './ui-markdown-editor-demo.scss',
})
export class UiMarkdownEditorDemo {
  importCode = `import { NxMarkdownEditor } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  // Signal rather than a plain property: onMarkdownChange below rewrites this on every keystroke,
  // and in this zoneless demo app a plain property write wouldn't be picked up by the template
  // until some unrelated click happened to trigger a re-render.
  markdown = signal(`# Release notes

This update adds **faster** sync and *smarter* conflict resolution.

- Background sync every 5 minutes
- Conflict resolution now asks before overwriting
- Minor bug fixes

\`\`\`
npm install nexium-ui@latest
\`\`\`
`);

  onMarkdownChange(value: string): void {
    this.markdown.set(value);
  }

  basicCode = `<nx-markdown-editor
    [value]="markdown()"
    (valueChange)="onMarkdownChange($event)">
</nx-markdown-editor>`;

  basicTs = `markdown = '# Release notes\\n\\nThis update adds **faster** sync and *smarter* conflict resolution.';

onMarkdownChange(value: string): void {
  this.markdown = value;
}`;
}
