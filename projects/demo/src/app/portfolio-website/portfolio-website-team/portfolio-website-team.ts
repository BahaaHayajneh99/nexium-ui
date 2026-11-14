import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NxButton, NxIcon, NxBreadcrumb, NxBreadcrumbItem, nxProLicenseGranted } from 'components';
import { PORTFOLIO_TEAM } from '../portfolio-website-data';

/** Full-studio team page - richer than the compact grid on About, with every bio shown inline. */
@Component({
  selector: 'app-portfolio-website-team',
  standalone: true,
  imports: [NgTemplateOutlet, RouterLink, NxButton, NxIcon, NxBreadcrumb],
  templateUrl: './portfolio-website-team.html',
  styleUrl: './portfolio-website-team.scss',
})
export class PortfolioWebsiteTeamDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [
    { label: 'Home', link: '/portfolio-website/home' },
    { label: 'Team' },
  ];

  protected readonly team = PORTFOLIO_TEAM;
}
