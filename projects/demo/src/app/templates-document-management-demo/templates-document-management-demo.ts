import { Component } from '@angular/core';
import { NxFileUpload, NxTable, NxTableColumn } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-templates-document-management-demo',
  imports: [NxFileUpload, NxTable, DemoSection],
  templateUrl: './templates-document-management-demo.html',
})
export class TemplatesDocumentManagementDemo {
  columns: NxTableColumn[] = [
    { field: 'name', header: 'Name' },
    { field: 'type', header: 'Type' },
    { field: 'size', header: 'Size' },
    { field: 'owner', header: 'Owner' },
    { field: 'modified', header: 'Modified' },
  ];

  documents: Record<string, unknown>[] = [
    { name: 'Q2 Board Deck.pdf', type: 'PDF', size: '4.2 MB', owner: 'Ada Lovelace', modified: '2 hours ago' },
    { name: 'Brand Guidelines.fig', type: 'Figma', size: '18.6 MB', owner: 'Grace Hopper', modified: 'Yesterday' },
    { name: 'Security Audit.docx', type: 'Word', size: '860 KB', owner: 'Alan Turing', modified: '3 days ago' },
    { name: 'Product Roadmap.xlsx', type: 'Excel', size: '1.1 MB', owner: 'Margaret Hamilton', modified: '1 week ago' },
  ];

  uploadCode = `<nx-file-upload accept=".pdf,.docx,.xlsx" [multiple]="true" (filesSelected)="onFilesSelected($event)"></nx-file-upload>`;

  tableCode = `<nx-table [columns]="columns" [data]="documents" striped hoverable></nx-table>`;

  onFilesSelected(files: File[]): void {}
}
