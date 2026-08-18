import { Component } from '@angular/core';
import { UiFileUpload } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-audio-upload-demo',
  imports: [UiFileUpload, DemoSection],
  templateUrl: './audio-upload-demo.html',
  styleUrl: './audio-upload-demo.scss',
})
export class AudioUploadDemo {
  basicCode = `<nx-file-upload accept="audio/*" label="Drop an audio file here or click to browse">
</nx-file-upload>`;

  basicTs = `import { UiFileUpload } from '../../../../../dist/components';`;
}
