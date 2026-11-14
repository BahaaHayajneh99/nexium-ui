import { Component, computed, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { nxProLicenseGranted, NxButton, NxIcon, NxTag, NxBreadcrumb, NxBreadcrumbItem } from 'components';
import { NX_SAAS_INTEGRATIONS, NxSaasIntegration } from '../saas-website-data';

type NxSaasIntegrationFilter = 'All' | NxSaasIntegration['category'];

/**
 * Integrations page of the "SaaS Website" PRO template - a category-filterable grid built
 * from NX_SAAS_INTEGRATIONS, same filter-chip pattern as the Hotel Website Rooms page.
 */
@Component({
  selector: 'app-saas-website-integrations',
  imports: [NgTemplateOutlet, RouterLink, NxButton, NxIcon, NxTag, NxBreadcrumb],
  templateUrl: './saas-website-integrations.html',
  styleUrl: './saas-website-integrations.scss',
})
export class SaasWebsiteIntegrationsDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [
    { label: 'Home', link: '/saas-website/home' },
    { label: 'Integrations' },
  ];

  protected readonly categories: NxSaasIntegrationFilter[] = ['All', 'Communication', 'CRM', 'Payments', 'Data', 'Productivity'];

  protected readonly activeCategory = signal<NxSaasIntegrationFilter>('All');

  protected readonly filteredIntegrations = computed<NxSaasIntegration[]>(() => {
    const category = this.activeCategory();
    return category === 'All' ? NX_SAAS_INTEGRATIONS.slice() : NX_SAAS_INTEGRATIONS.filter((item) => item.category === category);
  });

  protected selectCategory(category: NxSaasIntegrationFilter): void {
    this.activeCategory.set(category);
  }
}
