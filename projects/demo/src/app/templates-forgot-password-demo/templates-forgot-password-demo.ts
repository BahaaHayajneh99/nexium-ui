import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NxInput, NxCard, NxCardHeader, NxCardTitle, NxCardSubtitle, NxCardContent, NxButton } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-templates-forgot-password-demo',
  imports: [RouterLink, NxInput, NxButton, NxCard, NxCardHeader, NxCardTitle, NxCardSubtitle, NxCardContent, DemoSection],
  templateUrl: './templates-forgot-password-demo.html',
})
export class TemplatesForgotPasswordDemo {
  email = '';
  sent = false;

  onSubmit(): void {
    this.sent = true;
  }

  previewCode = `<nx-card variant="elevated">
    <nx-card-header>
        <nx-card-title>Reset your password</nx-card-title>
        <nx-card-subtitle>We'll email you a link to get back in</nx-card-subtitle>
    </nx-card-header>

    <nx-card-content>
        <form (submit)="onSubmit()">
            <nx-input label="Email" type="email" placeholder="you@company.com" [(value)]="email"></nx-input>

            <nx-button variant="primary" [fullWidth]="true">Send Reset Link</nx-button>
        </form>
    </nx-card-content>
</nx-card>`;
}
