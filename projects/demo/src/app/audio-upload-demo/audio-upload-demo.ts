import { Component } from '@angular/core';
import { NxFileUpload } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-audio-upload-demo',
  imports: [NxFileUpload, DemoSection],
  templateUrl: './audio-upload-demo.html',
  styleUrl: './audio-upload-demo.scss',
})
export class AudioUploadDemo {
  importCode = `import { NxFileUpload } from 'nexium-ui';`;

  basicCode = `<nx-file-upload accept="audio/*" label="Drop an audio file here or click to browse">
</nx-file-upload>`;

  basicTs = `import { NxFileUpload } from '../../../../../dist/components';`;
}
