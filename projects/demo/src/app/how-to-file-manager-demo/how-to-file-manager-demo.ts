import { Component } from '@angular/core';
import { NxFileUpload, NxIcon, NxButton, NxBadge } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

interface BrowsedFile {
  name: string;
  size: string;
  icon: string;
}

@Component({
  selector: 'app-how-to-file-manager-demo',
  imports: [NxFileUpload, NxIcon, NxButton, NxBadge, DemoSection],
  templateUrl: './how-to-file-manager-demo.html',
  styleUrl: './how-to-file-manager-demo.scss',
})
export class HowToFileManagerDemo {
  files: BrowsedFile[] = [
    { name: 'Project Brief.pdf', size: '245 KB', icon: 'nx-file' },
    { name: 'Team Photo.png', size: '1.2 MB', icon: 'nx-image' },
    { name: 'Budget.xlsx', size: '58 KB', icon: 'nx-file' },
  ];

  onFilesSelected(selected: File[]): void {
    for (const file of selected) {
      this.files.unshift({
        name: file.name,
        size: `${Math.max(1, Math.round(file.size / 1024))} KB`,
        icon: file.type.startsWith('image/') ? 'nx-image' : 'nx-file',
      });
    }
  }

  remove(file: BrowsedFile): void {
    this.files = this.files.filter((item) => item !== file);
  }

  code = `<nx-file-upload label="Drop files here or click to browse" multiple (filesSelected)="onFilesSelected($event)"></nx-file-upload>

@for (file of files; track file.name) {
    <div class="file-row">
        <nx-icon [icon]="file.icon" variant="svg" [size]="18"></nx-icon>
        <span>{{ file.name }}</span>
        <nx-badge variant="secondary" size="small">{{ file.size }}</nx-badge>
        <nx-button variant="danger" size="small" (click)="remove(file)">Delete</nx-button>
    </div>
}`;

  tsCode = `files: BrowsedFile[] = [ /* ... */ ];

onFilesSelected(selected: File[]): void {
  for (const file of selected) {
    this.files.unshift({
      name: file.name,
      size: \`\${Math.max(1, Math.round(file.size / 1024))} KB\`,
      icon: file.type.startsWith('image/') ? 'nx-image' : 'nx-file',
    });
  }
}

remove(file: BrowsedFile): void {
  this.files = this.files.filter((item) => item !== file);
}`;
}
