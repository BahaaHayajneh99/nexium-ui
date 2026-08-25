import { Component, inject } from '@angular/core';
import { NxHasPermission, NxPermissionChecker, NxPermissionValue, NxButton, NxCheckbox, NxBadge } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

enum Role {
  Admin = 1,
  Account = 2,
  Employee = 3,
}

class DemoPermissionChecker extends NxPermissionChecker {
  currentRole: Role = Role.Employee;
  grantedCodes = new Set<string>(['VW_AUDT']);

  override hasPermission(permissions: NxPermissionValue | NxPermissionValue[]): boolean {
    const required = Array.isArray(permissions) ? permissions : [permissions];
    return required.some((p) => (typeof p === 'number' ? p === this.currentRole : this.grantedCodes.has(p)));
  }

  toggleCode(code: string, on: boolean): void {
    if (on) {
      this.grantedCodes.add(code);
    } else {
      this.grantedCodes.delete(code);
    }
  }
}

@Component({
  selector: 'app-directive-has-permission-demo',
  imports: [NxHasPermission, NxButton, NxCheckbox, NxBadge, DemoSection],
  templateUrl: './directive-has-permission-demo.html',
  providers: [{ provide: NxPermissionChecker, useClass: DemoPermissionChecker }],
})
export class DirectiveHasPermissionDemo {
  private checker = inject(NxPermissionChecker) as DemoPermissionChecker;

  readonly Role = Role;
  roles = [
    { label: 'Admin', value: Role.Admin },
    { label: 'Account', value: Role.Account },
    { label: 'Employee', value: Role.Employee },
  ];

  importCode = `import { NxHasPermission, NxPermissionChecker } from 'nexium-ui';`;

  canViewAudit = true;
  canDeleteInvoice = false;

  code = `enum Role {
  Admin = 1,
  Account = 2,
  Employee = 3,
}

<!-- numeric role code -->
<button *nxHasPermission="Role.Admin">Admin panel</button>

<!-- string permission key -->
<button *nxHasPermission="'VW_AUDT'">View audit log</button>

<!-- mixed - granted if the role matches OR the string key is present -->
<button *nxHasPermission="[Role.Admin, 'DEL_INV']">Delete invoice</button>`;

  providerCode = `@Injectable({ providedIn: 'root' })
export class AppPermissionChecker extends NxPermissionChecker {
  private readonly auth = inject(AuthService);

  override hasPermission(permissions: NxPermissionValue | NxPermissionValue[]): boolean {
    const required = Array.isArray(permissions) ? permissions : [permissions];
    return required.some((p) =>
      typeof p === 'number'
        ? this.auth.currentUser.roleId === p
        : this.auth.currentUser.permissionCodes.includes(p),
    );
  }
}

// in your app config / module:
providers: [{ provide: NxPermissionChecker, useClass: AppPermissionChecker }]`;

  get currentRole(): Role {
    return this.checker.currentRole;
  }

  setRole(role: Role): void {
    this.checker.currentRole = role;
  }

  onViewAuditChange(checked: boolean): void {
    this.canViewAudit = checked;
    this.checker.toggleCode('VW_AUDT', checked);
  }

  onDeleteInvoiceChange(checked: boolean): void {
    this.canDeleteInvoice = checked;
    this.checker.toggleCode('DEL_INV', checked);
  }
}
