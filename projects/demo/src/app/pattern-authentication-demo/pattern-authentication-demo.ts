import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-pattern-authentication-demo',
  standalone: true,
  imports: [CommonModule, DemoSection],
  templateUrl: './pattern-authentication-demo.html',
  styleUrls: ['./pattern-authentication-demo.scss'],
})
export class PatternAuthenticationDemo {
  commonService = inject(CommonService);

  features = [
    { name: 'Multi-factor Authentication', description: '2FA/MFA options' },
    { name: 'Session Management', description: 'Secure token handling' },
    { name: 'Credential Validation', description: 'Email/password verification' },
    { name: 'Recovery Options', description: 'Password reset flow' },
    { name: 'Remember Me', description: 'Persistent sessions' },
    { name: 'Social Login', description: 'OAuth integration' },
  ];

  useCases = [
    { title: 'User Login', description: 'Standard authentication' },
    { title: 'Password Reset', description: 'Forgotten password flow' },
    { title: 'Two-Factor Auth', description: 'Enhanced security' },
    { title: 'Social Auth', description: 'Third-party sign-in' },
    { title: 'Account Recovery', description: 'Account access recovery' },
    { title: 'Session Timeout', description: 'Security on inactivity' },
  ];

  flows = [
    { stage: 'Login Page', tasks: 'Email/username + password entry' },
    { stage: '2FA Verification', tasks: 'SMS/Email code entry' },
    { stage: 'Session Creation', tasks: 'Token generation and storage' },
    { stage: 'Authentication Check', tasks: 'Verify token validity' },
    { stage: 'Session Logout', tasks: 'Clear tokens safely' },
  ];
}
