import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NxInput, NxCheckbox, NxCard, NxCardHeader, NxCardTitle, NxCardSubtitle, NxCardContent, NxButton } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-templates-login-demo',
  imports: [RouterLink, NxInput, NxCheckbox, NxButton, NxCard, NxCardHeader, NxCardTitle, NxCardSubtitle, NxCardContent, DemoSection],
  templateUrl: './templates-login-demo.html',
})
export class TemplatesLoginDemo {
  email = '';
  password = '';
  remember = false;
  submitted = false;

  onSubmit(): void {
    this.submitted = true;
  }

  previewCode = `<nx-card variant="elevated">
    <nx-card-header>
        <nx-card-title>Welcome back</nx-card-title>
        <nx-card-subtitle>Sign in to your account</nx-card-subtitle>
    </nx-card-header>

    <nx-card-content>
        <form (submit)="onSubmit()">
            <nx-input label="Email" type="email" placeholder="you@company.com" [(value)]="email"></nx-input>
            <nx-input label="Password" type="password" placeholder="••••••••" [(value)]="password"></nx-input>

            <nx-checkbox label="Remember me" [(checked)]="remember"></nx-checkbox>
            <a routerLink="/forgot-password">Forgot password?</a>

            <nx-button variant="primary" [fullWidth]="true">Sign In</nx-button>
        </form>
    </nx-card-content>
</nx-card>`;
}
