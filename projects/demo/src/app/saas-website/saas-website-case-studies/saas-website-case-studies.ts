import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { nxProLicenseGranted, NxButton, NxIcon, NxTag, NxStatistic, NxBreadcrumb, NxBreadcrumbItem } from 'components';
import { NX_SAAS_CASE_STUDIES, NxSaasCaseStudy } from '../saas-website-data';

/**
 * Case Studies index page of the "SaaS Website" PRO template - a card grid built from
 * NX_SAAS_CASE_STUDIES, each card linking to its own detail page by slug.
 */
@Component({
  selector: 'app-saas-website-case-studies',
  imports: [NgTemplateOutlet, RouterLink, NxButton, NxIcon, NxTag, NxStatistic, NxBreadcrumb],
  templateUrl: './saas-website-case-studies.html',
  styleUrl: './saas-website-case-studies.scss',
})
export class SaasWebsiteCaseStudiesDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [
    { label: 'Home', link: '/saas-website/home' },
    { label: 'Case Studies' },
  ];

  protected readonly caseStudies: NxSaasCaseStudy[] = NX_SAAS_CASE_STUDIES;
}
