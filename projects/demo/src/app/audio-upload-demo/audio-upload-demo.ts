import { Component } from '@angular/core';
import { NxFileUpload, NxFileSizePipe } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-audio-upload-demo',
  imports: [NxFileUpload, NxFileSizePipe, DemoSection],
  templateUrl: './audio-upload-demo.html',
  styleUrl: './audio-upload-demo.scss',
})
export class AudioUploadDemo {
  importCode = `import { NxFileUpload } from 'nexium-ui';`;

  basicCode = `<nx-file-upload accept="audio/*" label="Drop audio files here or click to browse" multiple>
</nx-file-upload>`;

  singleFileCode = `<nx-file-upload accept="audio/*" label="Drop a single audio file here or click to browse">
</nx-file-upload>`;

  selectedFiles: File[] = [];

  totalSize(files: File[]): number {
    return files.reduce((sum, file) => sum + file.size, 0);
  }

  dragDropCode = `<nx-file-upload
  accept="audio/*"
  label="Drag audio files here, or click to browse"
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
  accept="audio/*"
  label="Click to browse - drag & drop is disabled"
  [draggable]="false"
  multiple>
</nx-file-upload>`;
}
