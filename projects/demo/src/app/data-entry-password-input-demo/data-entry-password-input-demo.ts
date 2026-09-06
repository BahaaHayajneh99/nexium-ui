import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';
import { NxPassword } from '../../../../components/src/lib/forms/ui-password';

@Component({
  selector: 'app-data-entry-password-input-demo',
  standalone: true,
  imports: [FormsModule, DemoSection, NxPassword],
  templateUrl: './data-entry-password-input-demo.html',
  styleUrl: './data-entry-password-input-demo.scss',
})
export class DataEntryPasswordInputDemo {
  commonService = inject(CommonService);

  importCode = `import { NxPassword } from 'nexium-ui';`;

  password = '';
  confirmPassword = '';
  passwordStrength: 'Weak' | 'Fair' | 'Good' | 'Strong' = 'Weak';
  isPasswordValid = false;

  basicCode = `<nx-password
  label="Password"
  [(ngModel)]="password"
  [minLength]="8"
  [requireDigit]="true"
  [requireSpecial]="true"
  [requireUppercase]="true"
  [requireLowercase]="true"
  [showStrength]="true"
  [showRequirements]="true">
</nx-password>`;

  features = [
    { name: 'Password Visibility', description: 'Toggle show/hide password' },
    { name: 'Strength Indicator', description: 'Real-time password strength feedback' },
    { name: 'Requirements Checklist', description: 'Display password requirements' },
    { name: 'Match Validation', description: 'Confirm password matching' },
    { name: 'Auto-generation', description: 'Generate strong passwords' },
    { name: 'Caps Lock Detection', description: 'Alert when Caps Lock is on' },
  ];

  useCases = [
    { title: 'User Registration', description: 'New account creation' },
    { title: 'Password Reset', description: 'Secure password change' },
    { title: 'Authentication', description: 'Login forms' },
    { title: 'Security Settings', description: 'Manage user security' },
    { title: 'API Keys', description: 'Generate secure tokens' },
    { title: 'Sensitive Data', description: 'Protect confidential input' },
  ];

  onStrengthChange(strength: 'Weak' | 'Fair' | 'Good' | 'Strong'): void {
    this.passwordStrength = strength;
  }

  onValidityChange(valid: boolean): void {
    this.isPasswordValid = valid;
  }
}
