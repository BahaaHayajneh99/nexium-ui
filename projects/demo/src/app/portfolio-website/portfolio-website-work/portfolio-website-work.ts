import { Component, computed, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NxButton, NxIcon, NxBreadcrumb, NxBreadcrumbItem, NxMasonry, nxProLicenseGranted } from 'components';
import { PORTFOLIO_CATEGORIES, PORTFOLIO_PROJECTS, NxPortfolioProject } from '../portfolio-website-data';

@Component({
  selector: 'app-portfolio-website-work',
  standalone: true,
  imports: [NgTemplateOutlet, RouterLink, NxButton, NxIcon, NxBreadcrumb, NxMasonry],
  templateUrl: './portfolio-website-work.html',
  styleUrl: './portfolio-website-work.scss',
})
export class PortfolioWebsiteWorkDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [{ label: 'Home', link: '/portfolio-website/home' }, { label: 'Work' }];

  protected readonly categories = PORTFOLIO_CATEGORIES;

  protected readonly activeCategory = signal<string>('All');

  protected readonly filteredProjects = computed<NxPortfolioProject[]>(() => {
    const category = this.activeCategory();
    if (category === 'All') {
      return PORTFOLIO_PROJECTS;
    }
    return PORTFOLIO_PROJECTS.filter((project) => project.category === category);
  });

  protected selectCategory(category: string): void {
    this.activeCategory.set(category);
  }

  /** Alternates a few fixed media heights by index so the masonry grid reads as a real masonry, not a uniform grid. */
  protected mediaHeight(index: number): string {
    const heights = ['220px', '300px', '260px'];
    return heights[index % heights.length];
  }
}
