import { Component, computed, inject } from '@angular/core';
import { DecimalPipe, NgTemplateOutlet } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { NxButton, NxIcon, NxBadge, NxBreadcrumb, NxBreadcrumbItem, nxProLicenseGranted } from 'components';
import { REAL_ESTATE_AGENTS, REAL_ESTATE_LISTINGS, NxRealEstateAgent, NxPropertyListing, NxPropertyStatus } from '../real-estate-website-data';

/**
 * Agent Detail page of the "Real Estate Website" PRO template - resolves the agent by the
 * numeric `:id` route param (same toSignal + computed() pattern as Listing Detail), then
 * shows their full bio alongside a grid of their active listings.
 */
@Component({
  selector: 'app-real-estate-website-agent-detail',
  standalone: true,
  imports: [NgTemplateOutlet, DecimalPipe, RouterLink, NxButton, NxIcon, NxBadge, NxBreadcrumb],
  templateUrl: './real-estate-website-agent-detail.html',
  styleUrl: './real-estate-website-agent-detail.scss',
})
export class RealEstateWebsiteAgentDetailDemo {
  private readonly route = inject(ActivatedRoute);

  protected readonly licensed = nxProLicenseGranted();

  private readonly id = toSignal(
    this.route.paramMap.pipe(map((params) => Number(params.get('id')))),
    { initialValue: Number(this.route.snapshot.paramMap.get('id')) },
  );

  protected readonly agent = computed<NxRealEstateAgent | null>(
    () => REAL_ESTATE_AGENTS.find((item) => item.id === this.id()) ?? null,
  );

  protected readonly breadcrumbItems = computed<NxBreadcrumbItem[]>(() => [
    { label: 'Home', link: '/real-estate-website/home' },
    { label: 'Agents', link: '/real-estate-website/agents' },
    { label: this.agent()?.name ?? 'Agent' },
  ]);

  protected readonly agentListings = computed<NxPropertyListing[]>(() => {
    const agent = this.agent();
    if (!agent) {
      return [];
    }
    return REAL_ESTATE_LISTINGS.filter((listing) => listing.agentId === agent.id);
  });

  protected badgeVariant(status: NxPropertyStatus): 'success' | 'info' | 'warning' {
    if (status === 'For Rent') {
      return 'info';
    }
    if (status === 'Pending') {
      return 'warning';
    }
    return 'success';
  }
}
