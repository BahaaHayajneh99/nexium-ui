import { Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { NxDataMappingEditor, NxMappingField } from 'components';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-data-mapping-editor-demo',
  imports: [NxDataMappingEditor, JsonPipe, DemoSection],
  templateUrl: './ui-data-mapping-editor-demo.html',
  styleUrl: './ui-data-mapping-editor-demo.scss',
})
export class UiDataMappingEditorDemo {
  importCode = `import { NxDataMappingEditor } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  sourceFields: NxMappingField[] = [
    { key: 'full_name', label: 'full_name' },
    { key: 'email_addr', label: 'email_addr' },
    { key: 'phone', label: 'phone' },
    { key: 'company', label: 'company' },
    { key: 'signup_dt', label: 'signup_dt' },
  ];

  targetFields: NxMappingField[] = [
    { key: 'name', label: 'Name', required: true },
    { key: 'email', label: 'Email', required: true },
    { key: 'phone', label: 'Phone' },
    { key: 'organization', label: 'Organization' },
  ];

  mapping: Record<string, string | null> = {
    name: 'full_name',
    email: 'email_addr',
    phone: null,
    organization: null,
  };

  basicCode = `<nx-data-mapping-editor
  [sourceFields]="sourceFields"
  [targetFields]="targetFields"
  [mapping]="mapping"
  (mappingChange)="onMappingChange($event)">
</nx-data-mapping-editor>`;

  basicTs = `sourceFields: NxMappingField[] = [
  { key: 'full_name', label: 'full_name' },
  { key: 'email_addr', label: 'email_addr' },
  { key: 'phone', label: 'phone' },
  { key: 'company', label: 'company' },
  { key: 'signup_dt', label: 'signup_dt' },
];

targetFields: NxMappingField[] = [
  { key: 'name', label: 'Name', required: true },
  { key: 'email', label: 'Email', required: true },
  { key: 'phone', label: 'Phone' },
  { key: 'organization', label: 'Organization' },
];

// Pre-filled with a "smart default" guess - full_name/email_addr matched by name similarity
mapping: Record<string, string | null> = { name: 'full_name', email: 'email_addr' };

onMappingChange(next: Record<string, string | null>): void {
  this.mapping = next; // CSV-import "match your columns" step - persist/send this mapping
}`;

  onMappingChange(next: Record<string, string | null>): void {
    this.mapping = next;
  }
}
