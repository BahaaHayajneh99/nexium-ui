import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { nxProLicenseGranted, NxIcon, NxButton } from 'components';

/**
 * Shared shell for the "Hotel / Travel Booking Website" PRO template - a boutique hotel
 * header + footer wrapping a <router-outlet> so each of the 8 pages (home/rooms/room
 * detail/amenities/booking/login/signup/contact) is its own standalone route, navigable
 * like a real site, not just a tab switcher. The PRO lock is applied independently inside
 * each page.
 */
@Component({
  selector: 'app-hotel-website-shell',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, NxIcon, NxButton],
  templateUrl: './hotel-website-shell.html',
  styleUrl: './hotel-website-shell.scss',
})
export class HotelWebsiteShell {
  protected readonly licensed = nxProLicenseGranted();

  readonly navLinks = [
    { label: 'Home', path: '/hotel-website/home' },
    { label: 'Rooms', path: '/hotel-website/rooms' },
    { label: 'Amenities', path: '/hotel-website/amenities' },
    { label: 'Dining', path: '/hotel-website/dining' },
    { label: 'Contact', path: '/hotel-website/contact' },
  ];
}
