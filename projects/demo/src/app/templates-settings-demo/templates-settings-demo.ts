import { Component } from '@angular/core';
import {
  UiSwitch,
  UiSelect,
  NxSelectOption,
  UiCard,
  UiCardHeader,
  UiCardTitle,
  UiCardSubtitle,
  UiCardContent,
  UiCardFooter,
  UiButton,
} from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-templates-settings-demo',
  imports: [UiSwitch, UiSelect, UiButton, UiCard, UiCardHeader, UiCardTitle, UiCardSubtitle, UiCardContent, UiCardFooter, DemoSection],
  templateUrl: './templates-settings-demo.html',
})
export class TemplatesSettingsDemo {
  languageOptions: NxSelectOption[] = [
    { label: 'English', value: 'en' },
    { label: 'Arabic', value: 'ar' },
    { label: 'Spanish', value: 'es' },
    { label: 'French', value: 'fr' },
  ];

  language = 'en';
  emailNotifications = true;
  pushNotifications = false;
  twoFactorAuth = true;
  saved = false;

  onSave(): void {
    this.saved = true;
  }

  notificationsCode = `<nx-card variant="elevated">
    <nx-card-header>
        <nx-card-title>Notifications</nx-card-title>
        <nx-card-subtitle>Choose what you want to be notified about</nx-card-subtitle>
    </nx-card-header>

    <nx-card-content>
        <div>
            <div>Email notifications</div>
            <nx-switch [(checked)]="emailNotifications"></nx-switch>
        </div>
        <div>
            <div>Push notifications</div>
            <nx-switch [(checked)]="pushNotifications"></nx-switch>
        </div>
        <div>
            <div>Two-factor authentication</div>
            <nx-switch [(checked)]="twoFactorAuth"></nx-switch>
        </div>
    </nx-card-content>
</nx-card>`;

  languageCode = `<nx-card variant="elevated">
    <nx-card-header>
        <nx-card-title>Language</nx-card-title>
    </nx-card-header>
    <nx-card-content>
        <nx-select label="Display language" [options]="languageOptions" [(value)]="language"></nx-select>
    </nx-card-content>
    <nx-card-footer>
        <nx-button variant="primary" (click)="onSave()">Save Preferences</nx-button>
    </nx-card-footer>
</nx-card>`;
}
