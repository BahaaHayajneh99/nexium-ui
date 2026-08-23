import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxSidebar, NxSidebarItem } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-nx-sidebar-demo',
  imports: [NxSidebar, DemoSection],
  templateUrl: './nx-sidebar-demo.html',
  styleUrl: './nx-sidebar-demo.scss',
})
export class NxSidebarDemo {
  importCode = `import { NxSidebar, NxSidebarItem } from 'nexium-ui';`;

  public commonService = inject(CommonService);
  basicItems: NxSidebarItem[] = [
    { label: 'Dashboard', link: '/sidebar', icon: 'nx-grid', exact: true },
    { label: 'Users', link: '/sidebar/users', icon: 'nx-users' },
    { label: 'Settings', link: '/sidebar/settings', icon: 'nx-settings' },
  ];

  nestedItems: NxSidebarItem[] = [
    { label: 'Dashboard', link: '/sidebar', icon: 'nx-grid', exact: true },
    {
      label: 'Content',
      icon: 'nx-folder',
      children: [
        { label: 'Pages', link: '/sidebar/pages' },
        { label: 'Media', link: '/sidebar/media' },
      ],
    },
    {
      label: 'Settings',
      icon: 'nx-settings',
      children: [
        { label: 'Profile', link: '/sidebar/profile' },
        { label: 'Security', link: '/sidebar/security' },
      ],
    },
  ];

  basicCode = `<nx-sidebar [items]="items"></nx-sidebar>`;

  basicTs = `items: NxSidebarItem[] = [
  { label: 'Dashboard', link: '/sidebar', icon: 'nx-grid', exact: true },
  { label: 'Users', link: '/sidebar/users', icon: 'nx-users' },
  { label: 'Settings', link: '/sidebar/settings', icon: 'nx-settings' },
];`;

  nestedCode = `<nx-sidebar [items]="items"></nx-sidebar>`;

  nestedTs = `items: NxSidebarItem[] = [
  { label: 'Dashboard', link: '/sidebar', icon: 'nx-grid', exact: true },
  {
    label: 'Content',
    icon: 'nx-folder',
    children: [
      { label: 'Pages', link: '/sidebar/pages' },
      { label: 'Media', link: '/sidebar/media' },
    ],
  },
];`;

  headerFooterCode = `<nx-sidebar [items]="items">
  <span nx-sidebar-header>${this.commonService.appName}</span>
  <span nx-sidebar-footer>v1.0.0</span>
</nx-sidebar>`;

  collapseCode = `<nx-sidebar [items]="items" [(collapsed)]="collapsed"></nx-sidebar>`;

  collapsed = false;
}
