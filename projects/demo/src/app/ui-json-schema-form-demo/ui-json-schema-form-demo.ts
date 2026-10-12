import { Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { CommonService } from '../services/common.service';
import { NxJSONSchemaForm, NxJSONSchema } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-json-schema-form-demo',
  imports: [NxJSONSchemaForm, DemoSection, JsonPipe],
  templateUrl: './ui-json-schema-form-demo.html',
  styleUrl: './ui-json-schema-form-demo.scss',
})
export class UiJsonSchemaFormDemo {
  importCode = `import { NxJSONSchemaForm, NxJSONSchema } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  // The schema shape from the prompt: a plain object literal mapping field name -> field
  // definition - "inspired by" JSON Schema, not an implementation of the full spec.
  signupSchema: NxJSONSchema = {
    name: { type: 'string', label: 'Name', required: true, placeholder: 'Jane Doe' },
    email: { type: 'email', label: 'Email', required: true, placeholder: 'jane@example.com' },
    age: { type: 'number', label: 'Age', placeholder: '18' },
    role: { type: 'select', label: 'Role', options: ['Admin', 'Editor', 'Viewer'], required: true },
  };

  signupValue: Record<string, unknown> = {};
  signupSubmitted: Record<string, unknown> | null = null;

  onSignupValueChange(value: Record<string, unknown>): void {
    this.signupValue = value;
  }
  onSignupSubmit(value: Record<string, unknown>): void {
    this.signupSubmitted = value;
  }

  signupCode = `<nx-json-schema-form
  [schema]="signupSchema"
  (valueChange)="onSignupValueChange($event)"
  (submit)="onSignupSubmit($event)">
</nx-json-schema-form>`;

  signupTs = `signupSchema: NxJSONSchema = {
  name: { type: 'string', label: 'Name', required: true, placeholder: 'Jane Doe' },
  email: { type: 'email', label: 'Email', required: true, placeholder: 'jane@example.com' },
  age: { type: 'number', label: 'Age', placeholder: '18' },
  role: { type: 'select', label: 'Role', options: ['Admin', 'Editor', 'Viewer'], required: true },
};

// Try submitting with Name/Email/Role empty - each shows its own inline required error,
// reusing NxInput/NxSelect's built-in validation. valueChange fires on every keystroke.
onSignupValueChange(value: Record<string, unknown>): void {
  this.signupValue = value;
}
onSignupSubmit(value: Record<string, unknown>): void {
  this.signupSubmitted = value; // only fires once every field passes validation
}`;

  // A richer schema exercising boolean (checkbox) and textarea too, plus a pre-populated
  // initial value.
  feedbackSchema: NxJSONSchema = {
    summary: { type: 'string', label: 'Summary', required: true, placeholder: 'One-line summary' },
    details: { type: 'textarea', label: 'Details', placeholder: 'Tell us more...', rows: 5 },
    category: {
      type: 'select',
      label: 'Category',
      required: true,
      options: [
        { label: 'Bug report', value: 'bug' },
        { label: 'Feature request', value: 'feature' },
        { label: 'General feedback', value: 'general' },
      ],
    },
    satisfaction: { type: 'number', label: 'Satisfaction (1-10)', placeholder: '8' },
    subscribeToUpdates: { type: 'boolean', label: 'Email me about updates to this ticket' },
  };

  feedbackInitialValue: Record<string, unknown> = {
    category: 'feature',
    subscribeToUpdates: true,
  };

  feedbackValue: Record<string, unknown> = {};
  feedbackSubmitted: Record<string, unknown> | null = null;

  onFeedbackValueChange(value: Record<string, unknown>): void {
    this.feedbackValue = value;
  }
  onFeedbackSubmit(value: Record<string, unknown>): void {
    this.feedbackSubmitted = value;
  }

  feedbackCode = `<nx-json-schema-form
  [schema]="feedbackSchema"
  [initialValue]="feedbackInitialValue"
  submitLabel="Send feedback"
  (valueChange)="onFeedbackValueChange($event)"
  (submit)="onFeedbackSubmit($event)">
</nx-json-schema-form>`;

  feedbackTs = `// "category" and "subscribeToUpdates" start pre-populated via [initialValue].
feedbackSchema: NxJSONSchema = {
  summary: { type: 'string', label: 'Summary', required: true, placeholder: 'One-line summary' },
  details: { type: 'textarea', label: 'Details', placeholder: 'Tell us more...', rows: 5 },
  category: {
    type: 'select',
    label: 'Category',
    required: true,
    options: [
      { label: 'Bug report', value: 'bug' },
      { label: 'Feature request', value: 'feature' },
      { label: 'General feedback', value: 'general' },
    ],
  },
  satisfaction: { type: 'number', label: 'Satisfaction (1-10)', placeholder: '8' },
  subscribeToUpdates: { type: 'boolean', label: 'Email me about updates to this ticket' },
};

feedbackInitialValue: Record<string, unknown> = {
  category: 'feature',
  subscribeToUpdates: true,
};`;
}
