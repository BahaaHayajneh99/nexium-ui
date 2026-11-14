import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  nxProLicenseGranted,
  NxButton,
  NxIcon,
  NxBreadcrumb,
  NxBreadcrumbItem,
  NxAccordionComponent,
  NxAccordionItemComponent,
  NxAccordionHeaderComponent,
  NxAccordionContentComponent,
} from 'components';
import { NX_SAAS_CERTIFICATIONS, NX_SAAS_SECURITY_FAQS, NxSaasCertification, NxSaasSecurityFaq } from '../saas-website-data';

/**
 * Security page of the "SaaS Website" PRO template - a certifications row built from
 * NX_SAAS_CERTIFICATIONS followed by an accordion of NX_SAAS_SECURITY_FAQS, same accordion
 * pattern as the E-Commerce Website FAQ page.
 */
@Component({
  selector: 'app-saas-website-security',
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
  templateUrl: './saas-website-security.html',
  styleUrl: './saas-website-security.scss',
})
export class SaasWebsiteSecurityDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [
    { label: 'Home', link: '/saas-website/home' },
    { label: 'Security' },
  ];

  protected readonly certifications: NxSaasCertification[] = NX_SAAS_CERTIFICATIONS;

  protected readonly faqs: NxSaasSecurityFaq[] = NX_SAAS_SECURITY_FAQS;
}
