import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  nxProLicenseGranted,
  NxInput,
  NxTextarea,
  NxButton,
  NxIcon,
  NxCard,
  NxBreadcrumb,
  NxBreadcrumbItem,
  NxAccordionComponent,
  NxAccordionItemComponent,
  NxAccordionHeaderComponent,
  NxAccordionContentComponent,
} from 'components';
import { REAL_ESTATE_FAQS } from '../real-estate-website-data';

/**
 * Contact page of the "Real Estate Website" PRO template - a contact form, office info
 * card, and an FAQ accordion built from the shared REAL_ESTATE_FAQS data.
 */
@Component({
  selector: 'app-real-estate-website-contact',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    RouterLink,
    NxInput,
    NxTextarea,
    NxButton,
    NxIcon,
    NxCard,
    NxBreadcrumb,
    NxAccordionComponent,
    NxAccordionItemComponent,
    NxAccordionHeaderComponent,
    NxAccordionContentComponent,
  ],
  templateUrl: './real-estate-website-contact.html',
  styleUrl: './real-estate-website-contact.scss',
})
export class RealEstateWebsiteContactDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [{ label: 'Home', link: '/real-estate-website/home' }, { label: 'Contact' }];

  protected readonly faqs = REAL_ESTATE_FAQS;

  protected readonly infoRows = [
    { icon: 'nx-map-pin', text: '915 Congress Ave, Suite 400, Austin, TX 78701' },
    { icon: 'nx-phone', text: '+1 (512) 555-0100' },
    { icon: 'nx-mail', text: 'hello@havenrealty.com' },
    { icon: 'nx-clock', text: 'Mon - Sat, 8am - 7pm local time' },
  ];
}
