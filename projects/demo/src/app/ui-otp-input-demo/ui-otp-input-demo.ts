import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NxOtpInput } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-otp-input-demo',
  imports: [NxOtpInput, DemoSection, FormsModule, ReactiveFormsModule],
  templateUrl: './ui-otp-input-demo.html',
})
export class UiOtpInputDemo {
  importCode = `import { NxOtpInput } from 'nexium-ui';`;

  code = '';
  completedCode = '';

  private fb = new FormBuilder();

  codeForm = this.fb.group({ code: [''] });

  reactiveCode = `<div [formGroup]="codeForm">
    <nx-otp-input formControlName="code" [length]="6"></nx-otp-input>
</div>`;
  reactiveTs = `codeForm = this.fb.group({ code: [''] });`;

  templateCode = `<nx-otp-input [(ngModel)]="code" [length]="6"></nx-otp-input>`;
  templateTs = `code = '';`;

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
