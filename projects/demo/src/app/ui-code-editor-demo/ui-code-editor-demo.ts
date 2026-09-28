import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NxCodeEditor } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-code-editor-demo',
  imports: [NxCodeEditor, DemoSection, FormsModule, ReactiveFormsModule],
  templateUrl: './ui-code-editor-demo.html',
  styleUrl: './ui-code-editor-demo.scss',
})
export class UiCodeEditorDemo {
  importCode = `import { NxCodeEditor } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  code = 'function greet(name) {\n  return `Hello, ${name}!`;\n}';

  basicCode = `<nx-code-editor language="javascript" [(ngModel)]="code"></nx-code-editor>`;

  basicTs = `code = 'function greet(name) {
  return \`Hello, \${name}!\`;
}';`;

  snippetControl = new FormControl('SELECT * FROM users WHERE active = true;');

  reactiveCode = `<nx-code-editor language="sql" [formControl]="snippetControl"></nx-code-editor>`;

  reactiveTs = `snippetControl = new FormControl('SELECT * FROM users WHERE active = true;');`;

  readme = '# Getting started\n\nInstall the package and import the component you need.';

  noGutterCode = `<nx-code-editor language="markdown" [showLineNumbers]="false" [(ngModel)]="readme"></nx-code-editor>`;

  noGutterTs = `readme = '# Getting started\\n\\nInstall the package and import the component you need.';`;
}
