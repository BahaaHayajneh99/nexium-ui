import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NxButton, NxIcon, NxStatistic, nxProLicenseGranted } from 'components';
import {
  PORTFOLIO_PROJECTS,
  PORTFOLIO_SERVICES,
  PORTFOLIO_TESTIMONIALS,
  NxPortfolioProject,
} from '../portfolio-website-data';

interface NxPortfolioStat {
  label: string;
  value: string;
}

@Component({
  selector: 'app-portfolio-website-home',
  standalone: true,
  imports: [NgTemplateOutlet, RouterLink, NxButton, NxIcon, NxStatistic],
  templateUrl: './portfolio-website-home.html',
  styleUrl: './portfolio-website-home.scss',
})
export class PortfolioWebsiteHomeDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly services = PORTFOLIO_SERVICES;

  protected readonly featuredProjects: NxPortfolioProject[] = PORTFOLIO_PROJECTS.slice(0, 6);

  protected readonly testimonials = PORTFOLIO_TESTIMONIALS;

  protected readonly stats: NxPortfolioStat[] = [
    { label: 'Projects Shipped', value: '120+' },
    { label: 'Happy Clients', value: '40+' },
    { label: 'Years Running', value: '8' },
    { label: 'Awards Won', value: '15' },
  ];
}
