import { Component, Input } from '@angular/core';

export type NxVersionBadgeVariant = 'default' | 'new' | 'beta' | 'deprecated';

/** A small pill showing a version string, with an optional new/beta/deprecated tone. */
@Component({
  selector: 'nx-version-badge',
  standalone: true,
  imports: [],
  template: `
    <span class="nx-version-badge" [class]="variant">
      @if (label) {
        <span class="nx-version-badge-label">{{ label }}</span>
      }
      {{ version }}
    </span>
  `,
  styles: `
    .nx-version-badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 2px 10px;
      border-radius: 999px;
      background-color: var(--shell-surface-hover);
      color: var(--shell-text-secondary);
      font-family: "JetBrains Mono", monospace;
      font-size: 12px;
      font-weight: 600;
    }
    .nx-version-badge.new {
      background-color: color-mix(in srgb, var(--success-color, #28a745) 15%, transparent);
      color: var(--success-color, #28a745);
    }
    .nx-version-badge.beta {
      background-color: color-mix(in srgb, var(--info-color, #17a2b8) 15%, transparent);
      color: var(--info-color, #17a2b8);
    }
    .nx-version-badge.deprecated {
      background-color: color-mix(in srgb, var(--danger-color, #e74c3c) 15%, transparent);
      color: var(--danger-color, #e74c3c);
    }
    .nx-version-badge-label {
      text-transform: uppercase;
      font-size: 10px;
      opacity: .8;
    }
  `,
})
export class NxVersionBadge {
  @Input() version = '';
  @Input() label = '';
  @Input() variant: NxVersionBadgeVariant = 'default';
}
