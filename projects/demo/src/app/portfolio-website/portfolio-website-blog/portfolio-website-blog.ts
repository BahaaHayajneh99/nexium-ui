import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NxButton, NxIcon, NxTag, NxBreadcrumb, NxBreadcrumbItem, nxProLicenseGranted } from 'components';
import { PORTFOLIO_BLOG_POSTS } from '../portfolio-website-data';

@Component({
  selector: 'app-portfolio-website-blog',
  standalone: true,
  imports: [NgTemplateOutlet, RouterLink, NxButton, NxIcon, NxTag, NxBreadcrumb],
  templateUrl: './portfolio-website-blog.html',
  styleUrl: './portfolio-website-blog.scss',
})
export class PortfolioWebsiteBlogDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [
    { label: 'Home', link: '/portfolio-website/home' },
    { label: 'Blog' },
  ];

  protected readonly posts = PORTFOLIO_BLOG_POSTS;
}
