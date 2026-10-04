import { Component, inject, signal } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxAiPromptBuilder, NxPromptTemplate } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

const STARTER_TEMPLATES: NxPromptTemplate[] = [
  {
    id: 'tpl-summarize',
    name: 'Summarize text',
    systemText: 'You are a concise technical writer.',
    userText: 'Summarize the following text in {{sentenceCount}} sentences:\n\n{{content}}',
    variables: [
      { name: 'sentenceCount', defaultValue: '3' },
      { name: 'content', defaultValue: '' },
    ],
  },
  {
    id: 'tpl-translate',
    name: 'Translate',
    userText: 'Translate the following text into {{targetLanguage}}:\n\n{{text}}',
    variables: [
      { name: 'targetLanguage', defaultValue: 'Spanish' },
      { name: 'text', defaultValue: '' },
    ],
  },
  {
    id: 'tpl-bug-report',
    name: 'Bug report formatter',
    systemText: 'You turn rough notes into a structured bug report.',
    userText: 'Rewrite these notes as a bug report with Steps to Reproduce, Expected, and Actual sections:\n\n{{notes}}',
    variables: [{ name: 'notes', defaultValue: '' }],
  },
];

@Component({
  selector: 'app-ui-ai-prompt-builder-demo',
  imports: [NxAiPromptBuilder, DemoSection],
  templateUrl: './ui-ai-prompt-builder-demo.html',
  styleUrl: './ui-ai-prompt-builder-demo.scss',
})
export class UiAiPromptBuilderDemo {
  importCode = `import { NxAiPromptBuilder } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  templates = signal<NxPromptTemplate[]>(STARTER_TEMPLATES);
  generatedPrompt = signal('');

  onTemplatesChange(next: NxPromptTemplate[]): void {
    this.templates.set(next);
  }

  onPromptGenerated(prompt: string): void {
    this.generatedPrompt.set(prompt);
  }

  basicCode = `<nx-ai-prompt-builder
    [templates]="templates()"
    (templatesChange)="onTemplatesChange($event)"
    (promptGenerated)="onPromptGenerated($event)">
</nx-ai-prompt-builder>`;

  basicTs = `templates: NxPromptTemplate[] = [
  {
    id: 'tpl-summarize',
    name: 'Summarize text',
    systemText: 'You are a concise technical writer.',
    userText: 'Summarize the following text in {{sentenceCount}} sentences:\\n\\n{{content}}',
    variables: [
      { name: 'sentenceCount', defaultValue: '3' },
      { name: 'content', defaultValue: '' },
    ],
  },
  {
    id: 'tpl-translate',
    name: 'Translate',
    userText: 'Translate the following text into {{targetLanguage}}:\\n\\n{{text}}',
    variables: [
      { name: 'targetLanguage', defaultValue: 'Spanish' },
      { name: 'text', defaultValue: '' },
    ],
  },
];

// Typing a new {{token}} into either text area auto-adds it to the variables list; removing
// the last occurrence auto-drops it again - there is no separate manual variable step.
onTemplatesChange(next: NxPromptTemplate[]): void {
  this.templates = next;
}

onPromptGenerated(prompt: string): void {
  // Send \`prompt\` to your own chat/completion call here.
  console.log(prompt);
}`;
}
