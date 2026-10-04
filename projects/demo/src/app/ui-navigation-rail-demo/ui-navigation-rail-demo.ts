import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxNavigationRail, NxNavigationRailItem } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-navigation-rail-demo',
  imports: [NxNavigationRail, DemoSection],
  templateUrl: './ui-navigation-rail-demo.html',
  styleUrl: './ui-navigation-rail-demo.scss',
})
export class UiNavigationRailDemo {
  importCode = `import { NxNavigationRail } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  basicCode = `<nx-navigation-rail [items]="items" [(active)]="active"></nx-navigation-rail>`;

  basicTs = `items: NxNavigationRailItem[] = [
  { id: 'home', label: 'Home', icon: 'nx-home' },
  { id: 'search', label: 'Search', icon: 'nx-search' },
  { id: 'inbox', label: 'Inbox', icon: 'nx-mail', badge: 4 },
  { id: 'settings', label: 'Settings', icon: 'nx-settings' },
];

active: string | number = 'home';`;

  items: NxNavigationRailItem[] = [
    { id: 'home', label: 'Home', icon: 'nx-home' },
    { id: 'search', label: 'Search', icon: 'nx-search' },
    { id: 'inbox', label: 'Inbox', icon: 'nx-mail', badge: 4 },
    { id: 'settings', label: 'Settings', icon: 'nx-settings' },
  ];

  active: string | number = 'home';

  onActiveChange(id: string | number): void {
    this.active = id;
  }

  noLabelsCode = `<nx-navigation-rail [items]="items" [active]="active" [showLabels]="false" (activeChange)="onActiveChange($event)"></nx-navigation-rail>`;

  noLabelsTs = `// showLabels defaults to true - set it to false for an icon-only rail.`;
}
