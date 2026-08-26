import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NxInput } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-input-demo',
  imports: [NxInput, DemoSection, FormsModule, ReactiveFormsModule],
  templateUrl: './ui-input-demo.html',
  styleUrl: './ui-input-demo.scss',
})
export class UiInputDemo {
  importCode = `import { NxInput } from 'nexium-ui';`;

  public commonService = inject(CommonService);
  name = '';
  email = '';

  private fb = new FormBuilder();

  nameForm = this.fb.group({ name: [''] });

  reactiveCode = `<div [formGroup]="nameForm">
    <nx-input label="Full Name" placeholder="Enter your name" formControlName="name"></nx-input>
</div>`;

  reactiveTs = `nameForm = this.fb.group({ name: [''] });`;

  templateCode = `<nx-input label="Full Name" placeholder="Enter your name" [(ngModel)]="name"></nx-input>`;

  templateTs = `name = '';`;

  errorCode = `<nx-input label="Email" [(ngModel)]="email" error="Please enter a valid email address">
</nx-input>`;

  errorTs = `email = '';`;

  disabledCode = `<nx-input label="Disabled" value="Can't edit this" [disabled]="true">
</nx-input>`;
}
