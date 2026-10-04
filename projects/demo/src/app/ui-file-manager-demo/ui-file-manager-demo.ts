import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxFileManager, NxFileNode } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-file-manager-demo',
  imports: [NxFileManager, DemoSection],
  templateUrl: './ui-file-manager-demo.html',
  styleUrl: './ui-file-manager-demo.scss',
})
export class UiFileManagerDemo {
  importCode = `import { NxFileManager } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  root: NxFileNode = {
    id: 'root',
    name: 'My Drive',
    type: 'folder',
    children: [
      {
        id: 'marketing',
        name: 'Marketing',
        type: 'folder',
        children: [
          { id: 'f1', name: 'Q3-campaign.pdf', type: 'file', size: 482_000, modified: '2026-09-18' },
          { id: 'f2', name: 'logo-final.png', type: 'file', size: 128_000, modified: '2026-09-10', previewUrl: 'https://picsum.photos/seed/logo/100/100' },
        ],
      },
      {
        id: 'engineering',
        name: 'Engineering',
        type: 'folder',
        children: [
          { id: 'f3', name: 'architecture.md', type: 'file', size: 14_200, modified: '2026-09-22' },
          { id: 'f4', name: 'roadmap.xlsx', type: 'file', size: 54_000, modified: '2026-09-15' },
        ],
      },
      { id: 'f5', name: 'company-handbook.pdf', type: 'file', size: 1_200_000, modified: '2026-08-30' },
      { id: 'f6', name: 'team-photo.jpg', type: 'file', size: 2_400_000, modified: '2026-09-01', previewUrl: 'https://picsum.photos/seed/team/100/100' },
    ],
  };

  onRootChange(root: NxFileNode): void {
    this.root = root;
  }

  basicCode = `<nx-file-manager
    [root]="root"
    [storageQuotaBytes]="10 * 1024 * 1024 * 1024"
    (rootChange)="onRootChange($event)">
</nx-file-manager>`;

  basicTs = `root: NxFileNode = {
  id: 'root', name: 'My Drive', type: 'folder',
  children: [
    { id: 'marketing', name: 'Marketing', type: 'folder', children: [
      { id: 'f1', name: 'Q3-campaign.pdf', type: 'file', size: 482000, modified: '2026-09-18' },
    ] },
    { id: 'f5', name: 'company-handbook.pdf', type: 'file', size: 1200000, modified: '2026-08-30' },
  ],
};

onRootChange(root: NxFileNode): void {
  this.root = root; // every operation (move, rename, delete, upload, paste) flows back here
}

// Click a file (not a folder) to open a full-screen preview with Prev/Next arrows that
// cycle through the current folder's files. storageQuotaBytes drives the "X GB of Y GB
// used" bar in the toolbar - it's computed by recursively summing every file's size.`;
}
