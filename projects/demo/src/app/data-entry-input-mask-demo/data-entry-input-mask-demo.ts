import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NexiumUiModule } from 'components';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-data-entry-input-mask-demo',
  standalone: true,
  imports: [FormsModule, DemoSection, NexiumUiModule],
  templateUrl: './data-entry-input-mask-demo.html',
  styleUrl: './data-entry-input-mask-demo.scss',
})
export class DataEntryInputMaskDemo {
  commonService = inject(CommonService);

  importCode = `import { NxMask } from 'nexium-ui';`;

  selectedMaskType: 'custom' | 'phone' | 'ssn' | 'credit-card' | 'zip' | 'date' | 'time' = 'phone';
  customMaskFormat = '9{12}';
  dynamicMaskValue = '';

  phone = '';
  ssn = '';
  creditCard = '';

  basicCode = `<nx-mask
  label="Phone Number"
  type="phone"
  [(ngModel)]="phone"
  placeholder="(123) 456-7890">
</nx-mask>`;

  dynamicMaskCode = `<nx-mask
  [type]="selectedMaskType"
  [mask]="customMaskFormat"
  [(ngModel)]="dynamicMaskValue"
  placeholder="Type to test selected mask">
</nx-mask>`;

  maskTypeOptions = [
    { label: 'Phone', value: 'phone' },
    { label: 'Social Security Number', value: 'ssn' },
    { label: 'Credit Card', value: 'credit-card' },
    { label: 'ZIP Code', value: 'zip' },
    { label: 'Date', value: 'date' },
    { label: 'Time', value: 'time' },
    { label: 'Custom', value: 'custom' },
  ] as const;

  features = [
    { name: 'Phone Format', description: '(XXX) XXX-XXXX pattern' },
    { name: 'Social Security', description: 'XXX-XX-XXXX format' },
    { name: 'Credit Card', description: 'XXXX XXXX XXXX XXXX' },
    { name: 'Date Format', description: 'MM/DD/YYYY pattern' },
    { name: 'Custom Masks', description: 'Define your own patterns' },
    { name: 'Auto-Tab', description: 'Move to next field automatically' },
  ];

  maskExamples = [
    { type: 'Phone', mask: '(999) 999-9999', example: '(555) 123-4567' },
    { type: 'SSN', mask: '999-99-9999', example: '123-45-6789' },
    { type: 'Credit Card', mask: '9999 9999 9999 9999', example: '1234 5678 9012 3456' },
    { type: 'ZIP Code', mask: '99999', example: '12345' },
    { type: 'Date', mask: '99/99/9999', example: '12/25/2024' },
    { type: 'Time', mask: '99:99', example: '14:30' },
  ];

  useCases = [
    { title: 'Contact Forms', description: 'Phone number input' },
    { title: 'Payment Forms', description: 'Credit card entry' },
    { title: 'Identity Verification', description: 'SSN/Tax ID collection' },
    { title: 'Address Forms', description: 'ZIP and postal codes' },
    { title: 'Scheduling', description: 'Time and date entry' },
    { title: 'Registration', description: 'License numbers' },
  ];

}
