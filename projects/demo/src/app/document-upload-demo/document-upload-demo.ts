import { Component } from '@angular/core';
import { UiFileUpload } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-document-upload-demo',
  imports: [UiFileUpload, DemoSection],
  templateUrl: './document-upload-demo.html',
  styleUrl: './document-upload-demo.scss',
})
export class DocumentUploadDemo {
  basicCode = `<nx-file-upload accept=".pdf,.doc,.docx,.txt" label="Drop a document here or click to browse">
</nx-file-upload>`;

  basicTs = `import { UiFileUpload } from '../../../../../dist/components';`;
}
