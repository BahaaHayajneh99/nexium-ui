import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { UiFileUpload } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-file-upload-demo',
  imports: [UiFileUpload, DemoSection],
  templateUrl: './file-upload-demo.html',
  styleUrl: './file-upload-demo.scss',
})
export class FileUploadDemo {
  public commonService = inject(CommonService);
  basicCode = `<nx-file-upload label="Drop files here or click to browse" multiple>
</nx-file-upload>`;

  basicTs = `import { UiFileUpload } from '../../../../../dist/components';`;
}
