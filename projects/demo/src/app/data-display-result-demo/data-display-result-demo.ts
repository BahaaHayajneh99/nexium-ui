import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxResult, NxResultStatus } from '../../../../../dist/components';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

interface ResultState {
  status: NxResultStatus;
  title: string;
  description: string;
  action: string;
}

@Component({
  selector: 'app-data-display-result-demo',
  standalone: true,
  imports: [CommonModule, NxResult, DemoSection],
  templateUrl: './data-display-result-demo.html',
  styleUrls: ['./data-display-result-demo.scss'],
})
export class DataDisplayResultDemo {
  commonService = inject(CommonService);

  importCode = `import { NxResult } from 'nexium-ui';`;

  basicCode = `<nx-result
  status="success"
  title="Payment Successful"
  description="Your order #12345 has been placed and payment confirmed."
  actionLabel="View Order"
  (actionClick)="onAction('View Order')">
</nx-result>`;

  statesCode = `<nx-result
  *ngFor="let result of results"
  [status]="result.status"
  [title]="result.title"
  [description]="result.description"
  [actionLabel]="result.action"
  (actionClick)="onAction(result.title)">
</nx-result>`;

  statesTs = `results = [
  {
    status: 'success',
    title: 'Payment Successful',
    description: 'Your order #12345 has been placed and payment confirmed.',
    action: 'View Order',
  },
  {
    status: 'error',
    title: 'Payment Failed',
    description: 'Your card was declined. Please verify your details and try again.',
    action: 'Retry Payment',
  },
  {
    status: 'warning',
    title: 'Incomplete Profile',
    description: 'Your profile is missing some required information.',
    action: 'Complete Profile',
  },
  {
    status: 'info',
    title: 'Maintenance Notice',
    description: 'System maintenance scheduled for tonight.',
    action: 'Learn More',
  },
];`;

  results: ResultState[] = [
    {
      status: 'success',
      title: 'Payment Successful',
      description: 'Your order #12345 has been placed and payment confirmed. Check your email for details.',
      action: 'View Order',
    },
    {
      status: 'error',
      title: 'Payment Failed',
      description: 'Your card was declined. Please verify your details and try again.',
      action: 'Retry Payment',
    },
    {
      status: 'warning',
      title: 'Incomplete Profile',
      description: 'Your profile is missing some required information. Complete it to unlock features.',
      action: 'Complete Profile',
    },
    {
      status: 'info',
      title: 'Maintenance Notice',
      description: 'System maintenance scheduled for tonight. We\'ll be back online by 2 AM.',
      action: 'Learn More',
    },
  ];

  features = [
    { name: 'Multiple States', description: 'Success, error, warning, info' },
    { name: 'Clear Messaging', description: 'Explain what happened' },
    { name: 'Actionable', description: 'Guidance on next steps' },
    { name: 'Detailed Info', description: 'Additional context' },
    { name: 'Visual Indicators', description: 'Icons and colors' },
    { name: 'Retry Options', description: 'Recover from errors' },
  ];

  useCases = [
    { title: 'Form Submission', description: 'Confirm successful submission' },
    { title: 'Payment Processing', description: 'Transaction results' },
    { title: 'File Upload', description: 'Upload completion status' },
    { title: 'Sign Up Complete', description: 'Account creation result' },
    { title: 'Error Pages', description: '404, 500 errors' },
    { title: 'Alerts', description: 'System notifications' },
  ];

  bestPractices = [
    { title: 'Be specific', description: 'Explain what happened and why clearly' },
    { title: 'Use visual indicators', description: 'Choose appropriate icons and colors for status' },
    { title: 'Provide clear steps', description: 'Give actionable next steps for users' },
    { title: 'Keep it concise', description: 'Write friendly and to-the-point messages' },
    { title: 'Include IDs', description: 'Provide error codes or reference IDs when helpful' },
    { title: 'Offer support', description: 'Include help options for complex issues' },
  ];

  onAction(label: string): void {
    // Wire this up to your own action-handling logic.
  }
}
