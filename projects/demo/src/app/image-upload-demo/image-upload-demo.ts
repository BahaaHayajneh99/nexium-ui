import { Component } from '@angular/core';
import { NxFileUpload, NxPreview } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-image-upload-demo',
  imports: [NxFileUpload, NxPreview, DemoSection],
  templateUrl: './image-upload-demo.html',
  styleUrl: './image-upload-demo.scss',
})
export class ImageUploadDemo {
  importCode = `import { NxFileUpload, NxPreview } from 'nexium-ui';`;

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

  previewSrcs: string[] = [];

  multipleCode = `<nx-file-upload accept="image/*" label="Drop images here or click to browse" multiple (filesSelected)="onMultipleFilesSelected($event)">
</nx-file-upload>

@if (previewSrcs.length) {
    <div class="image-preview-grid">
        @for (src of previewSrcs; track src) {
            <nx-preview [src]="src" type="image"></nx-preview>
        }
    </div>
}`;

  multipleTs = `previewSrcs: string[] = [];

onMultipleFilesSelected(files: File[]): void {
  this.previewSrcs = files.map(file => URL.createObjectURL(file));
}`;

  onMultipleFilesSelected(files: File[]): void {
    this.previewSrcs = files.map(file => URL.createObjectURL(file));
  }

  noDragCode = `<nx-file-upload
  accept="image/*"
  label="Click to browse - drag & drop is disabled"
  [draggable]="false"
  multiple>
</nx-file-upload>`;
}
