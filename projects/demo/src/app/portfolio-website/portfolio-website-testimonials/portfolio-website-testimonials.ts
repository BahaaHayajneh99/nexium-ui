import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NxButton, NxIcon, NxBreadcrumb, NxBreadcrumbItem, nxProLicenseGranted } from 'components';
import { PORTFOLIO_TESTIMONIALS } from '../portfolio-website-data';

/**
 * Dedicated testimonials deep-dive page - all client quotes as a full card grid, distinct from the
 * short 4-card strip already shown on Home.
 */
@Component({
  selector: 'app-portfolio-website-testimonials',
  standalone: true,
  imports: [NgTemplateOutlet, RouterLink, NxButton, NxIcon, NxBreadcrumb],
  templateUrl: './portfolio-website-testimonials.html',
  styleUrl: './portfolio-website-testimonials.scss',
})
export class PortfolioWebsiteTestimonialsDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [
    { label: 'Home', link: '/portfolio-website/home' },
    { label: 'Testimonials' },
  ];

  protected readonly testimonials = PORTFOLIO_TESTIMONIALS;
}
