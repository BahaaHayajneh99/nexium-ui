import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-pattern-forms-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, DemoSection],
  templateUrl: './pattern-forms-demo.html',
  styleUrls: ['./pattern-forms-demo.scss'],
})
export class PatternFormsDemo {
  commonService = inject(CommonService);

  formData = { name: '', email: '', message: '' };

  features = [
    { name: 'Validation', description: 'Real-time input validation' },
    { name: 'Error Handling', description: 'Clear error messages' },
    { name: 'Progressive Enhancement', description: 'Works with/without JS' },
    { name: 'Accessibility', description: 'WCAG compliant forms' },
    { name: 'Responsive Layout', description: 'Mobile-friendly design' },
    { name: 'User Guidance', description: 'Helpful hints and labels' },
  ];

  useCases = [
    { title: 'Contact Forms', description: 'User inquiries and feedback' },
    { title: 'Login/Register', description: 'Authentication forms' },
    { title: 'Settings', description: 'User preferences' },
    { title: 'Checkout', description: 'Payment and shipping' },
    { title: 'Surveys', description: 'Data collection' },
    { title: 'Search', description: 'Query input forms' },
  ];

  bestPractices = [
    { title: 'Minimize required fields', description: 'Reduce form friction by only asking for essential information' },
    { title: 'Provide clear labels and placeholders', description: 'Help users understand what each field expects with clear, descriptive labels' },
    { title: 'Show validation errors inline', description: 'Provide immediate feedback near the field that needs correction' },
    { title: 'Use appropriate input types', description: 'Leverage HTML5 input types for better mobile UX and built-in validation' },
    { title: 'Group related fields together', description: 'Organize fields logically to reduce cognitive load and improve usability' },
    { title: 'Provide helpful hints for complex fields', description: 'Add supporting text to clarify expected format or provide examples' },
    { title: 'Disable submit until form is valid', description: 'Prevent user frustration by preventing submission of incomplete forms' },
    { title: 'Show success confirmation', description: 'Provide clear feedback when the form is successfully submitted' },
  ];
}
