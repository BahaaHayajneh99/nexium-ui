import { Component } from '@angular/core';
import { UiOtpInput } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-otp-input-demo',
  imports: [UiOtpInput, DemoSection],
  templateUrl: './ui-otp-input-demo.html',
})
export class UiOtpInputDemo {
  code = '';
  completedCode = '';

  basicCode = `<nx-otp-input [(value)]="code" [length]="6"></nx-otp-input>`;
  basicTs = `code = '';`;

  completedTemplate = `<nx-otp-input [length]="4" (completed)="onCompleted($event)"></nx-otp-input>`;
  completedTs = `onCompleted(code: string): void {
  // verify the code
}`;

  onCompleted(value: string): void {
    this.completedCode = value;
  }

  invalidCode = `<nx-otp-input [length]="6" [invalid]="true"></nx-otp-input>`;

  disabledCode = `<nx-otp-input [length]="6" [disabled]="true" value="123"></nx-otp-input>`;
}
