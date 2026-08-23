import { Component } from '@angular/core';
import { NxInput, NxCheckbox, NxCard, NxCardHeader, NxCardTitle, NxCardSubtitle, NxCardContent, NxButton } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-blocks-login-demo',
  imports: [NxInput, NxCheckbox, NxButton, NxCard, NxCardHeader, NxCardTitle, NxCardSubtitle, NxCardContent, DemoSection],
  templateUrl: './blocks-login-demo.html',
})
export class BlocksLoginDemo {
  email = '';
  password = '';
  remember = false;

  code = `<nx-card class="template-card" variant="elevated">
    <nx-card-header>
        <nx-card-title>Sign in</nx-card-title>
        <nx-card-subtitle>Welcome back</nx-card-subtitle>
    </nx-card-header>
    <nx-card-content>
        <form class="template-form">
            <nx-input label="Email" type="email" [(value)]="email"></nx-input>
            <nx-input label="Password" type="password" [(value)]="password"></nx-input>
            <nx-checkbox label="Remember me" [(checked)]="remember"></nx-checkbox>
            <nx-button variant="primary" [fullWidth]="true">Sign In</nx-button>
        </form>
    </nx-card-content>
</nx-card>`;

  tsCode = `email = '';
password = '';
remember = false;`;
}
