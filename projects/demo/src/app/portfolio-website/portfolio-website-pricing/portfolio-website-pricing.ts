import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NxButton, NxIcon, NxBreadcrumb, NxBreadcrumbItem, nxProLicenseGranted } from 'components';
import { PORTFOLIO_PACKAGES } from '../portfolio-website-data';

@Component({
  selector: 'app-portfolio-website-pricing',
  standalone: true,
  imports: [NgTemplateOutlet, RouterLink, NxButton, NxIcon, NxBreadcrumb],
  templateUrl: './portfolio-website-pricing.html',
  styleUrl: './portfolio-website-pricing.scss',
})
export class PortfolioWebsitePricingDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [{ label: 'Home', link: '/portfolio-website/home' }, { label: 'Pricing' }];

  protected readonly packages = PORTFOLIO_PACKAGES;
}
