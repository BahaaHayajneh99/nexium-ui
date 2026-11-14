import { Component, inject, signal } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxFileInput } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-file-input-demo',
  imports: [NxFileInput, DemoSection],
  templateUrl: './ui-file-input-demo.html',
  styleUrl: './ui-file-input-demo.scss',
})
export class UiFileInputDemo {
  importCode = `import { NxFileInput } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  // Signals rather than plain properties: onFilesChange/onValidChange below replace them on every
  // emission, and in this zoneless demo app a plain property write wouldn't be picked up until
  // some unrelated click happened to trigger a re-render.
  selectedFiles = signal<File[]>([]);
  isValid = signal(false);

  onFilesChange(files: File[]): void {
    this.selectedFiles.set(files);
  }

  onValidChange(valid: boolean): void {
    this.isValid.set(valid);
  }

  basicCode = `<nx-file-input
    label="Attachments"
    accept="application/pdf,image/*"
    [multiple]="true"
    [maxSizeMb]="2"
    [maxFiles]="3"
    [isRequired]="true"
    (filesChange)="onFilesChange($event)"
    (validChange)="onValidChange($event)">
</nx-file-input>`;

  basicTs = `onFilesChange(files: File[]): void {
  // files only ever contains the currently-valid selection
  this.selectedFiles = files;
}

onValidChange(valid: boolean): void {
  // true once at least one file is attached and nothing is currently rejected
  this.isValid = valid;
}`;
}
