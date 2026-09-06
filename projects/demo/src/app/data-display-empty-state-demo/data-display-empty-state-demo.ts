import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxEmptyState } from '../../../../../dist/components';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-data-display-empty-state-demo',
  standalone: true,
  imports: [CommonModule, NxEmptyState, DemoSection],
  templateUrl: './data-display-empty-state-demo.html',
  styleUrls: ['./data-display-empty-state-demo.scss'],
})
export class DataDisplayEmptyStateDemo {
  commonService = inject(CommonService);

  importCode = `import { NxEmptyState } from 'nexium-ui';`;

  basicCode = `<nx-empty-state
  icon="nx-search"
  title="No Search Results"
  description="Try adjusting your search terms or filters"
  actionLabel="Clear Search"
  (actionClick)="onClearSearch()">
</nx-empty-state>`;

  moreExamplesCode = `<nx-empty-state
  *ngFor="let state of emptyStates"
  [icon]="state.icon"
  [title]="state.title"
  [description]="state.description"
  [actionLabel]="state.action">
</nx-empty-state>`;

  moreExamplesTs = `emptyStates = [
  {
    title: 'No Search Results',
    icon: 'nx-search',
    description: 'Try adjusting your search terms or filters',
    action: 'Clear Search',
  },
  {
    title: 'Empty Inbox',
    icon: 'nx-mail',
    description: 'All caught up! No new messages here',
    action: 'Start Conversation',
  },
  {
    title: 'No Favorites',
    icon: 'nx-star',
    description: 'You haven\\'t added any favorites yet',
    action: 'Explore Items',
  },
];`;

  features = [
    { name: 'Clear Messaging', description: 'Explain why state is empty' },
    { name: 'Visual Guidance', description: 'Icon or illustration' },
    { name: 'Call-to-Action', description: 'Primary action button' },
    { name: 'Secondary Actions', description: 'Additional options' },
    { name: 'Multiple States', description: 'No results, error, etc.' },
    { name: 'Responsive', description: 'Mobile-friendly layouts' },
  ];

  useCases = [
    { title: 'No Results', description: 'Search query returned nothing' },
    { title: 'Empty List', description: 'No items to display' },
    { title: 'New User', description: 'First-time user onboarding' },
    { title: 'No Favorites', description: 'User hasn\'t saved items' },
    { title: 'Empty Cart', description: 'Shopping cart is empty' },
    { title: 'No Notifications', description: 'No messages to show' },
  ];

  bestPractices = [
    { title: 'Use friendly language', description: 'Write in a conversational, helpful tone' },
    { title: 'Explain the reason', description: 'Clearly explain why the state is empty' },
    { title: 'Include action', description: 'Provide a primary action to help users proceed' },
    { title: 'Add visual interest', description: 'Use illustrations or icons for visual appeal' },
    { title: 'Be contextual', description: 'Make messages relevant to the situation' },
    { title: 'Offer alternatives', description: 'Suggest alternative paths or next steps' },
  ];

  stateTypes = [
    { title: 'No Results', description: 'Search query returned no matches. Guide to refine search.' },
    { title: 'Empty Collection', description: 'List is empty. Suggest primary action to populate.' },
    { title: 'No Permissions', description: 'User lacks access. Explain requirements or next steps.' },
  ];

  emptyStates = [
    {
      title: 'No Search Results',
      icon: 'nx-search',
      description: 'Try adjusting your search terms or filters',
      action: 'Clear Search',
    },
    {
      title: 'Empty Inbox',
      icon: 'nx-mail',
      description: 'All caught up! No new messages here',
      action: 'Start Conversation',
    },
    {
      title: 'No Favorites',
      icon: 'nx-star',
      description: 'You haven\'t added any favorites yet',
      action: 'Explore Items',
    },
  ];

  onClearSearch(): void {
    // Wire this up to your own search-clearing logic.
  }
}
