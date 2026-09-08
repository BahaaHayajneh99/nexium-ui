import { Component } from '@angular/core';
import { NxFileUpload, NxFileSizePipe } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-document-upload-demo',
  imports: [NxFileUpload, NxFileSizePipe, DemoSection],
  templateUrl: './document-upload-demo.html',
  styleUrl: './document-upload-demo.scss',
})
export class DocumentUploadDemo {
  importCode = `import { NxFileUpload } from 'nexium-ui';`;

  basicCode = `<nx-file-upload accept=".pdf,.doc,.docx,.txt" label="Drop documents here or click to browse" multiple>
</nx-file-upload>`;

  singleFileCode = `<nx-file-upload accept=".pdf,.doc,.docx,.txt" label="Drop a single document here or click to browse">
</nx-file-upload>`;

  selectedFiles: File[] = [];

  totalSize(files: File[]): number {
    return files.reduce((sum, file) => sum + file.size, 0);
  }

  dragDropCode = `<nx-file-upload
  accept=".pdf,.doc,.docx,.txt"
  label="Drag documents here, or click to browse"
  multiple
  (filesSelected)="selectedFiles = $event">
</nx-file-upload>

@if (selectedFiles.length) {
  <p>
    {{ selectedFiles.length }} file{{ selectedFiles.length > 1 ? 's' : '' }} selected -
    {{ totalSize(selectedFiles) | nxFileSize }} total
  </p>
}`;

  dragDropTs = `selectedFiles: File[] = [];

totalSize(files: File[]): number {
  return files.reduce((sum, file) => sum + file.size, 0);
}`;

  noDragCode = `<nx-file-upload
  accept=".pdf,.doc,.docx,.txt"
  label="Click to browse - drag & drop is disabled"
  [draggable]="false"
  multiple>
</nx-file-upload>`;
}
