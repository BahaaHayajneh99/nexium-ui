import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';
import { NxMask } from '../../../../components/src/lib/forms/ui-mask';

interface CountryFormat {
  country: string;
  code: string;
  flag: string;
  format: string;
  mask: string;
  example: string;
}

@Component({
  selector: 'app-data-entry-phone-input-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, DemoSection, NxMask],
  templateUrl: './data-entry-phone-input-demo.html',
  styleUrl: './data-entry-phone-input-demo.scss',
})
export class DataEntryPhoneInputDemo {
  commonService = inject(CommonService);

  importCode = `import { NxMask } from 'nexium-ui';`;

  phone = '';
  usPhone = '';
  ukPhone = '';
  francePhone = '';
  germanPhone = '';
  australiaPhone = '';
  selectedCountry: CountryFormat;

  basicCode = `<nx-mask 
  label="Phone Number"
  type="phone"
  [(ngModel)]="phone"
  placeholder="(555) 123-4567">
</nx-mask>`;

  features = [
    { name: 'Auto Formatting', description: 'Format as user types' },
    { name: 'International Support', description: 'Multiple country formats' },
    { name: 'Real-time Validation', description: 'Validate phone format' },
    { name: 'Country Detection', description: 'Auto-detect country code' },
    { name: 'Extension Support', description: 'Handle extension numbers' },
    { name: 'Mobile Optimized', description: 'Numeric keyboard on mobile' },
  ];

  countryFormats: CountryFormat[] = [
    {
      country: 'Jordan',
      code: '+962',
      flag: '🇯🇴',
      format: '+962 X XXXX XXXX',
      mask: '+962 9 9999 9999',
      example: '+962 6 5810 7777'
    },
    {
      country: 'United States',
      code: '+1',
      flag: '🇺🇸',
      format: '(XXX) XXX-XXXX',
      mask: '(999) 999-9999',
      example: '(555) 123-4567'
    },
    {
      country: 'Canada',
      code: '+1',
      flag: '🇨🇦',
      format: '(XXX) XXX-XXXX',
      mask: '(999) 999-9999',
      example: '(555) 123-4567'
    },
    {
      country: 'United Kingdom',
      code: '+44',
      flag: '🇬🇧',
      format: '+44 XXXX XXXXXX',
      mask: '+44 9999 999999',
      example: '+44 2071 838750'
    },
    {
      country: 'France',
      code: '+33',
      flag: '🇫🇷',
      format: '+33 X XX XX XX XX',
      mask: '+33 9 99 99 99 99',
      example: '+33 1 23 45 67 89'
    },
    {
      country: 'Germany',
      code: '+49',
      flag: '🇩🇪',
      format: '+49 XXX XXXXXXX',
      mask: '+49 999 9999999',
      example: '+49 123 456789'
    },
    {
      country: 'Japan',
      code: '+81',
      flag: '🇯🇵',
      format: '+81 XX XXXX XXXX',
      mask: '+81 99 9999 9999',
      example: '+81 90 1234 5678'
    },
    {
      country: 'India',
      code: '+91',
      flag: '🇮🇳',
      format: '+91 XXXXX XXXXX',
      mask: '+91 99999 99999',
      example: '+91 98765 43210'
    },
  ];

  useCases = [
    { title: 'User Registration', description: 'Collect phone during sign-up process' },
    { title: 'SMS Verification', description: 'Two-factor authentication' },
    { title: 'Contact Forms', description: 'Customer inquiry forms' },
    { title: 'Appointment Booking', description: 'Schedule meetings and appointments' },
    { title: 'Order Tracking', description: 'Delivery notifications' },
    { title: 'Customer Support', description: 'Helpline and support forms' },
  ];

  constructor() {
    this.selectedCountry = this.countryFormats[0];
  }

  selectCountry(country: CountryFormat): void {
    this.selectedCountry = country;
  }
}
