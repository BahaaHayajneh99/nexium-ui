import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxDropzone } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

function svgFile(name: string, fill: string, label: string): File {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
    <rect width="200" height="200" fill="${fill}" />
    <text x="100" y="105" font-size="22" fill="#ffffff" text-anchor="middle" font-family="sans-serif">${label}</text>
  </svg>`;
  return new File([svg], name, { type: 'image/svg+xml' });
}

function textFile(name: string, contents: string): File {
  return new File([contents], name, { type: 'text/plain' });
}

@Component({
  selector: 'app-ui-dropzone-demo',
  imports: [NxDropzone, DemoSection],
  templateUrl: './ui-dropzone-demo.html',
  styleUrl: './ui-dropzone-demo.scss',
})
export class UiDropzoneDemo {
  importCode = `import { NxDropzone } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  @ViewChild('multiZone') multiZone?: NxDropzone;
  @ViewChild('singleZone') singleZone?: NxDropzone;

  loadSampleImages(): void {
    this.multiZone?.addFiles([
      svgFile('cover-photo.svg', '#3498db', 'Cover'),
      svgFile('team-outing.svg', '#9b59b6', 'Team'),
      svgFile('notes.svg', '#27ae60', 'Notes'),
    ]);
  }

  loadSampleDocument(): void {
    this.singleZone?.addFiles([textFile('resume.txt', 'Jordan Blake - Product Designer - 6 years experience...')]);
  }

  onFilesChange(files: File[]): void {
    console.log('selected files', files.map((f) => f.name));
  }

  basicCode = `<nx-dropzone
    accept="image/*"
    [multiple]="true"
    (filesChange)="onFilesChange($event)">
</nx-dropzone>`;

  basicTs = `onFilesChange(files: File[]): void {
  // files reflects the full current selection, grid thumbnails and all
  console.log(files.map((f) => f.name));
}`;

  singleCode = `<nx-dropzone
    accept=".pdf,.doc,.docx,.txt"
    [multiple]="false"
    (filesChange)="onFilesChange($event)">
</nx-dropzone>`;

  singleTs = `// With multiple=false, picking or dropping a new file replaces the current selection
// instead of appending to it.`;
}
