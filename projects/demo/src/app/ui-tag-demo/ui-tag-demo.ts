import { Component } from '@angular/core';
import { UiTag } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-tag-demo',
  imports: [UiTag, DemoSection],
  templateUrl: './ui-tag-demo.html',
})
export class UiTagDemo {
  basicCode = `<nx-tag color="#2a78d6">JavaScript</nx-tag>
<nx-tag color="#eb6834">CSS</nx-tag>
<nx-tag color="#1baf7a">Design</nx-tag>
<nx-tag color="#e34948">Urgent</nx-tag>`;

  outlineCode = `<nx-tag variant="outline" color="#2a78d6">JavaScript</nx-tag>
<nx-tag variant="outline" color="#eb6834">CSS</nx-tag>
<nx-tag variant="outline" color="#1baf7a">Design</nx-tag>`;

  skills = [
    { label: 'Angular', color: '#e34948' },
    { label: 'TypeScript', color: '#2a78d6' },
    { label: 'SCSS', color: '#e87ba4' },
    { label: 'RxJS', color: '#4a3aa7' },
  ];

  closableCode = `@for (skill of skills; track skill.label) {
    <nx-tag [color]="skill.color" [closable]="true" (closed)="removeSkill(skill)">
        {{ skill.label }}
    </nx-tag>
}`;

  closableTs = `skills = [
  { label: 'Angular', color: '#e34948' },
  { label: 'TypeScript', color: '#2a78d6' },
  { label: 'SCSS', color: '#e87ba4' },
  { label: 'RxJS', color: '#4a3aa7' },
];

removeSkill(skill: { label: string; color: string }): void {
  this.skills = this.skills.filter((s) => s !== skill);
}`;

  removeSkill(skill: { label: string; color: string }): void {
    this.skills = this.skills.filter((s) => s !== skill);
  }

  disabledCode = `<nx-tag color="#6c757d" [disabled]="true">Archived</nx-tag>`;
}
