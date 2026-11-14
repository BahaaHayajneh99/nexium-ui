import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { nxProLicenseGranted, NxButton, NxIcon, NxTimeline, NxTimelineItem, NxBreadcrumb, NxBreadcrumbItem } from 'components';
import { NX_SAAS_CHANGELOG, NxSaasChangelogEntry } from '../saas-website-data';

const CHANGELOG_VARIANT: Record<NxSaasChangelogEntry['type'], NxTimelineItem['variant']> = {
  Feature: 'primary',
  Improvement: 'info',
  Fix: 'warning',
};

/**
 * Changelog page of the "SaaS Website" PRO template - renders NX_SAAS_CHANGELOG as a
 * <nx-timeline>, newest release first, each entry tagged with its release type.
 */
@Component({
  selector: 'app-saas-website-changelog',
  imports: [NgTemplateOutlet, RouterLink, NxButton, NxIcon, NxTimeline, NxBreadcrumb],
  templateUrl: './saas-website-changelog.html',
  styleUrl: './saas-website-changelog.scss',
})
export class SaasWebsiteChangelogDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [
    { label: 'Home', link: '/saas-website/home' },
    { label: 'Changelog' },
  ];

  protected readonly timelineItems: NxTimelineItem[] = NX_SAAS_CHANGELOG.map((entry) => ({
    title: `${entry.version} · ${entry.title}`,
    time: `${entry.date} · ${entry.type}`,
    description: entry.description,
    variant: CHANGELOG_VARIANT[entry.type],
  }));
}
