import { Injectable } from '@angular/core';

/** A permission key can be a numeric role/code or a string key - whatever the host app already uses. */
export type NxPermissionValue = string | number;

/**
 * What "permission" means is app-specific (numeric role codes, string permission
 * keys, claims, feature flags, ...), so nxHasPermission doesn't hard-code any of
 * it - the host app provides its own check by extending this class and
 * registering it, e.g.:
 *
 * ```ts
 * @Injectable({ providedIn: 'root' })
 * export class AppPermissionChecker extends NxPermissionChecker {
 *   private readonly auth = inject(AuthService);
 *
 *   override hasPermission(permissions: NxPermissionValue | NxPermissionValue[]): boolean {
 *     const required = Array.isArray(permissions) ? permissions : [permissions];
 *     // mix numeric role codes and string permission keys in the same check
 *     return required.some((p) =>
 *       typeof p === 'number' ? this.auth.currentUser.roleId === p : this.auth.currentUser.permissions.includes(p),
 *     );
 *   }
 * }
 * ```
 *
 * ```ts
 * providers: [{ provide: NxPermissionChecker, useClass: AppPermissionChecker }]
 * ```
 */
@Injectable()
export abstract class NxPermissionChecker {
  /** A single permission (number or string), or a list evaluated as "the user has at least one of these". */
  abstract hasPermission(permissions: NxPermissionValue | NxPermissionValue[]): boolean;
}
