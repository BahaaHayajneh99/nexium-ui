import { Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { NxDashboardFilters, NxDashboardFilterState, NxMetricCard } from '../../../../../dist/components';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-dashboard-filters-demo',
  imports: [NxDashboardFilters, NxMetricCard, DemoSection, JsonPipe],
  templateUrl: './ui-dashboard-filters-demo.html',
  styleUrl: './ui-dashboard-filters-demo.scss',
})
export class UiDashboardFiltersDemo {
  importCode = `import { NxDashboardFilters } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  extraFilters = [
    { key: 'region', label: 'Region', options: ['North America', 'Europe', 'Asia Pacific'] },
    { key: 'team', label: 'Team', options: ['Marketing', 'Sales', 'Engineering'] },
  ];

  instantState: NxDashboardFilterState = {};
  buttonState: NxDashboardFilterState = {};

  onInstantFiltersChange(state: NxDashboardFilterState): void {
    this.instantState = state;
  }

  onButtonFiltersChange(state: NxDashboardFilterState): void {
    this.buttonState = state;
  }

  get instantFilterCount(): number {
    return Object.keys(this.instantState).length;
  }

  get buttonFilterCount(): number {
    return Object.keys(this.buttonState).length;
  }

  instantCode = `<nx-dashboard-filters
  [extraFilters]="extraFilters"
  applyMode="instant"
  (filtersChange)="onFiltersChange($event)">
</nx-dashboard-filters>`;

  instantTs = `extraFilters = [
  { key: 'region', label: 'Region', options: ['North America', 'Europe', 'Asia Pacific'] },
  { key: 'team', label: 'Team', options: ['Marketing', 'Sales', 'Engineering'] },
];

onFiltersChange(state: NxDashboardFilterState): void {
  // 'instant' mode: fires on every change (date field or dropdown). In 'button' mode it only
  // fires once "Apply" is clicked - Reset always fires immediately in either mode.
  this.state = state;
}`;

  buttonCode = `<nx-dashboard-filters
  [extraFilters]="extraFilters"
  applyMode="button"
  (filtersChange)="onButtonFiltersChange($event)">
</nx-dashboard-filters>`;

  buttonTs = `onButtonFiltersChange(state: NxDashboardFilterState): void {
  // Nothing is emitted until "Apply" is clicked - date/dropdown changes are staged locally
  // first. Reset still clears and emits immediately, in either mode.
  this.state = state;
}`;
}
