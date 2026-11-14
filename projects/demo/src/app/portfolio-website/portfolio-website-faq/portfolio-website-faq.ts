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
import { PORTFOLIO_FAQS } from '../portfolio-website-data';

@Component({
  selector: 'app-portfolio-website-faq',
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
  templateUrl: './portfolio-website-faq.html',
  styleUrl: './portfolio-website-faq.scss',
})
export class PortfolioWebsiteFaqDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [
    { label: 'Home', link: '/portfolio-website/home' },
    { label: 'FAQ' },
  ];

  protected readonly faqs = PORTFOLIO_FAQS;
}
