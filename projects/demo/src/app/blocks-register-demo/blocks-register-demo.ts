import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxInput, NxCheckbox, NxCard, NxCardHeader, NxCardTitle, NxCardSubtitle, NxCardContent, NxButton } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-blocks-register-demo',
  imports: [NxInput, NxCheckbox, NxButton, NxCard, NxCardHeader, NxCardTitle, NxCardSubtitle, NxCardContent, DemoSection],
  templateUrl: './blocks-register-demo.html',
})
export class BlocksRegisterDemo {
  public commonService = inject(CommonService);
  name = '';
  email = '';
  password = '';
  agree = false;

  code = `<nx-card class="template-card" variant="elevated">
    <nx-card-header>
        <nx-card-title>Create an account</nx-card-title>
        <nx-card-subtitle>Start building with ${this.commonService.appName}</nx-card-subtitle>
    </nx-card-header>
    <nx-card-content>
        <form class="template-form">
            <nx-input label="Full Name" [(value)]="name"></nx-input>
            <nx-input label="Email" type="email" [(value)]="email"></nx-input>
            <nx-input label="Password" type="password" [(value)]="password"></nx-input>
            <nx-checkbox label="I agree to the Terms of Service" [(checked)]="agree"></nx-checkbox>
            <nx-button variant="primary" [fullWidth]="true">Create Account</nx-button>
        </form>
    </nx-card-content>
</nx-card>`;

  tsCode = `name = '';
email = '';
password = '';
agree = false;`;
}
