export const SETTINGS_TS_SOURCE = `import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxPageHeader, NxTabsComponent, NxTabComponent, NxInput, NxTextarea, NxSwitch, NxColorPicker, NxButton, NxImageCropper } from 'nexium-ui';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule, NxPageHeader, NxTabsComponent, NxTabComponent, NxInput, NxTextarea, NxSwitch, NxColorPicker, NxButton, NxImageCropper],
  templateUrl: './settings.html',
})
export class Settings {
  activeTab = 0;

  companyName = 'Nova Analytics';
  companyBio = 'Real-time analytics for growing SaaS teams.';
  brandColor = '#3b82f6';

  logoSrc = signal('');
  savedLogoUrl = signal('');

  onLogoFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => this.logoSrc.set(reader.result as string);
    reader.readAsDataURL(file);
  }

  onLogoCropped(dataUrl: string): void {
    this.savedLogoUrl.set(dataUrl);
    this.logoSrc.set('');
  }

  emailNotifications = true;
  weeklyDigest = true;
  productUpdates = false;

  twoFactorEnabled = false;
  sessionTimeout = true;
}
`;

export const SETTINGS_HTML_SOURCE = `<div class="page">
    <nx-page-header title="Settings" description="Manage your Nova workspace."></nx-page-header>

    <nx-tabs variant="line" [(activeIndex)]="activeTab">
        <nx-tab label="Profile">
            <div class="logo-section">
                @if (savedLogoUrl()) {
                    <img [src]="savedLogoUrl()" alt="Company logo" />
                }
                <input type="file" accept="image/*" (change)="onLogoFileSelected($event)" />
                @if (logoSrc()) {
                    <nx-image-cropper [src]="logoSrc()" [aspectRatio]="1" (cropped)="onLogoCropped($event)"></nx-image-cropper>
                }
            </div>

            <nx-input label="Company name" [(ngModel)]="companyName"></nx-input>
            <nx-textarea label="Bio" [(ngModel)]="companyBio"></nx-textarea>
            <nx-color-picker label="Brand color" [(ngModel)]="brandColor"></nx-color-picker>
            <nx-button variant="primary">Save changes</nx-button>
        </nx-tab>

        <nx-tab label="Notifications">
            <nx-switch label="Email notifications" [(checked)]="emailNotifications"></nx-switch>
            <nx-switch label="Weekly digest" [(checked)]="weeklyDigest"></nx-switch>
            <nx-switch label="Product updates" [(checked)]="productUpdates"></nx-switch>
            <nx-button variant="primary">Save changes</nx-button>
        </nx-tab>

        <nx-tab label="Security">
            <nx-switch label="Two-factor authentication" [(checked)]="twoFactorEnabled"></nx-switch>
            <nx-switch label="Auto sign-out after 30 minutes idle" [(checked)]="sessionTimeout"></nx-switch>
            <nx-button variant="primary">Save changes</nx-button>
        </nx-tab>
    </nx-tabs>
</div>
`;
