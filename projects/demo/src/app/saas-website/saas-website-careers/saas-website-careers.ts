import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { nxProLicenseGranted, NxButton, NxIcon, NxTag, NxBreadcrumb, NxBreadcrumbItem } from 'components';
import { NX_SAAS_JOBS, NX_SAAS_BENEFITS, NxSaasJob, NxSaasBenefit } from '../saas-website-data';

/**
 * Careers page of the "SaaS Website" PRO template - a benefits grid built from
 * NX_SAAS_BENEFITS followed by an openings list built from NX_SAAS_JOBS.
 */
@Component({
  selector: 'app-saas-website-careers',
  imports: [NgTemplateOutlet, RouterLink, NxButton, NxIcon, NxTag, NxBreadcrumb],
  templateUrl: './saas-website-careers.html',
  styleUrl: './saas-website-careers.scss',
})
export class SaasWebsiteCareersDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [
    { label: 'Home', link: '/saas-website/home' },
    { label: 'Careers' },
  ];

  protected readonly benefits: NxSaasBenefit[] = NX_SAAS_BENEFITS;

  protected readonly jobs: NxSaasJob[] = NX_SAAS_JOBS;
}
