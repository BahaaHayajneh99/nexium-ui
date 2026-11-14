import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgTemplateOutlet } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import {
  NxButton,
  NxIcon,
  NxTag,
  NxBreadcrumb,
  NxBreadcrumbItem,
  NxLightbox,
  NxBeforeAfter,
  nxProLicenseGranted,
} from 'components';
import type { NxLightboxImage } from 'components';
import { PORTFOLIO_PROJECTS, portfolioProjectGallery, portfolioImage } from '../portfolio-website-data';

/**
 * Case-study page for a single portfolio project, resolved dynamically from the `:slug` route
 * param - same toSignal(route.paramMap...) + computed() pattern used by pro-website-details.ts.
 */
@Component({
  selector: 'app-portfolio-website-project-detail',
  standalone: true,
  imports: [NgTemplateOutlet, RouterLink, NxButton, NxIcon, NxTag, NxBreadcrumb, NxLightbox, NxBeforeAfter],
  templateUrl: './portfolio-website-project-detail.html',
  styleUrl: './portfolio-website-project-detail.scss',
})
export class PortfolioWebsiteProjectDetailDemo {
  private readonly route = inject(ActivatedRoute);

  protected readonly licensed = nxProLicenseGranted();

  private readonly slug = toSignal(this.route.paramMap.pipe(map((params) => params.get('slug'))), {
    initialValue: this.route.snapshot.paramMap.get('slug'),
  });

  protected readonly project = computed(() => PORTFOLIO_PROJECTS.find((p) => p.slug === this.slug()) ?? null);

  protected readonly gallery = computed(() => {
    const project = this.project();
    return project ? portfolioProjectGallery(project) : [];
  });

  protected readonly galleryImages = computed<NxLightboxImage[]>(() => {
    const project = this.project();
    if (!project) {
      return [];
    }
    return this.gallery().map((src, index) => ({
      src,
      alt: project.title,
      caption: `${project.title} - view ${index + 1}`,
    }));
  });

  protected readonly lightboxOpen = signal(false);
  protected readonly lightboxIndex = signal(0);

  protected openLightbox(index: number): void {
    this.lightboxIndex.set(index);
    this.lightboxOpen.set(true);
  }

  /** Rebrand case studies get a before/after slider in the case-study section comparing the old
   * identity against the new one shipped for this project (seeded picsum "before" image). */
  protected readonly showBeforeAfter = computed(() => this.project()?.category === 'Branding');

  protected readonly beforeImage = computed(() => {
    const project = this.project();
    return project ? portfolioImage(`${project.slug}-before`, 900, 650) : '';
  });

  protected readonly nextProject = computed(() => {
    const project = this.project();
    if (!project) {
      return null;
    }
    const index = PORTFOLIO_PROJECTS.findIndex((p) => p.slug === project.slug);
    return PORTFOLIO_PROJECTS[(index + 1) % PORTFOLIO_PROJECTS.length];
  });

  protected readonly breadcrumbItems = computed<NxBreadcrumbItem[]>(() => {
    const project = this.project();
    return [
      { label: 'Home', link: '/portfolio-website/home' },
      { label: 'Work', link: '/portfolio-website/work' },
      { label: project?.title ?? 'Project' },
    ];
  });
}
