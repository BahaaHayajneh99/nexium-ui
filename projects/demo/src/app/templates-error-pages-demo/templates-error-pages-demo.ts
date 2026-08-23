import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NxIcon, NxButton } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

interface ErrorPage {
  code: string;
  icon: string;
  title: string;
  text: string;
}

@Component({
  selector: 'app-templates-error-pages-demo',
  imports: [RouterLink, NxIcon, NxButton, DemoSection],
  templateUrl: './templates-error-pages-demo.html',
})
export class TemplatesErrorPagesDemo {
  pages: ErrorPage[] = [
    { code: '404', icon: 'nx-search', title: 'Page not found', text: "The page you're looking for doesn't exist or has moved." },
    { code: '403', icon: 'nx-lock', title: 'Access denied', text: "You don't have permission to view this page." },
    { code: '500', icon: 'nx-alert-triangle', title: 'Something went wrong', text: 'An unexpected error occurred on our end. Please try again.' },
  ];

  previewCode = `<div>
    <nx-icon icon="nx-search" variant="svg" [size]="40"></nx-icon>
    <div>404</div>
    <div>Page not found</div>
    <p>The page you're looking for doesn't exist or has moved.</p>
    <nx-button variant="primary" routerLink="/">Go Home</nx-button>
</div>`;
}
