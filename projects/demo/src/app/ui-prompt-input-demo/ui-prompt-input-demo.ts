import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxPromptInput } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-prompt-input-demo',
  imports: [NxPromptInput, DemoSection],
  templateUrl: './ui-prompt-input-demo.html',
  styleUrl: './ui-prompt-input-demo.scss',
})
export class UiPromptInputDemo {
  importCode = `import { NxPromptInput } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  basicValue = '';
  basicCode = `<nx-prompt-input [(value)]="message" (submit)="onSubmit($event)"></nx-prompt-input>`;
  basicTs = `message = '';

onSubmit(message: string): void {
  console.log('Sent:', message);
}`;

  onBasicSubmit(message: string): void {
    console.log('Sent:', message);
  }

  limitedValue = '';
  suggestions = ['Summarize this document', 'Write a product description', 'Explain this code'];
  limitedCode = `<nx-prompt-input
  [(value)]="message"
  [maxLength]="280"
  [suggestions]="suggestions"
  (submit)="onSubmit($event)">
</nx-prompt-input>`;
  limitedTs = `message = '';
suggestions = ['Summarize this document', 'Write a product description', 'Explain this code'];

onSubmit(message: string): void {
  console.log('Sent:', message);
}`;

  onLimitedSubmit(message: string): void {
    console.log('Sent:', message);
  }
}
