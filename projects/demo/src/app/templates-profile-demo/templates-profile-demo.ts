import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import {
  UiInput,
  UiTextarea,
  UiAvatar,
  UiBadge,
  UiCard,
  UiCardHeader,
  UiCardContent,
  UiCardFooter,
  UiButton,
} from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-templates-profile-demo',
  imports: [UiInput, UiTextarea, UiAvatar, UiBadge, UiButton, UiCard, UiCardHeader, UiCardContent, UiCardFooter, DemoSection],
  templateUrl: './templates-profile-demo.html',
})
export class TemplatesProfileDemo {
  public commonService = inject(CommonService);
  name = 'Ada Lovelace';
  email = 'ada@nexium.dev';
  bio = `Building interfaces with ${this.commonService.appName}. Enjoys mathematics and mechanical computing.`;
  saved = false;

  onSave(): void {
    this.saved = true;
  }

  previewCode = `<nx-card variant="elevated">
    <nx-card-header>
        <nx-avatar [name]="name" size="large"></nx-avatar>
        <div>{{ name }}</div>
        <nx-badge variant="secondary" size="small">Admin</nx-badge>
    </nx-card-header>

    <nx-card-content>
        <form (submit)="onSave()">
            <nx-input label="Full Name" [(value)]="name"></nx-input>
            <nx-input label="Email" type="email" [(value)]="email"></nx-input>
            <nx-textarea label="Bio" [rows]="3" [(value)]="bio"></nx-textarea>
        </form>
    </nx-card-content>

    <nx-card-footer>
        <nx-button variant="primary" (click)="onSave()">Save Changes</nx-button>
    </nx-card-footer>
</nx-card>`;
}
