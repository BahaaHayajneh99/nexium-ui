import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { nxProLicenseGranted, NxIcon, NxInput, NxButton } from 'components';

/**
 * Shared shell for the "E-Commerce Website" PRO template - a real storefront header +
 * footer wrapping a <router-outlet> so each of the 8 pages (home/shop/product/cart/
 * checkout/login/signup/contact) is its own standalone route, navigable like a real site,
 * not just a tab switcher. The PRO lock is applied independently inside each page.
 */
@Component({
  selector: 'app-ecommerce-website-shell',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, NxIcon, NxInput, NxButton],
  templateUrl: './ecommerce-website-shell.html',
  styleUrl: './ecommerce-website-shell.scss',
})
export class EcommerceWebsiteShell {
  protected readonly licensed = nxProLicenseGranted();

  readonly navLinks = [
    { label: 'Home', path: '/ecommerce-website/home' },
    { label: 'Shop', path: '/ecommerce-website/shop' },
    { label: 'Blog', path: '/ecommerce-website/blog' },
    { label: 'About', path: '/ecommerce-website/about' },
    { label: 'FAQ', path: '/ecommerce-website/faq' },
    { label: 'Contact', path: '/ecommerce-website/contact' },
  ];

  readonly cartCount = 3;
}
