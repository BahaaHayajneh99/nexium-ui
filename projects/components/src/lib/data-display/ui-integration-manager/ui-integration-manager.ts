import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { NxIntegrationCard, NxIntegrationStatus } from '../ui-integration-card';
import { NxSearch } from '../../forms/ui-search';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export interface NxIntegrationManagerItem {
  id: string | number;
  name: string;
  description?: string;
  icon?: string;
  status: NxIntegrationStatus;
  configurable?: boolean;
}

export type NxIntegrationManagerFilter = 'all' | 'connected' | 'disconnected';

/**
 * A dashboard list of many third-party integrations - a search box, a connection-status filter,
 * and a responsive grid of `<nx-integration-card>` instances (the manager composes that existing
 * card rather than re-rendering its own look). `connect`/`disconnect`/`configure` pass through the
 * card's own events, re-emitted with the full `NxIntegrationManagerItem` so consumers know which
 * integration was acted on.
 */
@Component({
  selector: 'nx-integration-manager',
  standalone: true,
  imports: [NgIf, NgFor, NxIntegrationCard, NxSearch, NxProLocked],
  templateUrl: './ui-integration-manager.html',
  styleUrl: './ui-integration-manager.scss',
})
export class NxIntegrationManager {
  protected readonly licensed = nxProLicenseGranted();

  @Input() integrations: NxIntegrationManagerItem[] = [];

  @Output() connect = new EventEmitter<NxIntegrationManagerItem>();
  @Output() disconnect = new EventEmitter<NxIntegrationManagerItem>();
  @Output() configure = new EventEmitter<NxIntegrationManagerItem>();

  protected readonly filterOptions: { label: string; value: NxIntegrationManagerFilter }[] = [
    { label: 'All', value: 'all' },
    { label: 'Connected', value: 'connected' },
    { label: 'Not Connected', value: 'disconnected' },
  ];

  searchTerm = '';
  protected readonly statusFilter = signal<NxIntegrationManagerFilter>('all');

  setFilter(filter: NxIntegrationManagerFilter): void {
    this.statusFilter.set(filter);
  }

  filteredIntegrations(): NxIntegrationManagerItem[] {
    const term = this.searchTerm.trim().toLowerCase();
    const filter = this.statusFilter();

    return this.integrations.filter((integration) => {
      const matchesSearch = !term || integration.name.toLowerCase().includes(term);
      const matchesFilter =
        filter === 'all' || (filter === 'connected' ? integration.status === 'connected' : integration.status !== 'connected');
      return matchesSearch && matchesFilter;
    });
  }

  trackByOptionValue(index: number, option: { label: string; value: NxIntegrationManagerFilter }): NxIntegrationManagerFilter {
    return option.value;
  }

  trackByIntegrationId(index: number, integration: NxIntegrationManagerItem): string | number {
    return integration.id;
  }
}
