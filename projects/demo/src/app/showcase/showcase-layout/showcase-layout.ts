import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NxAppShell, NxSidebar, NxSidebarItem, NxIcon, NxAvatar } from 'components';

const SIDEBAR_ITEMS: NxSidebarItem[] = [
  { label: 'Dashboard', link: '/showcase/dashboard', icon: 'nx-grid', exact: true },
  { label: 'Analytics', link: '/showcase/analytics', icon: 'nx-chart-bar' },
  { label: 'Orders', link: '/showcase/orders', icon: 'nx-shopping-cart' },
  { label: 'Customers', link: '/showcase/customers', icon: 'nx-users' },
  { label: 'Invoices', link: '/showcase/invoices', icon: 'nx-file' },
  { label: 'Projects', link: '/showcase/projects', icon: 'nx-folder' },
  { label: 'Team', link: '/showcase/team', icon: 'nx-users' },
  { label: 'Settings', link: '/showcase/settings', icon: 'nx-settings' },
];

/**
 * The flagship showcase: a real, multi-page admin dashboard app built entirely from NexiumUI
 * components, proving the library can build a genuine product - not just isolated demo snippets.
 * Supplies its own full-page layout; app.ts hides the docs site's own sidebar/chrome on every
 * /showcase route so this fills the whole viewport like a standalone app.
 */
@Component({
  selector: 'app-showcase-layout',
  standalone: true,
  imports: [NxAppShell, NxSidebar, NxIcon, NxAvatar, RouterLink, RouterOutlet],
  templateUrl: './showcase-layout.html',
  styleUrl: './showcase-layout.scss',
})
export class ShowcaseLayout {
  sidebarItems = SIDEBAR_ITEMS;

  // NxSidebar hides its [nx-sidebar-header] slot automatically when collapsed, but not the
  // [nx-sidebar-footer] slot - tracking collapsed state here lets the footer's own content
  // (the "back to docs" link) switch to an icon-only version instead of wrapping awkwardly.
  sidebarCollapsed = signal(false);
}
