import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'nx-panel',
  standalone: true,
  imports: [NgClass],
  template: `
    <div class="nx-panel" [ngClass]="variant">
      @if (header) {
        <div class="nx-panel-header">{{ header }}</div>
      }
      <div class="nx-panel-body">
        <ng-content></ng-content>
      </div>
      <div class="nx-panel-footer">
        <ng-content select="[nx-panel-footer]"></ng-content>
      </div>
    </div>
  `,
  styles: `
    .nx-panel {
      border-radius: 8px;
      background-color: var(--shell-surface);
      border: 1px solid var(--shell-border);
    }
    .nx-panel.outlined {
      border: 1px solid var(--shell-border);
    }
    .nx-panel-header {
      padding: 12px 16px;
      font-weight: 600;
      border-bottom: 1px solid var(--shell-border);
    }
    .nx-panel-body {
      padding: 16px;
    }
    .nx-panel-footer {
      padding: 12px 16px;
      border-top: 1px solid var(--shell-border);
    }
  `,
})
export class NxPanel {
  @Input() header = '';
  @Input() variant: 'default' | 'outlined' = 'default';
}
