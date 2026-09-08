import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxFileUpload, NxFileSizePipe } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-file-upload-demo',
  imports: [NxFileUpload, NxFileSizePipe, DemoSection],
  templateUrl: './file-upload-demo.html',
  styleUrl: './file-upload-demo.scss',
})
export class FileUploadDemo {
  importCode = `import { NxFileUpload } from 'nexium-ui';`;

  public commonService = inject(CommonService);
  basicCode = `<nx-file-upload label="Drop files here or click to browse" multiple>
</nx-file-upload>`;

  singleFileCode = `<nx-file-upload label="Drop a single file here or click to browse">
</nx-file-upload>`;

  dragDropFiles: File[] = [];

  totalSize(files: File[]): number {
    return files.reduce((sum, file) => sum + file.size, 0);
  }

  dragDropCode = `<nx-file-upload
  label="Drag files here, or click to browse"
  multiple
  (filesSelected)="dragDropFiles = $event">
</nx-file-upload>

@if (dragDropFiles.length) {
  <p>
    {{ dragDropFiles.length }} file{{ dragDropFiles.length > 1 ? 's' : '' }} selected -
    {{ totalSize(dragDropFiles) | nxFileSize }} total
  </p>
}`;

  dragDropTs = `dragDropFiles: File[] = [];

totalSize(files: File[]): number {
  return files.reduce((sum, file) => sum + file.size, 0);
}`;

  noDragCode = `<nx-file-upload
  label="Click to browse - drag & drop is disabled"
  [draggable]="false"
  multiple>
</nx-file-upload>`;
}
