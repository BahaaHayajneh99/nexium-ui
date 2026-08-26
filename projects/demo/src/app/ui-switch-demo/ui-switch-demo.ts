import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { NxSwitch } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-switch-demo',
  imports: [NxSwitch, DemoSection, FormsModule, ReactiveFormsModule],
  templateUrl: './ui-switch-demo.html',
  styleUrl: './ui-switch-demo.scss',
})
export class UiSwitchDemo {
  importCode = `import { NxSwitch } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  private fb = new FormBuilder();

  notifications = true;

  notificationsForm = this.fb.group({ notifications: [true] });

  reactiveCode = `<div [formGroup]="notificationsForm">
    <nx-switch label="Enable notifications" formControlName="notifications"></nx-switch>
</div>`;

  reactiveTs = `notificationsForm = this.fb.group({ notifications: [true] });`;

  templateCode = `<nx-switch label="Enable notifications" [(ngModel)]="notifications"></nx-switch>`;

  templateTs = `notifications = true;`;

  disabledCode = `<nx-switch label="Disabled switch" [disabled]="true">
</nx-switch>`;
}
