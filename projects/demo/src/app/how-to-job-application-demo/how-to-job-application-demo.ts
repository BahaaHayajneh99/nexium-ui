import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxInput, NxTextarea, NxFileUpload, NxCheckbox, NxButton } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-how-to-job-application-demo',
  imports: [NxInput, NxTextarea, NxFileUpload, NxCheckbox, NxButton, FormsModule, DemoSection],
  templateUrl: './how-to-job-application-demo.html',
})
export class HowToJobApplicationDemo {
  fullName = '';
  email = '';
  coverLetter = '';
  resumeName = '';
  agreed = false;
  submitted = false;

  onResumeSelected(files: File[]): void {
    if (files.length) this.resumeName = files[0].name;
  }

  get canSubmit(): boolean {
    return !!this.fullName && !!this.email && this.agreed;
  }

  submit(): void {
    if (this.canSubmit) this.submitted = true;
  }

  code = `<nx-input label="Full Name" [(ngModel)]="fullName"></nx-input>
<nx-input label="Email" type="email" [(ngModel)]="email"></nx-input>
<nx-textarea label="Cover Letter" [(ngModel)]="coverLetter" [rows]="5"></nx-textarea>
<nx-file-upload label="Upload your resume" (filesSelected)="onResumeSelected($event)"></nx-file-upload>
<nx-checkbox [(ngModel)]="agreed" label="I confirm the details above are accurate"></nx-checkbox>

<nx-button variant="primary" [disabled]="!canSubmit" (click)="submit()">Submit Application</nx-button>`;

  tsCode = `fullName = '';
email = '';
coverLetter = '';
resumeName = '';
agreed = false;
submitted = false;

onResumeSelected(files: File[]): void {
  if (files.length) this.resumeName = files[0].name;
}

get canSubmit(): boolean {
  return !!this.fullName && !!this.email && this.agreed;
}

submit(): void {
  if (this.canSubmit) this.submitted = true;
}`;
}
