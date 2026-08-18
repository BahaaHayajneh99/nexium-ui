import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { RouterLink } from '@angular/router';
import { UiInput, UiCheckbox, UiCard, UiCardHeader, UiCardTitle, UiCardSubtitle, UiCardContent, UiButton } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-templates-register-demo',
  imports: [RouterLink, UiInput, UiCheckbox, UiButton, UiCard, UiCardHeader, UiCardTitle, UiCardSubtitle, UiCardContent, DemoSection],
  templateUrl: './templates-register-demo.html',
})
export class TemplatesRegisterDemo {
  public commonService = inject(CommonService);
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  agree = false;
  submitted = false;

  onSubmit(): void {
    this.submitted = true;
  }

  previewCode = `<nx-card variant="elevated">
    <nx-card-header>
        <nx-card-title>Create an account</nx-card-title>
        <nx-card-subtitle>Start building with ${this.commonService.appName}</nx-card-subtitle>
    </nx-card-header>

    <nx-card-content>
        <form (submit)="onSubmit()">
            <nx-input label="Full Name" placeholder="Ada Lovelace" [(value)]="name"></nx-input>
            <nx-input label="Email" type="email" placeholder="you@company.com" [(value)]="email"></nx-input>
            <nx-input label="Password" type="password" placeholder="••••••••" [(value)]="password"></nx-input>
            <nx-input label="Confirm Password" type="password" placeholder="••••••••" [(value)]="confirmPassword"></nx-input>

            <nx-checkbox label="I agree to the Terms of Service" [(checked)]="agree"></nx-checkbox>

            <nx-button variant="primary" [fullWidth]="true">Create Account</nx-button>
        </form>
    </nx-card-content>
</nx-card>`;
}
