import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NxPageHeader,
  NxTabsComponent,
  NxTabComponent,
  NxInput,
  NxTextarea,
  NxSwitch,
  NxColorPicker,
  NxButton,
  NxImageCropper,
} from 'components';
import { ShowcaseSourceView } from '../shared/showcase-source-view/showcase-source-view';
import { SETTINGS_TS_SOURCE, SETTINGS_HTML_SOURCE } from './showcase-settings.source';

@Component({
  selector: 'app-showcase-settings',
  standalone: true,
  imports: [
    FormsModule,
    NxPageHeader,
    NxTabsComponent,
    NxTabComponent,
    NxInput,
    NxTextarea,
    NxSwitch,
    NxColorPicker,
    NxButton,
    NxImageCropper,
    ShowcaseSourceView,
  ],
  templateUrl: './showcase-settings.html',
  styleUrl: './showcase-settings.scss',
})
export class ShowcaseSettings {
  tsSource = SETTINGS_TS_SOURCE;
  htmlSource = SETTINGS_HTML_SOURCE;

  activeTab = 0;

  companyName = 'Nova Analytics';
  companyBio = 'Real-time analytics for growing SaaS teams.';
  brandColor = '#3b82f6';

  logoSrc = signal('');
  savedLogoUrl = signal('');

  emailNotifications = true;
  weeklyDigest = true;
  productUpdates = false;

  twoFactorEnabled = false;
  sessionTimeout = true;

  onLogoFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => this.logoSrc.set(reader.result as string);
    reader.readAsDataURL(file);
  }

  onLogoCropped(dataUrl: string): void {
    this.savedLogoUrl.set(dataUrl);
    this.logoSrc.set('');
  }
}
