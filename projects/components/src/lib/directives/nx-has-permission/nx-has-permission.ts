import { Directive, DoCheck, Input, TemplateRef, ViewContainerRef, inject } from '@angular/core';
import { NxPermissionChecker, NxPermissionValue } from './nx-permission-checker';

/**
 * Structural directive that renders its content only when NxPermissionChecker
 * grants the given permission(s) - fails closed (content hidden, with a console
 * warning) if no checker is registered, since a silently-visible gate is worse
 * than a silently-hidden one.
 *
 * Re-checks on every change-detection run (via ngDoCheck), not just when the
 * permission input itself changes - the input is usually a static value, so
 * an ngOnChanges-only check would miss the common case where the *checker's*
 * underlying state (e.g. the signed-in user's roles) changes instead.
 *
 * Permissions can be numbers (role/permission codes, e.g. a TS enum) or
 * strings (permission keys) - mix and match freely, including within the
 * same array:
 *
 * ```html
 * <button *nxHasPermission="Role.Admin" (click)="edit()">Edit</button>
 * <button *nxHasPermission="'VW_AUDT'" (click)="view()">View audit log</button>
 * <button *nxHasPermission="[Role.Admin, 'DEL_INV']" (click)="delete()">Delete</button>
 * ```
 */
@Directive({
  selector: '[nxHasPermission]',
  standalone: true,
})
export class NxHasPermission implements DoCheck {
  @Input() nxHasPermission: NxPermissionValue | NxPermissionValue[] = [];

  private templateRef = inject(TemplateRef<unknown>);
  private viewContainerRef = inject(ViewContainerRef);
  private checker = inject(NxPermissionChecker, { optional: true });

  private hasView = false;
  private warned = false;

  ngDoCheck(): void {
    const granted = this.checker ? this.checker.hasPermission(this.nxHasPermission) : this.denyWithWarning();

    if (granted && !this.hasView) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!granted && this.hasView) {
      this.viewContainerRef.clear();
      this.hasView = false;
    }
  }

  private denyWithWarning(): false {
    if (!this.warned) {
      this.warned = true;
      console.warn(
        '[nxHasPermission] No NxPermissionChecker provider found - hiding content by default. ' +
          'Provide one, e.g. { provide: NxPermissionChecker, useClass: YourChecker }.',
      );
    }

    return false;
  }
}
