import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxCopyableText } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-copyable-text-demo',
  imports: [NxCopyableText, DemoSection],
  templateUrl: './ui-copyable-text-demo.html',
  styleUrl: './ui-copyable-text-demo.scss',
})
export class UiCopyableTextDemo {
  importCode = `import { NxCopyableText } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  basicCode = `<nx-copyable-text label="API Key" text="sk_demo_8f3a2b1c9d0e4f5a6b7c8d9e"></nx-copyable-text>
<nx-copyable-text label="Webhook URL" text="https://api.example.com/hooks/8f3a2b1c"></nx-copyable-text>`;

  basicTs = `// mono defaults to true, rendering the value in a monospace font.`;

  plainCode = `<nx-copyable-text label="Invite link" text="https://app.example.com/invite/xh92kd" [mono]="false"></nx-copyable-text>`;

  plainTs = `// set mono to false for regular (non-monospace) text.`;

  contextCode = `<div class="field-row" *ngFor="let field of fields">
    <span>{{ field.label }}</span>
    <nx-copyable-text [label]="field.label" [text]="field.value"></nx-copyable-text>
</div>`;

  contextTs = `fields = [
  { label: 'Account ID', value: 'acct_1N3f9kLj2X' },
  { label: 'Region', value: 'us-east-1' },
  { label: 'Support email', value: 'support@example.com' },
];`;

  fields = [
    { label: 'Account ID', value: 'acct_1N3f9kLj2X' },
    { label: 'Region', value: 'us-east-1' },
    { label: 'Support email', value: 'support@example.com' },
  ];
}
