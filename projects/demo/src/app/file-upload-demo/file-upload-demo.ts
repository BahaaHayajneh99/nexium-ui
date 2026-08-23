import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxFileUpload } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-file-upload-demo',
  imports: [NxFileUpload, DemoSection],
  templateUrl: './file-upload-demo.html',
  styleUrl: './file-upload-demo.scss',
})
export class FileUploadDemo {
  importCode = `import { NxFileUpload } from 'nexium-ui';`;

  public commonService = inject(CommonService);
  basicCode = `<nx-file-upload label="Drop files here or click to browse" multiple>
</nx-file-upload>`;

  basicTs = `import { NxFileUpload } from '../../../../../dist/components';`;
}
