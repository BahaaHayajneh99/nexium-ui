import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { nxProLicenseGranted, NxIcon, NxButton } from 'components';

/**
 * Shared shell for the "SaaS Website" PRO template - a real product-marketing header + footer
 * wrapping a <router-outlet> so each of the 8 pages (home/features/pricing/dashboard/login/
 * signup/contact/about) is its own standalone route, navigable like a real site, not just a
 * tab switcher. The PRO lock is applied independently inside each page.
 */
@Component({
  selector: 'app-saas-website-shell',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, NxIcon, NxButton],
  templateUrl: './saas-website-shell.html',
  styleUrl: './saas-website-shell.scss',
})
export class SaasWebsiteShell {
  protected readonly licensed = nxProLicenseGranted();

  readonly navLinks = [
    { label: 'Home', path: '/saas-website/home' },
    { label: 'Features', path: '/saas-website/features' },
    { label: 'Pricing', path: '/saas-website/pricing' },
    { label: 'Integrations', path: '/saas-website/integrations' },
    { label: 'About', path: '/saas-website/about' },
    { label: 'Contact', path: '/saas-website/contact' },
  ];
}
