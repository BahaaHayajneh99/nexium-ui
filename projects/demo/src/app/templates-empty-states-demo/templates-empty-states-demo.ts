import { Component } from '@angular/core';
import { UiIcon, UiButton } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

interface EmptyState {
  icon: string;
  title: string;
  text: string;
  actionLabel: string;
}

@Component({
  selector: 'app-templates-empty-states-demo',
  imports: [UiIcon, UiButton, DemoSection],
  templateUrl: './templates-empty-states-demo.html',
})
export class TemplatesEmptyStatesDemo {
  states: EmptyState[] = [
    { icon: 'nx-search', title: 'No results found', text: 'Try adjusting your search or filters.', actionLabel: 'Clear filters' },
    { icon: 'nx-mail', title: 'Your inbox is empty', text: "You're all caught up - nothing new to read.", actionLabel: 'Compose message' },
    { icon: 'nx-shopping-cart', title: 'Your cart is empty', text: 'Items you add will show up here.', actionLabel: 'Browse products' },
    { icon: 'nx-folder-open', title: 'No files yet', text: 'Upload a file to get started.', actionLabel: 'Upload file' },
  ];

  previewCode = `<div>
    <nx-icon icon="nx-search" variant="svg" [size]="40"></nx-icon>
    <div>No results found</div>
    <p>Try adjusting your search or filters.</p>
    <nx-button variant="secondary">Clear filters</nx-button>
</div>`;
}
