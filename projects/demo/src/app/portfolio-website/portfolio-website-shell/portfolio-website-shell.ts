import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { nxProLicenseGranted, NxIcon, NxButton } from 'components';

/**
 * Shared shell for the "Portfolio / Creative Agency Website" PRO template (brand: Glint Studio) -
 * a real studio header + footer wrapping a <router-outlet> so each of the 8 pages (home/work/
 * project detail/services/pricing/about/careers/contact) is its own standalone route, navigable
 * like a real site, not just a tab switcher. The PRO lock is applied independently inside each page.
 */
@Component({
  selector: 'app-portfolio-website-shell',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, NxIcon, NxButton],
  templateUrl: './portfolio-website-shell.html',
  styleUrl: './portfolio-website-shell.scss',
})
export class PortfolioWebsiteShell {
  protected readonly licensed = nxProLicenseGranted();

  readonly navLinks = [
    { label: 'Home', path: '/portfolio-website/home' },
    { label: 'Work', path: '/portfolio-website/work' },
    { label: 'Services', path: '/portfolio-website/services' },
    { label: 'Pricing', path: '/portfolio-website/pricing' },
    { label: 'About', path: '/portfolio-website/about' },
    { label: 'Careers', path: '/portfolio-website/careers' },
    { label: 'Contact', path: '/portfolio-website/contact' },
  ];
}
