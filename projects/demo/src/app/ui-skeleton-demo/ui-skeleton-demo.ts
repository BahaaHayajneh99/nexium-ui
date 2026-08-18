import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxSkeleton, NxSidebar, NxSidebarItem } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-skeleton-demo',
  imports: [NxSkeleton, NxSidebar, DemoSection],
  templateUrl: './ui-skeleton-demo.html',
  styleUrl: './ui-skeleton-demo.scss',
})
export class UiSkeletonDemo {
  public commonService = inject(CommonService);
  navItems: NxSidebarItem[] = [
    { label: 'Dashboard', link: '/sidebar', icon: 'nx-grid', exact: true },
    { label: 'Users', link: '/sidebar/users', icon: 'nx-users' },
    { label: 'Settings', link: '/sidebar/settings', icon: 'nx-settings' },
  ];

  navLoading = true;

  toggleNavLoading(): void {
    this.navLoading = !this.navLoading;
  }

  basicCode = `<nx-skeleton></nx-skeleton>`;

  linesCode = `<nx-skeleton [count]="3"></nx-skeleton>`;

  variantsCode = `<nx-skeleton variant="text" width="200px"></nx-skeleton>
<nx-skeleton variant="circle" width="48px"></nx-skeleton>
<nx-skeleton variant="rect" width="100%" height="120px"></nx-skeleton>`;

  cardCode = `<div class="card-skeleton">
  <nx-skeleton variant="circle" width="40px"></nx-skeleton>
  <div class="card-skeleton-lines">
    <nx-skeleton variant="text" width="60%"></nx-skeleton>
    <nx-skeleton variant="text" width="90%"></nx-skeleton>
  </div>
</div>`;

  staticCode = `<nx-skeleton [animated]="false"></nx-skeleton>`;

  navCode = `<!-- while the nav data is loading -->
<div class="nx-sidebar-skeleton">
  @for (row of [1, 2, 3]; track row) {
    <div class="nx-sidebar-skeleton-row">
      <nx-skeleton variant="circle" width="20px"></nx-skeleton>
      <nx-skeleton variant="text" width="70%"></nx-skeleton>
    </div>
  }
</div>

<!-- once the nav items have loaded -->
<nx-sidebar [items]="items"></nx-sidebar>`;
}
