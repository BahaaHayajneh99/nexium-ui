import { Component } from '@angular/core';
import { NxTag } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-ui-tag-demo',
  imports: [NxTag, DemoSection,NgClass],

  templateUrl: './ui-tag-demo.html',
})
export class UiTagDemo {
  importCode = `import { NxTag } from 'nexium-ui';`;

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

  editableTags: string[] = ['Angular', 'Design'];
  newTagValue = '';

  editableCode = `@for (tag of editableTags; track tag) {
    <nx-tag color="var(--shell-primary)" [closable]="true" (closed)="removeTag(tag)">
        {{ tag }}
    </nx-tag>
}

<nx-tag
    color="var(--shell-primary)"
    variant="outline"
    [editable]="true"
    [(value)]="newTagValue"
    (added)="addTag($event)">
</nx-tag>`;

  editableTs = `editableTags: string[] = ['Angular', 'Design'];
newTagValue = '';

addTag(tag: string): void {
  if (!this.editableTags.includes(tag)) {
    this.editableTags = [...this.editableTags, tag];
  }
}

removeTag(tag: string): void {
  this.editableTags = this.editableTags.filter((t) => t !== tag);
}`;

  addTag(tag: string): void {
    if (!this.editableTags.includes(tag)) {
      this.editableTags = [...this.editableTags, tag];
    }
  }

  removeTag(tag: string): void {
    this.editableTags = this.editableTags.filter((t) => t !== tag);
  }
}
