import { Component } from '@angular/core';
import { UiFileUpload, UiPreview } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-image-upload-demo',
  imports: [UiFileUpload, UiPreview, DemoSection],
  templateUrl: './image-upload-demo.html',
  styleUrl: './image-upload-demo.scss',
})
export class ImageUploadDemo {
  previewSrc = '';
  fileName = '';

  basicCode = `<nx-file-upload accept="image/*" label="Drop an image here or click to browse" (filesSelected)="onFilesSelected($event)">
</nx-file-upload>

@if (previewSrc) {
    <nx-preview [src]="previewSrc" [fileName]="fileName" type="image"></nx-preview>
}`;

  basicTs = `previewSrc = '';
fileName = '';

onFilesSelected(files: File[]): void {
  const file = files[0];
  if (file) {
    this.previewSrc = URL.createObjectURL(file);
    this.fileName = file.name;
  }
}`;

  onFilesSelected(files: File[]): void {
    const file = files[0];
    if (file) {
      this.previewSrc = URL.createObjectURL(file);
      this.fileName = file.name;
    }
  }
}
