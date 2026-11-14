import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NxButton, NxIcon, NxInput, NxTextarea, NxCard, NxBreadcrumb, NxBreadcrumbItem, nxProLicenseGranted } from 'components';

/**
 * Contact page of the "Portfolio / Creative Agency Website" PRO template - a project-inquiry
 * form plus studio info cards, mirroring ecommerce-website-contact's layout.
 */
@Component({
  selector: 'app-portfolio-website-contact',
  standalone: true,
  imports: [NgTemplateOutlet, RouterLink, NxButton, NxIcon, NxInput, NxTextarea, NxCard, NxBreadcrumb],
  templateUrl: './portfolio-website-contact.html',
  styleUrl: './portfolio-website-contact.scss',
})
export class PortfolioWebsiteContactDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [{ label: 'Home', link: '/portfolio-website/home' }, { label: 'Contact' }];

  protected readonly infoRows = [
    { icon: 'nx-map-pin', text: '88 Lafayette Street, New York, NY 10013' },
    { icon: 'nx-phone', text: '+1 (212) 555-0198' },
    { icon: 'nx-mail', text: 'hello@glintstudio.com' },
    { icon: 'nx-clock', text: 'Mon - Fri, 9am - 6pm ET' },
  ];
}
