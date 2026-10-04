import { Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { CommonService } from '../services/common.service';
import { NxFormRenderer, NxFormSchema } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-form-renderer-demo',
  imports: [NxFormRenderer, DemoSection, JsonPipe],
  templateUrl: './ui-form-renderer-demo.html',
  styleUrl: './ui-form-renderer-demo.scss',
})
export class UiFormRendererDemo {
  importCode = `import { NxFormRenderer, NxFormSchema } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  jobApplicationSchema: NxFormSchema = {
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

  jobApplicationValues: Record<string, unknown> = {};
  jobApplicationSubmitted: Record<string, unknown> | null = null;

  onJobApplicationValuesChange(values: Record<string, unknown>): void {
    this.jobApplicationValues = values;
  }
  onJobApplicationSubmit(values: Record<string, unknown>): void {
    this.jobApplicationSubmitted = values;
  }

  rsvpSchema: NxFormSchema = {
    title: 'Event RSVP',
    fields: [
      { id: 'name', type: 'text', label: 'Your name', placeholder: 'Full name', validations: [{ type: 'required' }] },
      {
        id: 'attending',
        type: 'radio',
        label: 'Will you attend?',
        options: [
          { label: 'Yes, count me in', value: 'yes' },
          { label: 'No, I cannot make it', value: 'no' },
        ],
        validations: [{ type: 'required', message: 'Please let us know if you are attending.' }],
      },
      {
        id: 'guest-count',
        type: 'number',
        label: 'Number of guests (including you)',
        placeholder: '1',
        visibleWhen: { fieldId: 'attending', operator: 'equals', value: 'yes' },
        validations: [{ type: 'min', value: 1, message: 'Bring at least yourself!' }, { type: 'max', value: 6, message: 'Max 6 guests per RSVP.' }],
      },
      { id: 'has-dietary', type: 'checkbox', label: 'I have dietary restrictions' },
      {
        id: 'dietary-details',
        type: 'textarea',
        label: 'Tell us about your dietary restrictions',
        placeholder: 'e.g. vegetarian, nut allergy...',
        visibleWhen: { fieldId: 'has-dietary', operator: 'equals', value: 'true' },
      },
      { id: 'rsvp-by', type: 'date', label: 'Confirming by' },
    ],
  };

  rsvpValues: Record<string, unknown> = {};
  rsvpSubmitted: Record<string, unknown> | null = null;

  onRsvpValuesChange(values: Record<string, unknown>): void {
    this.rsvpValues = values;
  }
  onRsvpSubmit(values: Record<string, unknown>): void {
    this.rsvpSubmitted = values;
  }

  basicCode = `<nx-form-renderer
  [schema]="jobApplicationSchema"
  (valuesChange)="onValuesChange($event)"
  (submit)="onSubmit($event)">
</nx-form-renderer>`;

  basicTs = `// "hear-about-us-other" only renders (and is only validated) once "hear-about-us" is
// set to "other" - conditional visibility is re-evaluated on every keystroke/change.
// Try submitting with the required Email field empty to see the inline validation error.
onValuesChange(values: Record<string, unknown>): void {
  this.jobApplicationValues = values;
}
onSubmit(values: Record<string, unknown>): void {
  this.jobApplicationSubmitted = values; // only fires once every VISIBLE field passes validation
}`;

  rsvpCode = `<nx-form-renderer
  [schema]="rsvpSchema"
  (valuesChange)="onRsvpValuesChange($event)"
  (submit)="onRsvpSubmit($event)">
</nx-form-renderer>`;

  rsvpTs = `// Demonstrates checkbox/radio/date/number rendering, a radio-driven conditional field
// ("guest-count" only shows when "attending" is "yes") and a checkbox-driven one
// ("dietary-details" only shows once "has-dietary" is checked), plus min/max validation.`;
}
