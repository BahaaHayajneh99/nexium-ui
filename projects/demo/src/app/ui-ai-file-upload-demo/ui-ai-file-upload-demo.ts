import { Component, inject, signal } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxAiFileUpload } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-ai-file-upload-demo',
  imports: [NxAiFileUpload, DemoSection],
  templateUrl: './ui-ai-file-upload-demo.html',
  styleUrl: './ui-ai-file-upload-demo.scss',
})
export class UiAiFileUploadDemo {
  importCode = `import { NxAiFileUpload } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  // Signal so the "attached N files" summary below reacts to filesChange without relying on an
  // unrelated re-render in this zoneless demo app.
  attachedFiles = signal<File[]>([]);

  onFilesChange(files: File[]): void {
    this.attachedFiles.set(files);
  }

  basicCode = `<nx-ai-file-upload
    accept=".pdf,.txt,.md,image/*"
    [maxFiles]="4"
    (filesChange)="onFilesChange($event)">
</nx-ai-file-upload>`;

  basicTs = `onFilesChange(files: File[]): void {
  this.attachedFiles = files;
}`;
}
