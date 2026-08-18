import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface NxBreadcrumbItem {
  label: string;
  link?: string;
}

@Component({
  selector: 'nx-breadcrumb',
  standalone: true,
  imports: [RouterLink],
  template: `
    <nav class="nx-breadcrumb">
      @for (item of items; track item.label; let last = $last) {
        @if (item.link && !last) {
          <a class="nx-breadcrumb-link" [routerLink]="item.link">{{ item.label }}</a>
        } @else {
          <span class="nx-breadcrumb-current">{{ item.label }}</span>
        }
        @if (!last) {
          <span class="nx-breadcrumb-separator">{{ separator }}</span>
        }
      }
    </nav>
  `,
  styles: `
    .nx-breadcrumb { display: flex; align-items: center; gap: 8px; font-size: 14px; }
    .nx-breadcrumb-link { color: var(--shell-primary); text-decoration: none; }
    .nx-breadcrumb-link:hover { text-decoration: underline; }
    .nx-breadcrumb-current { color: var(--shell-text-secondary); }
    .nx-breadcrumb-separator { color: var(--shell-text-muted); }
  `,
})
export class UiBreadcrumb {
  @Input() items: NxBreadcrumbItem[] = [];
  @Input() separator = '/';
}
