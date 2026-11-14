import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NxButton, NxIcon, NxBreadcrumb, NxBreadcrumbItem, nxProLicenseGranted } from 'components';
import { COURSE_PLANS } from '../course-website-data';

/**
 * Pricing page of the "Course Website" PRO template - three plan cards (Single Course /
 * All-Access / Teams), mirroring the SaaS Website Pricing page's plan-card pattern.
 */
@Component({
  selector: 'app-course-website-pricing',
  standalone: true,
  imports: [NgTemplateOutlet, RouterLink, NxButton, NxIcon, NxBreadcrumb],
  templateUrl: './course-website-pricing.html',
  styleUrl: './course-website-pricing.scss',
})
export class CourseWebsitePricingDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [
    { label: 'Home', link: '/course-website/home' },
    { label: 'Pricing' },
  ];

  protected readonly plans = COURSE_PLANS;
}
