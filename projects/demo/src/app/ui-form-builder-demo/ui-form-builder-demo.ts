import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxFormBuilder, NxFormSchema } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

function jobApplicationSchema(): NxFormSchema {
  return {
    title: 'Job Application',
    fields: [
      { id: 'full-name', type: 'text', label: 'Full name', placeholder: 'Jane Doe', validations: [{ type: 'required' }] },
      {
        id: 'email',
        type: 'email',
        label: 'Email address',
        placeholder: 'jane@example.com',
        validations: [{ type: 'required', message: 'An email address is required.' }],
      },
      {
        id: 'references',
        type: 'section',
        label: 'References',
        fields: [
          { id: 'ref1-name', type: 'text', label: 'Reference 1 - Name', placeholder: 'Full name' },
          { id: 'ref1-email', type: 'email', label: 'Reference 1 - Email', placeholder: 'reference@example.com' },
          { id: 'ref2-name', type: 'text', label: 'Reference 2 - Name', placeholder: 'Full name' },
          { id: 'ref2-email', type: 'email', label: 'Reference 2 - Email', placeholder: 'reference@example.com' },
        ],
      },
      {
        id: 'hear-about-us',
        type: 'select',
        label: 'How did you hear about us?',
        options: [
          { label: 'Search engine', value: 'search' },
          { label: 'Friend or colleague', value: 'friend' },
          { label: 'Social media', value: 'social' },
          { label: 'Other', value: 'other' },
        ],
      },
      {
        id: 'hear-about-us-other',
        type: 'text',
        label: 'Please specify',
        placeholder: 'Tell us more...',
        visibleWhen: { fieldId: 'hear-about-us', operator: 'equals', value: 'other' },
      },
    ],
  };
}

@Component({
  selector: 'app-ui-form-builder-demo',
  imports: [NxFormBuilder, DemoSection],
  templateUrl: './ui-form-builder-demo.html',
  styleUrl: './ui-form-builder-demo.scss',
})
export class UiFormBuilderDemo {
  importCode = `import { NxFormBuilder, NxFormSchema } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  schema: NxFormSchema = jobApplicationSchema();
  onSchemaChange(schema: NxFormSchema): void {
    this.schema = schema;
  }

  previewSchema: NxFormSchema = jobApplicationSchema();
  onPreviewSchemaChange(schema: NxFormSchema): void {
    this.previewSchema = schema;
  }

  basicCode = `<nx-form-builder [schema]="schema" (schemaChange)="onSchemaChange($event)"></nx-form-builder>`;

  basicTs = `schema: NxFormSchema = {
  title: 'Job Application',
  fields: [
    { id: 'full-name', type: 'text', label: 'Full name', validations: [{ type: 'required' }] },
    { id: 'email', type: 'email', label: 'Email address', validations: [{ type: 'required' }] },
    { id: 'references', type: 'section', label: 'References', fields: [
      { id: 'ref1-name', type: 'text', label: 'Reference 1 - Name' },
      { id: 'ref1-email', type: 'email', label: 'Reference 1 - Email' },
    ] },
    { id: 'hear-about-us', type: 'select', label: 'How did you hear about us?', options: [
      { label: 'Other', value: 'other' },
    ] },
    { id: 'hear-about-us-other', type: 'text', label: 'Please specify',
      visibleWhen: { fieldId: 'hear-about-us', operator: 'equals', value: 'other' } },
  ],
};

onSchemaChange(schema: NxFormSchema): void {
  this.schema = schema; // every drag/drop, inspector edit, and import/export flows back here
}`;

  previewCode = `<nx-form-builder [schema]="previewSchema" (schemaChange)="onPreviewSchemaChange($event)"></nx-form-builder>`;

  previewTs = `// Click "Preview" in the toolbar above the canvas - it swaps the drag-and-drop
// canvas for a live, fillable rendering of the same schema. Try changing
// "How did you hear about us?" to "Other": the "Please specify" field appears
// immediately, because conditional visibility re-evaluates on every value change.`;
}
