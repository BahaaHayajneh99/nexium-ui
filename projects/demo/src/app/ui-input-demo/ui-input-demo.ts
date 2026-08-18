import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { UiInput } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-input-demo',
  imports: [UiInput, DemoSection],
  templateUrl: './ui-input-demo.html',
  styleUrl: './ui-input-demo.scss',
})
export class UiInputDemo {
  public commonService = inject(CommonService);
  name = '';
  email = '';

  basicCode = `<nx-input label="Full Name" placeholder="Enter your name" [(value)]="name">
</nx-input>`;

  basicTs = `name = '';`;

  errorCode = `<nx-input label="Email" [(value)]="email" error="Please enter a valid email address">
</nx-input>`;

  errorTs = `email = '';`;

  disabledCode = `<nx-input label="Disabled" value="Can't edit this" [disabled]="true">
</nx-input>`;
}
