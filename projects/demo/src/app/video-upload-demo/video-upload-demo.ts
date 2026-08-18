import { Component } from '@angular/core';
import { UiFileUpload } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-video-upload-demo',
  imports: [UiFileUpload, DemoSection],
  templateUrl: './video-upload-demo.html',
  styleUrl: './video-upload-demo.scss',
})
export class VideoUploadDemo {
  basicCode = `<nx-file-upload accept="video/*" label="Drop a video here or click to browse">
</nx-file-upload>`;

  basicTs = `import { UiFileUpload } from '../../../../../dist/components';`;
}
