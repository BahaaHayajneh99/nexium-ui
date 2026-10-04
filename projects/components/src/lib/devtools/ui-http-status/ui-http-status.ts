import { Component, Input, numberAttribute } from '@angular/core';

/** A color-coded HTTP status code badge (2xx green, 3xx blue, 4xx amber, 5xx red). */
@Component({
  selector: 'nx-http-status',
  standalone: true,
  imports: [],
  template: `
    <span class="nx-http-status" [class]="categoryClass">
      {{ code }}
      @if (statusText) {
        <span class="nx-http-status-text">{{ statusText }}</span>
      }
    </span>
  `,
  styles: `
    .nx-http-status {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 2px 10px;
      border-radius: 999px;
      font-family: "JetBrains Mono", monospace;
      font-size: 12px;
      font-weight: 700;
    }
    .nx-http-status.success { background-color: rgba(46, 204, 113, .15); color: #2ecc71; }
    .nx-http-status.info { background-color: rgba(59, 130, 246, .15); color: #3b82f6; }
    .nx-http-status.warning { background-color: rgba(245, 166, 35, .15); color: #f5a623; }
    .nx-http-status.danger { background-color: rgba(231, 76, 60, .15); color: #e74c3c; }
    .nx-http-status.neutral { background-color: var(--shell-border); color: var(--shell-text-secondary); }
    .nx-http-status-text {
      font-weight: 500;
      opacity: .85;
    }
  `,
})
export class NxHttpStatus {
  @Input({ transform: numberAttribute }) code = 200;
  @Input() statusText = '';

  get categoryClass(): string {
    if (this.code >= 200 && this.code < 300) {
      return 'success';
    }
    if (this.code >= 300 && this.code < 400) {
      return 'info';
    }
    if (this.code >= 400 && this.code < 500) {
      return 'warning';
    }
    if (this.code >= 500) {
      return 'danger';
    }
    return 'neutral';
  }
}
