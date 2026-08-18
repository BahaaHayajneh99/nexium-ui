import { Component } from '@angular/core';
import { UiInput, UiCheckbox } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

interface TeamMember {
  name: string;
  email: string;
}

@Component({
  selector: 'app-form-builder-advanced-demo',
  imports: [UiInput, UiCheckbox, DemoSection],
  templateUrl: './form-builder-advanced-demo.html',
  styleUrl: './form-builder-advanced-demo.scss',
})
export class FormBuilderAdvancedDemo {
  projectName = '';
  agree = false;
  submitted = false;

  members: TeamMember[] = [{ name: '', email: '' }];

  get projectNameError(): string {
    return this.submitted && !this.projectName ? 'Project name is required' : '';
  }

  get agreeError(): string {
    return this.submitted && !this.agree ? 'You must accept the terms to continue' : '';
  }

  basicCode = `<nx-input label="Project Name" [(value)]="projectName" [error]="projectNameError"></nx-input>

@for (member of members; track $index) {
    <nx-input label="Member Name" [(value)]="member.name"></nx-input>
    <nx-input label="Member Email" [(value)]="member.email"></nx-input>
    <button (click)="removeMember($index)">Remove</button>
}
<button (click)="addMember()">Add Member</button>

<nx-checkbox label="I agree to the terms" [(checked)]="agree"></nx-checkbox>
<button (click)="submit()">Submit</button>`;

  basicTs = `interface TeamMember {
  name: string;
  email: string;
}

projectName = '';
agree = false;
submitted = false;

members: TeamMember[] = [{ name: '', email: '' }];

get projectNameError(): string {
  return this.submitted && !this.projectName ? 'Project name is required' : '';
}

get agreeError(): string {
  return this.submitted && !this.agree ? 'You must accept the terms to continue' : '';
}

addMember(): void {
  this.members.push({ name: '', email: '' });
}

removeMember(index: number): void {
  this.members.splice(index, 1);
}

submit(): void {
  this.submitted = true;
}`;

  addMember(): void {
    this.members.push({ name: '', email: '' });
  }

  removeMember(index: number): void {
    this.members.splice(index, 1);
  }

  submit(): void {
    this.submitted = true;
  }
}
