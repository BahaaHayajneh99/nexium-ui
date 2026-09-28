import { Component, DoCheck, Input, inject } from '@angular/core';
import { NxPermissionChecker, NxPermissionValue } from '../nx-has-permission/nx-permission-checker';

/**
 * Like `*nxHasPermission`, but a component rather than a structural
 * directive, so it can show an explicit `[nxPermissionGateFallback]` slot
 * (a "you don't have access" message, a lock icon, ...) instead of just
 * removing the content outright. Shares the same `NxPermissionChecker`
 * provider, so both stay consistent with a single source of truth for
 * what "has permission" means in your app.
 */
@Component({
  selector: 'nx-permission-gate',
  standalone: true,
  imports: [],
  template: `
    @if (granted) {
      <ng-content></ng-content>
    } @else {
      <ng-content select="[nxPermissionGateFallback]"></ng-content>
    }
  `,
})
export class NxPermissionGate implements DoCheck {
  @Input() permission: NxPermissionValue | NxPermissionValue[] = [];

  private checker = inject(NxPermissionChecker, { optional: true });
  private warned = false;

  granted = false;

  ngDoCheck(): void {
    this.granted = this.checker ? this.checker.hasPermission(this.permission) : this.denyWithWarning();
  }

  private denyWithWarning(): false {
    if (!this.warned) {
      this.warned = true;
      console.warn(
        '[nx-permission-gate] No NxPermissionChecker provider found - hiding content by default. ' +
          'Provide one, e.g. { provide: NxPermissionChecker, useClass: YourChecker }.',
      );
    }
    return false;
  }
}
