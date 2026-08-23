import { Component } from '@angular/core';
import { NxBottomNavigation, NxBottomNavItem } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-bottom-navigation-demo',
  imports: [NxBottomNavigation, DemoSection],
  templateUrl: './ui-bottom-navigation-demo.html',
})
export class UiBottomNavigationDemo {
  importCode = `import { NxBottomNavigation, NxBottomNavItem } from 'nexium-ui';`;

  active: string | number = 'home';

  items: NxBottomNavItem[] = [
    { id: 'home', label: 'Home', icon: 'nx-home' },
    { id: 'search', label: 'Search', icon: 'nx-search' },
    { id: 'bookmarks', label: 'Saved', icon: 'nx-bookmark' },
    { id: 'profile', label: 'Profile', icon: 'nx-user' },
  ];

  basicCode = `<nx-bottom-navigation [items]="items" [(active)]="active"></nx-bottom-navigation>`;

  basicTs = `active: string | number = 'home';

items: NxBottomNavItem[] = [
  { id: 'home', label: 'Home', icon: 'nx-home' },
  { id: 'search', label: 'Search', icon: 'nx-search' },
  { id: 'bookmarks', label: 'Saved', icon: 'nx-bookmark' },
  { id: 'profile', label: 'Profile', icon: 'nx-user' },
];`;
}
