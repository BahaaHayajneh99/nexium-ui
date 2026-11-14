import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { nxProLicenseGranted, NxIcon, NxButton } from 'components';

/**
 * Shared shell for the "Real Estate Website" PRO template - a sticky brokerage header +
 * footer wrapping a <router-outlet> so each of the 8 pages (home/listings/listing detail/
 * agents/contact/login/signup/about) is its own standalone route, navigable like a real
 * site, not just a tab switcher. The PRO lock is applied independently inside each page.
 */
@Component({
  selector: 'app-real-estate-website-shell',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, NxIcon, NxButton],
  templateUrl: './real-estate-website-shell.html',
  styleUrl: './real-estate-website-shell.scss',
})
export class RealEstateWebsiteShell {
  protected readonly licensed = nxProLicenseGranted();

  readonly navLinks = [
    { label: 'Home', path: '/real-estate-website/home' },
    { label: 'Listings', path: '/real-estate-website/listings' },
    { label: 'Neighborhoods', path: '/real-estate-website/neighborhoods' },
    { label: 'Agents', path: '/real-estate-website/agents' },
    { label: 'About', path: '/real-estate-website/about' },
    { label: 'Contact', path: '/real-estate-website/contact' },
  ];
}
