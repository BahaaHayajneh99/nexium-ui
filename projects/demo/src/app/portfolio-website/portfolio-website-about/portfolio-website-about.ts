import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NxButton, NxIcon, NxBreadcrumb, NxBreadcrumbItem, NxStatistic, NxHoverCard, nxProLicenseGranted } from 'components';
import { PORTFOLIO_TEAM } from '../portfolio-website-data';

interface NxPortfolioAboutStat {
  label: string;
  value: string;
}

@Component({
  selector: 'app-portfolio-website-about',
  standalone: true,
  imports: [NgTemplateOutlet, RouterLink, NxButton, NxIcon, NxBreadcrumb, NxStatistic, NxHoverCard],
  templateUrl: './portfolio-website-about.html',
  styleUrl: './portfolio-website-about.scss',
})
export class PortfolioWebsiteAboutDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [{ label: 'Home', link: '/portfolio-website/home' }, { label: 'About' }];

  protected readonly team = PORTFOLIO_TEAM;

  protected readonly stats: NxPortfolioAboutStat[] = [
    { label: 'Projects Shipped', value: '120+' },
    { label: 'Happy Clients', value: '40+' },
    { label: 'Years Running', value: '8' },
    { label: 'Team Members', value: '14' },
  ];
}
