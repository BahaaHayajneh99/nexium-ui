import { Component } from '@angular/core';
import { NxCard, NxCardContent, NxIcon, NxInput, NxBreadcrumb, NxBreadcrumbItem, NxButton } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

interface Category {
  name: string;
  icon: string;
  count: number;
}

@Component({
  selector: 'app-templates-knowledge-base-demo',
  imports: [NxCard, NxCardContent, NxIcon, NxInput, NxBreadcrumb, NxButton, DemoSection],
  templateUrl: './templates-knowledge-base-demo.html',
})
export class TemplatesKnowledgeBaseDemo {
  categories: Category[] = [
    { name: 'Getting Started', icon: 'nx-rocket', count: 24 },
    { name: 'Account & Billing', icon: 'nx-credit-card', count: 18 },
    { name: 'API Reference', icon: 'nx-link', count: 32 },
    { name: 'Troubleshooting', icon: 'nx-alert-triangle', count: 15 },
    { name: 'Security', icon: 'nx-lock', count: 9 },
    { name: 'Integrations', icon: 'nx-globe', count: 12 },
  ];

  breadcrumbItems: NxBreadcrumbItem[] = [
    { label: 'Help Center', link: '/' },
    { label: 'Getting Started', link: '/' },
    { label: 'How to Reset Your Password' },
  ];

  categoriesCode = `<nx-card variant="outlined" hoverable>
    <nx-card-content>
        <nx-icon icon="nx-rocket" variant="svg" [size]="28"></nx-icon>
        <div class="template-profile-name mt-2">Getting Started</div>
        <div class="template-stat-label">24 articles</div>
    </nx-card-content>
</nx-card>`;

  articleCode = `<nx-input placeholder="Search articles..."></nx-input>

<nx-breadcrumb [items]="breadcrumbItems"></nx-breadcrumb>

<h3 class="template-profile-name">How to Reset Your Password</h3>
<p>If you've forgotten your password, you can reset it in under a minute...</p>

<div class="template-form-row">
    <span class="template-form-note">Was this helpful?</span>
    <nx-button variant="secondary" size="small">Yes</nx-button>
    <nx-button variant="secondary" size="small">No</nx-button>
</div>`;
}
