import { Component, computed, inject } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { nxProLicenseGranted, NxButton, NxIcon, NxTag, NxStatistic, NxBreadcrumb, NxBreadcrumbItem } from 'components';
import { NX_SAAS_CASE_STUDIES, NxSaasCaseStudy } from '../saas-website-data';

/**
 * Case Study Detail page of the "SaaS Website" PRO template - resolves the case study by the
 * string `:slug` route param (same toSignal + computed() pattern as the Real Estate Website
 * Listing Detail page, keyed by slug instead of a numeric id).
 */
@Component({
  selector: 'app-saas-website-case-study-detail',
  imports: [NgTemplateOutlet, RouterLink, NxButton, NxIcon, NxTag, NxStatistic, NxBreadcrumb],
  templateUrl: './saas-website-case-study-detail.html',
  styleUrl: './saas-website-case-study-detail.scss',
})
export class SaasWebsiteCaseStudyDetailDemo {
  private readonly route = inject(ActivatedRoute);

  protected readonly licensed = nxProLicenseGranted();

  private readonly slug = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('slug') ?? '')),
    { initialValue: this.route.snapshot.paramMap.get('slug') ?? '' },
  );

  protected readonly study = computed<NxSaasCaseStudy | null>(
    () => NX_SAAS_CASE_STUDIES.find((item) => item.slug === this.slug()) ?? null,
  );

  protected readonly breadcrumbItems = computed<NxBreadcrumbItem[]>(() => [
    { label: 'Home', link: '/saas-website/home' },
    { label: 'Case Studies', link: '/saas-website/case-studies' },
    { label: this.study()?.company ?? 'Case study' },
  ]);
}
