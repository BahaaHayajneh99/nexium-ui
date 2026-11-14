import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NxButton, NxIcon, NxTag, NxBreadcrumb, NxBreadcrumbItem, nxProLicenseGranted } from 'components';
import { PORTFOLIO_JOBS } from '../portfolio-website-data';

@Component({
  selector: 'app-portfolio-website-careers',
  standalone: true,
  imports: [NgTemplateOutlet, RouterLink, NxButton, NxIcon, NxTag, NxBreadcrumb],
  templateUrl: './portfolio-website-careers.html',
  styleUrl: './portfolio-website-careers.scss',
})
export class PortfolioWebsiteCareersDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [{ label: 'Home', link: '/portfolio-website/home' }, { label: 'Careers' }];

  protected readonly jobs = PORTFOLIO_JOBS;

  protected readonly perks = [
    { icon: 'nx-globe', text: 'Remote-friendly with quarterly in-person studio weeks' },
    { icon: 'nx-clock', text: 'Flexible hours - we care about the work, not the clock' },
    { icon: 'nx-heart', text: 'Full health coverage plus a wellness stipend' },
    { icon: 'nx-book', text: 'Annual learning budget for courses, books, and conferences' },
  ];
}
