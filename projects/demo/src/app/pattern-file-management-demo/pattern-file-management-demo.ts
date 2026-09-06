import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-pattern-file-management-demo',
  standalone: true,
  imports: [CommonModule, DemoSection],
  templateUrl: './pattern-file-management-demo.html',
  styleUrls: ['./pattern-file-management-demo.scss'],
})
export class PatternFileManagementDemo {
  commonService = inject(CommonService);

  features = [
    { name: 'File Upload', description: 'Single and multi-file' },
    { name: 'Drag & Drop', description: 'Intuitive upload' },
    { name: 'Progress Tracking', description: 'Upload progress bars' },
    { name: 'File Preview', description: 'Display file details' },
    { name: 'File Organization', description: 'Folders and categories' },
    { name: 'File Sharing', description: 'Generate share links' },
  ];

  useCases = [
    { title: 'Document Storage', description: 'File repository' },
    { title: 'Media Library', description: 'Image/video management' },
    { title: 'Project Collaboration', description: 'Shared workspace' },
    { title: 'Form Attachments', description: 'File submissions' },
    { title: 'Backup Storage', description: 'Data archival' },
    { title: 'Content Publishing', description: 'Asset management' },
  ];

  fileManagementSteps = [
    'Implement file upload handler',
    'Add drag-and-drop support',
    'Display upload progress',
    'Store files securely',
    'Create folder structure',
    'Enable file preview',
    'Implement sharing system',
    'Add version control',
  ];
}
