import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  NxButton,
  NxIcon,
  NxBreadcrumb,
  NxBreadcrumbItem,
  NxAccordionComponent,
  NxAccordionItemComponent,
  NxAccordionHeaderComponent,
  NxAccordionContentComponent,
  nxProLicenseGranted,
} from 'components';
import { REAL_ESTATE_FAQS } from '../real-estate-website-data';

/**
 * FAQ page of the "Real Estate Website" PRO template - renders REAL_ESTATE_FAQS in a single
 * nx-accordion (same accordion markup pattern as the E-Commerce Website FAQ page).
 */
@Component({
  selector: 'app-real-estate-website-faq',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    RouterLink,
    NxButton,
    NxIcon,
    NxBreadcrumb,
    NxAccordionComponent,
    NxAccordionItemComponent,
    NxAccordionHeaderComponent,
    NxAccordionContentComponent,
  ],
  templateUrl: './real-estate-website-faq.html',
  styleUrl: './real-estate-website-faq.scss',
})
export class RealEstateWebsiteFaqDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [
    { label: 'Home', link: '/real-estate-website/home' },
    { label: 'FAQ' },
  ];

  protected readonly faqs = REAL_ESTATE_FAQS;
}
