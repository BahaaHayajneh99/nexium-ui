import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NxButton, NxIcon, NxBreadcrumb, NxBreadcrumbItem, nxProLicenseGranted } from 'components';
import { REAL_ESTATE_AGENTS } from '../real-estate-website-data';

/**
 * Agents page of the "Real Estate Website" PRO template - a simple static grid of agent
 * cards (no dynamic detail route; per-agent contact info is enough detail here).
 */
@Component({
  selector: 'app-real-estate-website-agents',
  standalone: true,
  imports: [NgTemplateOutlet, RouterLink, NxButton, NxIcon, NxBreadcrumb],
  templateUrl: './real-estate-website-agents.html',
  styleUrl: './real-estate-website-agents.scss',
})
export class RealEstateWebsiteAgentsDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [{ label: 'Home', link: '/real-estate-website/home' }, { label: 'Agents' }];

  protected readonly agents = REAL_ESTATE_AGENTS;
}
