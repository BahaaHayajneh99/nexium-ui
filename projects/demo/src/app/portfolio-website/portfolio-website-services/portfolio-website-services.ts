import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NxButton, NxIcon, NxBreadcrumb, NxBreadcrumbItem, NxTimeline, NxTimelineItem, nxProLicenseGranted } from 'components';
import { PORTFOLIO_SERVICES, PORTFOLIO_PROCESS_STEPS } from '../portfolio-website-data';

@Component({
  selector: 'app-portfolio-website-services',
  standalone: true,
  imports: [NgTemplateOutlet, RouterLink, NxButton, NxIcon, NxBreadcrumb, NxTimeline],
  templateUrl: './portfolio-website-services.html',
  styleUrl: './portfolio-website-services.scss',
})
export class PortfolioWebsiteServicesDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [{ label: 'Home', link: '/portfolio-website/home' }, { label: 'Services' }];

  protected readonly services = PORTFOLIO_SERVICES;

  protected readonly processItems: NxTimelineItem[] = PORTFOLIO_PROCESS_STEPS.map((step) => ({
    title: step.title,
    description: step.description,
  }));
}
