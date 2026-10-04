import { Component, inject, signal } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxTagInput } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

const SKILL_SUGGESTIONS = [
  'Angular',
  'TypeScript',
  'JavaScript',
  'React',
  'Vue',
  'Node.js',
  'RxJS',
  'GraphQL',
  'Docker',
  'Kubernetes',
  'AWS',
  'PostgreSQL',
  'MongoDB',
  'Redis',
  'CSS',
  'HTML',
];

@Component({
  selector: 'app-ui-tag-input-demo',
  imports: [NxTagInput, DemoSection],
  templateUrl: './ui-tag-input-demo.html',
  styleUrl: './ui-tag-input-demo.scss',
})
export class UiTagInputDemo {
  importCode = `import { NxTagInput } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  keywords = signal<string[]>(['release', 'urgent']);
  onKeywordsChange(tags: string[]): void {
    this.keywords.set(tags);
  }

  skills = signal<string[]>(['Angular', 'TypeScript']);
  onSkillsChange(tags: string[]): void {
    this.skills.set(tags);
  }

  skillSuggestions = SKILL_SUGGESTIONS;

  basicCode = `<nx-tag-input [value]="keywords" (valueChange)="onKeywordsChange($event)" placeholder="Add a keyword..."></nx-tag-input>`;
  basicTs = `keywords = ['release', 'urgent'];

onKeywordsChange(tags: string[]) {
  this.keywords = tags;
}
// Type free text and press Enter or ',' to commit a tag. Backspace on an empty
// input removes the last tag. Duplicate tags (case-insensitive) are ignored.`;

  suggestionsCode = `<nx-tag-input
    [value]="skills"
    [suggestions]="skillSuggestions"
    (valueChange)="onSkillsChange($event)"
    placeholder="Add a skill...">
</nx-tag-input>`;
  suggestionsTs = `skills = ['Angular', 'TypeScript'];
skillSuggestions = ['Angular', 'TypeScript', 'JavaScript', 'React', /* ... */];

onSkillsChange(tags: string[]) {
  this.skills = tags;
}
// With a non-empty suggestions list, a filtered dropdown appears below the input as you type -
// click a suggestion to commit it as a tag instantly.`;
}
