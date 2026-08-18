import { Component } from '@angular/core';
import { NxTabsComponent, NxTabComponent, NxTabLabelDirective, UiIcon } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-tabs-demo',
  imports: [NxTabsComponent, NxTabComponent, NxTabLabelDirective,UiIcon, DemoSection],
  templateUrl: './ui-tabs-demo.html',
  styleUrl: './ui-tabs-demo.scss',
})
export class UiTabsDemo {
  activeTab = 0;

  basicCode = `<nx-tabs>
    <nx-tab label="Profile">Profile information content.</nx-tab>
    <nx-tab label="Settings">Settings content.</nx-tab>
    <nx-tab label="Security">Security settings content.</nx-tab>
</nx-tabs>`;

  activeCode = `<nx-tabs [(activeIndex)]="activeTab">
    <nx-tab label="Overview">Overview content.</nx-tab>
    <nx-tab label="Analytics">Analytics content.</nx-tab>
    <nx-tab label="Reports">Reports content.</nx-tab>
</nx-tabs>`;

  activeTs = `activeTab = 0;`;

  disabledCode = `<nx-tabs>
    <nx-tab label="Active">Active content.</nx-tab>
    <nx-tab label="Disabled" [disabled]="true">Disabled content.</nx-tab>
    <nx-tab label="Available">Available content.</nx-tab>
</nx-tabs>`;

  iconCode = `<nx-tabs>
    <nx-tab label="Home" icon="nx-home">Home content.</nx-tab>
    <nx-tab label="Users" icon="nx-users">Users content.</nx-tab>
    <nx-tab label="Settings" icon="nx-settings">Settings content.</nx-tab>
</nx-tabs>`;

  fullWidthCode = `<nx-tabs [fullWidth]="true">
    <nx-tab label="Day">Daily view.</nx-tab>
    <nx-tab label="Week">Weekly view.</nx-tab>
    <nx-tab label="Month">Monthly view.</nx-tab>
</nx-tabs>`;

  lineCode = `<nx-tabs variant="line">
    <nx-tab label="First">First content.</nx-tab>
    <nx-tab label="Second">Second content.</nx-tab>
</nx-tabs>`;

  filledCode = `<nx-tabs variant="filled">
    <nx-tab label="Dashboard">Dashboard content.</nx-tab>
    <nx-tab label="Activity">Activity content.</nx-tab>
    <nx-tab label="Messages">Messages content.</nx-tab>
</nx-tabs>`;

  pillCode = `<nx-tabs variant="pill">
    <nx-tab label="All">All items.</nx-tab>
    <nx-tab label="Active">Active items.</nx-tab>
    <nx-tab label="Archived">Archived items.</nx-tab>
</nx-tabs>`;

  boxedCode = `<nx-tabs variant="boxed">
    <nx-tab label="Details">Details content.</nx-tab>
    <nx-tab label="History">History content.</nx-tab>
</nx-tabs>`;

  verticalCode = `<nx-tabs orientation="vertical">
    <nx-tab label="General">General settings.</nx-tab>
    <nx-tab label="Account">Account settings.</nx-tab>
    <nx-tab label="Notifications">Notification settings.</nx-tab>
</nx-tabs>`;

  customTemplateCode = `<nx-tabs>
    <nx-tab>
        <ng-template nxTabLabel><nx-icon icon="nx-star" variant="svg" [size]="16"></nx-icon> Favorites</ng-template>
        Favorite content.
    </nx-tab>

    <nx-tab>
        <ng-template nxTabLabel><nx-icon icon="nx-fire" variant="svg" [size]="16"></nx-icon> Popular</ng-template>
        Popular content.
    </nx-tab>
</nx-tabs>`;
}
