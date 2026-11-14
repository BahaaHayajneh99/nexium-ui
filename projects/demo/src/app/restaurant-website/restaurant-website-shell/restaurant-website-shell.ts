import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { nxProLicenseGranted, NxIcon, NxButton } from 'components';
import { RESTAURANT_HOURS } from '../restaurant-website-data';

/**
 * Shared shell for the "Restaurant Website" PRO template (Olive & Oak) - a sticky header +
 * footer wrapping a <router-outlet> so each of the 8 pages (home/menu/cart/checkout/
 * reservations/login/signup/contact) is its own standalone route. The PRO lock is applied
 * independently inside each page.
 */
@Component({
  selector: 'app-restaurant-website-shell',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, NxIcon, NxButton],
  templateUrl: './restaurant-website-shell.html',
  styleUrl: './restaurant-website-shell.scss',
})
export class RestaurantWebsiteShell {
  protected readonly licensed = nxProLicenseGranted();

  readonly navLinks = [
    { label: 'Home', path: '/restaurant-website/home' },
    { label: 'Menu', path: '/restaurant-website/menu' },
    { label: 'Reservations', path: '/restaurant-website/reservations' },
    { label: 'About', path: '/restaurant-website/about' },
    { label: 'Contact', path: '/restaurant-website/contact' },
  ];

  readonly cartCount = 2;

  readonly hours = RESTAURANT_HOURS;
}
